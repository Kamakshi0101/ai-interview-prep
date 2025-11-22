import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import ProfilePhotoModal from '../modals/ProfilePhotoModal'

/**
 * Dashboard Layout Component
 * Provides consistent layout with header and main content area
 * Includes user profile display and logout functionality
 */
const DashboardLayout = ({ children }) => {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Get initials from full name
  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50'>
      {/* Header */}
      <header className='bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo/Brand */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg'>
                  <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                  </svg>
                </div>
                <h1 className='text-xl font-bold text-gray-900 hidden sm:block'>
                  Interview Prep AI
                </h1>
              </div>
            </div>

            {/* User Profile Section */}
            <div className='flex items-center gap-4'>
              {/* User Info */}
              <div className='flex items-center gap-3 bg-linear-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-full border border-orange-200'>
                {/* Profile Picture or Initials */}
                <button
                  onClick={() => {
                    console.log('Profile photo clicked')
                    setIsPhotoModalOpen(true)
                  }}
                  type='button'
                  className='relative group'
                  title='Update profile photo'
                >
                  {user?.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt={user.fullName}
                      className='w-9 h-9 rounded-full object-cover ring-2 ring-orange-400 group-hover:ring-orange-600 transition-all duration-200'
                    />
                  ) : (
                    <div className='w-9 h-9 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-200'>
                      {getInitials(user?.fullName)}
                    </div>
                  )}
                  {/* Camera Icon Overlay on Hover */}
                  <div className='absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none'>
                    <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                </button>
                
                {/* User Details */}
                <div className='hidden md:block'>
                  <div className='text-sm font-bold text-gray-900'>
                    {user?.fullName || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className='text-xs text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200'
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Mobile Logout Button */}
              <button
                onClick={handleLogout}
                className='md:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200'
                title='Logout'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>

      {/* Animated Background Elements */}
      <div className='fixed inset-0 pointer-events-none -z-10 overflow-hidden'>
        <div className='absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute bottom-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      {/* Profile Photo Modal */}
      <ProfilePhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />
    </div>
  )
}

export default DashboardLayout
