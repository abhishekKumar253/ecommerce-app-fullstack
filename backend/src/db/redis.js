import Redis from "ioredis";
import { config } from "./config.js";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(config.upstashUrl);
