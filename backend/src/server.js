import { config } from "./db/config.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`⚙️ Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log("❌ Failed to connect to MongoDB", err);
  });
