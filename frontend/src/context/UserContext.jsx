import React, { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import API_PATHS from '../utils/apiPath'
import toast from 'react-hot-toast'

const UserContext = createContext(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (storedToken && storedUser) {
        try {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Failed to parse stored user:', error)
          logout()
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const { token: newToken, user: newUser } = response.data

      // Store in localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))

      // Update state
      setToken(newToken)
      setUser(newUser)
      setIsAuthenticated(true)

      toast.success('Login successful!')
      return { success: true, user: newUser }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Register function
  const register = async (formData) => {
    try {
      const data = new FormData()
      data.append('fullName', formData.fullName)
      data.append('email', formData.email)
      data.append('password', formData.password)
      
      if (formData.profilePhoto) {
        data.append('profilePhoto', formData.profilePhoto)
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const { token: newToken, user: newUser } = response.data

      // Store in localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))

      // Update state
      setToken(newToken)
      setUser(newUser)
      setIsAuthenticated(true)

      toast.success('Account created successfully!')
      return { success: true, user: newUser }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
  }

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE)
      const updatedUser = response.data.user
      
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      return { success: true, user: updatedUser }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile'
      return { success: false, error: errorMessage }
    }
  }

  // Update user data
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    fetchProfile,
    updateUser
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext
