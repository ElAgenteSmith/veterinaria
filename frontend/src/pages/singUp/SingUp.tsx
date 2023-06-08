import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState('')
  const navigate = useNavigate()
  const handleUserTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserType(event.target.value)
  }

  const opacity = !userType ? 'opacity-50' : ''
  const adminOpacity = userType === 'admin' ? 'opacity-50' : ''

  return (
    <div className="flex flex-col items-center justify-center  h-full p-10 gap-3  mt-20 border border-gray-500 rounded-md shadow-md hover:bg-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold mb-10 text-center ">Registrate!</h1>
        <div className="mb-10">
          <label htmlFor="user-type" className="mr-2">
            Rol:
          </label>
          <select
            id="user-type"
            value={userType}
            onChange={handleUserTypeChange}
            className="border border-gray-400 rounded py-2 px-4"
          >
            <option value="">Selecciona el rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </div>
        <div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="full-name">Nombre completo:</label>
            <input
              type="text"
              id="full-name"
              className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
              disabled={!userType}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="id">Contraseña:</label>
            <input
              type="password"
              id="id"
              className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
              disabled={!userType}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="Identification">Cédula:</label>
            <input
              type="text"
              id="Identification"
              className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
              disabled={!userType}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="direction">Dirección:</label>
          <input
            type="text"
            id="direction"
            className={`border border-gray-400 rounded py-2 px-4 ${
              opacity || adminOpacity
            }`}
            disabled={userType === 'admin' || !userType}
          />
        </div>
        {/* if sign up is success (fetch), redirect to home page */}
        <button
          onClick={() => navigate('/login')}
          disabled={!userType}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
      </div>
    </div>
  )
}

export default SignUp
