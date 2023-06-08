import { UserType } from 'api/users/users.types'
import { VeterinarianType } from 'api/veterinarians/veterinarians.types'
import { PetType } from 'api/pets/pets.types'

export type Record = UserType | VeterinarianType | PetType

export interface TableProps {
  records: Record[] | undefined
  type: 'user' | 'veterinarian' | 'pet'
  onDelete: (id: number) => void
}
