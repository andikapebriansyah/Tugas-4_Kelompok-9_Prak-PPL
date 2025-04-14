"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteManhwa = exports.updateManhwa = exports.addManhwa = exports.getManhwaById = exports.getAllManhwa = void 0;
const manhwaModel_1 = require("../models/manhwaModel");
// Function to filter based on query parameters
const filterManhwa = (manhwaData, query) => {
    return manhwaData.filter((m) => {
        return Object.keys(query).every((key) => {
            const typedKey = key;
            const queryValue = query[typedKey];
            if (!queryValue)
                return true;
            if (typedKey === "rating") {
                return m.rating === parseFloat(queryValue);
            }
            const manhwaValue = m[typedKey];
            return manhwaValue === null || manhwaValue === void 0 ? void 0 : manhwaValue.toString().toLowerCase().includes(queryValue.toLowerCase());
        });
    });
};
// GET All Manhwa (supports query filtering)
const getAllManhwa = (req, res) => {
    const manhwaData = (0, manhwaModel_1.loadData)();
    const filteredData = filterManhwa(manhwaData, req.query);
    res.json({ data: filteredData });
};
exports.getAllManhwa = getAllManhwa;
// GET Manhwa by ID
const getManhwaById = (req, res) => {
    const id = parseInt(req.params.id);
    const manhwaData = (0, manhwaModel_1.loadData)();
    const manhwa = manhwaData.find((m) => m.id === id);
    if (!manhwa) {
        res.status(404).json({ message: "Manhwa tidak ditemukan" });
        return;
    }
    res.json(manhwa);
};
exports.getManhwaById = getManhwaById;
// POST Add new Manhwa
const addManhwa = (req, res) => {
    const { title, author, genre, status, rating } = req.body;
    const manhwaData = (0, manhwaModel_1.loadData)();
    const newManhwa = {
        id: manhwaData.length + 1,
        title,
        author,
        genre,
        status,
        rating: parseFloat(rating),
    };
    manhwaData.push(newManhwa);
    (0, manhwaModel_1.saveData)(manhwaData);
    res.status(201).json(newManhwa);
};
exports.addManhwa = addManhwa;
// PUT Update Manhwa by ID
const updateManhwa = (req, res) => {
    const id = parseInt(req.params.id);
    let manhwaData = (0, manhwaModel_1.loadData)();
    const index = manhwaData.findIndex((m) => m.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Manhwa tidak ditemukan" });
        return;
    }
    // Update only fields that were sent
    manhwaData[index] = Object.assign(Object.assign(Object.assign({}, manhwaData[index]), req.body), { 
        // Ensure ID remains unchanged
        id: manhwaData[index].id });
    // Make sure rating is a number
    if (req.body.rating) {
        manhwaData[index].rating = parseFloat(req.body.rating);
    }
    (0, manhwaModel_1.saveData)(manhwaData);
    res.json(manhwaData[index]);
};
exports.updateManhwa = updateManhwa;
// DELETE Manhwa based on query parameters
const deleteManhwa = (req, res) => {
    let manhwaData = (0, manhwaModel_1.loadData)();
    const filteredData = filterManhwa(manhwaData, req.query);
    if (filteredData.length === 0) {
        res.status(404).json({ message: "Manhwa tidak ditemukan" });
        return;
    }
    // Remove matching data
    manhwaData = manhwaData.filter((m) => !filteredData.includes(m));
    // Update IDs to maintain sequence
    manhwaData = manhwaData.map((m, i) => (Object.assign(Object.assign({}, m), { id: i + 1 })));
    (0, manhwaModel_1.saveData)(manhwaData);
    res.json({ message: "Manhwa berhasil dihapus", data: manhwaData });
};
exports.deleteManhwa = deleteManhwa;
