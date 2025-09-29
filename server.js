import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

 app.use(cors({
       origin: [
         'http://localhost:5173',  // Vite dev
         'https://vercel.com/malikmouzams-projects/frontend-full-stack'  // Replace with your actual Vercel URL (e.g., malikmouzam-frontend.vercel.app)
       ],
       credentials: true,  // For cookies/JWT if needed
       methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
       allowedHeaders: ['Content-Type', 'Authorization']
     }));

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
