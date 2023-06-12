import React, { useContext, useState, createContext, ReactNode } from 'react'
import { AuthType } from 'api/auth/auth.types'
import { AUTH } from './const'

type AuthTypeLogin = Omit<AuthType, 'password'>

const AuthContext = createContext<{
  userAuth: AuthTypeLogin | null
  logIn: (user: AuthTypeLogin) => void
  logOut: () => void
}>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userObj: AuthTypeLogin | null = JSON.parse(
    localStorage.getItem(AUTH) || 'null'
  )
  const [userAuth, setUserAuth] = useState<AuthTypeLogin | null>(userObj)

  const logIn = (user: AuthTypeLogin) => {
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
