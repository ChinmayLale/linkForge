// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MiscState {
    value: number;
    showProgressBar?: boolean; // Optional property to control progress bar visibility
    isSaved?: boolean
    isPublished?: boolean
}

const initialState: MiscState = {
    value: 0,
    showProgressBar: false, // Default value for progress bar visibility
    isSaved: true,
    isPublished: true
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
        toggleProgressBar: (state) => {
            state.showProgressBar = !state.showProgressBar; // Toggle the visibility of the progress bar
        },
        toggleIsSaved: (state, action) => {
            state.isSaved = action.payload
        },
        toggleIsPublished: (state, action) => {
            state.isPublished = action.payload
        }
    },
});

export const { increment, decrement, setValue, toggleProgressBar, toggleIsSaved, toggleIsPublished } = miscSlice.actions;

export default miscSlice.reducer;
