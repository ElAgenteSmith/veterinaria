import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import Item from 'components/item/Item'
import {
  useGetVeterinarianQuery,
  useUpdateVeterinarianMutation,
} from 'api/veterinarians/veterinariansSlice'

type editedVeterinarianValues = {
  id: number | null
  fechaRegistro: string
  nombreCompleto: string
  cedula: string
}

const VeterinarianDetail = () => {
  const { veterinarianId } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [editedValues, setEditedValues] = useState<editedVeterinarianValues>({
    id: null,
    fechaRegistro: '',
    nombreCompleto: '',
    cedula: '',
  })
  const { data: veterinarian, isLoading } = useGetVeterinarianQuery(
    veterinarianId ? veterinarianId : ''
  )
  const [updateveterinarian] = useUpdateVeterinarianMutation()

  const handleEdit = () => {
    setIsEditing(true)
    if (veterinarian) {
      const { nombreCompleto, cedula, id, fechaRegistro } = veterinarian
      const initialEditedValues = {
        id,
        fechaRegistro,
        nombreCompleto,
        cedula,
      }
      setEditedValues(initialEditedValues)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    const newValues = { ...editedValues }
    updateveterinarian({ ...newValues })
  }

  const handleValueChange = (
    field: keyof editedVeterinarianValues,
    value: string
  ) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }))
  }

  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8">
        {isLoading ? (
          <HashLoader className=" ml-20" size={80} color="#364173" loading />
        ) : (
          veterinarian && (
            <>
              <h2 className="font-bold mb-4 text-2xl">
                {veterinarian.nombreCompleto}
              </h2>
              <div className="mt-10 flex flex-col gap-2">
                <Item
                  label="Nombre completo"
                  isEditable={isEditing}
                  editedValue={
                    editedValues.nombreCompleto || veterinarian.nombreCompleto
                  }
                  onValueChange={(value) =>
                    handleValueChange('nombreCompleto', value)
                  }
                />
                <Item
                  label="Cédula"
                  isEditable={isEditing}
                  editedValue={editedValues.cedula || veterinarian.cedula}
                  onValueChange={(value) => handleValueChange('cedula', value)}
                />
                <Item
                  label="Fecha de registro"
                  editedValue={veterinarian.fechaRegistro}
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

export default VeterinarianDetail
