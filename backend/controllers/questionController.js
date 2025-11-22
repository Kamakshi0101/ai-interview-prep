const Question = require('../models/question');
const Session = require('../models/session');

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    const userId = req.user.userId;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
        user: userId
      }))
    );

    // Update session to include new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json({
      success: true,
      message: 'Questions added successfully',
      questions: createdQuestions
    });
  } catch (error) {
    console.error('Add Questions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Toggle pin on question
// @route   PUT /api/questions/:id/pin
// @access  Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const question = await Question.findOne({ _id: id, user: userId });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.json({
      success: true,
      message: `Question ${question.isPinned ? 'pinned' : 'unpinned'} successfully`,
      question
    });
  } catch (error) {
    console.error('Toggle Pin Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update question note
// @route   PUT /api/questions/:id/note
// @access  Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const userId = req.user.userId;
    const question = await Question.findOne({ _id: req.params.id, user: userId });

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error('Update Question Note Error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete question note
// @route   DELETE /api/questions/:id/note
// @access  Private
exports.deleteQuestionNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const question = await Question.findOneAndDelete({ _id: id, user: userId });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Remove from session
    if (question.session) {
      await Session.findByIdAndUpdate(
        question.session,
        { $pull: { questions: question._id } }
      );
    }

    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Delete Question Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
