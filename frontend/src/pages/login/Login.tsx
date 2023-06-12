import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyGetAuthQuery } from 'api/auth/auth.slice'
import { RingLoader } from 'react-spinners'
import useCreateError from 'hooks/useCreateError'
import Snackbar from 'components/snackbar/Snackbar'
import { useAuth } from 'state/AuthState'

const Login: React.FC = () => {
  const userNameRef = useRef<HTMLInputElement>(null)
  const documentNumberRef = useRef<HTMLInputElement>(null)
  const [createError, updateError] = useCreateError(false)
  const { logIn } = useAuth()
  const [getAuthQuery, { data, isLoading, isError }] = useLazyGetAuthQuery()
  const navigate = useNavigate()

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    const userName = userNameRef.current?.value
    const documentNumber = documentNumberRef.current?.value
    if (!userName || !documentNumber) {
      updateError(true)
      return
    }
    getAuthQuery({ nombreUsuario: userName, password: documentNumber })
  }

  useEffect(() => {
    if (!isLoading && !isError && data) {
      logIn({
        autenticacionID: data.autenticacionID,
        nombreUsuario: data.nombreUsuario,
        rol: data.rol,
        tipoUsuario: data.tipoUsuario,
      })
      navigate('/home')
    }
  }, [data, isError, isLoading, logIn, navigate])

  useEffect(() => {
    if (isError) {
      updateError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  return isLoading ? (
    <div className="flex justify-center items-center w-full  mt-20">
      <RingLoader className="" size={600} color="#364173" loading />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center  h-full p-10 gap-3  mt-20 border border-gray-500 rounded-md shadow-md hover:bg-white">
      <h1 className="text-4xl font-bold mb-4">Ingresa</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="user-name" className="mr-2">
            Nombre completo:
          </label>
          <input
            type="text"
            id="user-name"
            ref={userNameRef}
            className="border border-gray-400 rounded py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="mr-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            ref={documentNumberRef}
            className="border border-gray-400 rounded py-2 px-4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ingresar
        </button>
      </form>
      {createError && <Snackbar message="Datos invalidos" />}
    </div>
  )
}

export default Login
