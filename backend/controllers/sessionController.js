const Session = require('../models/session');
const Question = require('../models/question');

// @desc    Create a new session and linked questions
// @route   POST /api/sessions/create
// @access  Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user.userId;

    if (!role || !experience || !topicsToFocus) {
      return res.status(400).json({
        success: false,
        message: 'Role, experience, and topics to focus are required'
      });
    }

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description
    });

    // Create all questions for this session
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          user: userId,
          session: session._id,
          question: q.question,
          answer: q.answer
        });
        return question._id;
      })
    );

    // Update session with question IDs
    session.questions = questionDocs;
    await session.save();

    res.status(201).json({
      success: true,
      message: 'Session created successfully',
      session
    });
  } catch (error) {
    console.error('Create Session Error:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all sessions for the logged-in user
// @route   GET /api/sessions/my-sessions
// @access  Private
exports.getMySessions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessions = await Session.find({ user: userId })
      .populate('questions')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    console.error('Get Sessions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get a session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const session = await Session.findOne({ _id: id, user: userId })
      .populate('questions');

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    console.error('Get Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete a session and its questions
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const session = await Session.findOne({ _id: id, user: userId });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Delete all questions linked to this session
    await Question.deleteMany({ session: id });

    // Delete the session
    await Session.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Session and its questions deleted successfully'
    });
  } catch (error) {
    console.error('Delete Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
