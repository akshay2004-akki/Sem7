import { Router } from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Authenticated dashboard route
router.get("/:userId", verifyJWT, getDashboardData);

export default router;
