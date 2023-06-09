import { useState, useEffect } from 'react'

const useCreateError = (
  initialValue: boolean
): [boolean, (isError: boolean) => void] => {
  const [createError, setCreateError] = useState(initialValue)

  const updateError = (isError: boolean) => {
    setCreateError(isError)
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    if (createError) {
      timer = setTimeout(() => {
        setCreateError(false)
      }, 4000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [createError])

  return [createError, updateError]
}

export default useCreateError
