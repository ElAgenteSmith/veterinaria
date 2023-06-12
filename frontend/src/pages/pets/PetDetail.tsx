import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import Item from 'components/item/Item'
import { useGetPetQuery, useUpdatePetMutation } from 'api/pets/petsSlice'
import { useAuth } from 'state/AuthState'
import { AuthUserType } from 'api/auth/auth.types'

type editedPetsValues = {
  id: number | null
  nombre: string
  raza: string
  edad: number
}

const PetDetail = () => {
  const { petId } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [editedValues, setEditedValues] = useState<editedPetsValues>({
    id: null,
    nombre: '',
    raza: '',
    edad: 0,
  })
  const { userAuth } = useAuth()
  const { data: pet, isLoading } = useGetPetQuery(petId ? petId : '')
  const [updatePet] = useUpdatePetMutation()

  const handleEdit = () => {
    setIsEditing(true)
    if (pet) {
      const { nombre, raza, edad, id } = pet
      const initialEditedValues = {
        id,
        nombre,
        raza,
        edad,
      }
      setEditedValues(initialEditedValues)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    const newValues = { ...editedValues }
    updatePet({ ...newValues })
  }

  const handleValueChange = (field: keyof editedPetsValues, value: string) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8">
        {isLoading ? (
          <PacmanLoader size={60} color="#364173" loading />
        ) : (
          pet && (
            <>
              <h2 className="font-bold mb-4 text-2xl">{pet.nombre}</h2>
              <div className="mt-10 flex flex-col gap-2">
                <Item
                  label="Nombre"
                  isEditable={isEditing}
                  editedValue={editedValues.nombre || pet.nombre}
                  onValueChange={(value) => handleValueChange('nombre', value)}
                />
                <Item
                  label="Raza"
                  isEditable={isEditing}
                  editedValue={editedValues.raza || pet.raza}
                  onValueChange={(value) => handleValueChange('raza', value)}
                />
                <Item
                  label="Edad"
                  isEditable={isEditing}
                  editedValue={editedValues.edad || pet.edad}
                  onValueChange={(value) => handleValueChange('edad', value)}
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
        userAuth?.tipoUsuario !== AuthUserType.VETERINARIAN && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleEdit}
          >
            Editar
          </button>
        )
      )}
    </div>
  )
}

export default PetDetail
