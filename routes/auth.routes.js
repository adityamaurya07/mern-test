import express from "express";
import { Register, Login } from "../controller/auth.controller.js";
import LoginMiddleware from "../middleware/login.middlerware.js";

const router = express.Router();

router.post("/signup", Register);
router.post("/login", LoginMiddleware, Login);

export default router;
