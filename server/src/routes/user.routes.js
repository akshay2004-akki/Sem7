import {Router} from 'express';
import { registerUSer,logOutUser,loginUser, uploadAvatar, getUserProfile, getUserById, getAllUsers, deleteUser, updateUser, changeUserPassword } from '../controllers/user.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';


const router = Router();

router.post('/register', registerUSer);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logOutUser);
router.post('/upload-avatar', verifyJWT, upload.single("avatar") ,uploadAvatar);
router.get('/profile', verifyJWT, getUserProfile)
router.get('/:userId', verifyJWT, getUserById)
router.get('allUsers', getAllUsers);
router.delete('/:userId', verifyJWT, deleteUser);
router.put('/userId', verifyJWT, updateUser);
router.put('updatePassword', verifyJWT, changeUserPassword);


export default router;