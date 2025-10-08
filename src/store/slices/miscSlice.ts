// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface MiscState {
    value: number;
    showProgressBar?: boolean; // Optional property to control progress bar visibility
    isSaved?: boolean
    isPublished?: boolean
    totalClicks?: number
}

const initialState: MiscState = {
    value: 0,
    showProgressBar: false, // Default value for progress bar visibility
    isSaved: true,
    isPublished: true,
    totalClicks: 0
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
        },
        setTotalClicks: (state, action) => {
            const { links } = action.payload
            if (!links) {
                return;
            }
            // Calculate total clicks based on the links
            const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
            state.totalClicks = totalClicks
        }
    },
});

export const { increment, decrement, setValue, toggleProgressBar, toggleIsSaved, toggleIsPublished, setTotalClicks } = miscSlice.actions;

export default miscSlice.reducer;
