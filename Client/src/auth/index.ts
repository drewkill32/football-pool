import { useContext } from 'react';

import ProviderAuth, { AuthContext } from './AuthContext.Provider';

export const useAuth = () => {
  return useContext(AuthContext);
};

export default ProviderAuth;
