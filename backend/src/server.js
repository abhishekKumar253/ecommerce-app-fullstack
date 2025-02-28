import express from "express";
import { config } from "./db/config.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import path from "path";
import { fileURLToPath } from "url"; 

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || config.port;

connectDB()
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../../frontend/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
      });
    }

    app.listen(port, () => {
      console.log(`⚙️ Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ Failed to connect to MongoDB", err);
  });
