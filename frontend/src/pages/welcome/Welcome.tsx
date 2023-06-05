import React from 'react'
import { Link } from 'react-router-dom'

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-full">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Veterinary Clinic!
      </h1>
      <p className="text-lg mb-4">Please sign up or log in to continue.</p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Welcome
