import {Router} from 'express';
import { registerUSer,logOutUser,loginUser } from '../controllers/user.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js';


const router = Router();

router.post('/register', registerUSer);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logOutUser);

export default router;