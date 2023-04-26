import { createSlice } from "@reduxjs/toolkit";  

export const userArtworkSlice = createSlice({
    name: 'userArtwork',
    initialState: {
        choosenUserArtwork : {}
    },
    reducers: {
        addChoosenUserArtwork: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }
})

export const { addChoosenUserArtwork } = userArtworkSlice.actions;

export const userArtworkData = (state) => state.userArtwork;

export default userArtworkSlice.reducer;