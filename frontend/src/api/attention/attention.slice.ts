import { rootSlice } from 'api/rootSlice'
import { AttentionType } from './attention.types'

export const attentionSlice = rootSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttentions: builder.query<AttentionType[], string>({
      query: () => '/atenciones',
      providesTags: ['Attentions'],
    }),
    getAttentionById: builder.query<AttentionType, string>({
      query: (id) => `/atenciones/${id}`,
      providesTags: ['Attention'],
    }),
    addAttention: builder.mutation({
      query: (user) => ({
        url: '/atenciones',
        method: 'POST',
        body: user,
      }),
    }),
    deteteAttention: builder.mutation({
      query: (id) => ({
        url: `/atenciones/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Attentions'],
    }),
  }),
})

export const {
  useAddAttentionMutation,
  useGetAttentionsQuery,
  useDeteteAttentionMutation,
  useGetAttentionByIdQuery,
} = attentionSlice
