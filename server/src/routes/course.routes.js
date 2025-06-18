import {verifyJWT} from '../middleware/auth.middleware.js';
import {Router} from 'express';
import { createCourse, updateCourse, getAllCourses, getCourseById, deleteCourse, browseCourses, getInstructorCourses } from '../controllers/course.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router.post('/createCourse', verifyJWT, upload.single("thumbnail") ,createCourse);
router.put('/updateCourse/:courseId', verifyJWT, upload.single("thumbnail") ,updateCourse);
router.get('/getAllCourses', getAllCourses);
router.get('/getCourseById/:courseId', getCourseById);
router.delete('/deleteCourse/:courseId', verifyJWT, deleteCourse);
router.get('/browseCourses', browseCourses);
router.get('/getInstructorCourses/:instructorId',verifyJWT ,getInstructorCourses);

export default router; 