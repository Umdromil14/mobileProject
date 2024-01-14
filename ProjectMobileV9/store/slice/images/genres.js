import { createSlice } from '@reduxjs/toolkit';

export const genreImageSlice = createSlice({
    name: 'genreImageList',
    initialState: {
        genreImages: new Map(),
        nextIdGenreImage: 0
    },
    reducers: {
        addGenreImage: (state, action) => {
            state.genreImages.push({
                ...action.payload,
                id: state.nextIdGenreImage
            });
            state.nextIdGenreImage += 1
        },
        // removeGenreImage: (state, action) => {
        //     state.genreImages = state.genreImages.filter(elem => action.payload.id !== elem.id)
        // }
    },
})

export const { addGenreImage, removeGenreImage } = genreImageSlice.actions;

export default genreImageSlice.reducer;