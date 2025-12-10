import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      // First try to get user from localStorage
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      }
      
      // Then fetch fresh user data from API to ensure we have complete data
      const response = await axios.get('http://localhost:5000/api/auth/me')
      const freshUserData = response.data.data
      
      // Update localStorage with fresh data
      localStorage.setItem('user', JSON.stringify(freshUserData))
      setUser(freshUserData)
    } catch (error) {
      console.error('Error fetching user:', error)
      // If API fails, keep using localStorage data
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    })
    
    const { token: newToken, user: userData } = response.data.data
    
    // Store token and user
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Set auth header
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    
    return response.data
  }

  const register = async (username, email, password, role = 'user') => {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      email,
      password,
      role
    })
    
    const { token: newToken, user: userData } = response.data.data
    
    // Store token and user
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Set auth header
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    
    return response.data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const updateUser = (updatedUserData) => {
    setUser(prev => ({ ...prev, ...updatedUserData }))
    localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUserData }))
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAdmin,
    loading,
    updateUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}