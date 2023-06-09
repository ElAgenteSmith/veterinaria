import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthState'
import { AUTH } from './const'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const userObj = JSON.parse(localStorage.getItem(AUTH) || 'null')

  if (!userObj) {
    auth.logOut()
    return <Navigate to="/login" replace />
  }

  return children
}
