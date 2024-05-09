import { createSlice } from '@reduxjs/toolkit';
import { set } from 'date-fns';

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState: { favoriteDishes: [] },
	reducers: {
		setFavoriteDishesList: (state, action) => {
			state.favoriteDishes = action.payload;
		},
		addFavoriteDishes: (state, action) => {
			state.favoriteDishes.push(action.payload);
		},
		removeFavoriteDishes: (state, action) => {
			state.favoriteDishes = state.favoriteDishes.filter(product => product.id !== action.payload);
		},
	},
});

export const { addFavoriteDishes, removeFavoriteDishes, setFavoriteDishesList } = favoriteSlice.actions;
export const selectFavoriteDishes = state => state.favorite.favoriteDishes;
export default favoriteSlice.reducer;