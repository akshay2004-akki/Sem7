import {Router} from 'express';
import {verifyJWT} from '../middleware/auth.middleware.js'; 
import { addSection, updateSection, deleteSection} from '../controllers/section.controller.js';

const router = Router();

router.post("/addSection/:courseId", verifyJWT, addSection);
router.put("/updateSection/:sectionId", verifyJWT, updateSection); 
router.delete("/deleteSection/:sectionId", verifyJWT, deleteSection);

export default router;