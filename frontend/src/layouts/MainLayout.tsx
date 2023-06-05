import React from 'react'
import { MainLayoutProps } from './types'

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 min-h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
