import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Session Card Component
 * Displays individual interview prep session information
 * Shows role, experience, topics, question count, and last updated date
 */
const SessionCard = ({ session, onDelete }) => {
  const navigate = useNavigate()

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()
    
    // Add ordinal suffix (1st, 2nd, 3rd, etc.)
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th'
      switch (day % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }
    }
    
    return `${day}${suffix(day)} ${month} ${year}`
  }

  // Get experience badge color
  const getExperienceColor = (exp) => {
    const colors = {
      'entry': 'bg-green-100 text-green-700',
      'mid': 'bg-blue-100 text-blue-700',
      'senior': 'bg-purple-100 text-purple-700',
      'lead': 'bg-red-100 text-red-700'
    }
    return colors[exp] || 'bg-gray-100 text-gray-700'
  }

  // Generate session ID display (first 4 chars of _id)
  const getSessionId = (id) => {
    return id ? id.substring(0, 4).toUpperCase() : 'N/A'
  }

  // Handle card click to navigate to interview prep page
  const handleCardClick = () => {
    navigate(`/interview-prep?session=${session._id}`)
  }

  // Handle delete with confirmation
  const handleDelete = (e) => {
    e.stopPropagation() // Prevent card click navigation
    
    if (window.confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      onDelete(session._id)
    }
  }

  return (
    <div 
      onClick={handleCardClick}
      className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-300 cursor-pointer group hover:-translate-y-1'
    >
      {/* Header with Role and Actions */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-1'>
          <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200'>
            {session.role}
          </h3>
          <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
            {session.topicsToFocus}
          </p>
        </div>
        
        {/* Status Icon */}
        <div className='bg-linear-to-r from-orange-500 to-orange-600 p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-200'>
          <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        </div>
      </div>

      {/* Metadata Tags */}
      <div className='flex flex-wrap gap-2 mb-5'>
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getExperienceColor(session.experience)}`}>
          Experience: {session.experience?.charAt(0).toUpperCase() + session.experience?.slice(1)}
        </span>
        <span className='bg-linear-to-r from-gray-900 to-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm'>
          {session.questions?.length || 0} Q&A
        </span>
        <span className='bg-linear-to-r from-gray-900 to-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm'>
          ID: {getSessionId(session._id)}
        </span>
      </div>

      {/* Footer with Date and Actions */}
      <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
        <div className='flex items-center gap-2 text-xs text-gray-500'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          <span className='font-medium'>
            Last Updated: {formatDate(session.updatedAt)}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100'
          title='Delete session'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
          </svg>
        </button>
      </div>

      {/* Hover Effect Overlay */}
      <div className='absolute inset-0 bg-linear-to-r from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none'></div>
    </div>
  )
}

export default SessionCard
