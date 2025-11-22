import React, { useEffect } from 'react'

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn'
      onClick={onClose}
    >
      <div 
        className='relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-scaleIn'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {!hideHeader && (
          <div className='relative px-8 pt-8 pb-6 bg-linear-to-r from-orange-500 to-amber-500'>
            <button
              onClick={onClose}
              className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:rotate-90'
              aria-label='Close modal'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
            {title && (
              <h2 className='text-3xl font-bold text-white pr-12'>
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Close button for headerless modal */}
        {hideHeader && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:rotate-90'
            aria-label='Close modal'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}

        {/* Modal Body (Scrollable) */}
        <div className='max-h-[calc(100vh-200px)] overflow-y-auto'>
          <div className='p-8'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal