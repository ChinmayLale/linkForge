// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MiscState {
    value: number;
    showProgressBar?: boolean; // Optional property to control progress bar visibility
}

const initialState: MiscState = {
    value: 0,
    showProgressBar: false, // Default value for progress bar visibility
};

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        toggleProgressBar: (state ) => {
            state.showProgressBar = !state.showProgressBar; // Toggle the visibility of the progress bar
        },
    },
});

export const { increment, decrement, setValue , toggleProgressBar} = miscSlice.actions;

export default miscSlice.reducer;
