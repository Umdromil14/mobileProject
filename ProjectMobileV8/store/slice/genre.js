import { createSlice } from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'platformList',
    initialState: {
        genres: [],
        nextIdGenre: 0
    },
    reducers: {
        addGenre: (state, action) => {
            state.genres.push({
                ...action.payload,
                id: state.nextIdGenre
            });
            state.nextIdGenre += 1
        },
        // removeGenre: (state, action) => {
        //     state.genres = state.genres.filter(elem => action.payload.id !== elem.id)
        // }
    },
})

export const { addGenre, removeGenre } = genreSlice.actions;

export default genreSlice.reducer;