import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TabName {
    Dashboard = 'Dashboard',
    Links = 'Links',
    Design = 'Design',
    Analytics = 'Analytics',
    Settings = 'Settings',
}

interface NavState {
    tabName: TabName;
}

const initialState: NavState = {
    tabName: TabName.Dashboard,
}

const navigationSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setTabName: (state, action: PayloadAction<TabName>) => {
            state.tabName = action.payload;
        }
    },
})


export const { setTabName } = navigationSlice.actions;
export default navigationSlice.reducer;
