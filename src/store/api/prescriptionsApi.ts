import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Prescription } from '../../types/TypesForAll'

const BASE_URL = 'https://69b29283e06ef68ddd958628.mockapi.io'

export const prescriptionsApi = createApi({
    reducerPath: 'prescriptionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Prescription'],
    endpoints: (builder) => ({

        getPrescriptions: builder.query<Prescription[], void>({
            query: () => '/prescriptions',
            providesTags: ['Prescription'],
        }),

        addPrescription: builder.mutation<Prescription, Partial<Prescription>>({
            query: (body) => ({
                url: '/prescriptions',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Prescription'],
        }),

        updatePrescription: builder.mutation<Prescription, Partial<Prescription> & { id: string }>({
            query: ({ id, ...body }) => ({
                url: `/prescriptions/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Prescription'],
        }),

        deletePrescription: builder.mutation<void, string>({
            query: (id) => ({
                url: `/prescriptions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Prescription'],
        }),

    }),
})

export const {
    useGetPrescriptionsQuery,
    useAddPrescriptionMutation,
    useUpdatePrescriptionMutation,
    useDeletePrescriptionMutation,
} = prescriptionsApi
