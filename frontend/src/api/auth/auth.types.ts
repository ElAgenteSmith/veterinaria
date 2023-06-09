export type AuthType = {
  rol: AuthRole
  nombreUsuario: string
  password: string
}

export enum AuthRole {
  ADMIN = 'Administrador',
  USER = 'Usuario',
}
