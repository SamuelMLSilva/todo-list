import express from "express";
const router = express.Router();
import AuthController from "../controllers/authController.js";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", AuthController.me);

export default router;
