import React, { useState } from 'react'
import { CreateProps } from './create.types'
import { useGetVeterinariansQuery } from 'api/veterinarians/veterinariansSlice'
import { BarLoader } from 'react-spinners'
import { useAuth } from 'state/AuthState'
import { useGetPetsByUserQuery } from 'api/pets/petsSlice'

const CreateAttention = ({ onChange }: CreateProps) => {
  const { userAuth } = useAuth()
  const { data: userPets, isLoading: isUserPetsLoading } =
    useGetPetsByUserQuery(String(userAuth?.autenticacionID))

  const [currentUserPet, setCurrentUserPet] = useState<string | null>(
    userPets ? userPets[0].nombre : null
  )

  const { data: veterinarians, isLoading: isVeterinariansLoading } =
    useGetVeterinariansQuery('getVeterinarians')

  const [currentVeterinarian, setCurrentVeterinarian] = useState<string | null>(
    veterinarians ? veterinarians[0].nombreCompleto : null
  )

  const handleVetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentVeterinarian(event.currentTarget.value)
    onChange('veterinario', event.currentTarget.value)
  }

  const handleUserPetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserPet(event.currentTarget.value)
    onChange('mascota', event.currentTarget.value)
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="date" className="mr-2">
          Fecha
        </label>
        <input
          type="date"
          id="date"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('fecha', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="veterinarian" className="mr-2">
          Veterinario
        </label>
        {isVeterinariansLoading ? (
          <BarLoader color="#364173" />
        ) : (
          <select
            value={String(currentVeterinarian)}
            onChange={handleVetChange}
            className="border border-gray-400 rounded py-2 px-4"
          >
            {veterinarians?.map((vet) => (
              <option key={vet.id} value={vet.nombreCompleto}>
                {vet.nombreCompleto}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="user" className="mr-2">
          Usuario
        </label>
        <input
          type="text"
          id="user"
          className="border border-gray-400 rounded py-2 px-4"
          disabled
          value={userAuth?.nombreUsuario}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="veterinarian" className="mr-2">
          Mascotas
        </label>
        {isUserPetsLoading ? (
          <BarLoader color="#364173" />
        ) : !userPets?.length ? (
          <h4>Debes registrar primero una mascota</h4>
        ) : (
          <select
            value={String(currentUserPet)}
            onChange={handleUserPetChange}
            className="border border-gray-400 rounded py-2 px-4"
          >
            {userPets?.map((pet) => (
              <option value={pet.nombre} key={pet.id}>
                {pet.nombre}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        <label htmlFor="description" className="mr-2">
          Descripción
        </label>
        <textarea
          id="description"
          className="h-40 px-4 py-2 border border-gray-300 rounded-md resize-y"
          onChange={(e) => onChange('descripcion', e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="service" className="mr-2">
          Servicio
        </label>
        <input
          type="text"
          id="service"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('servicio', e.target.value)}
        />
      </div>
    </div>
  )
}

export default CreateAttention
