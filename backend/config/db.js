const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            retryWrites: true,
            w: "majority",
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        })
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        console.error("MONGO_URI:", process.env.MONGO_URI ? "Set (hidden)" : "Not set in .env");
        process.exit(1);
    }
}

module.exports = connectDB;