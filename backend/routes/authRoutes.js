const express = require("express");
const { registerUser, loginUser, getUserProfile, updateProfilePhoto } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload, uploadToCloudinary } = require("../middleware/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post('/register', upload.single('profilePhoto'), registerUser);  // Register User with optional profile photo
router.post('/login', loginUser);        // Login User
router.get('/profile', protect, getUserProfile);  // Get User Profile

// Image upload endpoint (Protected - requires authentication)
router.post("/upload-image", protect, upload.single("image"), updateProfilePhoto);

module.exports = router;
