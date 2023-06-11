import { PetType } from 'api/pets/pets.types'

export interface CreateProps {
  onChange: (field: string, value: string) => void
}

export interface CreateFormProps {
  type: CreateFormType
  onCreate: (formData: FormDataType) => void
}

export type PetFormType = Omit<PetType, 'id'>

export type AttentionFormType = {
  fecha: string
  veterinario: string
  usuario: string
  mascota: string
  descripcion: string
  servicio: string
}

export type FormDataType = PetFormType | AttentionFormType

export enum CreateFormType {
  ATTENTION = 'attention',
  PET = 'pet',
}

export const petRequiredFields: (keyof PetFormType)[] = [
  'nombre',
  'edad',
  'raza',
]

export const attentionRequiredFields: (keyof AttentionFormType)[] = [
  'fecha',
  'veterinario',
  'usuario',
  'mascota',
  'descripcion',
  'servicio',
]
