import fs from "fs";
import path from "path";

// Define interfaces for Manhwa data
export interface Manhwa {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: string;
  rating: number;
}

const filePath = path.join(__dirname, "../data/manhwaData.json");

// Function to read data from JSON file
export const loadData = (): Manhwa[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as Manhwa[];
  } catch (error) {
    return [];
  }
};

// Function to save data to JSON file
export const saveData = (data: Manhwa[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};