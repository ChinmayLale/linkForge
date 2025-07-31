// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import miscSlice from '@/store/slices/miscSlice';
import NavSlice from "@/store/slices/navigationSlice"
import UserSlice from "@/store/slices/userSlice"

export const store = configureStore({
    reducer: {
        misc: miscSlice,
        nav: NavSlice,
        user: UserSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
