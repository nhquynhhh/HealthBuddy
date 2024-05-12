import React, { createContext, useState, useEffect } from "react";
import {
	setAccessToken,
	setRefreshToken,
	getAccessToken,
	getRefreshToken,
	removeAccessTokenAsync,
	removeRefreshTokenAsync
} from "../asyncStorage/auth";
import { handleLoginWithToken } from '../services/authenticate/login_with_token'
import { he } from "date-fns/locale";
import { handleGetUserInfo } from '../services/info/get_info';
import { handleGetAccountInfo } from "../services/account/get_account_info";
import { handleGetDishList } from '../services/dish/get_all_dishes';
import { handleGetAllIngredients } from '../services/ingredients/get_all_ingredients';
import { handleGetFavoriteDishes } from '../services/favorite/get_favorite_dishes';
import { handleGetCalories } from "../services/calories/get_calories";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [accessTokenContext, setAccessTokenContext] = useState(null);
	const [refreshTokenContext, setRefreshTokenContext] = useState(null);
	const [isLogged, setIsLogged] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [account, setAccount] = useState(null);
	const [dishes, setDishes] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [favoriteDishes, setFavoriteDishes] = useState([]);
	const [calories, setCalories] = useState(null);
	const [water, setWater] = useState(0);

	useEffect(() => {
		const checkLogin = async () => {
			const refresh_token = await getRefreshToken();
			if (refresh_token) {
				const isValidToken = await handleLoginWithToken(refresh_token);
				if (isValidToken) {
					const userInfo = await handleGetUserInfo();
					if (userInfo) {
						setUserInfo(userInfo);
					}
					const accountInfo = await handleGetAccountInfo();
					if (accountInfo) {
						setAccount(accountInfo);
					}
					const dishList = await handleGetDishList();
					if (dishList) {
						setDishes(dishList);
					}
					const ingredientsList = await handleGetAllIngredients();
					if (ingredientsList) {
						setIngredients(ingredientsList);
					}
					const favoriteDishes = await handleGetFavoriteDishes(userInfo.id);
					if (favoriteDishes) {
						setFavoriteDishes(favoriteDishes);
					}
					setAccessTokenContext(await getAccessToken());
					setRefreshTokenContext(refresh_token);
					setIsLogged(true);
				}
			} else {
				return;
			}
		};
		checkLogin();
	}, []);

	const storeAccessToken = (token) => {
		setAccessTokenContext(token);
	};

	const removeAccessToken = () => {
		setAccessTokenContext(null);
	};

	const storeRefreshToken = (token) => {
		setRefreshTokenContext(token);
	}

	const removeRefreshToken = () => {
		setRefreshTokenContext(null);
	}

	const setAccountContext = (id, email) => {
		setAccount({
			id: id,
			email: email
		})
	}

	const setLoginStatus = (status) => {
		setIsLogged(status);
	}

	const setFavoriteDishesContext = (dishes) => {
		setFavoriteDishes(dishes);
	}

	const addFavoriteDish = (dish) => {
		setFavoriteDishes([...favoriteDishes, dish]);
	}

	return (
		<AuthContext.Provider value={{ accessTokenContext, account, storeAccessToken, removeAccessToken, storeRefreshToken, removeRefreshToken, setAccountContext, refreshTokenContext, isLogged, setIsLogged, userInfo, setUserInfo, setAccount, dishes, setDishes, ingredients, setIngredients, favoriteDishes, setFavoriteDishes, setFavoriteDishesContext, addFavoriteDish, setLoginStatus }}>
			{children}
		</AuthContext.Provider>
	);
};
