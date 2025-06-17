import {Router} from 'express';
import { registerUSer,logOutUser,loginUser, uploadAvatar, getUserProfile } from '../controllers/user.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';


const router = Router();

router.post('/register', registerUSer);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logOutUser);
router.post('/upload-avatar', verifyJWT, upload.single("avatar") ,uploadAvatar);
router.get('/profile', verifyJWT, getUserProfile)


export default router;