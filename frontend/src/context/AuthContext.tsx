'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
  userToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [userToken, setUserToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUserId = localStorage.getItem('userId')
    setUserToken(token)

    if (token && storedUserId) {
      setIsLoggedIn(true)
      setUserId(storedUserId)
    }
  }, [])

  function login(token: string, userId: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    setIsLoggedIn(true)
    setUserId(userId)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setIsLoggedIn(false)
    setUserId(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout, userToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}