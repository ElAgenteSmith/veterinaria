import { UserType } from 'api/users/users.types'
import { VeterinarianType } from 'api/veterinarians/veterinarians.types'
import { PetType } from 'api/pets/pets.types'
import { AttentionType } from 'api/attention/attention.types'

export type Record = UserType | VeterinarianType | PetType | AttentionType

export interface TableProps {
  records: Record[] | undefined
  type: 'user' | 'veterinarian' | 'pet' | 'attentions'
  onDelete: (id: number) => void
}
