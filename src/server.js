import dotenv from "dotenv";
import app from "./app.js";
import config from "./config/env.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

dotenv.config();

async function startServer() {
  await connectDB();

  app.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`);
  });
}

startServer();
