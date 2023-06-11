import { UserType } from 'api/users/users.types'

export interface PetType {
  id: number
  nombre: string
  raza: string
  edad: number
  usuario: UserType
}
