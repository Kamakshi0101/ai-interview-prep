require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");
const {generateInterviewQuestions, generateConceptExplanation} = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// DELETE the app.options line - it's not needed and breaks Express 5

// Connect to database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);


// Log registered routes for debugging
console.log('Registered routes:');
console.log('- POST /api/auth/register');
console.log('- POST /api/auth/login');
console.log('- GET /api/auth/profile');
console.log('- POST /api/sessions/create');
console.log('- GET /api/sessions/my-sessions');
console.log('- GET /api/sessions/:id');
console.log('- DELETE /api/sessions/:id');
console.log('- POST /api/questions/add');
console.log('- PUT /api/questions/:id/pin');
console.log('- PUT /api/questions/:id/note');
console.log('- POST /api/ai/generate-questions');
console.log('- POST /api/ai/generate-explanation');

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});