import React, { useState } from 'react'
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
      <h1 className="text-4xl font-bold mb-4 text-center">Users</h1>
      <div className="mt-20">
        {isLoading ? (
          <p>Loading...</p> // spinner
        ) : (
          <Table
            records={users}
            type="user"
            onDelete={(id) => onHandleDelete(id)}
          />
        )}
        {isError && <p>{error.toString()}</p>}
      </div>
      {openModal && (
        <Modal
          title="Eliminar usuario"
          description="Estas a punto de borrar el usuario.. ¿quieres continuar?"
          onClick={onHandleAccept}
          acceptLabel="aceptar"
          rejectLabel="rechazar"
          onClose={onHandleReject}
        />
      )}
    </div>
  )
}

export default Users
