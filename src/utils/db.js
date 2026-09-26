const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

// Fallback to Google DNS to resolve MongoDB Atlas SRV records reliably on Windows/local networks
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // ignore if restricted
}

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    console.error("Please make sure MongoDB is running locally or provide a valid MongoDB Atlas URI in your .env file.");
    process.exit(1);
  }
};

module.exports = connectDB;
