import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN,
  upstashUrl: process.env.UPSTASH_REDIS_URL,
  accesstokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshtokenSecret: process.env.REFRESH_TOKEN_SECRET,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
