import { RoleType } from 'types/roles'

export interface SingUp {
  singUp: SingUpType
  loading: boolean
  error?: null | Error
}

type SingUpType = {
  fullName: string
  password: string
  role: RoleType
}
