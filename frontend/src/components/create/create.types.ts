import { UserType } from 'api/users/users.types'
import { PetType } from 'api/pets/pets.types'
import { VeterinarianType } from 'api/veterinarians/veterinarians.types'

export interface CreateProps {
  onChange: (field: string, value: string) => void
}

export interface CreateFormProps {
  type?: CreateFormType.USER | CreateFormType.PET | CreateFormType.VETERINARIAN
  onCreate: (formData: FormDataType) => void
}

export type UserFormType = Omit<UserType, 'id'>
export type PetFormType = Omit<PetType, 'id'>
export type VeterinarianFormType = Omit<VeterinarianType, 'id'>

export type FormDataType = UserFormType | PetFormType | VeterinarianFormType

export enum CreateFormType {
  USER = 'user',
  PET = 'pet',
  VETERINARIAN = 'veterinarian',
}

export const userRequiredFields: (keyof UserFormType)[] = [
  'nombreCompleto',
  'cedula',
  'fechaIngreso',
  'direccion',
]

export const petRequiredFields: (keyof PetFormType)[] = [
  'nombre',
  'edad',
  'raza',
]

export const veterinarianRequiredFields: (keyof VeterinarianFormType)[] = [
  'nombreCompleto',
  'cedula',
  'fechaRegistro',
]
