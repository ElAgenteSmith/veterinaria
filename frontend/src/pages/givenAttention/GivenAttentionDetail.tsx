import React from 'react'
import { useParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'
import { useGetAttentionByIdQuery } from 'api/attention/attention.slice'
import Item from 'components/item/Item'

const GivenAttentionDetail = () => {
  const { attentionId } = useParams()
  const { data: attention, isLoading } = useGetAttentionByIdQuery(
    attentionId ? attentionId : ''
  )

  return (
    <div className="flex flex-col items-center gap-5 mt-10">
      <div className="flex flex-col justify-center items-center gap-2 bg-gray-200 p-8">
        {isLoading ? (
          <PropagateLoader size={20} color="#364173" loading />
        ) : (
          attention && (
            <>
              <h2 className="font-bold mb-4 text-2xl">{attention.fecha}</h2>
              <div className="mt-10 flex flex-col gap-2">
                <Item label="Usuario" editedValue={attention.usuario} />
                <Item label="Mascota" editedValue={attention.mascota} />
                <Item label="Veterinario" editedValue={attention.veterinario} />
                <Item label="Servicio" editedValue={attention.servicio} />
                <Item label="Descripcion" editedValue={attention.descripcion} />
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default GivenAttentionDetail
