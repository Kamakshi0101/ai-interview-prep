#  AI Interview Prep Platform

A full-stack MERN application that helps users prepare for technical interviews using AI-powered question generation and concept explanations. The platform generates custom interview questions based on job roles, experience levels, and focus areas, providing an interactive learning experience with features like pinning important questions, adding personal notes, and generating AI explanations.

##  Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Screenshots](#-screenshots)

##  Features

###  Authentication & User Management
- **Secure Authentication**: JWT-based authentication with 7-day token expiration
- **Profile Management**: Upload and update profile photos via Cloudinary
- **Password Security**: bcrypt password hashing for secure storage

###  Interview Session Management
- **Create Sessions**: Generate custom interview sessions based on:
  - Job role (e.g., Full Stack Developer, DevOps Engineer)
  - Experience level (Entry, Mid, Senior, Lead)
  - Number of questions (5-50)
  - Specific topics to focus on
  - Optional session description
- **AI Question Generation**: Powered by Groq AI (llama-3.1-8b-instant model)
- **Session Dashboard**: View all sessions with statistics and quick access
- **Delete Sessions**: Remove unwanted sessions with confirmation

###  Interactive Question Review
- **Expandable Q&A Cards**: Show/hide answers with smooth animations
- **Pin to Top**: Keep important questions at the top of your list
- **Personal Notes**: Add and edit notes for each question
- **AI Concept Explanations**: Generate detailed explanations using AI
- **Load More Pagination**: View questions in chunks of 10
- **Difficulty Badges**: Visual indicators for question difficulty levels
- **Tag System**: Categorize questions by topics

###  User Interface
- **Modern Design**: Clean, responsive UI built with Tailwind CSS
- **Animated Backgrounds**: Gradient blob animations for visual appeal
- **Toast Notifications**: Real-time feedback using react-hot-toast
- **Loading States**: Skeleton loaders and spinners for better UX
- **Empty States**: Helpful prompts when no data is available
- **Markdown Support**: Rich text rendering with syntax highlighting

##  Tech Stack

### Frontend
- **React 19.2.0**: Latest React with modern hooks and concurrent features
- **Vite 7.2.2**: Lightning-fast build tool and dev server
- **React Router 7.9.6**: Client-side routing with search params
- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **Axios 1.13.2**: HTTP client with interceptors
- **react-markdown 10.1.0**: Markdown rendering with GitHub-flavored support
- **react-syntax-highlighter 16.1.0**: Code syntax highlighting
- **react-hot-toast 2.6.0**: Toast notifications
- **Framer Motion 12.23.24**: Animation library

### Backend
- **Node.js**: JavaScript runtime
- **Express 5.1.0**: Web application framework
- **MongoDB 8.20.0**: NoSQL database with Mongoose ODM
- **JWT**: Token-based authentication
- **bcryptjs 3.0.3**: Password hashing
- **Groq SDK 0.36.0**: AI model integration (llama-3.1-8b-instant)
- **Cloudinary 2.8.0**: Image upload and management
- **Multer 2.0.2**: File upload middleware
- **CORS**: Cross-origin resource sharing

##  Architecture

### Design Pattern
The application follows a **clean architecture** with clear separation of concerns:

- **Custom Hooks**: Business logic separated from UI components
  - `useSessions`: Session CRUD operations
  - `useInterviewPrep`: Question management and AI operations
- **Context API**: Global state management for authentication
- **Component Structure**: Reusable, focused components
  - Layouts: DashboardLayout
  - Cards: SessionCard, QuestionCard, ConceptExplanation
  - Modals: SessionFormModal, ProfilePhotoModal

### Backend Structure
```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication & profile
│   ├── sessionController.js  # Session CRUD
│   ├── questionController.js # Question operations
│   └── aiController.js       # AI integrations
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── uploadMiddleware.js   # File upload handling
├── models/
│   ├── User.js              # User schema
│   ├── Session.js           # Session schema
│   └── Question.js          # Question schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── sessionRoutes.js     # Session endpoints
│   ├── questionRoutes.js    # Question endpoints
│   └── aiRoutes.js          # AI endpoints
└── server.js                # Entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── SessionCard.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   └── ConceptExplanation.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   └── modals/
│   │       ├── SessionFormModal.jsx
│   │       └── ProfilePhotoModal.jsx
│   ├── context/
│   │   └── UserContext.jsx
│   ├── hooks/
│   │   ├── useSessions.js
│   │   └── useInterviewPrep.js
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── home/
│   │   │   └── Dashboard.jsx
│   │   ├── interviewprep/
│   │   │   └── InterviewPrep.jsx
│   │   └── LandingPage.jsx
│   ├── utils/
│   │   ├── apiPath.js
│   │   ├── axiosInstance.js
│   │   ├── data.js
│   │   ├── helper.js
│   │   └── uploadImage.js
│   ├── App.jsx
│   └── main.jsx
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Groq API key
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up Environment Variables** (see section below)

5. **Start the Backend Server**
```bash
cd backend
npm run dev
# Server runs on http://localhost:8000
```

6. **Start the Frontend Development Server**
```bash
cd frontend
npm run dev
# Application runs on http://localhost:5173
```

## 🔑 Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interviewprep

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Groq AI Configuration
GROQ_API_KEY=gsk_your_groq_api_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend
Frontend uses Vite's proxy configuration. Update `vite.config.js` if backend URL changes:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
```

