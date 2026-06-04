import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";
import { connectDB, disconnectDB } from "./config/db.js";
import cors from "cors";
import path from "path";

// dotenv.config(); 
// only needed if you want to use .env file for local development. I have passed environment variables directly in docker-compose.yml for simplicity. You can uncomment this line if you want to use .env file locally.

const PORT = process.env.PORT || 5500;

const app = express();

// app.get("/", (req, res) => {
//     res.send("Server is ready and working fine");
// });

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api/todos", todoRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, async () => {
    await connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

process.on("SIGINT", disconnectDB); //Ctrl+C
process.on("SIGTERM", disconnectDB); //Docker stop