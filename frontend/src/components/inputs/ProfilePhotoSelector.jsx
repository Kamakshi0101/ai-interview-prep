import React, { useState, useCallback, useRef } from 'react'

const ProfilePhotoSelector = ({ value, onChange, error, disabled }) => {
  const [preview, setPreview] = useState(value || null)
  const [isDragging, setIsDragging] = useState(false)
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
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      onChange(file, reader.result)
    }
    reader.readAsDataURL(file)
  }, [onChange])

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
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }, [disabled])

  // Remove photo
  const handleRemove = useCallback((e) => {
    e.stopPropagation()
    setPreview(null)
    onChange(null, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onChange])

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-semibold text-gray-700'>
        Profile Picture <span className='text-gray-400 font-normal'>(Optional)</span>
      </label>
      
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          error 
            ? 'border-red-300 bg-red-50' 
            : isDragging
            ? 'border-orange-500 bg-orange-50'
            : preview
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
          disabled={disabled}
        />

        {preview ? (
          <div className='relative w-full h-full p-4 flex items-center justify-center'>
            <img
              src={preview}
              alt='Profile preview'
              className='max-h-full max-w-full object-contain rounded-lg'
            />
            <button
              type='button'
              onClick={handleRemove}
              disabled={disabled}
              className='absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:scale-110'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-center p-4'>
            <div className='w-16 h-16 mb-3 rounded-full bg-orange-100 flex items-center justify-center'>
              <svg className='w-8 h-8 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <p className='text-sm font-medium text-gray-700 mb-1'>
              Click to upload or drag and drop
            </p>
            <p className='text-xs text-gray-500'>
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className='text-xs text-red-600 flex items-center gap-1'>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
          </svg>
          {error}
        </p>
      )}

      {preview && (
        <p className='text-xs text-green-600 flex items-center gap-1'>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
          </svg>
          Photo selected successfully
        </p>
      )}
    </div>
  )
}

export default ProfilePhotoSelector
