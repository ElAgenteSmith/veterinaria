import React from 'react'
import { CreateProps } from './create.types'

const CreatePet = ({ onChange }: CreateProps) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="pet-name" className="mr-2">
          Nombre
        </label>
        <input
          type="text"
          id="pet-name"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('nombre', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="breed" className="mr-2">
          Raza
        </label>
        <input
          type="text"
          id="breed"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('raza', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="breed" className="mr-2">
          Edad
        </label>
        <input
          type="number"
          id="age"
          className="border border-gray-400 rounded py-2 px-4"
          onChange={(e) => onChange('edad', e.target.value)}
        />
      </div>
    </div>
  )
}

export default CreatePet
