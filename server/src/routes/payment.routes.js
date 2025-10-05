import { Router } from 'express';
import { verifyJWT } from "../middleware/auth.middleware.js";
import { checkout, paymentVerification } from '../controllers/payment.controller.js';

const router = Router();

// Apply verifyJWT middleware to ensure only logged-in users can access these routes
router.use(verifyJWT);

// --- Routes ---
router.route("/checkout/:courseId").post(checkout);
router.route("/verification/:courseId").post(paymentVerification);

export default router;
