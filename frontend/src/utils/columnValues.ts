import { PetType } from 'api/pets/pets.types'
import { UserType } from 'api/users/users.types'
import { VeterinarianType } from 'api/veterinarians/veterinarians.types'
import { Record } from 'components/table/table.types'

export const getColumnValues = (record: Record, type: string) => {
  switch (type) {
    case 'user':
      const user = record as UserType
      return [
        user.nombreCompleto,
        user.cedula,
        user.fechaIngreso,
        user.direccion,
      ]
    case 'veterinarian':
      const veterinarian = record as VeterinarianType
      return [
        veterinarian.nombreCompleto,
        veterinarian.cedula,
        veterinarian.fechaRegistro,
      ]
    case 'pet':
      const pet = record as PetType
      return [pet.nombre, pet.raza, pet.edad]
    default:
      return []
  }
}
