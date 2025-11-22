const mongoose = require("mongoose");

const sessionQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
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
    isPinned: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true
    },
    experience: {
        type: String,
        required: [true, 'Experience level is required'],
        enum: ['entry', 'mid', 'senior', 'lead']
    },
    topicsToFocus: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    skills: [{
        type: String,
        trim: true
    }],
    focusAreas: [{
        type: String,
        trim: true
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'archived'],
        default: 'active'
    },
    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

// Index for faster queries
sessionSchema.index({ user: 1, createdAt: -1 });

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;