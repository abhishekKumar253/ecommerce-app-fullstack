import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createOrder,
  paymentSuccess,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", protectRoute, createOrder);
router.post("/payment-suuccess", protectRoute, paymentSuccess);

export default router;
