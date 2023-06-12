import { rootSlice } from 'api/rootSlice'
import { AuthType } from './auth.types'

export const authSlice = rootSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuth: builder.query<
      AuthType,
      { nombreUsuario: string; password: string }
    >({
      query: ({
        nombreUsuario,
        password,
      }: {
        nombreUsuario: string
        password: string
      }) => `/usuarios-autenticacion/${nombreUsuario}/${password}`,
      providesTags: ['Auth'],
    }),
    addUserAuth: builder.mutation({
      query: (user) => ({
        url: '/usuarios-autenticacion',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useAddUserAuthMutation, useLazyGetAuthQuery } = authSlice
