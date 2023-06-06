export const table: tableType = {
  user: ['Name', 'Identification', 'Date of admission', 'Direction'],
  veterinarian: ['Name', 'Identification', 'Registration date'],
  pet: ['Name', 'Breed', 'Age'],
}

type tableType = {
  user: string[]
  veterinarian: string[]
  pet: string[]
}
