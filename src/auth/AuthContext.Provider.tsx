import React, { useState, createContext, useEffect } from 'react';
import fakeAuth from './fakeAuth';
import Cookies from 'js-cookie';

const getUserCookie = (): { name: string } | undefined => {
  const userJson = Cookies.get('user');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return undefined;
};
const setUserCookie = (user: { name: string } | undefined) => {
  if (user) {
    Cookies.set('user', JSON.stringify(user), { expires: 30 });
  } else {
    Cookies.remove('user');
  }
};

const useProviderAuth = (): Auth => {
  const [user, setUser] = useState(() => {
    return getUserCookie();
  });

  useEffect(() => {
    setUserCookie(user);
  }, [user]);

  const signin = (
    login: { email: string; password: string },
    cb: (user: { email: string; name: string }) => void
  ) => {
    return fakeAuth.signin(login, (user) => {
      setUser(user);
      cb(user);
    });
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(undefined);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
};

export const AuthContext = createContext<Auth>({
  user: undefined,
  signin: () => {},
  signout: () => {},
});

const ProviderAuth: React.FC = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

interface Auth {
  user: { name: string } | undefined;
  signin: (
    login: { email: string; password: string },
    cb: (user: { email: string; name: string }) => void
  ) => void;
  signout: (cb: () => void) => void;
}

export default ProviderAuth;
