import express from "express";
import { getUserProfile,login,logout,register,updateProfile } from "../controllers/user.controller.js";
import verifyjwt from "../middlewares/verifyjwt.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(verifyjwt, getUserProfile);
router.route("/profile/update").put(verifyjwt, upload.single("profilePhoto"), updateProfile);

export default router;