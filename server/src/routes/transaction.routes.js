import { Router } from "express";
import { createTransaction, verifyTransaction } from "../controllers/transaction.conteroller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:courseId/create", verifyJWT, createTransaction);
router.post("/:courseId/verify", verifyJWT, verifyTransaction);

export default router;