## 📡 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user with optional profile photo
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "profilePhoto": "file" // Optional multipart file
}
```

#### POST /api/auth/login
Login with email and password
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### PUT /api/auth/upload-image (Protected)
Update profile photo
```
Multipart form-data with "image" field
```

### Session Endpoints

#### POST /api/sessions/create (Protected)
Create a new interview session
```json
{
  "role": "Full Stack Developer",
  "experience": "mid",
  "topicsToFocus": "React, Node.js, MongoDB",
  "numberOfQuestions": 20,
  "description": "Focusing on MERN stack",
  "questions": [
    {
      "question": "What is React?",
      "answer": "A JavaScript library...",
      "concept": "Frontend Framework",
      "difficulty": "easy",
      "tags": ["React", "Frontend"]
    }
  ]
}
```

#### GET /api/sessions/my-sessions (Protected)
Get all sessions for authenticated user

#### GET /api/sessions/:id (Protected)
Get session details with populated questions

#### DELETE /api/sessions/:id (Protected)
Delete a session and all associated questions

### Question Endpoints

#### POST /api/questions/add (Protected)
Add a question to a session
```json
{
  "sessionId": "session_id",
  "question": "Explain closures",
  "answer": "Closures are...",
  "concept": "JavaScript Fundamentals",
  "difficulty": "medium",
  "tags": ["JavaScript", "Functions"]
}
```

#### PUT /api/questions/:id/pin (Protected)
Toggle pin status for a question

#### PUT /api/questions/:id/note (Protected)
Update personal note for a question
```json
{
  "note": "Remember to review this concept"
}
```

### AI Endpoints

#### POST /api/ai/generate-questions (Protected)
Generate interview questions using AI
```json
{
  "role": "DevOps Engineer",
  "experience": "senior",
  "topicsToFocus": "Docker, Kubernetes, CI/CD",
  "numberOfQuestions": 15
}
```

#### POST /api/ai/generate-explanation (Protected)
Generate concept explanation for a question
```json
{
  "question": "What is Docker?",
  "questionId": "question_id"
}
```

## 📁 Project Structure

### Database Models

#### User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  profilePhoto: String (Cloudinary URL),
  lastLogin: Date
}
```

#### Session Model
```javascript
{
  user: ObjectId (ref: User),
  role: String (required),
  experience: String (enum: entry/mid/senior/lead),
  topicsToFocus: String,
  numberOfQuestions: Number,
  description: String,
  questions: [ObjectId] (ref: Question),
  status: String (default: 'active'),
  score: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Question Model
```javascript
{
  user: ObjectId (ref: User),
  session: ObjectId (ref: Session),
  question: String (required),
  answer: String (required),
  concept: String,
  difficulty: String (enum: easy/medium/hard),
  tags: [String],
  note: String,
  isPinned: Boolean (default: false),
  conceptExplanation: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 📖 Usage Guide

### Creating Your First Session

1. **Login/Register**: Navigate to the authentication page
2. **Dashboard**: Click "Add New Session" button
3. **Fill Session Details**:
   - Enter job role (e.g., "React Developer")
   - Select experience level
   - Add focus topics (e.g., "Hooks, Context API, Performance")
   - Choose number of questions (5-50)
4. **Generate Questions**: AI will generate relevant questions
5. **Create Session**: Review and confirm to create the session

### Reviewing Questions

1. **Open Session**: Click on any session card in dashboard
2. **Expand Answers**: Click "Show Answer" to view detailed answers
3. **Pin Important Questions**: Click pin icon to move questions to top
4. **Add Personal Notes**: Click "Add personal note" to save your thoughts
5. **Get AI Explanations**: Click "Learn More" for detailed concept explanations
6. **Load More**: Click "Load More Questions" to view additional questions

### Managing Sessions

- **View Statistics**: See total sessions and questions on dashboard
- **Quick Access**: Click session cards to jump to review page
- **Delete Sessions**: Use delete button with confirmation dialog
- **Profile Management**: Click profile photo to update your picture

## 🎨 Screenshots

### Landing Page
Clean, modern landing page with call-to-action

### Authentication
- Login page with email/password
- Registration with optional profile photo upload

### Dashboard
- Session grid with cards showing role, experience, topics
- Quick statistics (active sessions, total questions)
- Add new session button

### Interview Prep Page
- Session header with role, experience, question count
- Focus areas display
- Question cards with:
  - Expandable answers
  - Pin functionality
  - Personal notes
  - AI explanations
  - Difficulty and tag badges
- Load more pagination
- Delete session option

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Protected Routes**: Middleware verification on all sensitive endpoints
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Size limits and type validation
- **Environment Variables**: Sensitive data kept in .env files

## 🚦 Rate Limiting

AI explanation generation has a 5-second cooldown to prevent API abuse and manage costs.

## 📝 License

This project is for educational purposes.

## 👥 Contributors

Built with ❤️ using modern web technologies

## 🐛 Known Issues & Future Enhancements

### Planned Features
- Search and filter questions
- Export sessions to PDF
- Practice mode with timed responses
- Analytics dashboard
- Question difficulty assessment
- Collaborative sessions
- Mobile app version

### Known Issues
- None reported

## 📞 Support

For issues and feature requests, please use the GitHub issues page.

---

**Happy Interview Prep! 🎉**
