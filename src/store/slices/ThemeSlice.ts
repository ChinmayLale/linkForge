import { ThemeSettings } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeThunks } from '../thunks/theme';



interface initialState {
   theme: ThemeSettings[]
   error?: string | null;
   loading: boolean; // <-
}



const initialState: initialState = {
   theme: [],
   error: "",
   loading: false, // <-
}

const ThemeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      addthemesReducer: (state, action: PayloadAction<ThemeSettings[]>) => {
         state.theme = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(themeThunks.getAllThemesThunk.fulfilled, (state, action) => {
         state.theme = action.payload
         state.loading = false
         state.error = null
      })

      builder.addCase(themeThunks.getAllThemesThunk.pending, (state) => {
         state.loading = true
         state.error = null
      })

      builder.addCase(themeThunks.getAllThemesThunk.rejected, (state, action) => {
         state.loading = false
         state.error = action.error.message || "Failed to fetch themes"
      })

   }
})


export default ThemeSlice.reducer

export const { addthemesReducer } = ThemeSlice.actions
