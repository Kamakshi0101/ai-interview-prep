import React, { useState, useCallback } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import API_PATHS from '../../utils/apiPath'
import toast from 'react-hot-toast'

/**
 * Session Form Modal Component
 * Handles new session creation with AI-powered question generation
 * Validates user input and generates interview questions based on role, experience, and topics
 */
const SessionFormModal = ({ isOpen, onClose, onSessionCreated }) => {
  const [formData, setFormData] = useState({
    role: '',
    experience: 'mid',
    topicsToFocus: '',
    numberOfQuestions: 10,
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Handle input changes
  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {}

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    } else if (formData.role.trim().length < 2) {
      newErrors.role = 'Role must be at least 2 characters'
    }

    if (!formData.topicsToFocus.trim()) {
      newErrors.topicsToFocus = 'Topics to focus are required'
    } else if (formData.topicsToFocus.trim().length < 5) {
      newErrors.topicsToFocus = 'Topics must be at least 5 characters'
    }

    if (formData.numberOfQuestions < 5 || formData.numberOfQuestions > 50) {
      newErrors.numberOfQuestions = 'Number of questions must be between 5 and 50'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Generate questions and create session
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsGenerating(true)
    
    try {
      // Step 1: Generate questions using AI
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: formData.role,
        experience: formData.experience,
        topicsToFocus: formData.topicsToFocus,
        numberOfQuestions: formData.numberOfQuestions
      })

      if (!aiResponse.data.success || !aiResponse.data.questions) {
        throw new Error('Failed to generate questions')
      }

      const generatedQuestions = aiResponse.data.questions

      setIsGenerating(false)
      setIsCreating(true)

      // Step 2: Create session with generated questions
      const sessionResponse = await axiosInstance.post(API_PATHS.SESSIONS.CREATE, {
        role: formData.role,
        experience: formData.experience,
        topicsToFocus: formData.topicsToFocus,
        description: formData.description,
        questions: generatedQuestions
      })

      if (sessionResponse.data.success) {
        toast.success('Session created successfully!')
        
        // Reset form
        setFormData({
          role: '',
          experience: 'mid',
          topicsToFocus: '',
          numberOfQuestions: 10,
          description: ''
        })
        
        // Callback to parent component
        onSessionCreated(sessionResponse.data.session)
        
        // Close modal
        onClose()
      }
    } catch (error) {
      console.error('Session creation error:', error)
      const errorMessage = error.response?.data?.message || 'Failed to create session'
      toast.error(errorMessage)
      setErrors({ submit: errorMessage })
    } finally {
      setIsGenerating(false)
      setIsCreating(false)
    }
  }, [formData, validateForm, onClose, onSessionCreated])

  // Close modal and reset form
  const handleClose = useCallback(() => {
    if (!isGenerating && !isCreating) {
      setFormData({
        role: '',
        experience: 'mid',
        topicsToFocus: '',
        numberOfQuestions: 10,
        description: ''
      })
      setErrors({})
      onClose()
    }
  }, [isGenerating, isCreating, onClose])

  if (!isOpen) return null

  const isLoading = isGenerating || isCreating

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn'
      onClick={handleClose}
    >
      <div 
        className='relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-scaleIn'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='relative px-8 pt-8 pb-6 bg-gradient-to-r from-orange-500 to-amber-500'>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:rotate-90 disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label='Close modal'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          
          <h2 className='text-3xl font-bold text-white pr-12'>
            Create New Session
          </h2>
          <p className='text-white/90 mt-2'>
            Generate personalized interview questions with AI
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className='p-8 space-y-5 max-h-[calc(100vh-300px)] overflow-y-auto'>
          {/* Role Field */}
          <div>
            <label htmlFor='role' className='block text-sm font-semibold text-gray-700 mb-2'>
              Job Role <span className='text-red-500'>*</span>
            </label>
            <input
              id='role'
              type='text'
              value={formData.role}
              onChange={handleChange('role')}
              placeholder='e.g., Frontend Developer, Backend Engineer'
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                errors.role 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
              }`}
              disabled={isLoading}
            />
            {errors.role && (
              <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                </svg>
                {errors.role}
              </p>
            )}
          </div>

          {/* Experience Level Field */}
          <div>
            <label htmlFor='experience' className='block text-sm font-semibold text-gray-700 mb-2'>
              Experience Level <span className='text-red-500'>*</span>
            </label>
            <select
              id='experience'
              value={formData.experience}
              onChange={handleChange('experience')}
              className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white transition-all duration-300 outline-none'
              disabled={isLoading}
            >
              <option value='entry'>Entry Level (0-2 years)</option>
              <option value='mid'>Mid Level (2-5 years)</option>
              <option value='senior'>Senior Level (5-10 years)</option>
              <option value='lead'>Lead/Architect (10+ years)</option>
            </select>
          </div>

          {/* Topics to Focus Field */}
          <div>
            <label htmlFor='topicsToFocus' className='block text-sm font-semibold text-gray-700 mb-2'>
              Topics to Focus <span className='text-red-500'>*</span>
            </label>
            <textarea
              id='topicsToFocus'
              value={formData.topicsToFocus}
              onChange={handleChange('topicsToFocus')}
              placeholder='e.g., React.js, DOM manipulation, CSS Flexbox, JavaScript ES6'
              rows='3'
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none resize-none ${
                errors.topicsToFocus 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
              }`}
              disabled={isLoading}
            />
            {errors.topicsToFocus && (
              <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                </svg>
                {errors.topicsToFocus}
              </p>
            )}
          </div>

          {/* Number of Questions Field */}
          <div>
            <label htmlFor='numberOfQuestions' className='block text-sm font-semibold text-gray-700 mb-2'>
              Number of Questions <span className='text-red-500'>*</span>
            </label>
            <input
              id='numberOfQuestions'
              type='number'
              min='5'
              max='50'
              value={formData.numberOfQuestions}
              onChange={handleChange('numberOfQuestions')}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                errors.numberOfQuestions 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
              }`}
              disabled={isLoading}
            />
            <p className='mt-1.5 text-xs text-gray-500'>
              Choose between 5 and 50 questions (recommended: 10-20)
            </p>
            {errors.numberOfQuestions && (
              <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                </svg>
                {errors.numberOfQuestions}
              </p>
            )}
          </div>

          {/* Description Field (Optional) */}
          <div>
            <label htmlFor='description' className='block text-sm font-semibold text-gray-700 mb-2'>
              Description <span className='text-gray-400 font-normal'>(Optional)</span>
            </label>
            <textarea
              id='description'
              value={formData.description}
              onChange={handleChange('description')}
              placeholder='Add any additional notes or context...'
              rows='2'
              className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white transition-all duration-300 outline-none resize-none'
              disabled={isLoading}
            />
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className='p-3 bg-red-50 border border-red-200 rounded-xl'>
              <p className='text-sm text-red-600 text-center flex items-center justify-center gap-2'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                </svg>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {isGenerating ? (
              <>
                <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Generating Questions...
              </>
            ) : isCreating ? (
              <>
                <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Creating Session...
              </>
            ) : (
              <>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
                Generate & Create Session
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SessionFormModal
