import { createSlice } from '@reduxjs/toolkit';

export const newGamesSlice = createSlice({
    name: 'newGames',
    initialState: {
        newGames: {}
    },
    reducers: {
        addNewGames: (state, action) => {
            state.newGames[action.payload.key] = action.payload.values;
        }
    },
})

export const { addNewGames, clearNewGames } = newGamesSlice.actions;

export default newGamesSlice.reducer;