"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manhwaController_1 = require("../controllers/manhwaController");
const router = express_1.default.Router();
router.get("/", manhwaController_1.getAllManhwa);
router.get("/:id", manhwaController_1.getManhwaById);
router.post("/", manhwaController_1.addManhwa);
router.put("/:id", manhwaController_1.updateManhwa);
router.delete("/", manhwaController_1.deleteManhwa);
exports.default = router;
