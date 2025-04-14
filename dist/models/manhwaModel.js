"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = exports.loadData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../data/manhwaData.json");
// Function to read data from JSON file
const loadData = () => {
    try {
        const data = fs_1.default.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
};
exports.loadData = loadData;
// Function to save data to JSON file
const saveData = (data) => {
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
exports.saveData = saveData;
