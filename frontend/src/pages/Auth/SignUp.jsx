import React, { useState, useCallback, useMemo } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'

const SignUp = () => {
  const { register } = useUser()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePhoto: null,
    profilePhotoPreview: null
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Memoized validation patterns
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])
  const passwordRegex = useMemo(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, [])

  // Optimized input handler using useCallback
  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  // Handle profile photo change
  const handlePhotoChange = useCallback((file, preview) => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: file,
      profilePhotoPreview: preview
    }))
    
    // Clear error if exists
    if (errors.profilePhoto) {
      setErrors(prev => ({ ...prev, profilePhoto: '' }))
    }
  }, [errors])

  // Validation function with comprehensive checks
  const validateForm = useCallback(() => {
    const newErrors = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms acceptance
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, emailRegex, passwordRegex, acceptTerms])

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const result = await register(formData)
      
      if (result.success) {
        // Navigate to dashboard on successful registration
        navigate('/dashboard')
      } else {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      setErrors({ submit: 'Signup failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }, [formData, validateForm, register, navigate])

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev)
  }, [])

  // Password strength indicator
  const getPasswordStrength = useMemo(() => {
    const password = formData.password
    if (!password) return { strength: 0, label: '', color: '' }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 2) return { strength: 33, label: 'Weak', color: 'bg-red-500' }
    if (strength <= 4) return { strength: 66, label: 'Medium', color: 'bg-yellow-500' }
    return { strength: 100, label: 'Strong', color: 'bg-green-500' }
  }, [formData.password])

  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Header */}
      <div className='text-center mb-6'>
        <h3 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h3>
        <p className='text-gray-600 text-sm'>Sign up to get started with Interview Prep AI</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-4' noValidate>
        {/* Profile Photo Selector */}
        <ProfilePhotoSelector
          value={formData.profilePhotoPreview}
          onChange={handlePhotoChange}
          error={errors.profilePhoto}
          disabled={isLoading}
        />

        {/* Full Name Field */}
        <div>
          <label htmlFor='fullName' className='block text-sm font-semibold text-gray-700 mb-2'>
            Full Name
          </label>
          <input
            id='fullName'
            type='text'
            value={formData.fullName}
            onChange={handleChange('fullName')}
            placeholder='John Doe'
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
              errors.fullName 
                ? 'border-red-300 bg-red-50 focus:border-red-500' 
                : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
            }`}
            disabled={isLoading}
            autoComplete='name'
          />
          {errors.fullName && (
            <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              {errors.fullName}
            </p>
          )}
        </div>

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
              placeholder='Min 8 characters'
              className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 outline-none ${
                errors.password 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
              }`}
              disabled={isLoading}
              autoComplete='new-password'
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
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className='mt-2'>
              <div className='flex items-center justify-between text-xs mb-1'>
                <span className='text-gray-600'>Password Strength</span>
                <span className={`font-semibold ${
                  getPasswordStrength.label === 'Weak' ? 'text-red-600' :
                  getPasswordStrength.label === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {getPasswordStrength.label}
                </span>
              </div>
              <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                <div 
                  className={`h-full transition-all duration-300 ${getPasswordStrength.color}`}
                  style={{ width: `${getPasswordStrength.strength}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor='confirmPassword' className='block text-sm font-semibold text-gray-700 mb-2'>
            Confirm Password
          </label>
          <div className='relative'>
            <input
              id='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder='Re-enter password'
              className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-300 outline-none ${
                errors.confirmPassword 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : formData.confirmPassword && formData.password === formData.confirmPassword
                  ? 'border-green-300 bg-green-50 focus:border-green-500'
                  : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white'
              }`}
              disabled={isLoading}
              autoComplete='new-password'
            />
            <button
              type='button'
              onClick={toggleConfirmPasswordVisibility}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-orange-600 transition-colors duration-200'
              disabled={isLoading}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
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
            
            {/* Match indicator */}
            {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
              <div className='absolute right-12 top-1/2 -translate-y-1/2'>
                <svg className='w-5 h-5 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
              </div>
            )}
          </div>
          {errors.confirmPassword && (
            <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div>
          <label className='flex items-start gap-3 cursor-pointer group'>
            <div className='relative flex items-center'>
              <input
                type='checkbox'
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked)
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }))
                  }
                }}
                className='w-5 h-5 rounded border-2 border-gray-300 text-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer'
                disabled={isLoading}
              />
            </div>
            <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>
              I agree to the{' '}
              <a href='#' className='text-orange-600 hover:text-orange-700 font-semibold'>
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href='#' className='text-orange-600 hover:text-orange-700 font-semibold'>
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && (
            <p className='mt-1.5 text-xs text-red-600 flex items-center gap-1'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              {errors.terms}
            </p>
          )}
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
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Login Link */}
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Already have an account?{' '}
          <button
            type='button'
            onClick={() => navigate('/login')}
            className='font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200'
            disabled={isLoading}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignUp