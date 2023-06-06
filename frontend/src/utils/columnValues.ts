import { Record } from 'components/table/table.types'
import { UserType } from 'redux/users/users.types'
import { VeterinarianType } from 'redux/veterinarians/veterinarians.types'
import { PetType } from 'redux/pets/pets.types'

export const getColumnValues = (record: Record, type: string) => {
  switch (type) {
    case 'user':
      const user = record as UserType
      return [
        user.name,
        user.identification,
        user.dateOfAdmission,
        user.direction,
      ]
    case 'veterinarian':
      const veterinarian = record as VeterinarianType
      return [
        veterinarian.name,
        veterinarian.identification,
        veterinarian.registrationDate,
      ]
    case 'pet':
      const pet = record as PetType
      return [pet.name, pet.breed, pet.age]
    default:
      return []
  }
}
