import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

	const [accessTokenContext, setAccessTokenContext] = useState(null);
	const [refreshTokenContext, setRefreshTokenContext] = useState(null);
	const [userInfo, setUserInfo] = useState({
		email: null,
		phone: null,
		name: null,
		avatar: null,
	});

	const [account, setAccount] = useState({
		id: null,
		email: null
	})

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
	return (
		<AuthContext.Provider value={{ accessTokenContext, account, storeAccessToken, removeAccessToken, storeRefreshToken, removeRefreshToken, setAccountContext }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
