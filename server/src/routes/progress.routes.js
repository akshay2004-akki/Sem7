import {Router} from 'express';
import {updateProgress, getCourseProgress} from '../controllers/progress.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js'

const router = Router();

router.post('/update', verifyJWT, updateProgress);
router.get('/:userId/:courseId', verifyJWT, getCourseProgress);