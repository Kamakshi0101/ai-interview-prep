import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import SessionCard from '../../components/cards/SessionCard'
import SessionFormModal from '../../components/modals/SessionFormModal'
import { useSessions } from '../../hooks/useSessions'

/**
 * Dashboard Page Component
 * Main dashboard displaying all interview prep sessions
 * Includes session grid, add new session functionality, and loading states
 */
const Dashboard = () => {
  const { sessions, isLoading, fetchSessions, deleteSession } = useSessions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  // Handle new session creation
  const handleSessionCreated = (newSession) => {
    // Sessions are automatically updated in the hook
    // Just refresh to ensure we have the latest data
    fetchSessions()
  }

  // Handle session deletion
  const handleDeleteSession = async (sessionId) => {
    await deleteSession(sessionId)
  }

  return (
    <DashboardLayout>
      <div className='space-y-8'>
        {/* Header Section */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>
              My Interview Sessions
            </h1>
            <p className='text-gray-600'>
              Manage your personalized interview preparation sessions
            </p>
          </div>

          {/* Add New Session Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className='group bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 hover:scale-105'
          >
            <svg className='w-5 h-5 group-hover:rotate-90 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
            Add New Session
          </button>
        </div>

        {/* Loading State */}
        {isLoading && sessions.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='relative w-20 h-20 mb-6'>
              <div className='absolute inset-0 border-4 border-orange-200 rounded-full'></div>
              <div className='absolute inset-0 border-4 border-orange-600 rounded-full border-t-transparent animate-spin'></div>
            </div>
            <p className='text-gray-600 font-medium'>Loading your sessions...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && sessions.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='w-32 h-32 mb-6 bg-linear-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center'>
              <svg className='w-16 h-16 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              No Sessions Yet
            </h2>
            <p className='text-gray-600 mb-6 text-center max-w-md'>
              Get started by creating your first interview prep session. We'll generate personalized questions based on your role and experience.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              Create Your First Session
            </button>
          </div>
        )}

        {/* Sessions Grid */}
        {!isLoading && sessions.length > 0 && (
          <div>
            <div className='flex items-center justify-between mb-6'>
              <p className='text-gray-600 font-medium'>
                Showing {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}
              </p>
              
              {/* Quick Stats */}
              <div className='flex items-center gap-4 text-sm'>
                <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200'>
                  <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                  <span className='text-gray-700 font-medium'>
                    {sessions.filter(s => s.status === 'active').length} Active
                  </span>
                </div>
                <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200'>
                  <svg className='w-4 h-4 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <span className='text-gray-700 font-medium'>
                    {sessions.reduce((acc, s) => acc + (s.questions?.length || 0), 0)} Questions
                  </span>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sessions.map((session) => (
                <SessionCard 
                  key={session._id} 
                  session={session}
                  onDelete={handleDeleteSession}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Session Form Modal */}
      <SessionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSessionCreated={handleSessionCreated}
      />
    </DashboardLayout>
  )
}

export default Dashboard