import React, { useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import { SiDatadog } from 'react-icons/si'
import { LuDog } from 'react-icons/lu'

import { useGetPetsQuery, useDeletePetMutation } from 'api/pets/petsSlice'
import Table from 'components/table/Table'
import Modal from 'components/modal/Modal'

const Pets = () => {
  const [openModal, setOpenModal] = useState(false)
  const [deletePetId, setDeletePetId] = useState<number | null>(null)
  const [createPet, setCreatePet] = useState(false)
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

  return (
    <div className="p-20 flex flex-col justify-center align-center gap-10">
      <div className="flex gap-5 justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {createPet ? 'Crear una nueva mascota' : 'Pets'}
        </h1>
        <LuDog size={50} />
      </div>
      <div className="mt-10 flex justify-center">
        {isLoading ? (
          <PacmanLoader size={60} color="#364173" loading />
        ) : !pets?.length ? (
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-2xl">No se encontraron mascotas</h1>
            <SiDatadog size={70} />
          </div>
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={pets}
              type="pet"
              onDelete={(id) => onHandleDelete(id)}
            />
            <button
              onClick={() => setCreatePet(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
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
