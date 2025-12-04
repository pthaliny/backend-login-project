import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); //se quiser pública, comenta, se não, fica td privado

router.post("/", createUser);
router.get("/:id", getUser);

export default router;
