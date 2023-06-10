import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MainLayoutProps } from './types'
import { useAuth } from 'state/AuthState'
import Header from 'components/header/Header'
import BackButton from 'components/back/Back'

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useLocation()
  const { userAuth } = useAuth()
  const navigate = useNavigate()
  const hideHeader =
    pathname === '/login' || pathname === '/signup' || pathname === '/'

  const renderBackButton = pathname === '/login' || pathname === '/signup'
  return (
    <div className="bg-gray-100 min-h-screen">
      {!hideHeader && (
        <Header
          userName={userAuth ? userAuth?.nombreUsuario : 'Default name'}
        />
      )}
      <div className="container mx-auto p-4 ">
        {renderBackButton && <BackButton onClick={() => navigate('/')} />}
        <div className="container mx-auto p-4  flex justify-center items-center ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
