import React, { useState } from 'react'

const Item = ({
  label,
  isEditable = false,
  editedValue,
  onValueChange,
}: {
  label: string
  isEditable?: boolean
  editedValue?: string | number
  onValueChange?: (value: string) => void
}) => {
  const [value, setValue] = useState(editedValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (onValueChange) onValueChange(e.target.value)
  }

  return (
    <p>
      <strong className="font-medium">{label}: </strong>
      {isEditable ? (
        <input
          type={typeof editedValue === 'number' ? 'number' : 'text'}
          value={value}
          onChange={handleChange}
          className="border border-gray-300 px-2 py-1 rounded"
        />
      ) : (
        value
      )}
    </p>
  )
}

export default Item
