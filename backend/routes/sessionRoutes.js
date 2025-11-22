const express = require("express");
const { 
  createSession, 
  getMySessions, 
  getSessionById, 
  deleteSession 
} = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Session Routes
router.post('/create', protect, createSession);           // Create Session
router.get('/my-sessions', protect, getMySessions);       // Get All Sessions
router.get('/:id', protect, getSessionById);              // Get Session by ID
router.delete('/:id', protect, deleteSession);            // Delete Session

module.exports = router;
