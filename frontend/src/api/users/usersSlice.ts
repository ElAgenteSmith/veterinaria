import { rootSlice } from 'api/rootSlice'
import { UserType } from './users.types'

const usersSlice = rootSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], string>({
      query: () => '/usuarios',
      transformResponse: (res: UserType[]) =>
        res.sort((a: UserType, b: UserType) =>
          a.nombreCompleto.localeCompare(b.nombreCompleto)
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
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `usuarios/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User', 'Users'],
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
