import { Request, Response } from "express";
import { loadData, saveData, Manhwa } from "../models/manhwaModel";

// Define the possible query parameters
interface ManhwaQuery {
  id?: string;
  title?: string;
  author?: string;
  genre?: string;
  status?: string;
  rating?: string;
}

// Function to filter based on query parameters
const filterManhwa = (manhwaData: Manhwa[], query: ManhwaQuery): Manhwa[] => {
  return manhwaData.filter((m) => {
    return Object.keys(query).every((key) => {
      const typedKey = key as keyof ManhwaQuery;
      const queryValue = query[typedKey];
      
      if (!queryValue) return true;
      
      if (typedKey === "rating") {
        return m.rating === parseFloat(queryValue);
      }
      
      const manhwaValue = m[typedKey as keyof Manhwa];
      return manhwaValue?.toString().toLowerCase().includes(queryValue.toLowerCase());
    });
  });
};

// GET All Manhwa (supports query filtering)
export const getAllManhwa = (req: Request, res: Response): void => {
  const manhwaData = loadData();
  const filteredData = filterManhwa(manhwaData, req.query as ManhwaQuery);
  res.json({ data: filteredData });
};

// GET Manhwa by ID
export const getManhwaById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const manhwaData = loadData();
  const manhwa = manhwaData.find((m) => m.id === id);
  
  if (!manhwa) {
    res.status(404).json({ message: "Manhwa tidak ditemukan" });
    return;
  }
  
  res.json(manhwa);
};

// POST Add new Manhwa
export const addManhwa = (req: Request, res: Response): void => {
  const { title, author, genre, status, rating } = req.body;
  const manhwaData = loadData();

  const newManhwa: Manhwa = {
    id: manhwaData.length + 1,
    title,
    author,
    genre,
    status,
    rating: parseFloat(rating),
  };

  manhwaData.push(newManhwa);
  saveData(manhwaData);
  res.status(201).json(newManhwa);
};

// PUT Update Manhwa by ID
export const updateManhwa = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  let manhwaData = loadData();
  const index = manhwaData.findIndex((m) => m.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Manhwa tidak ditemukan" });
    return;
  }

  // Update only fields that were sent
  manhwaData[index] = {
    ...manhwaData[index],
    ...req.body,
    // Ensure ID remains unchanged
    id: manhwaData[index].id
  };

  // Make sure rating is a number
  if (req.body.rating) {
    manhwaData[index].rating = parseFloat(req.body.rating);
  }

  saveData(manhwaData);
  res.json(manhwaData[index]);
};

// DELETE Manhwa based on query parameters
export const deleteManhwa = (req: Request, res: Response): void => {
  let manhwaData = loadData();
  const filteredData = filterManhwa(manhwaData, req.query as ManhwaQuery);

  if (filteredData.length === 0) {
    res.status(404).json({ message: "Manhwa tidak ditemukan" });
    return;
  }

  // Remove matching data
  manhwaData = manhwaData.filter((m) => !filteredData.includes(m));

  // Update IDs to maintain sequence
  manhwaData = manhwaData.map((m, i) => ({ ...m, id: i + 1 }));

  saveData(manhwaData);
  res.json({ message: "Manhwa berhasil dihapus", data: manhwaData });
};