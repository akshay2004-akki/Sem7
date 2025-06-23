import { verifyJWT } from "../middleware/auth.middleware.js";
import { Router } from "express";
import {createReview, getAverageRating, getReviewByCourse} from '../controllers/review.controller.js'

const router = Router();

router.post("/:courseId/:userId", verifyJWT, createReview);
router.get("/:courseId", getReviewByCourse);
router.get("/average/:courseId", getAverageRating);

export default router;