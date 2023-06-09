import React, { useMemo, useState } from 'react'
import CreateUser from './CreateUser'
import CreatePet from './CreatePet'
import CreateVeterinarian from './CreateVeterinarian'
import { CreateFormProps, CreateFormType, FormDataType } from './create.types'

const CreateForm = ({ type, onCreate }: CreateFormProps) => {
  const [formData, setFormData] = useState({})

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prevFormData: FormDataType) => ({
      ...prevFormData,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate(formData as FormDataType)
  }

  const renderForm = useMemo(() => {
    switch (type) {
      case CreateFormType.USER:
        return <CreateUser onChange={handleFieldChange} />

      case CreateFormType.PET:
        return <CreatePet onChange={handleFieldChange} />

      case CreateFormType.VETERINARIAN:
        return <CreateVeterinarian onChange={handleFieldChange} />

      default:
        return null
    }
  }, [type])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 items-center">{renderForm}</div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear
      </button>
    </form>
  )
}

export default CreateForm
