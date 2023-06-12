import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClimbingBoxLoader } from 'react-spinners'
import Item from 'components/item/Item'
import { useGetUserQuery, useUpdateUserMutation } from 'api/users/usersSlice'

type editedUserValues = {
  id: number | null
  fechaIngreso: string
  nombreCompleto: string
  cedula: string
  direccion: string
}

const UserDetail = () => {
  const { userId } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [editedValues, setEditedValues] = useState<editedUserValues>({
    id: null,
    fechaIngreso: '',
    nombreCompleto: '',
    cedula: '',
    direccion: '',
  })
  const { data: user, isLoading } = useGetUserQuery(userId ? userId : '')
  const [updateUser] = useUpdateUserMutation()

  const handleEdit = () => {
    setIsEditing(true)
    if (user) {
      const { nombreCompleto, cedula, direccion, id, fechaIngreso } = user
      const initialEditedValues = {
        id,
        fechaIngreso,
        nombreCompleto,
        cedula,
        direccion,
      }
      setEditedValues(initialEditedValues)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    const newValues = { ...editedValues }
    updateUser({ ...newValues })
  }

  const handleValueChange = (field: keyof editedUserValues, value: string) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8">
        {isLoading ? (
          <ClimbingBoxLoader size={30} color="#364173" loading />
        ) : (
          user && (
            <>
              <h2 className="font-bold mb-4 text-2xl">{user.nombreCompleto}</h2>
              <div className="mt-10 flex flex-col gap-2">
                <Item
                  label="Nombre completo"
                  isEditable={isEditing}
                  editedValue={
                    editedValues.nombreCompleto || user.nombreCompleto
                  }
                  onValueChange={(value) =>
                    handleValueChange('nombreCompleto', value)
                  }
                />
                <Item
                  label="Cédula"
                  isEditable={isEditing}
                  editedValue={editedValues.cedula || user.cedula}
                  onValueChange={(value) => handleValueChange('cedula', value)}
                />
                <Item
                  label="Fecha de ingreso"
                  editedValue={user.fechaIngreso}
                />
                <Item
                  label="Dirección"
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
          Guardar
        </button>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleEdit}
        >
          Editar
        </button>
      )}
    </div>
  )
}

export default UserDetail
