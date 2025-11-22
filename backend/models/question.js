const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session"
    },
    question: {
        type: String,
        required: [true, 'Question text is required'],
        trim: true
    },
    answer: {
        type: String,
        default: ''
    },
    concept: {
        type: String,
        default: ''
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    tags: [{
        type: String,
        trim: true
    }],
    note: {
        type: String,
        default: ''
    },
    isPinned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Index for faster queries
questionSchema.index({ user: 1, createdAt: -1 });
questionSchema.index({ session: 1 });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;