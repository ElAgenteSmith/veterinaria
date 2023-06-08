import React, { useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import { SiDatadog } from 'react-icons/si'
import Table from 'components/table/Table'
import { useGetPetsQuery, useDeletePetMutation } from 'api/pets/petsSlice'
import Modal from 'components/modal/Modal'

const Pets = () => {
  const [openModal, setOpenModal] = useState(false)
  const [deletePetId, setDeletePetId] = useState<number | null>(null)
  const [deletePet] = useDeletePetMutation()
  const { data: pets, isLoading, error, isError } = useGetPetsQuery('getPets')

  const onHandleDelete = (id: number) => {
    setOpenModal(true)
    setDeletePetId(id)
  }

  const onHandleReject = () => {
    setOpenModal(false)
    setDeletePetId(null)
  }

  const onHandleAccept = () => {
    if (deletePetId) {
      deletePet(deletePetId)
    }
    setDeletePetId(null)
    setOpenModal(false)
  }

  console.log(pets)
  return (
    <div className="p-20 flex flex-col justify-center align-center gap-10">
      <div className="flex gap-1">
        <h1 className="text-4xl font-bold mb-4 text-center">Mascotas</h1>
        <SiDatadog />
      </div>
      {/* cambiar a icono de mascota */}
      <div className="mt-10">
        {isLoading ? (
          <PacmanLoader size={60} color="#364173" loading />
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={pets}
              type="pet"
              onDelete={(id) => onHandleDelete(id)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Agregar Mascota
            </button>
          </div>
        )}
        {isError && <p>{error.toString()}</p>}
      </div>
      {openModal && (
        <Modal
          title="Eliminar mascota"
          description="Estas a punto de borrar la mascota.. ¿quieres continuar?" //incluir nombre? + emote triste
          onClick={onHandleAccept}
          acceptLabel="Aceptar"
          rejectLabel="Rechazar"
          onClose={onHandleReject}
        />
      )}
    </div>
  )
}

export default Pets
