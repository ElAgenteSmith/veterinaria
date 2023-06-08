import React, { useState } from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import Table from 'components/table/Table'
import { useGetUsersQuery, useDeleteUserMutation } from 'api/users/usersSlice'
import Modal from 'components/modal/Modal'

const Users = () => {
  const [openModal, setOpenModal] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null)
  const [deleteUser] = useDeleteUserMutation()
  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useGetUsersQuery('getUsers')

  const onHandleDelete = (id: number) => {
    setOpenModal(true)
    setDeleteUserId(id)
  }

  const onHandleReject = () => {
    setOpenModal(false)
    setDeleteUserId(null)
  }

  const onHandleAccept = () => {
    if (deleteUserId) {
      deleteUser(deleteUserId)
    }
    setDeleteUserId(null)
    setOpenModal(false)
  }

  return (
    <div className="p-20 flex flex-col justify-center align-center gap-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Usuarios</h1>{' '}
      {/* agregar icono de usuario */}
      <div className="mt-10">
        {isLoading ? (
          <ClimbingBoxLoader size={30} color="#364173" loading />
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={users}
              type="user"
              onDelete={(id) => onHandleDelete(id)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Agregar usuario
            </button>
          </div>
        )}
        {isError && <p>{error.toString()}</p>}
      </div>
      {openModal && (
        <Modal
          title="Eliminar usuario"
          description="Estas a punto de borrar el usuario.. ¿quieres continuar?"
          onClick={onHandleAccept}
          acceptLabel="Aceptar"
          rejectLabel="Rechazar"
          onClose={onHandleReject}
        />
      )}
    </div>
  )
}

export default Users
