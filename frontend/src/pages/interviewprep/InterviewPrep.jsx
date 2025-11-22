import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import QuestionCard from '../../components/cards/QuestionCard'
import useInterviewPrep from '../../hooks/useInterviewPrep'
import { useSessions } from '../../hooks/useSessions'
import toast from 'react-hot-toast'

const InterviewPrep = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session')
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Get session data and operations
  const {
    session,
    displayedQuestions,
    isLoading,
    error,
    generatingExplanations,
    togglePinQuestion,
    updateQuestionNote,
    generateExplanation,
    loadMore,
    hasMore
  } = useInterviewPrep(sessionId)

  // Get delete session function
  const { deleteSession } = useSessions()

  // Handle delete session
  const handleDeleteSession = async () => {
    const result = await deleteSession(sessionId)
    if (result.success) {
      toast.success('Session deleted successfully')
      navigate('/dashboard')
    }
    setShowDeleteConfirm(false)
  }

  // Render loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <div className='w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-gray-600 text-lg'>Loading interview session...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Render error state
  if (error || !session) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center max-w-md'>
            <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-10 h-10 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Session Not Found</h2>
            <p className='text-gray-600 mb-6'>{error || 'Unable to load session details'}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className='px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all duration-200'
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Session Header */}
        <div className='mb-8'>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex-1'>
              <button
                onClick={() => navigate('/dashboard')}
                className='flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-4 transition-colors duration-200'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
                Back to Dashboard
              </button>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>{session.role}</h1>
              <div className='flex flex-wrap gap-3 items-center'>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  session.experience === 'entry' ? 'bg-green-100 text-green-700' :
                  session.experience === 'mid' ? 'bg-blue-100 text-blue-700' :
                  session.experience === 'senior' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {session.experience.charAt(0).toUpperCase() + session.experience.slice(1)} Level
                </span>
                <span className='flex items-center gap-1 text-gray-600'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  {session.questions?.length || 0} Questions
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
              </svg>
              Delete Session
            </button>
          </div>

          {/* Topics to Focus */}
          {session.topicsToFocus && (
            <div className='p-4 bg-linear-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 rounded-lg'>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-orange-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5'>
                  <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                </div>
                <div className='flex-1'>
                  <h3 className='text-sm font-bold text-gray-800 mb-1'>Focus Areas</h3>
                  <p className='text-sm text-gray-700'>{session.topicsToFocus}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className='space-y-6'>
          {displayedQuestions.length === 0 ? (
            <div className='text-center py-12'>
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>No Questions Yet</h3>
              <p className='text-gray-600'>Questions will appear here once they are generated</p>
            </div>
          ) : (
            <>
              {displayedQuestions.map((question) => (
                <QuestionCard
                  key={question._id}
                  question={question}
                  onPin={togglePinQuestion}
                  onGenerateExplanation={generateExplanation}
                  onUpdateNote={updateQuestionNote}
                  isGenerating={generatingExplanations[question._id]}
                />
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className='flex justify-center pt-4'>
                  <button
                    onClick={loadMore}
                    className='px-8 py-3 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl'
                  >
                    Load More Questions
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
                <svg className='w-6 h-6 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900'>Delete Session?</h3>
            </div>
            <p className='text-gray-600 mb-6'>
              Are you sure you want to delete this session? This will permanently delete all {session.questions?.length || 0} questions and cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={handleDeleteSession}
                className='flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200'
              >
                Delete Session
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className='flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default InterviewPrep