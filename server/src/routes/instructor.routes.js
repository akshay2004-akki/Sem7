import { Router } from 'express';
import {
  createInstructorProfile,
  getInstructorProfile,
  getInstructorById,
  getAllInstructors,
  updateInstructorProfile,
  deleteInstructorProfile,
  getInstructorCourses,
  rateInstructor,
  hasRatedInstructor,
  getTopInstructors
} from '../controllers/instructor.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

/* -------------------- ✅ AUTHENTICATED ROUTES -------------------- */
router.post('/create', verifyJWT, createInstructorProfile);
router.put('/update', verifyJWT, updateInstructorProfile);
router.delete('/delete', verifyJWT, deleteInstructorProfile);
router.get('/profile/me', verifyJWT, getInstructorProfile);
router.post('/rate/:instructorId', verifyJWT, rateInstructor);
router.get('/hasRated/:instructorId/:userId', verifyJWT, hasRatedInstructor);

/* -------------------- ✅ PUBLIC ROUTES -------------------- */
// ⚠️ Order is important — always place specific routes before generic `/:id`
router.get('/top', getTopInstructors);
router.get('/courses/:instructorId', getInstructorCourses);
router.get('/', getAllInstructors);
router.get('/:instructorId', getInstructorById);

export default router;
