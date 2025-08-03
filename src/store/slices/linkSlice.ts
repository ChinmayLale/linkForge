
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkItem } from "../../types/index";

interface LinksState {
    links: LinkItem[];
    loading: boolean;
    error: string | null;
}

const initialState: LinksState = {
    links: [
        {
            id: "2",
            type: "video",
            title: "Behind the Scenes",
            url: "https://youtube.com/watch?v=123",
            color: "#ff0000",
            active: true,
            style: "default",
            metadata: {
                thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=120&fit=crop",
                duration: "5:23",
                description: "Creating my latest music video",
            },
            clicks: 0, // Optional clicks count for analytics
            thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=120&fit=crop",
        },
    ],
    loading: false,
    error: null,
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
});

export const { setLinks, addLink, updateLink, deleteLink } = linksSlice.actions;
export default linksSlice.reducer;

