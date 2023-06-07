import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { id } = useParams()
  //call redux store to get user detail
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-grey-200 ">
      <h2 className="font-bold mb-4">User with id: {id}</h2>
      <div className="mt-10">
        <p>
          <strong>Name:</strong>
        </p>
        <p>
          <strong>Identification:</strong>
        </p>
        <p>
          <strong>Date of admission:</strong>
        </p>
        <p>
          <strong>Direction:</strong>
        </p>
      </div>
    </div>
  )
}

export default UserDetail
