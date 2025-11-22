import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

/**
 * Concept Explanation Component
 * Renders AI-generated concept explanations with markdown support
 * Includes syntax highlighting for code blocks
 */
const ConceptExplanation = ({ explanation, isVisible = true }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!isVisible || !explanation) return null

  return (
    <div className='mt-4 border-2 border-blue-200 rounded-xl overflow-hidden bg-white shadow-sm'>
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-200'
      >
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </div>
          <div>
            <h3 className='text-sm font-bold text-blue-900'>AI Concept Explanation</h3>
            <p className='text-xs text-blue-600'>Powered by Groq AI</p>
          </div>
        </div>
        <button className='text-blue-600 hover:text-blue-700'>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className='p-6 bg-white animate-fadeIn'>
          <div className='prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-li:text-gray-700 prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:rounded-lg'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag='div'
                      className='rounded-lg'
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {explanation}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConceptExplanation
