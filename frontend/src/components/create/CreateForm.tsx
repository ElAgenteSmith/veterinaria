import React, { useState, useMemo } from 'react'
import CreatePet from './CreatePet'
import {
  CreateFormProps,
  CreateFormType,
  FormDataType,
  attentionRequiredFields,
  petRequiredFields,
} from './create.types'
import CreateAttention from './CreateAttention'
import useCreateError from 'hooks/useCreateError'
import Snackbar from 'components/snackbar/Snackbar'

const CreateForm = ({ onCreate, type }: CreateFormProps) => {
  const [formData, setFormData] = useState({})
  const [missingFields, setMissingFields] = useState<string[]>(
    type === CreateFormType.PET ? petRequiredFields : attentionRequiredFields
  )
  const [createError, setCreateError] = useCreateError(false)

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prevFormData: FormDataType) => ({
      ...prevFormData,
      [field]: value,
    }))

    setMissingFields((prevMissingFields) =>
      prevMissingFields.filter((missingField) => missingField !== field)
    )
  }

  const renderForm = useMemo(() => {
    if (type === CreateFormType.ATTENTION) {
      return <CreateAttention onChange={handleFieldChange} />
    }

    if (type === CreateFormType.PET)
      return <CreatePet onChange={handleFieldChange} />
  }, [type])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (missingFields.length === 0) {
      onCreate(formData as FormDataType)
    } else {
      setCreateError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 items-center">{renderForm}</div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear
      </button>
      {createError && (
        <Snackbar message="Por favor, completa todos los campos obligatorios." />
      )}
    </form>
  )
}

export default CreateForm
