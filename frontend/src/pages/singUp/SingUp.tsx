import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddVeterinarianMutation } from 'api/veterinarians/veterinariansSlice'
import { useAddUserMutation } from 'api/users/usersSlice'
import { useAddUserAuthMutation } from 'api/auth/auth.slice'
import useCreateError from 'hooks/useCreateError'
import Snackbar from 'components/snackbar/Snackbar'
import { validateDataForm } from 'utils/validateFormValues'

type RoleType = 'Administrador' | 'Usuario'
type UserType = 'cliente' | 'veterinario'

const SignUp: React.FC = () => {
  const [roleType, setRoleType] = useState<RoleType | ''>('Administrador')
  const [userType, setUserType] = useState<UserType | ''>('cliente')
  const [createError, updateError] = useCreateError(false)
  const [createUserAuth] = useAddUserAuthMutation()
  const [createUser] = useAddUserMutation()
  const [createUserVeterinarian] = useAddVeterinarianMutation()

  const navigate = useNavigate()

  const handleRoleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoleType(event.target.value as RoleType)
  }

  const handleUserTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserType(event.target.value as UserType)
  }

  const handleRegisterUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const auth = validateDataForm(event, 'auth')

    if (!auth) {
      updateError(true)
      return
    }
    Object.assign(auth, {
      rol: roleType,
    })
    if (roleType === 'Administrador') {
      createUserAuth(auth)
      navigate('/login')
      return
    }

    const user = validateDataForm(
      event,
      userType === 'cliente' ? 'client' : 'veterinarian'
    )

    if (!user) {
      updateError(true)
      return
    }

    if (userType === 'cliente') {
      createUser(user)
      createUserAuth(auth)
      navigate('/login')
      return
    }

    if (userType === 'veterinario') {
      createUserVeterinarian(user)
      createUserAuth(auth)
      navigate('/login')
    }
  }

  const opacity = !roleType ? 'opacity-50' : ''

  return (
    <div className="flex flex-col items-center justify-center px-20  h-full p-10 gap-3  mt-20 border border-gray-500 rounded-md shadow-md hover:bg-white">
      <form
        onSubmit={handleRegisterUser}
        className="flex flex-col items-center gap-2"
      >
        <h1 className="text-4xl font-bold mb-10 text-center ">Registrate!</h1>
        <div className="mb-10">
          <label htmlFor="user-type" className="mr-2">
            Rol:
          </label>
          <select
            value={roleType}
            onChange={handleRoleTypeChange}
            className="border border-gray-400 rounded py-2 px-4"
          >
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
        </div>
        {roleType && roleType !== 'Administrador' && (
          <div className="mb-10 flex flex-col gap-2">
            <label htmlFor="user-type" className="mr-2">
              Tipo de usuario:
            </label>
            <select
              value={userType}
              onChange={handleUserTypeChange}
              className="border border-gray-400 rounded py-2 px-4"
            >
              <option value="veterinario">Veterinario</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>
        )}
        <div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="full-name">Nombre completo:</label>
            <input
              type="text"
              id="full-name"
              className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
              disabled={!roleType}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
              disabled={!roleType}
            />
          </div>
          {roleType === 'Usuario' && (
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="identification">Cédula:</label>
              <input
                type="text"
                id="identification"
                className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
                disabled={!roleType}
              />
            </div>
          )}
        </div>
        {roleType === 'Usuario' && userType === 'cliente' && (
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="direction">Dirección:</label>
            <input
              type="text"
              id="direction"
              className={`border border-gray-400 rounded py-2 px-4 `}
            />
          </div>
        )}
        {roleType === 'Usuario' && userType && (
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="start-date">
              {userType === 'cliente'
                ? 'Fecha de ingreso:'
                : 'Fecha de registro'}
            </label>
            <input
              type="date"
              id="start-date"
              className={`border border-gray-400 rounded py-2 px-4 `}
            />
          </div>
        )}
        <button
          disabled={!roleType}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
        {createError && <Snackbar message="Debes llenar todos los campos" />}
      </form>
    </div>
  )
}

export default SignUp
