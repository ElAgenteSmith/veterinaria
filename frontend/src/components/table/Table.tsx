import React from 'react'
import { table } from './table.const'
import { TableProps } from './table.types'
import { getColumnValues } from 'utils/columnValues'
import { useNavigate, useLocation } from 'react-router-dom'

const Table: React.FC<TableProps> = ({ records, type, onDelete }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <table className="min-w-full border border-gray-300 ">
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
        {records.map((record, index) => (
          <tr key={index} className="border-b cursor-pointer hover:bg-blue-300">
            {getColumnValues(record, type).map((value, index) => (
              <td
                key={index}
                className="py-2 px-4"
                onClick={() => navigate(`${pathname}/${record.id}`)}
              >
                {value instanceof Date
                  ? value.toDateString()
                  : value?.toString()}
              </td>
            ))}
            <td className="py-2 px-4 text-center">
              <button onClick={() => onDelete(record?.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-red-600 hover:text-red-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 015.74 13.41l3.61 3.61-1.42 1.42-3.61-3.61A8 8 0 112 10zm4 6a1 1 0 11-2 0V8a1 1 0 112 0v6zm-4 0a1 1 0 11-2 0V8a1 1 0 112 0v6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
