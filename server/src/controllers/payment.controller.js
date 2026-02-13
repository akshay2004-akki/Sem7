import { Razorpay } from "../app.js";
import { User } from "../models/user.model.js";
import { Course } from "../models/courses.model.js";
import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import  asyncHandler  from "../utils/asynchandler.js";
import crypto from "crypto";

// --- 1. Create a Razorpay Order ---
const checkout = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    // Razorpay expects the amount in the smallest currency unit (e.g., paise for INR)
    const amountInPaise = Math.round(course.price * 100);

    const options = {
        amount: amountInPaise,
        currency: "INR", // Or your desired currency
        receipt: `receipt_course_${course._id}`,
    };

    try {
        const order = await Razorpay.orders.create(options);
        res.status(200).json( {
            order,
            key_id: process.env.RAZOR_PAY_KEY_ID, // Send key_id to frontend
            message : "Order created successfully"
        }, );
    } catch (error) {
        throw new ApiError(500, "Error creating Razorpay order");
    }
});


// --- 2. Verify Payment and Enroll User ---
const paymentVerification = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { courseId } = req.params;
    const userId = req.user._id;

    // --- Signature Verification ---
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // --- If payment is authentic, enroll the user ---
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user || !course) {
            throw new ApiError(404, "User or Course not found");
        }

        // Check if already enrolled
        if (user.enrolledCourses.includes(courseId)) {
             return res.status(200).json({data : {}, message : "You are already enrolled in this course."});
        }

        // Add course to user's enrolledCourses
        user.enrolledCourses.push(courseId);
        await user.save({ validateBeforeSave: false });

        // You can also create a payment record in your database here if needed

        res.status(200).json({data: {}, message : "Payment successful and enrolled in the course!"});

    } else {
        throw new ApiError(400, "Payment verification failed. Invalid signature.");
    }
});


export { checkout, paymentVerification };
