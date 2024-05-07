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

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

	const [accessTokenContext, setAccessTokenContext] = useState(null);
	const [refreshTokenContext, setRefreshTokenContext] = useState(null);
	const [isLogged, setIsLogged] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [account, setAccount] = useState(null);
	const [dishes, setDishes] = useState([]);
	const [ingredients, setIngredients] = useState([]);

	// const checkToken = async () => {
	// 	const refresh = await getRefreshToken();
	// 	if (refresh !== null) {
	// 		console.log('There is a refresh token in the storage')
	// 		setRefresh_token(refresh);
	// 		return true;
	// 	}
	// 	return false;
	// }

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
					const ingredientList = await handleGetAllIngredients();
					if (ingredientList) {
						setIngredients(ingredientList);
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

	// clear context and async storage when logout async
	
	// useEffect(() => {
	// 	const checkLoginStatus = async () => {
	// 		if (!isLogged) {
	// 			setAccessTokenContext(null);
	// 			setRefreshTokenContext(null);
	// 			setUserInfo(null);
	// 			setAccount(null);
	// 			removeAccessTokenAsync();
	// 			removeRefreshTokenAsync();
	// 		}
	// 	}
	// 	checkLoginStatus();
	// }, [isLogged]);

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

	return (
		<AuthContext.Provider value={{ accessTokenContext, account, storeAccessToken, removeAccessToken, storeRefreshToken, removeRefreshToken, setAccountContext, refreshTokenContext, isLogged, setIsLogged, userInfo, setUserInfo, setAccount,dishes, setDishes, ingredients, setIngredients }}>
			{children}
		</AuthContext.Provider>
	);
};
