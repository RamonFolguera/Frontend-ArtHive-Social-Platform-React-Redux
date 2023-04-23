import { createSlice } from "@reduxjs/toolkit";  

export const artworkSlice = createSlice({
    name: 'artwork',
    initialState: {
        choosenArtwork : {}
    },
    reducers: {
        addChoosenArtwork: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }
})

export const { addChoosenArtwork } = artworkSlice.actions;

export const artworkData = (state) => state.artwork;

export default artworkSlice.reducer;