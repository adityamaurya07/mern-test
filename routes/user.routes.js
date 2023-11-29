import express from "express";
import { Get, Post } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", Get);
router.post("/", Post);

export default router;
