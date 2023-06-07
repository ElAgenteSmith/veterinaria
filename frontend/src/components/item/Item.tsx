import React, { useState } from 'react'

const Item = ({
  label,
  title,
  isEditable = false,
}: {
  label: string
  title: string
  isEditable?: boolean
}) => {
  const [value, setValue] = useState(title)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
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
