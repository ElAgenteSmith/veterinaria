import React, { useState } from 'react'
import { ClimbingBoxLoader } from 'react-spinners'
import { FaPersonBooth } from 'react-icons/fa'
import { BsPersonLinesFill } from 'react-icons/bs'
import { useGetUsersQuery, useDeleteUserMutation } from 'api/users/usersSlice'
import Table from 'components/table/Table'
import Modal from 'components/modal/Modal'

const Users = () => {
  const [openModal, setOpenModal] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null)
  const [createUser, setCreateUser] = useState(false)
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
      <div className="flex gap-5 justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {createUser ? 'Crear un nuevo usuario' : 'Usuarios'}
        </h1>
        <BsPersonLinesFill size={50} />
      </div>
      <div className="mt-10 flex justify-center">
        {isLoading ? (
          <ClimbingBoxLoader size={30} color="#364173" loading />
        ) : !users?.length ? (
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-2xl">No se encontraron usuarios</h1>
            <FaPersonBooth size={70} />
          </div>
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={users}
              type="user"
              onDelete={(id) => onHandleDelete(id)}
            />
            <button
              onClick={() => setCreateUser(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
            >
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
