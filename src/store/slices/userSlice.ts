import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userThunks } from '../thunks/user';

interface userState {
    username: string;
    name?: string;
    error?: string;
    loading: boolean; // <-- Add this
    email?: string;
    bio?: string;
    tags?: string[];
    themeId?: string;
    avatarUrl?: string;
    totalLinks?: number; // Optional property for total links
    totalClicks?: number; // Optional property for total views
    ctr?: number; // Optional property for click-through rate
}



const initialState: userState = {
    username: "",
    name: "",
    loading: false,
    error: undefined,
    email: "",
    bio: "", // Default value for user bio
    tags: [], // Default value for user tags
    themeId: "", // Default value for user theme ID
    avatarUrl: "", // Default value for user avatar URL
    totalLinks: 0,
    totalClicks: 0,
    ctr: 0
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
        setDesc: (state, action: PayloadAction<string | undefined>) => {
            state.bio = action.payload;
        },
        setPfp: (state, action: PayloadAction<string | undefined>) => {
            state.avatarUrl = action.payload;
        },
        setUserProfile: (state, action: PayloadAction<Partial<userState>>) => {
            const { username, name, bio, avatarUrl } = action.payload;
            if (username !== undefined) state.username = username;
            if (name !== undefined) state.name = name;
            if (bio !== undefined) state.bio = bio;
            if (avatarUrl !== undefined) state.avatarUrl = avatarUrl;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userThunks.getUserProfileThunk.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(userThunks.getUserProfileThunk.fulfilled, (state, action: PayloadAction<userState>) => {
            const { username, name, bio, avatarUrl, tags, email, themeId, totalClicks, totalLinks: linksCount, ctr } = action.payload;
            state.username = username;
            state.name = name || "";
            state.bio = bio || "";
            state.avatarUrl = avatarUrl || "";
            state.tags = tags || [];
            state.email = email || "";
            state.themeId = themeId || "";
            state.error = undefined; // Clear any previous error
            state.loading = false;
            state.totalClicks = totalClicks || 0;
            state.totalLinks = linksCount || 0;
            state.ctr = ctr || 0; // Set click-through rate if provided
        });
        builder.addCase(userThunks.getUserProfileThunk.rejected, (state, action) => {
            console.log({ payload: action.payload });
            const errorData = action.payload as { message?: string };
            state.error = errorData?.message || 'Failed to fetch user profile for this user ';
            state.username = "";
            state.name = "";
            state.bio = "";
            state.avatarUrl = "";
            state.loading = false;
            state.tags = [];
            state.email = "";
            state.themeId = "";
            state.totalClicks = 0;
            state.totalLinks = 0;
            state.ctr = 0; // Reset click-through rate on error
        });
    }


})


export const { setUsernameSlice, setName } = userSlice.actions;
export default userSlice.reducer;