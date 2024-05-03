import React, { createContext, useState, useEffect } from "react";
import {
	setAccessToken,
	setRefreshToken,
	getAccessToken,
	getRefreshToken,
} from "../asyncStorage/auth";
import { handleLoginWithToken } from '../services/authenticate/login_with_token'
import { he } from "date-fns/locale";
import { handleGetUserInfo } from '../services/info/get_info';
import { handleGetAccountInfo } from "../services/account/get_account_info";


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

	const [accessTokenContext, setAccessTokenContext] = useState(null);
	const [refreshTokenContext, setRefreshTokenContext] = useState(null);
	const [isLogged, setIsLogged] = useState(false);
	const [userInfo, setUserInfo] = useState({
		account_id: null,
		age: null,
		aim: null,
		exercise: null,
		gender: null,
		has_subscription: null,
		height: null,
		username: null,
		weight: null,
	});
	const [account, setAccount] = useState({
		account_id: null,
		username: null,
		email: null,
		created_at: null,
		authenticated: null,
	})

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
					setAccessTokenContext(await getAccessToken());
					setRefreshTokenContext(refresh_token);
					setIsLogged(true);
				}
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

	return (
		<AuthContext.Provider value={{ accessTokenContext, account, storeAccessToken, removeAccessToken, storeRefreshToken, removeRefreshToken, setAccountContext, refreshTokenContext, isLogged, setLoginStatus, userInfo, setUserInfo }}>
			{children}
		</AuthContext.Provider>
	);
};
