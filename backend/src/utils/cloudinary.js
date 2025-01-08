import { v2 as cloudinary } from "cloudinary";
import { config } from "../db/config.js";

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryAPIKey,
  api_secret: config.cloudinaryAPISecret,
});

export default cloudinary;
