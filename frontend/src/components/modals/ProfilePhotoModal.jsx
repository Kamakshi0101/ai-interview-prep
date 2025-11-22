import React, { useState, useCallback, useRef } from 'react'
import { useUser } from '../../context/UserContext'
import axiosInstance from '../../utils/axiosInstance'
import API_PATHS from '../../utils/apiPath'
import toast from 'react-hot-toast'

/**
 * Profile Photo Update Modal
 * Allows users to upload and update their profile picture
 */
const ProfilePhotoModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useUser()
  const [preview, setPreview] = useState(user?.profilePhoto || null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  // Handle file selection
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [])

  // Process and validate file
  const processFile = useCallback((file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      setSelectedFile(file)
    }
    reader.readAsDataURL(file)
  }, [])

  // Handle drag and drop
  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])

  // Trigger file input click
  const handleClick = useCallback(() => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }, [isUploading])

  // Remove photo
  const handleRemove = useCallback((e) => {
    e.stopPropagation()
    setPreview(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  // Upload photo
  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      toast.error('Please select a photo first')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        // Update user context with new profile photo
        updateUser({ profilePhoto: response.data.imageUrl })
        toast.success('Profile photo updated successfully!')
        onClose()
      }
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error.response?.data?.message || 'Failed to upload photo'
      toast.error(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }, [selectedFile, updateUser, onClose])

  // Close modal and reset
  const handleClose = useCallback(() => {
    if (!isUploading) {
      setPreview(user?.profilePhoto || null)
      setSelectedFile(null)
      setIsDragging(false)
      onClose()
    }
  }, [isUploading, user, onClose])

  // Get user initials for display
  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!isOpen) return null

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn'
      onClick={handleClose}
    >
      <div 
        className='relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-scaleIn'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='relative px-8 pt-8 pb-6 bg-linear-to-r from-orange-500 to-amber-500'>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:rotate-90 disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label='Close modal'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          
          <h2 className='text-3xl font-bold text-white pr-12'>
            Update Profile Photo
          </h2>
          <p className='text-white/90 mt-2'>
            Upload a new profile picture
          </p>
        </div>

        {/* Body */}
        <div className='p-8 space-y-6'>
          {/* Current Photo Display */}
          <div className='flex flex-col items-center'>
            <div className='relative mb-4'>
              {preview ? (
                <img
                  src={preview}
                  alt='Profile preview'
                  className='w-32 h-32 rounded-full object-cover ring-4 ring-orange-200 shadow-lg'
                />
              ) : (
                <div className='w-32 h-32 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-4xl shadow-lg ring-4 ring-orange-200'>
                  {getInitials(user?.fullName)}
                </div>
              )}
              {preview && (
                <button
                  onClick={handleRemove}
                  disabled={isUploading}
                  className='absolute -top-2 -right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              )}
            </div>
            <p className='text-sm text-gray-600'>
              {user?.fullName}
            </p>
          </div>

          {/* Upload Area */}
          <div
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50'
            } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
              disabled={isUploading}
            />

            <div className='flex flex-col items-center justify-center text-center p-4'>
              <div className='w-16 h-16 mb-3 rounded-full bg-orange-100 flex items-center justify-center'>
                <svg className='w-8 h-8 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
                </svg>
              </div>
              <p className='text-sm font-medium text-gray-700 mb-1'>
                Click to upload or drag and drop
              </p>
              <p className='text-xs text-gray-500'>
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <button
              onClick={handleClose}
              disabled={isUploading}
              className='flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
              className='flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isUploading ? (
                <>
                  <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
                  </svg>
                  Upload Photo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePhotoModal
