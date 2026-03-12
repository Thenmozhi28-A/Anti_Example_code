import { configureStore } from '@reduxjs/toolkit'
import { medicalRecordsApi } from './api/medicalRecordsApi'
import { prescriptionsApi } from './api/prescriptionsApi'

export const store = configureStore({
    reducer: {
        [medicalRecordsApi.reducerPath]: medicalRecordsApi.reducer,
        [prescriptionsApi.reducerPath]: prescriptionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(medicalRecordsApi.middleware)
            .concat(prescriptionsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
