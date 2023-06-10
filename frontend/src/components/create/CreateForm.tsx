import React, { useState } from 'react'
import CreatePet from './CreatePet'
import { CreateFormProps, FormDataType } from './create.types'

const CreateForm = ({ onCreate }: CreateFormProps) => {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 items-center">
        <CreatePet onChange={handleFieldChange} />
      </div>
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
