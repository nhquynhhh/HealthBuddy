import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState(null);

	const login = (username, password) => {
		setIsLoading(true);
		// Call login API
		setToken("token");
		// Set accessToken
		setIsLoading(false);
	}

	const logout = () => {
		setIsLoading(true);
		// Call logout API
		// Remove accessToken
		setToken(null);
		setIsLoading(false);
	}


	return (
		<AuthContext.Provider value={{ isLoading, token }}>
			{children}
		</AuthContext.Provider>
	);
};