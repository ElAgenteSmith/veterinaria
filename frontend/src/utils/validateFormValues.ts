export const validateDataForm = (
  event: React.FormEvent<HTMLFormElement>,
  type: 'auth' | 'client' | 'veterinarian'
) => {
  const fullName = (
    event.currentTarget.elements.namedItem('full-name') as any
  ).value.trim()
  const password = (event.currentTarget.elements.namedItem('password') as any)
    .value

  if (!fullName || !password) {
    return null
  }

  if (type === 'auth') {
    return {
      nombreUsuario: fullName,
      password,
    }
  }

  const id = (
    event.currentTarget.elements.namedItem('identification') as any
  ).value.trim()
  const startDate = (
    event.currentTarget.elements.namedItem('start-date') as any
  ).value.trim()

  if (!id || !startDate) {
    return null
  }

  const user = {
    nombreCompleto: fullName,
    cedula: id,
  }

  if (type === 'client') {
    const direction = (
      event.currentTarget.elements.namedItem('direction') as any
    ).value

    if (!direction) {
      return null
    }

    Object.assign(user, {
      fechaIngreso: startDate,
      direccion: direction,
    })
  }

  if (type === 'veterinarian') {
    Object.assign(user, {
      fechaRegistro: startDate,
    })
  }

  return user
}
