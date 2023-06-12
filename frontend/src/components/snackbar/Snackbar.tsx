import React from 'react'

type SnackbarProps = {
  message: string
}

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
      <p>{message}</p>
    </div>
  )
}

export default Snackbar
