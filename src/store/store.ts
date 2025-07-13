// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import miscSlice from '@/store/slices/miscSlice';
import NavSlice from "@/store/slices/navigationSlice"

export const store = configureStore({
    reducer: {
        misc: miscSlice,
        nav: NavSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
