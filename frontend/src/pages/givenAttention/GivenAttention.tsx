import React, { useState } from 'react'
import CreateForm from 'components/create/CreateForm'
import { HiOutlineDocument } from 'react-icons/hi'
import { useAuth } from 'state/AuthState'
import { AuthUserType } from 'api/auth/auth.types'
import { PropagateLoader } from 'react-spinners'
import { CreateFormType } from 'components/create/create.types'
import Table from 'components/table/Table'
import Modal from 'components/modal/Modal'
import {
  useGetAttentionsQuery,
  useDeteteAttentionMutation,
} from 'api/attention/attention.slice'

const GivenAttention = () => {
  const [createAttention, setCreateAttention] = useState(false)
  const [deleteAttentionId, setDeleteAttentionId] = useState<number | null>(
    null
  )
  const [deleteAttention] = useDeteteAttentionMutation()
  const [openModal, setOpenModal] = useState(false)
  const {
    data: attentions,
    isLoading,
    isError,
    error,
  } = useGetAttentionsQuery('getAttentions')
  const { userAuth } = useAuth()

  const onHandleCreatePet = (newAttentionForm: any) => {
    Object.assign(newAttentionForm, {
      usuario: userAuth?.nombreUsuario,
    })
    setCreateAttention(false)
  }

  const onHandleReject = () => {
    setOpenModal(false)
    setDeleteAttentionId(null)
  }

  const onHandleAccept = () => {
    if (deleteAttentionId) {
      deleteAttention(deleteAttentionId)
    }
    setDeleteAttentionId(null)
    setOpenModal(false)
  }

  const onHandleDelete = (id: number) => {
    setOpenModal(true)
    setDeleteAttentionId(id)
  }

  return (
    <div
      className={`p-20 flex flex-col justify-center align-center ${
        createAttention ? '' : 'gap-10'
      }`}
    >
      <div className="flex gap-5 justify-center items-center">
        <h1 className="text-4xl font-bold  text-center">
          {createAttention ? 'Crear atención' : 'Atenciones prestadas'}
        </h1>
        <HiOutlineDocument size={50} />
      </div>
      <div className="mt-10 flex justify-center">
        {createAttention ? (
          <CreateForm
            type={CreateFormType.ATTENTION}
            onCreate={onHandleCreatePet}
          />
        ) : isLoading ? (
          <PropagateLoader size={20} color="#364173" loading />
        ) : (
          <div className="flex flex-col gap-10 items-center">
            <Table
              records={attentions}
              type="attentions"
              onDelete={(id) => onHandleDelete(id)}
            />
            {(userAuth?.tipoUsuario as any) === AuthUserType.CLIENT && (
              <button
                onClick={() => setCreateAttention(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Crear atención
              </button>
            )}
          </div>
        )}
        {isError && <p>{error.toString()}</p>}
        {openModal && (
          <Modal
            title="Eliminar Atencion"
            description="Estas a punto de borrar la atencion prestada.. ¿quieres continuar?"
            onClick={onHandleAccept}
            acceptLabel="Aceptar"
            rejectLabel="Rechazar"
            onClose={onHandleReject}
          />
        )}
      </div>
    </div>
  )
}

export default GivenAttention
