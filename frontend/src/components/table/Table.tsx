import React from 'react'
import { table } from './table.const'
import { TableProps } from './table.types'
import { getColumnValues } from 'utils/columnValues'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'

const Table: React.FC<TableProps> = ({ records, type, onDelete }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <table className="shadow-sm">
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
            key={record.id}
            className="border-b cursor-pointer hover:bg-blue-300"
          >
            {getColumnValues(record, type).map((value, index) => (
              <td
                key={index}
                className="py-2 px-4 "
                onClick={() => navigate(`${pathname}/${record.id}`)}
              >
                {value?.toString()}
              </td>
            ))}
            <td className="py-2 px-4 text-center">
              <MdDeleteOutline onClick={() => onDelete(record.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
