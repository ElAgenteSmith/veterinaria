import React, { useContext, useState, createContext, ReactNode } from 'react'
import { AuthType } from 'api/auth/auth.types'
import { AUTH } from './const'

const AuthContext = createContext<{
  userAuth: AuthType | null
  logIn: (user: AuthType) => void
  logOut: () => void
}>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userObj: AuthType | null = JSON.parse(
    localStorage.getItem(AUTH) || 'null'
  )
  const [userAuth, setUserAuth] = useState<AuthType | null>(userObj)

  const logIn = (user: AuthType) => {
    localStorage.setItem('auth', JSON.stringify(user))
    setUserAuth(user)
  }

  const logOut = () => {
    setUserAuth(null)
    localStorage.removeItem(AUTH)
  }

  const authValue = {
    userAuth,
    logIn,
    logOut,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
