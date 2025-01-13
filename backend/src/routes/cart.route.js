import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToCard,
  getCartProducts,
  removeFromCard,
  updateQuantity,
} from "../controllers/card.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCard);
router.delete("/", protectRoute, removeFromCard);
router.put("/:id", protectRoute, updateQuantity);

export default router;
