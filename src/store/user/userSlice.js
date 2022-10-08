import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
        },
        updateUid: (state, action) => {
            state.uid = action.payload;
        },
        updatePhotoURL: (state, action) => {
            state.photoURL = action.payload;
        },
    },
});

export const { updateDisplayName, updateEmail, updateUid, updatePhotoURL } = userSlice.actions;
export default userSlice.reducer;
