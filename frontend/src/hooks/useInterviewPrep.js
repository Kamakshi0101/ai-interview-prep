import { useState, useCallback, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import API_PATHS from '../utils/apiPath'
import toast from 'react-hot-toast'

/**
 * Custom hook for managing interview prep session
 * Handles session fetching, question operations, AI explanations, and load more
 */
export const useInterviewPrep = (sessionId) => {
  const [session, setSession] = useState(null)
  const [questions, setQuestions] = useState([])
  const [displayedQuestions, setDisplayedQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadMoreCount, setLoadMoreCount] = useState(10)
  const [generatingExplanations, setGeneratingExplanations] = useState({})

  /**
   * Fetch session details and questions
   */
  const fetchSession = useCallback(async () => {
    if (!sessionId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_BY_ID(sessionId))

      if (response.data.success) {
        const sessionData = response.data.session
        setSession(sessionData)
        
        // Sort questions: pinned first, then by creation date
        const sortedQuestions = [...(sessionData.questions || [])].sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
        
        setQuestions(sortedQuestions)
        setDisplayedQuestions(sortedQuestions.slice(0, loadMoreCount))
        
        return { success: true, session: sessionData }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch session'
      setError(errorMessage)
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [sessionId, loadMoreCount])

  /**
   * Load more questions
   */
  const loadMore = useCallback(() => {
    const nextCount = loadMoreCount + 10
    setLoadMoreCount(nextCount)
    setDisplayedQuestions(questions.slice(0, nextCount))
  }, [loadMoreCount, questions])

  /**
   * Toggle pin status of a question
   */
  const togglePinQuestion = useCallback(async (questionId) => {
    try {
      const response = await axiosInstance.put(API_PATHS.QUESTIONS.TOGGLE_PIN(questionId))

      if (response.data.success) {
        const updatedQuestion = response.data.question

        // Update questions list
        setQuestions(prevQuestions => {
          const updated = prevQuestions.map(q => 
            q._id === questionId ? { ...q, isPinned: updatedQuestion.isPinned } : q
          )
          
          // Re-sort: pinned first
          return updated.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1
            if (!a.isPinned && b.isPinned) return 1
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
        })

        // Update displayed questions
        setDisplayedQuestions(prevDisplayed => {
          const updated = prevDisplayed.map(q => 
            q._id === questionId ? { ...q, isPinned: updatedQuestion.isPinned } : q
          )
          
          return updated.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1
            if (!a.isPinned && b.isPinned) return 1
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
        })

        toast.success(updatedQuestion.isPinned ? 'Question pinned!' : 'Question unpinned')
        return { success: true }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to toggle pin'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Update question note
   */
  const updateQuestionNote = useCallback(async (questionId, note) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.QUESTIONS.UPDATE_NOTE(questionId),
        { note }
      )

      if (response.data.success) {
        const updatedQuestion = response.data.question

        // Update both lists
        setQuestions(prevQuestions => 
          prevQuestions.map(q => 
            q._id === questionId ? { ...q, note: updatedQuestion.note } : q
          )
        )

        setDisplayedQuestions(prevDisplayed => 
          prevDisplayed.map(q => 
            q._id === questionId ? { ...q, note: updatedQuestion.note } : q
          )
        )

        toast.success('Note updated successfully')
        return { success: true }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update note'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [])

  /**
   * Generate AI concept explanation for a question
   */
  const generateExplanation = useCallback(async (questionId, questionText) => {
    setGeneratingExplanations(prev => ({ ...prev, [questionId]: true }))

    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question: questionText
      })

      if (response.data.success) {
        const explanation = response.data.explanation

        // Update question with explanation in both lists
        setQuestions(prevQuestions => 
          prevQuestions.map(q => 
            q._id === questionId ? { ...q, conceptExplanation: explanation } : q
          )
        )

        setDisplayedQuestions(prevDisplayed => 
          prevDisplayed.map(q => 
            q._id === questionId ? { ...q, conceptExplanation: explanation } : q
          )
        )

        toast.success('Concept explanation generated!')
        return { success: true, explanation }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to generate explanation'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setGeneratingExplanations(prev => ({ ...prev, [questionId]: false }))
    }
  }, [])

  /**
   * Refresh session data
   */
  const refreshSession = useCallback(() => {
    return fetchSession()
  }, [fetchSession])

  // Auto-fetch on mount
  useEffect(() => {
    if (sessionId) {
      fetchSession()
    }
  }, [sessionId, fetchSession])

  return {
    session,
    questions,
    displayedQuestions,
    isLoading,
    error,
    hasMore: displayedQuestions.length < questions.length,
    generatingExplanations,
    fetchSession,
    loadMore,
    togglePinQuestion,
    updateQuestionNote,
    generateExplanation,
    refreshSession
  }
}

export default useInterviewPrep
