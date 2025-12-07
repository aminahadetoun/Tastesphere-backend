import dotenv from "dotenv";

dotenv.config();

const env = {
  MONGO_URI: process.env.MONGO_URI || "",
  PORT: process.env.PORT || 3000,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "",
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "",
};

export default env;
