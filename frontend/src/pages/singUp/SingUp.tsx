import React, { useState } from 'react'

const SignUp: React.FC = () => {
  const [userType, setUserType] = useState('')

  const handleUserTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserType(event.target.value)
  }

  const opacity = !userType ? 'opacity-50' : ''
  const adminOpacity = userType === 'admin' ? 'opacity-50' : ''

  return (
    <div className="flex flex-col justify-center items-center h-[600px] bg-white rounded p-20 shadow-lg">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold mb-10 text-center absolute top-20">
          Sign Up
        </h1>
        <div className="mb-10">
          <label htmlFor="user-type" className="mr-2">
            User Type:
          </label>
          <select
            id="user-type"
            value={userType}
            onChange={handleUserTypeChange}
            className="border border-gray-400 rounded py-2 px-4"
          >
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="full-name">Full name:</label>
            <input
              type="text"
              id="full-name"
              className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
              disabled={!userType}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="id">Document number:</label>
            <input
              type="text"
              id="id"
              className={`border border-gray-400 rounded py-2 px-4 ${opacity}`}
              disabled={!userType}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="direction">Direction:</label>
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
          disabled={!userType}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default SignUp
