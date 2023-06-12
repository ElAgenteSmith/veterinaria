export const table: tableType = {
  user: ['Nombre', 'Cédula', 'Fecha de ingreso', 'Dirección'],
  veterinarian: ['Nombre', 'Cédula', 'Fecha de registro'],
  pet: ['Nombre', 'Raza', 'Edad'],
  attentions: [
    'Fecha',
    'Usuario',
    'Veterinario',
    'Mascota',
    'Servicio',
    'Descripcion',
  ],
}

type tableType = {
  user: string[]
  veterinarian: string[]
  pet: string[]
  attentions: string[]
}
