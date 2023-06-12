export type AuthType = {
  autenticacionID: number | null
  rol: AuthRole
  nombreUsuario: string
  password: string
  tipoUsuario: AuthUserType | null
}

export enum AuthRole {
  ADMIN = 'Administrador',
  USER = 'Usuario',
}

export enum AuthUserType {
  CLIENT = 'Cliente',
  VETERINARIAN = 'Veterinario',
}
