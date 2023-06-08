import React, { useState } from 'react'
import Item from 'components/item/Item'
import { useParams } from 'react-router-dom'
import { useGetUserQuery, useUpdateUserMutation } from 'api/users/usersSlice'

type editedValues = {
  id: string | number
  nombre: string
  cedula: string
  fechaIngreso: string
  direccion: string
}

const UserDetail = () => {
  const { userId } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [editedValues, setEditedValues] = useState<editedValues>({
    id: 0,
    nombre: '',
    cedula: '',
    fechaIngreso: '',
    direccion: '',
  })
  const { data: user, isLoading } = useGetUserQuery(userId ? userId : '')
  const [updateUser] = useUpdateUserMutation()

  const handleEdit = () => {
    setIsEditing(true)
    if (user) {
      const initialEditedValues = {
        id: user.id,
        nombre: user.nombre,
        cedula: user.cedula,
        fechaIngreso: user.fechaIngreso,
        direccion: user.direccion,
      }
      setEditedValues(initialEditedValues)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    const newValues = { ...editedValues }
    updateUser({ ...newValues })
  }

  const handleValueChange = (field: keyof editedValues, value: string) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          user && (
            <>
              <h2 className="font-bold mb-4 text-2xl">{user.nombre}</h2>
              <div className="mt-10 flex flex-col gap-2">
                <Item
                  label="Nombre"
                  isEditable={isEditing}
                  editedValue={editedValues.nombre || user.nombre}
                  onValueChange={(value) => handleValueChange('nombre', value)}
                />
                <Item
                  label="Cedula"
                  isEditable={isEditing}
                  editedValue={editedValues.cedula || user.cedula}
                  onValueChange={(value) => handleValueChange('cedula', value)}
                />
                <Item
                  label="Fecha de ingreso"
                  editedValue={editedValues.fechaIngreso || user.fechaIngreso}
                />
                <Item
                  label="Direccion"
                  isEditable={isEditing}
                  editedValue={editedValues.direccion || user.direccion}
                  onValueChange={(value) =>
                    handleValueChange('direccion', value)
                  }
                />
              </div>
            </>
          )
        )}
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
