import React, { useState, useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { LuDog } from 'react-icons/lu'

import {
  useGetPetsQuery,
  useDeletePetMutation,
  useLazyGetPetsByUserQuery,
  useAddPetMutation,
} from 'api/pets/petsSlice'
import Table from 'components/table/Table'
import Modal from 'components/modal/Modal'
import { useAuth } from 'state/AuthState'
import { AuthUserType } from 'api/auth/auth.types'
import CreateForm from 'components/create/CreateForm'
import { CreateFormType } from 'components/create/create.types'

const Pets = () => {
  const [openModal, setOpenModal] = useState(false)
  const [deletePetId, setDeletePetId] = useState<number | null>(null)
  const [createPet, setCreatePet] = useState(false)
  const { userAuth } = useAuth()
  const [deletePet] = useDeletePetMutation()
  const [getPetsByUser, { data: userPets, isLoading: isUserPetsLoading }] =
    useLazyGetPetsByUserQuery()
  const { data: pets, isLoading, error, isError } = useGetPetsQuery('getPets')
  const [addPet, { isLoading: isNewPetLoading }] = useAddPetMutation()

  useEffect(() => {
    if (userAuth?.tipoUsuario === AuthUserType.CLIENT)
      getPetsByUser(String(userAuth.autenticacionID))
  }, [getPetsByUser, userAuth?.autenticacionID, userAuth?.tipoUsuario])

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

  const onHandleCreatePet = (newPetForm: any) => {
    Object.assign(newPetForm, {
      usuario: {
        id: userAuth?.autenticacionID,
      },
    })
    addPet(newPetForm)
    if (!isNewPetLoading) setCreatePet(false)
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
        {createPet ? (
          <CreateForm type={CreateFormType.PET} onCreate={onHandleCreatePet} />
        ) : isUserPetsLoading || isLoading ? (
          <PacmanLoader size={60} color="#364173" loading />
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={
                (userAuth?.tipoUsuario as any) === AuthUserType.CLIENT
                  ? userPets
                  : pets
              }
              type="pet"
              onDelete={(id) => onHandleDelete(id)}
            />
            {(userAuth?.tipoUsuario as any) === AuthUserType.CLIENT && (
              <button
                onClick={() => setCreatePet(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Agregar Mascota
              </button>
            )}
          </div>
        )}
        {isError && <p>{error.toString()}</p>}
      </div>
      {openModal && (
        <Modal
          title="Eliminar mascota"
          description="Estas a punto de borrar la mascota.. ¿quieres continuar?"
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
