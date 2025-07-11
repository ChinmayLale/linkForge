// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import miscSlice from '@/store/slices/miscSlice';

export const store = configureStore({
    reducer: {
        misc: miscSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
