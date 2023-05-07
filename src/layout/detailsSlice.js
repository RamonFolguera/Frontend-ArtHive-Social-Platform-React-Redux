import { createSlice } from "@reduxjs/toolkit";  

export const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        choosenUser : {}
    },
    reducers: {
        addChoosenUser: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }
})

export const { addChoosenUser } = detailsSlice.actions;

export const detailsData = (state) => state.details;

export default detailsSlice.reducer;