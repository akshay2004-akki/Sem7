import {Router} from 'express';
import {updateProgress, getCourseProgress, getWeeklyStudyHours} from '../controllers/progress.controller.js';
import {verifyJWT} from '../middleware/auth.middleware.js'

const router = Router();

router.post('/update', verifyJWT, updateProgress);
router.get('/:userId/:courseId', verifyJWT, getCourseProgress);
router.get("/weekly-hours/:userId", verifyJWT, getWeeklyStudyHours);

export default router;