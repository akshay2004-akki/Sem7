import asyncHandler from "../utils/asynchandler.js";
import {Transaction} from "../models/transaction.model.js";
import {Course} from "../models/courses.model.js";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
import { razorpay } from "../utils/razorpay.js";
import crypto from "crypto";


export const createTransaction = asyncHandler(async(req,res)=>{
    try {
        const userId = req.user?._id;
        const {courseId} = req.params;
    
        if(!isValidObjectId(courseId)) {
            throw new ApiError(400, "Invalid course ID");
        }
        if(!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid user ID");
        }
        const course = await Course.findById(courseId);
        if(!course) {
            throw new ApiError(404, "Course not found");
        }
    
        const order = await razorpay.orders.create({
            amount : course.price * 100,
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        })
    
        return res.status(201).json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key: process.env.RAZOR_PAY_KEY_ID,
        });
    } catch (error) {
        console.log("Error creating transaction:", error);
        throw new ApiError(500, "Failed to create transaction");
        
    }
})


export const verifyTransaction = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const { courseId } = req.params;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    throw new ApiError(400, "Invalid payment details");
  }

  // ✅ Create expected signature using crypto HMAC
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    throw new ApiError(400, "Invalid payment signature");
  }

  // ✅ Get course price from DB
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // ✅ Save transaction
  const transaction = await Transaction.create({
    user: req.user._id,
    course: courseId,
    price: parseFloat(course.price), // ensure it's a number
    status: "completed",
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    signature: razorpay_signature,
  });

  // ✅ Enroll user in course
  const user = await User.findById(req.user._id);
  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    await user.save();
  }

  return res.status(201).json({
    success: true,
    message: "Transaction verified successfully",
    transaction,
  });
});
