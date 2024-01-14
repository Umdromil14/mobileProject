import { createSlice } from '@reduxjs/toolkit';

export const platformImageSlice = createSlice({
    name: 'platformImageList',
    initialState: {
        platformImages: new Map(),
        nextIdPlatformImage: 0
    },
    reducers: {
        addPlatformImage: (state, action) => {
            state.platformImages.push({
                ...action.payload,
                id: state.nextIdPlatformImage
            });
            state.nextIdplatformImage += 1
        },
        // removePlatformImage: (state, action) => {
        //     state.platformImages = state.platformImages.filter(elem => action.payload.id !== elem.id)
        // }
    },
})

export const { addPlatformImage, removePlatformImage } = platformImageSlice.actions;

export default platformImageSlice.reducer;