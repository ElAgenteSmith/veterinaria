import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://veterinaria.us-east-2.elasticbeanstalk.com'

export const rootSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Users', 'User', 'Pets', 'Pet', 'Veterinarians', 'Veterinarian'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  endpoints: () => ({}),
})
