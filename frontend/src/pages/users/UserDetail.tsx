import React, { useState } from 'react'
import Item from 'components/item/Item'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { userId } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // call redux store to save
  }
  //call redux store to get user detail
  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8">
        <h2 className="font-bold mb-4 text-2xl">User with ID: {userId}</h2>
        <div className="mt-10 flex flex-col gap-2">
          <Item label="Name" title="John Doe" isEditable={isEditing} />
          <Item
            label="Identification"
            title="123456789"
            isEditable={isEditing}
          />
          <Item label="Date of Admission" title="2022-01-01" />
          <Item label="Direction" title="123 Main St" isEditable={isEditing} />
        </div>
      </div>
      {isEditing ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
    </div>
  )
}

export default UserDetail
