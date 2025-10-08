
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartData, LinkItem } from "../../types/index";
import { linksThunks } from "../thunks/links";

interface LinksState {
    links: LinkItem[];
    loading: boolean;
    error: string | null;
    chartData?: ChartData[]
}

const initialState: LinksState = {
    links: [],
    loading: false,
    error: null,
    chartData: []
};


const linksSlice = createSlice({
    name: "linksSlice",
    initialState,
    reducers: {
        setLinks(state, action: PayloadAction<LinkItem[]>) {
            state.links = action.payload;
        },
        addLink(state, action: PayloadAction<LinkItem>) {
            const newLink = action.payload;

            // Basic validation: required fields
            if (!newLink.id || !newLink.type || !newLink.title || !newLink.url) {
                console.warn("Invalid link item: missing required fields.");
                return;
            }

            // Duplicate check
            const exists = state.links.some(link => link.id === newLink.id);
            if (exists) {
                console.warn(`Link with ID '${newLink.id}' already exists.`);
                return;
            }

            state.links.push(newLink);
        },
        updateLink(state, action: PayloadAction<LinkItem>) {
            const index = state.links.findIndex(link => link.id === action.payload.id);
            if (index !== -1) {
                state.links[index] = action.payload;
            }
        },
        deleteLink(state, action: PayloadAction<string>) {
            state.links = state.links.filter(link => link.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // Cases For User Link Service 
        builder.addCase(linksThunks.getAllUserLinkThunk.fulfilled, (state, action) => {
            state.links = action.payload;
            state.loading = false;
            state.error = null;
        })
        builder.addCase(linksThunks.getAllUserLinkThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(linksThunks.getAllUserLinkThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch links";
        });

        // Cases For Graph Data

        builder.addCase(linksThunks.getViewsVsClickGraphDataThunk.fulfilled, (state, action) => {
            state.chartData = action.payload;
            state.loading = false;
            state.error = null;
        })
        builder.addCase(linksThunks.getViewsVsClickGraphDataThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(linksThunks.getViewsVsClickGraphDataThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch graph data";
        });
    }
});

export const { setLinks, addLink, updateLink, deleteLink } = linksSlice.actions;
export default linksSlice.reducer;

