import express from "express";
import { registerUser, loginAccess } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginAccess);

export default router;
