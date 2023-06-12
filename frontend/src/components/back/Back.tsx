import React from 'react'

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      volver atras
    </button>
  )
}

export default BackButton
