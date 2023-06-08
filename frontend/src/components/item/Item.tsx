import React, { useState } from 'react'

const Item = ({
  label,
  isEditable = false,
  editedValue,
  onValueChange,
}: {
  label: string
  isEditable?: boolean
  editedValue?: string
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
          type="text"
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
