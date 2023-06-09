import React from 'react'
import { CreateProps } from './create.types'

const CreateUser = ({ onChange }: CreateProps) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-2">
        <label htmlFor="identification" className="mr-2">
          Cédula:
        </label>
        <input
          type="text"
          id="identification"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('cedula', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="user-name" className="mr-2">
          Nombre completo:
        </label>
        <input
          type="text"
          id="user-name"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('nombreCompleto', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="start-date" className="mr-2">
          Fecha de ingreso:
        </label>
        <input
          type="date"
          id="start-date"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('fechaIngreso', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="direction" className="mr-2">
          Dirección:
        </label>
        <input
          type="text"
          id="direction"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('direccion', e.target.value)}
        />
      </div>
    </div>
  )
}

export default CreateUser
