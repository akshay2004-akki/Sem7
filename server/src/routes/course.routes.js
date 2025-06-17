import {verifyJWT} from '../middleware/auth.middleware.js';
import {Router} from 'express';
import { createCourse, updateCourse, getAllCourses, getCourseById, deleteCourse, browseCourses, getInstructorCourses } from '../controllers/course.controller.js';

const router = Router();

router.post('/createCourse', verifyJWT, createCourse);
router.put('/updateCourse/:courseId', verifyJWT, updateCourse);
router.get('/getAllCourses', getAllCourses);
router.get('/getCourseById/:courseId', getCourseById);
router.delete('/deleteCourse/:courseId', verifyJWT, deleteCourse);
router.get('/browseCourses', browseCourses);
router.get('/getInstructorCourses/:instructorId',verifyJWT ,getInstructorCourses);

export default router; 