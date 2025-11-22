import React, { useState, useCallback, useMemo } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useUser()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Memoized email validation regex
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])

  // Optimized input handler using useCallback
  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, emailRegex])

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // Navigate to dashboard on successful login
        navigate('/dashboard')
      } else {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }, [formData, validateForm, login, navigate])

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h3 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h3>
        <p className='text-gray-600 text-sm'>Please enter your details to log in</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-5' noValidate>
        {/* Email Field */}
        <div>
          <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
            Email Address
          </label>
          <input
            id='email'
            type='email'
            value={formData.email}
            onChange={handleChange('email')}
            placeholder='john@example.com'
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
              errors.email 
                ? 'border-red-300 bg-red-50 focus:border-red-500' 
                : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
            }`}
            disabled={isLoading}
            autoComplete='email'
          />
          {errors.email && (
            <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-2'>
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              placeholder='Min 8 Characters'
              className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 outline-none ${
                errors.password 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
              }`}
              disabled={isLoading}
              autoComplete='current-password'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-orange-600 transition-colors duration-200'
              disabled={isLoading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                </svg>
              ) : (
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              {errors.password}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className='text-right'>
          <button
            type='button'
            className='text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200'
            disabled={isLoading}
          >
            Forgot Password?
          </button>
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
          className='w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {isLoading ? (
            <>
              <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Don't have an account?{' '}
          <button
            type='button'
            onClick={() => navigate('/signup')}
            className='font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200'
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login