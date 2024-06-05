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
import ToastManager, { Toast } from 'toastify-react-native'
import { validateToken } from "../services/token/validate_token";

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
	const [paymentURL, setPaymentURL] = useState(null);
	const [isLoggedWithToken, setIsLoggedWithToken] = useState(false);
	const [isLoggedWithPassword, setIsLoggedWithPassword] = useState(false);

	useEffect(() => {
		const checkLogin = async () => {
			const refresh_token = await getRefreshToken();
			if (refresh_token !== null && validateToken(refresh_token)) {
				setIsLoggedWithToken(true);
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
					// const dishList = await handleGetDishList();
					// if (dishList) {
					// 	setDishes(dishList);
					// }
					// const ingredientsList = await handleGetAllIngredients();
					// if (ingredientsList) {
					// 	setIngredients(ingredientsList);
					// }
					const favoriteDishes = await handleGetFavoriteDishes(userInfo.id);
					if (favoriteDishes) {
						setFavoriteDishes(favoriteDishes);
					}
					setAccessTokenContext(await getAccessToken());
					setRefreshTokenContext(refresh_token);
					setIsLogged(true);
					setIsLoggedWithToken(false);
				} else {
					setIsLoggedWithToken(false);
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
		<AuthContext.Provider value={{ accessTokenContext, account, storeAccessToken, removeAccessToken, storeRefreshToken, removeRefreshToken, setAccountContext, refreshTokenContext, isLogged, setIsLogged, userInfo, setUserInfo, setAccount, dishes, setDishes, ingredients, setIngredients, favoriteDishes, setFavoriteDishes, setFavoriteDishesContext, addFavoriteDish, setLoginStatus, paymentURL, isLoggedWithToken, setIsLoggedWithToken, isLoggedWithPassword, setIsLoggedWithPassword }}>
			{children}
		</AuthContext.Provider>
	);
};
