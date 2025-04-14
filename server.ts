import express, { Request, Response } from "express";
import manhwaRoutes from "./routes/manhwaRoutes";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "data", "manhwaData.json");

// Pastikan file JSON ada saat server pertama kali dijalankan
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
}

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/manhwa", manhwaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Manhwa API! Use /manhwa to get data.");
});
