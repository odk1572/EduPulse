import { stripeWebhook } from "../controllers/coursePurchase.controller.js";
import express from "express";
import verifyjwt from "../middlewares/verifyjwt.js";
import { createCheckoutSession,getAllPurchasedCourse,getCourseDetailWithPurchaseStatus } from "../controllers/coursePurchase.controller.js";
const router = express.Router();

router.route("/checkout/create-checkout-session").post(verifyjwt, createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(verifyjwt,getCourseDetailWithPurchaseStatus);

router.route("/").get(verifyjwt,getAllPurchasedCourse);

export default router;
