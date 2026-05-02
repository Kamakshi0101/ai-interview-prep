const mongoose = require('mongoose');

const connectDB = async () => {
    // During tests we avoid making a real DB connection to prevent open handles.
    if (process.env.NODE_ENV === 'test') {
        return Promise.resolve();
    }

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
        if (process.env.NODE_ENV !== 'test') process.exit(1);
    }
}

// helper to close the mongoose connection when needed
connectDB.close = async () => {
    try {
        if (mongoose.connection && mongoose.connection.readyState) {
            await mongoose.connection.close();
        }
    } catch (err) {
        // ignore
    }
}

module.exports = connectDB;