import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const userNameRef = useRef<HTMLInputElement>(null)
  const documentNumberRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()

    const userName = userNameRef.current?.value
    const documentNumber = documentNumberRef.current?.value
    if (!userName || !documentNumber) {
      //call error state management from redux to return a error
      console.log('Error')
      return
    }
    //call user session using redux store
    navigate('/home')
  }

  return (
    <div className="flex flex-col items-center justify-center  h-full p-10 gap-3  mt-20 border border-gray-500 rounded-md shadow-md hover:bg-white">
      <h1 className="text-4xl font-bold mb-4">Log In</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="user-name" className="mr-2">
            User Name:
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
            Password:
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
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
