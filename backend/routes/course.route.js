import express from "express";
import verifyjwt from "../middlewares/verifyjwt.js";
import { createCourse,createLecture,editCourse,editLecture,getCourseById,getCourseLecture,getCreatorCourses,getLectureById,getPublishedCourse,removeLecture,searchCourse,togglePublishCourse,removeCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/").post(verifyjwt,createCourse);
router.route("/search").get(verifyjwt, searchCourse);
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(verifyjwt,getCreatorCourses);
router.route("/:courseId").put(verifyjwt,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(verifyjwt, getCourseById);
router.route("/:courseId/lecture").post(verifyjwt, createLecture);
router.route("/:courseId/lecture").get(verifyjwt, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(verifyjwt, editLecture);
router.route("/lecture/:lectureId").delete(verifyjwt, removeLecture);
router.route("/lecture/:lectureId").get(verifyjwt, getLectureById);
router.route("/:courseId").patch(verifyjwt, togglePublishCourse);
router.route("/:courseId").delete(verifyjwt, removeLecture);


export default router;