import express from "express";
import {
  getAllManhwa,
  getManhwaById,
  addManhwa,
  updateManhwa,
  deleteManhwa,
} from "../controllers/manhwaController";

const router = express.Router();

router.get("/", getAllManhwa);
router.get("/:id", getManhwaById);
router.post("/", addManhwa);
router.put("/:id", updateManhwa);
router.delete("/", deleteManhwa);

export default router;