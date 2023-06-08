import React, { useState } from 'react'
import { HashLoader } from 'react-spinners'
import Table from 'components/table/Table'
import {
  useGetVeterinariansQuery,
  useDeleteVeterinarianMutation,
} from 'api/veterinarians/veterinariansSlice'
import Modal from 'components/modal/Modal'

const Veterinarians = () => {
  const [openModal, setOpenModal] = useState(false)
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
      <h1 className="text-4xl font-bold mb-4 text-center">Veterinarios</h1>
      {/* agregar icono de usuario */}
      <div className="mt-10">
        {isLoading ? (
          <HashLoader className=" ml-20" size={80} color="#364173" loading />
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={veterinarians}
              type="veterinarian"
              onDelete={(id) => onHandleDelete(id)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
