import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    username: string;
    name?: string; // Optional property to control progress bar visibility
}

const initialState: userState = {
    username: "",
    name: "", // Default value for progress bar visibility
};


const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUsernameSlice: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setName: (state, action: PayloadAction<string | undefined>) => {
            state.name = action.payload;
        },
    },
})


export const { setUsernameSlice, setName } = userSlice.actions;
export default userSlice.reducer;