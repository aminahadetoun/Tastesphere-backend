const dotenv = require("dotenv");
const app = require("./app");
const PORT = require("./config/env").PORT;
const connectDB = require("./config/db");
const logger = require("./config/logger");

dotenv.config();

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

startServer();
