import React from 'react'
import { Link } from 'react-router-dom'

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-full p-10 gap-3  mt-20 border border-gray-500 rounded-md shadow-md hover:bg-white">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a la Veterinaria!</h1>
      <div className="flex items-center justify-center mt-10 flex-col gap-10">
        <p className="text-lg mb-4">
          Por favor, ingresa o registrate para continuar.
        </p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Ingresar
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
