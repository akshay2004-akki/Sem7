import { Router } from 'express';
import {
  createInstructorProfile,
  getInstructorProfile,
  getInstructorById,
  getAllInstructors,
  updateInstructorProfile,
  deleteInstructorProfile,
  getInstructorCourses
} from '../controllers/instructor.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// ✅ Create a new instructor profile (authenticated)
router.post('/create', verifyJWT, createInstructorProfile);

// ✅ Get current logged-in instructor's profile (authenticated)
router.get('/me', verifyJWT, getInstructorProfile);

// ✅ Get instructor profile by ID (public)
router.get('/:instructorId', getInstructorById);

// ✅ Get all instructors (public)
router.get('/', getAllInstructors);

// ✅ Update instructor profile (authenticated)
router.put('/update', verifyJWT, updateInstructorProfile);

// ✅ Delete instructor profile (authenticated)
router.delete('/delete', verifyJWT, deleteInstructorProfile);

// ✅ Get courses by instructor ID (public)
router.get('/:instructorId/courses', getInstructorCourses);

export default router;
