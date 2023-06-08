import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserType } from './users.types'

export const usersSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
  }),
  tagTypes: ['Users', 'User'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], string>({
      query: () => '/usuarios',
      transformResponse: (res: UserType[]) =>
        res.sort((a: UserType, b: UserType) =>
          a.nombre.localeCompare(b.nombre)
        ),
      providesTags: ['Users'],
    }),
    getUser: builder.query<UserType, string>({
      query: (id) => `/usuarios/${id}`,
      providesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: 'usuarios',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `usuarios/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/usuarios/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersSlice
