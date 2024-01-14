import { createSlice } from '@reduxjs/toolkit';

export const platformSlice = createSlice({
    name: 'platformList',
    initialState: {
        platforms: [],
        nextIdPlatform: 0
    },
    reducers: {
        addPlatform: (state, action) => {
            state.platforms.push({
                ...action.payload,
                id: state.nextIdPlatform
            });
            state.nextIdPlatform += 1;
        },
        // removePlatform: (state, action) => {
        //     state.platforms = state.platforms.filter(elem => action.payload.id !== elem.id)
        // }
    },
})

export const { addPlatform, removePlatform } = platformSlice.actions;

export default platformSlice.reducer;