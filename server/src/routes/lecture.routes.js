import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addLecture, deleteLecture, getLectureById, updateLecture } from "../controllers/lecture.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router  = Router();

router.post('/addlecture/:sectionId', verifyJWT, upload.single("video"), addLecture);
router.put('/updateLecture/:lectureId', verifyJWT, upload.single("video"), updateLecture);
router.get('/getLectureById/:lectureId', verifyJWT, getLectureById);
router.delete('/deleteLecture/:lectureId', verifyJWT, deleteLecture);

export default router;