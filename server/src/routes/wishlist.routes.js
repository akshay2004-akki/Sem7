import { Router } from "express";
import { addTowishList, getWishlistItems, removeFromWishlist } from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/addTowishList/:courseId', verifyJWT, addTowishList)
router.get('/getWishlistItems', verifyJWT, getWishlistItems)
router.delete('/removeFromWishlist/:courseId', verifyJWT, removeFromWishlist)

export default router;