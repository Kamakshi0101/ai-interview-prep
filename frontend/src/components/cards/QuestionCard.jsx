import React, { useState, useCallback } from 'react'

/**
 * Question Card Component
 * Displays interview question with expandable answer and concept
 * Includes pin, note, and AI explanation features
 */
const QuestionCard = ({ 
  question, 
  onPin, 
  onGenerateExplanation, 
  onUpdateNote,
  isGenerating 
}) => {
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false)
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [noteText, setNoteText] = useState(question.note || '')

  // Handle note save
  const handleSaveNote = useCallback(async () => {
    await onUpdateNote(question._id, noteText)
    setIsEditingNote(false)
  }, [question._id, noteText, onUpdateNote])

  // Handle note cancel
  const handleCancelNote = useCallback(() => {
    setNoteText(question.note || '')
    setIsEditingNote(false)
  }, [question.note])

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300'>
      {/* Question Header */}
      <div className='p-6'>
        <div className='flex items-start justify-between gap-4 mb-4'>
          <div className='flex-1'>
            <div className='flex items-start gap-3'>
              {/* Question Icon */}
              <div className='shrink-0 w-8 h-8 bg-linear-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              
              {/* Question Text */}
              <div className='flex-1'>
                <p className='text-base font-semibold text-gray-900 leading-relaxed'>
                  {question.question}
                </p>
              </div>
            </div>
          </div>

          {/* Pin Button */}
          <button
            onClick={() => onPin(question._id)}
            className={`shrink-0 p-2 rounded-lg transition-all duration-200 ${
              question.isPinned
                ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
            }`}
            title={question.isPinned ? 'Unpin' : 'Pin to top'}
          >
            <svg className='w-5 h-5' fill={question.isPinned ? 'currentColor' : 'none'} stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' />
            </svg>
          </button>
        </div>

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-4'>
            {question.tags.map((tag, index) => (
              <span key={index} className='px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full'>
                {tag}
              </span>
            ))}
            {question.difficulty && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </span>
            )}
          </div>
        )}

        {/* Expand Answer Button */}
        <button
          onClick={() => setIsAnswerExpanded(!isAnswerExpanded)}
          className='w-full flex items-center justify-between p-4 bg-linear-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 border-l-4 border-orange-500 rounded-lg transition-all duration-200 group'
        >
          <span className='text-sm font-semibold text-gray-800'>
            {isAnswerExpanded ? 'Hide Answer' : 'Show Answer'}
          </span>
          <svg 
            className={`w-5 h-5 text-orange-600 transition-transform duration-200 ${isAnswerExpanded ? 'rotate-180' : ''}`}
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>

        {/* Answer Content */}
        {isAnswerExpanded && (
          <div className='mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn'>
            <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
              {question.answer}
            </p>
            
            {/* Concept */}
            {question.concept && (
              <div className='mt-4 pt-4 border-t border-gray-200'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                    </svg>
                  </div>
                  <span className='text-xs font-bold text-gray-600 uppercase tracking-wider'>Main Concept</span>
                </div>
                <p className='text-sm text-gray-700 font-medium'>
                  {question.concept}
                </p>
              </div>
            )}

            {/* Learn More Button */}
            <button
              onClick={() => onGenerateExplanation(question._id, question.question)}
              disabled={isGenerating}
              className='mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isGenerating ? (
                <>
                  <svg className='animate-spin h-4 w-4' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Generating Explanation...
                </>
              ) : (
                <>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  Learn More
                </>
              )}
            </button>
          </div>
        )}

        {/* AI Concept Explanation */}
        {question.conceptExplanation && (
          <div className='mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg'>
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center'>
                <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <span className='text-sm font-bold text-blue-900'>AI Concept Explanation</span>
            </div>
            <div className='text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
              {question.conceptExplanation}
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className='mt-4'>
          {!isEditingNote && !question.note && (
            <button
              onClick={() => setIsEditingNote(true)}
              className='flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors duration-200'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              Add personal note
            </button>
          )}

          {!isEditingNote && question.note && (
            <div className='p-3 bg-amber-50 border-l-4 border-amber-500 rounded-lg'>
              <div className='flex items-start justify-between gap-2 mb-2'>
                <div className='flex items-center gap-2'>
                  <svg className='w-4 h-4 text-amber-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                  </svg>
                  <span className='text-xs font-bold text-amber-700 uppercase tracking-wider'>Your Note</span>
                </div>
                <button
                  onClick={() => {
                    setNoteText(question.note)
                    setIsEditingNote(true)
                  }}
                  className='text-amber-600 hover:text-amber-700'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                  </svg>
                </button>
              </div>
              <p className='text-sm text-gray-700 whitespace-pre-wrap'>
                {question.note}
              </p>
            </div>
          )}

          {isEditingNote && (
            <div className='space-y-3'>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder='Add your personal notes here...'
                rows='4'
                className='w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none text-sm'
              />
              <div className='flex gap-2'>
                <button
                  onClick={handleSaveNote}
                  className='flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-all duration-200'
                >
                  Save Note
                </button>
                <button
                  onClick={handleCancelNote}
                  className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-lg transition-all duration-200'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
