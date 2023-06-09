import { rootSlice } from 'api/rootSlice'
import { PetType } from './pets.types'

export const petsSlice = rootSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<PetType[], string>({
      query: () => '/mascotas',
      transformResponse: (res: PetType[]) =>
        res.sort((a: PetType, b: PetType) => a.nombre.localeCompare(b.nombre)),
      providesTags: ['Pets'],
    }),
    getPet: builder.query<PetType, string>({
      query: (id) => `/mascotas/${id}`,
      providesTags: ['Pet'],
    }),
    addPet: builder.mutation({
      query: (user) => ({
        url: '/mascotas',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Pets'],
    }),
    updatePet: builder.mutation({
      query: (user) => ({
        url: `/mascotas/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Pet', 'Pets'],
    }),
    deletePet: builder.mutation({
      query: (id) => ({
        url: `/mascotas/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Pets'],
    }),
  }),
})

export const {
  useGetPetsQuery,
  useGetPetQuery,
  useAddPetMutation,
  useUpdatePetMutation,
  useDeletePetMutation,
} = petsSlice
