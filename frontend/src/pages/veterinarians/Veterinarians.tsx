import React, { useState } from 'react'
import { HashLoader } from 'react-spinners'
import { GiDoctorFace, GiPlagueDoctorProfile } from 'react-icons/gi'
import Table from 'components/table/Table'
import {
  useGetVeterinariansQuery,
  useDeleteVeterinarianMutation,
} from 'api/veterinarians/veterinariansSlice'
import Modal from 'components/modal/Modal'

const Veterinarians = () => {
  const [openModal, setOpenModal] = useState(false)
  const [createVeterinarian, setCreateVeterinarian] = useState(false)
  const [deleteVeterinarianId, setDeleteVeterinarianId] = useState<
    number | null
  >(null)

  const [deleteVeterinarian] = useDeleteVeterinarianMutation()
  const {
    data: veterinarians,
    isLoading,
    error,
    isError,
  } = useGetVeterinariansQuery('getVeterinarians')

  const onHandleDelete = (id: number) => {
    setOpenModal(true)
    setDeleteVeterinarianId(id)
  }

  const onHandleReject = () => {
    setOpenModal(false)
    setDeleteVeterinarianId(null)
  }

  const onHandleAccept = () => {
    if (deleteVeterinarianId) {
      deleteVeterinarian(deleteVeterinarianId)
    }
    setDeleteVeterinarianId(null)
    setOpenModal(false)
  }

  return (
    <div className="p-20 flex flex-col justify-center align-center gap-10">
      <div className="flex gap-5 justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {createVeterinarian ? 'Crear un nuevo veterinario' : 'Veterinarios'}
        </h1>
        <GiDoctorFace size={50} />
      </div>

      <div className="mt-10 flex justify-center">
        {isLoading ? (
          <HashLoader className=" ml-20" size={80} color="#364173" loading />
        ) : !veterinarians?.length ? (
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-2xl">No se encontraron veterinarios</h1>
            <GiPlagueDoctorProfile size={70} />
          </div>
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={veterinarians}
              type="veterinarian"
              onDelete={(id) => onHandleDelete(id)}
            />
            <button
              onClick={() => setCreateVeterinarian(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
            >
              Agregar Veterinario
            </button>
          </div>
        )}
        {isError && <p>{error.toString()}</p>}
      </div>
      {openModal && (
        <Modal
          title="Eliminar veterinario"
          description="Estas a punto de borrar el veterinario.. ¿quieres continuar?"
          onClick={onHandleAccept}
          acceptLabel="Aceptar"
          rejectLabel="Rechazar"
          onClose={onHandleReject}
        />
      )}
    </div>
  )
}

export default Veterinarians
