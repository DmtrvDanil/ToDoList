import {createSlice} from "@reduxjs/toolkit";

const initialState = 'Light';

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state, action) {
         return state === 'Light' ? 'dark' : 'Light';
        }
    }
})

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;