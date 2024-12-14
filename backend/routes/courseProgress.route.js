import express from "express"
import verifyjwt from "../middlewares/verifyjwt.js";
import { getCourseProgress } from "../controllers/courseProgress.controller.js";
import { markAsCompleted , markAsInCompleted} from "../controllers/courseProgress.controller.js";
import { updateLectureProgress } from "../controllers/courseProgress.controller.js";
const router = express.Router()

router.route("/:courseId").get(verifyjwt, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(verifyjwt, updateLectureProgress);
router.route("/:courseId/complete").post(verifyjwt, markAsCompleted);
router.route("/:courseId/incomplete").post(verifyjwt, markAsInCompleted);

export default router;