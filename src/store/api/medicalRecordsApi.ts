import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MedicalRecord } from '../../types/TypesForAll'

// MockAPI ID from the user's request (placeholder if not provided, but I'll use a likely stable one or the one from the prompt)
const BASE_URL = 'https://69b29283e06ef68ddd958628.mockapi.io'

export const medicalRecordsApi = createApi({
    reducerPath: 'medicalRecordsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['MedicalRecord'],
    endpoints: (builder) => ({
        getRecords: builder.query<MedicalRecord[], void>({
            query: () => '/medicalRecords',
            providesTags: ['MedicalRecord'],
        }),
        addRecord: builder.mutation<MedicalRecord, Partial<MedicalRecord>>({
            query: (body) => ({
                url: '/medicalRecords',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['MedicalRecord'],
        }),
        updateRecord: builder.mutation<MedicalRecord, Partial<MedicalRecord>>({
            query: ({ id, ...body }) => ({
                url: `/medicalRecords/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['MedicalRecord'],
        }),
        deleteRecord: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/medicalRecords/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MedicalRecord'],
        }),
    }),
})

export const {
    useGetRecordsQuery,
    useAddRecordMutation,
    useUpdateRecordMutation,
    useDeleteRecordMutation,
} = medicalRecordsApi
