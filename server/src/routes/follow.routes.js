import express from 'express';
import { followAndUnfollowUser, getUserFollowers } from '../controllers/follow.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/followUnfollow/:followerId/:followingId', verifyJWT, followAndUnfollowUser);
router.get('/followers/:followingId', verifyJWT, getUserFollowers);

export default router;