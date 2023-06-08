export const table: tableType = {
  user: ['Nombre', 'Cedula', 'Fecha de ingreso', 'Direccion'],
  veterinarian: ['Nombrew', 'Cedula', 'Fecha de registro'],
  pet: ['Nombre', 'Raza', 'Edad'],
}

type tableType = {
  user: string[]
  veterinarian: string[]
  pet: string[]
}
