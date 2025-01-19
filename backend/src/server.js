import { config } from "./db/config.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`⚙️ Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log("❌ Failed to connect to MongoDB", err);
  });
