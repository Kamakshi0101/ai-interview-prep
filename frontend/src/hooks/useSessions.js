import { useState, useCallback } from 'react'
import axiosInstance from '../utils/axiosInstance'
import API_PATHS from '../utils/apiPath'
import toast from 'react-hot-toast'

/**
 * Custom hook for managing interview prep sessions
 * Handles fetching, creating, and deleting sessions with loading states
 */
export const useSessions = () => {
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Fetch all sessions for the logged-in user
   */
  const fetchSessions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await axiosInstance.get(API_PATHS.SESSIONS.MY_SESSIONS)
      
      if (response.data.success) {
        setSessions(response.data.sessions)
        return { success: true, sessions: response.data.sessions }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch sessions'
      setError(errorMessage)
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Create a new interview prep session
   * @param {Object} sessionData - Session creation data
   * @param {string} sessionData.role - Job role
   * @param {string} sessionData.experience - Experience level
   * @param {string} sessionData.topicsToFocus - Topics to focus on
   * @param {string} sessionData.description - Optional description
   * @param {Array} sessionData.questions - Array of questions
   */
  const createSession = useCallback(async (sessionData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await axiosInstance.post(API_PATHS.SESSIONS.CREATE, sessionData)
      
      if (response.data.success) {
        // Add new session to the beginning of the list
        setSessions(prevSessions => [response.data.session, ...prevSessions])
        toast.success('Session created successfully!')
        return { success: true, session: response.data.session }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create session'
      setError(errorMessage)
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Get a specific session by ID
   * @param {string} sessionId - Session ID
   */
  const getSessionById = useCallback(async (sessionId) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_BY_ID(sessionId))
      
      if (response.data.success) {
        return { success: true, session: response.data.session }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch session'
      setError(errorMessage)
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Delete a session by ID
   * @param {string} sessionId - Session ID to delete
   */
  const deleteSession = useCallback(async (sessionId) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await axiosInstance.delete(API_PATHS.SESSIONS.DELETE(sessionId))
      
      if (response.data.success) {
        // Remove session from state
        setSessions(prevSessions => 
          prevSessions.filter(session => session._id !== sessionId)
        )
        toast.success('Session deleted successfully!')
        return { success: true }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete session'
      setError(errorMessage)
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Refresh sessions list
   */
  const refreshSessions = useCallback(() => {
    return fetchSessions()
  }, [fetchSessions])

  return {
    sessions,
    isLoading,
    error,
    fetchSessions,
    createSession,
    getSessionById,
    deleteSession,
    refreshSessions
  }
}

export default useSessions
