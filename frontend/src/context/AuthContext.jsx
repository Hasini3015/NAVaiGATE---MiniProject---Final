import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('nav_token')
    const savedUser = localStorage.getItem('nav_session')
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
        authAPI.me().catch(() => {
          localStorage.removeItem('nav_token')
          localStorage.removeItem('nav_session')
          setUser(null)
        })
      } catch {
        localStorage.removeItem('nav_token')
        localStorage.removeItem('nav_session')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const data = await authAPI.signin(email, password)
      localStorage.setItem('nav_token', data.token)
      localStorage.setItem('nav_session', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const data = await authAPI.signup(name, email, password)
      localStorage.setItem('nav_token', data.token)
      localStorage.setItem('nav_session', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('nav_token')
    localStorage.removeItem('nav_session')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
