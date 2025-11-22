import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './context/UserContext'

// Pages
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Dashboard from "./pages/home/Dashboard"
import InterviewPrep from "./pages/interviewprep/InterviewPrep"
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <UserProvider>
      <Router>
        {/* Toaster must be OUTSIDE Routes */}
        <Toaster
          toastOptions={{
            className: "",
            style: { fontSize: "13px" }
          }}
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
