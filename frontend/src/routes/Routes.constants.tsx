import { ROLE } from '../types/roles'

interface RouteModel {
  path: string
  role: ROLE | null
  element?: () => JSX.Element
}

export const rootRoutes: RouteModel[] = [
  {
    path: '/login',
    role: null,
  },
]
