import asyncHandler from "../utils/asyncHandler.js";
import {Transaction} from "../models/transaction.model.js";
import {Course} from "../models/courses.model.js";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
import { razorpay } from "../utils/razorpay.js";


export const createTransaction = asyncHandler(async(req,res)=>{
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

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZOR_PAY_KEY_ID,
    });
})

export const verifyTransaction = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const { courseId } = req.params;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    throw new ApiError(400, "Invalid payment details");
  }

  // ✅ verify signature
  const isValidSignature = razorpay.utils.verifyPaymentSignature({
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!isValidSignature) {
    throw new ApiError(400, "Invalid payment signature");
  }

  // ✅ get course price from DB
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // ✅ save transaction
  const transaction = await Transaction.create({
    user: req.user._id,
    course: courseId,
    price: course.price, // correct way!
    status: 'completed',
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    signature: razorpay_signature,
  });

  // ✅ mark course as enrolled
  const user = await User.findById(req.user._id);
  user.enrolledCourses.push(courseId);
  await user.save();

  res.status(201).json({
    success: true,
    message: "Transaction verified successfully",
    transaction,
  });
});