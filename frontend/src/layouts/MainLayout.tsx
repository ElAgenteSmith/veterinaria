import React from 'react'
import { useLocation } from 'react-router-dom'
import { MainLayoutProps } from './types'
import { useAuth } from 'state/AuthState'
import Header from 'components/header/Header'

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useLocation()
  const { userAuth } = useAuth()
  const hideHeader =
    pathname === '/login' || pathname === '/signup' || pathname === '/'
  console.log(userAuth)
  return (
    <div className="bg-gray-100 min-h-screen">
      {!hideHeader && (
        <Header
          userName={userAuth ? userAuth?.nombreUsuario : 'Default name'}
        />
      )}
      <div className="container mx-auto p-4  flex justify-center items-center ">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
