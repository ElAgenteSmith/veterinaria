import React from 'react'
import { Link } from 'react-router-dom'
import { RoleType } from 'types/roles'
import { FaCat } from 'react-icons/fa'

interface HeaderProps {
  userName: string
  type: RoleType
}

const Header: React.FC<HeaderProps> = ({ userName, type }) => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <FaCat />
          <span className="font-bold text-xl">Pet Clinic</span>
        </div>
        <div className="text-lg">{userName}</div>
        <nav className="space-x-4">
          <Link to="/users" className="text-gray-300 hover:text-white">
            Users
          </Link>
          <Link to="/veterinarians" className="text-gray-300 hover:text-white">
            Veterinarians
          </Link>
          <Link to="/pets" className="text-gray-300 hover:text-white">
            Pets
          </Link>
          <Link to="/" className="text-gray-300 hover:text-white">
            log out
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
