import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddVeterinarianMutation } from 'api/veterinarians/veterinariansSlice'
import { useAddUserMutation } from 'api/users/usersSlice'
import { useAddUserAuthMutation } from 'api/auth/auth.slice'
import useCreateError from 'hooks/useCreateError'
import Snackbar from 'components/snackbar/Snackbar'
import { validateDataForm } from 'utils/validateFormValues'
import { AuthRole, AuthUserType } from 'api/auth/auth.types'

type RoleType = 'Administrador' | 'Usuario'
type UserRoleType = 'Cliente' | 'Veterinario'

const SignUp: React.FC = () => {
  const [roleType, setRoleType] = useState<RoleType | ''>(AuthRole.ADMIN)
  const [userType, setUserType] = useState<UserRoleType | ''>(
    AuthUserType.CLIENT
  )
  const [userAuth, setUserAuth] = useState({})
  const [createError, updateError] = useCreateError(false)
  const [createUserAuth] = useAddUserAuthMutation()
  const [createUser, { data: newUser, isSuccess: isSuccessUser }] =
    useAddUserMutation()
  const [
    createUserVeterinarian,
    { data: newVeterinarian, isSuccess: isSuccessVet },
  ] = useAddVeterinarianMutation()

  const navigate = useNavigate()

  const handleRoleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoleType(event.target.value as RoleType)
  }

  const handleUserTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserType(event.target.value as UserRoleType)
  }

  const handleRegisterUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const auth = validateDataForm(event, 'auth')

    if (!auth) {
      updateError(true)
      return
    }

    if (roleType === AuthRole.ADMIN) {
      createUserAuth({ rol: AuthRole.ADMIN, ...auth })
      navigate('/login')
      return
    }

    setUserAuth(auth as any)

    const user = validateDataForm(
      event,
      userType === AuthUserType.CLIENT ? 'client' : 'veterinarian'
    )

    if (!user) {
      updateError(true)
      return
    }

    if (userType === AuthUserType.CLIENT) {
      createUser(user)
      return
    }

    if (userType === AuthUserType.VETERINARIAN) {
      createUserVeterinarian(user)
    }
  }

  useEffect(
    () => {
      let autenticacionID = null
      let tipoUsuario = null
      if (roleType === 'Usuario') {
        if (userType === 'Cliente' && isSuccessUser) {
          const { id } = newUser
          autenticacionID = id
          tipoUsuario = AuthUserType.CLIENT
        }
        if (userType === AuthUserType.VETERINARIAN && isSuccessVet) {
          const { id } = newVeterinarian
          autenticacionID = id
          tipoUsuario = AuthUserType.VETERINARIAN
        }
        if (autenticacionID) {
          const updatedUserAuth = {
            rol: AuthRole.USER,
            autenticacionID,
            tipoUsuario: tipoUsuario,
            ...userAuth,
          }
          createUserAuth(updatedUserAuth)
          navigate('/login')
        }
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      createUser,
      createUserVeterinarian,
      newUser,
      newVeterinarian,
      isSuccessUser,
      isSuccessVet,
      roleType,
      userAuth,
    ]
  )

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
        {roleType && roleType !== AuthRole.ADMIN && (
          <div className="mb-10 flex flex-col gap-2">
            <label htmlFor="user-type" className="mr-2">
              Tipo de usuario:
            </label>
            <select
              value={userType}
              onChange={handleUserTypeChange}
              className="border border-gray-400 rounded py-2 px-4"
            >
              <option value="Veterinario">Veterinario</option>
              <option value="Cliente">Cliente</option>
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
        {roleType === 'Usuario' && userType === AuthUserType.CLIENT && (
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
              {userType === AuthUserType.CLIENT
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
