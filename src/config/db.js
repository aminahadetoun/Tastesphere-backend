const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    const mongoUri = env.MONGO_URI;
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    console.log("Attempting to continue without database connection...");
    mongoose.disconnect();
    // Don't exit the process, let the server start without DB
    process.exit(1);
  }
};

module.exports = connectDB;
