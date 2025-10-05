import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { markNotificationAsRead, getUserNotifications } from "../controllers/notification.controller.js";

const router = Router();

// ✅ Get all notifications for logged-in user
router.get("/", verifyJWT, getUserNotifications);

// ✅ Mark a specific notification as read
router.put("/:id/read", verifyJWT, markNotificationAsRead);

export default router;