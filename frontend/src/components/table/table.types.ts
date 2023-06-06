import { UserType } from 'redux/users/users.types'
import { VeterinarianType } from 'redux/veterinarians/veterinarians.types'
import { PetType } from 'redux/pets/pets.types'

export type Record = UserType | VeterinarianType | PetType

export interface TableProps {
  records: Record[]
  type: 'user' | 'veterinarian' | 'pet'
  onDelete: (id: number) => void
}
