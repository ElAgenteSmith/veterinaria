import React from 'react'
import { useLocation } from 'react-router-dom'
import { MainLayoutProps } from './types'
import Header from 'components/header/Header'

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useLocation()
  const hideHeader =
    pathname === '/login' || pathname === '/signup' || pathname === '/'
  //call the redux user Session to get the name, also the type
  return (
    <div className="bg-gray-100 min-h-screen">
      {!hideHeader && <Header userName="Kanmus" type="admin" />}
      <div className="container mx-auto p-4  flex justify-center items-center ">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
