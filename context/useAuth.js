import { useContext } from 'react';
import { AuthContext } from './AuthContext.js';

export const useAuth = () => {
  const { storeAccessToken, storeRefreshToken, removeAccessToken, removeRefreshToken,accessTokenContext,refreshTokenContext } = useContext(AuthContext);

  return { storeAccessToken, storeRefreshToken, removeAccessToken, removeRefreshToken, accessTokenContext,refreshTokenContext };
};
