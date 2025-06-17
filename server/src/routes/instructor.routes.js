import {Router} from 'express';
import { createInstructorProfile } from '../controllers/instructor.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js'


const router = Router();

router.post('/create', verifyJWT, createInstructorProfile);



export default router;