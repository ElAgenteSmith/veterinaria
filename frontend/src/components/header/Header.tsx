import React from 'react'
import { Link } from 'react-router-dom'
import { FaCat } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

interface HeaderProps {
  userName: string
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-gray-900 text-white h-16 cursor-default">
      <div className="flex items-center justify-between px-6 py-3 h-full">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1">
            <FaCat />
            <span className="font-bold text-xl">Veterinaria</span>
          </div>
          <div className="text-lg">{userName}</div>
        </div>
        <nav className="flex gap-4">
          <Link to="/users" className="text-gray-300 hover:text-white">
            Usuarios
          </Link>
          <Link to="/veterinarians" className="text-gray-300 hover:text-white">
            Veterinarios
          </Link>
          <Link to="/pets" className="text-gray-300 hover:text-white pr-2">
            Mascotas
          </Link>
          <Link
            to="/"
            className="text-white flex flex-row items-center gap-1 pl-2"
          >
            Salir
            <MdLogout />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
