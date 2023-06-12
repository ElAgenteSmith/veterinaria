import { rootSlice } from 'api/rootSlice'
import { VeterinarianType } from './veterinarians.types'

export const veterinarianSlice = rootSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVeterinarians: builder.query<VeterinarianType[], string>({
      query: () => '/veterinarios',
      transformResponse: (res: VeterinarianType[]) =>
        res.sort((a: VeterinarianType, b: VeterinarianType) =>
          a.nombreCompleto.localeCompare(b.nombreCompleto)
        ),
      providesTags: ['Veterinarians'],
    }),
    getVeterinarian: builder.query<VeterinarianType, string>({
      query: (id) => `/veterinarios/${id}`,
      providesTags: ['Veterinarian'],
    }),
    addVeterinarian: builder.mutation({
      query: (user) => ({
        url: '/veterinarios',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Veterinarians'],
    }),
    updateVeterinarian: builder.mutation({
      query: (user) => ({
        url: `/veterinarios/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Veterinarian', 'Veterinarians'],
    }),
    deleteVeterinarian: builder.mutation({
      query: (id) => ({
        url: `/veterinarios/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Veterinarians'],
    }),
  }),
})

export const {
  useGetVeterinariansQuery,
  useGetVeterinarianQuery,
  useAddVeterinarianMutation,
  useDeleteVeterinarianMutation,
  useUpdateVeterinarianMutation,
} = veterinarianSlice
