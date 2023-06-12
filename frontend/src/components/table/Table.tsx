import React, { useMemo } from 'react'
import { table } from './table.const'
import { TableProps } from './table.types'
import { getColumnValues } from 'utils/columnValues'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import { useAuth } from 'state/AuthState'
import { AuthRole, AuthUserType } from 'api/auth/auth.types'
import { SiDatadog } from 'react-icons/si'

const Table: React.FC<TableProps> = ({ records, type, onDelete }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { userAuth } = useAuth()

  const renderTitle = useMemo(() => {
    switch (type) {
      case 'pet':
        return 'Mascotas'
      case 'user':
        return 'Usuarios'
      case 'veterinarian':
        return 'Veterinarios'
      case 'attentions':
        return 'Atenciones'
      default:
        return null
    }
  }, [type])

  const renderDeleteItem = useMemo(() => {
    if (userAuth?.rol === AuthRole.ADMIN) return true
    if (
      userAuth?.tipoUsuario === AuthUserType.CLIENT &&
      (pathname === '/pets' || pathname === '/pets:petId')
    )
      return true
  }, [pathname, userAuth?.rol, userAuth?.tipoUsuario])
  return (
    <table className="shadow-sm">
      {!records?.length ? (
        <div className="flex justify-center items-center flex-col gap-4">
          <h1 className="text-2xl">No se encontraron {renderTitle}</h1>
          {type === 'pet' ? <SiDatadog size={70} /> : <> icono de atenciones</>}
        </div>
      ) : (
        <>
          <thead>
            <tr>
              {table[type].map((column, index) => (
                <th
                  key={index}
                  className="py-2 px-4 bg-gray-200 font-medium text-gray-700 border-b"
                >
                  {column}
                </th>
              ))}
              <th className="py-2 px-4 bg-gray-200 font-medium text-gray-700 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {records?.map((record) => (
              <tr
                key={
                  type !== 'attentions'
                    ? (record as any).id
                    : (record as any).atencionID
                }
                className="border-b cursor-pointer hover:bg-blue-300"
              >
                {getColumnValues(record, type).map((value, index) => (
                  <td
                    key={index}
                    className="py-2 px-4 "
                    onClick={() =>
                      navigate(
                        `${pathname}/${
                          type !== 'attentions'
                            ? (record as any).id
                            : (record as any).atencionID
                        }`
                      )
                    }
                  >
                    {value?.toString()}
                  </td>
                ))}
                <td className="py-2 px-4 text-center">
                  {renderDeleteItem && (
                    <MdDeleteOutline
                      onClick={() =>
                        onDelete(
                          type !== 'attentions'
                            ? (record as any).id
                            : (record as any).atencionID
                        )
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </table>
  )
}

export default Table
