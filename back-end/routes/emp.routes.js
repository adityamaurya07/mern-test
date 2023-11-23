import express from "express";
import {
  Get,
  GetById,
  Post,
  Delete,
  Update,
} from "../controller/emp.controller";

const router = express.Router();
router.get("/", Get);
router.get("/:id", GetById);
router.post("/", Post);
router.put("/:id", Update);
router.delete("/:id", Delete);

export default router;
