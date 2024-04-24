import { useContext } from 'react';
import { AuthContext } from './AuthContext.js';

const useAuthContext = () => {
	const {
		storeAccessToken,
		storeRefreshToken,
		removeAccessToken,
		removeRefreshToken,
		accessTokenContext,
		refreshTokenContext
	} = useContext(AuthContext);

	return {
		storeAccessToken,
		storeRefreshToken,
		removeAccessToken,
		removeRefreshToken,
		accessTokenContext,
		refreshTokenContext
	};
};

export default useAuthContext;
