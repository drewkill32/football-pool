import React, { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { auth, firestore } from '../utils/firebase';
import { League } from '../models';

const getUserCookie = (): User | null => {
  const userJson = Cookies.get('user');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

const setUserCookie = (user: User | null) => {
  if (user) {
    Cookies.set('user', JSON.stringify({ id: user }), { expires: 30 });
  } else {
    Cookies.remove('user');
  }
};

const signIn = async (
  email: string,
  password: string
): Promise<User | null> => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  if (user) {
    const userProfile = await firestore
      .collection('users')
      .doc(user?.uid)
      .get();
    var data = userProfile.data();
    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      updateEmail: user.updateEmail,
      leagues: data?.leagues,
    };
  }
  return null;
};

const signup = async (
  email: string,
  password: string
): Promise<User | null> => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  if (user) {
    await firestore.collection('users').doc(user.uid).set({
      email: user.email,
      name: user.displayName,
      leagues: [],
    });
    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      updateEmail: user.updateEmail,
      leagues: [],
    };
  }
  return null;
};

const signOut = () => {
  return auth.signOut();
};

const forgotPassword = (email: string) => {
  return auth.sendPasswordResetEmail(email, {
    url: `${window.location.host}/resetpassword?email=${email}`,
  });
};

const useProviderAuth = (): Auth => {
  const [user, setUser] = useState(getUserCookie());

  useEffect(() => {
    return auth.onAuthStateChanged(async (fbUser) => {
      const userProfile = await firestore
        .collection('users')
        .doc(fbUser?.uid)
        .get();
      var data = userProfile.data();
      const user: User | null = fbUser
        ? {
            id: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName,
            updateEmail: fbUser.updateEmail,
            leagues: data?.leagues,
          }
        : null;
      console.log('setting user', { user });
      // setUserCookie(user);
      setUser(user);
    });
  }, []);

  return {
    user,
    signin: signIn,
    signout: signOut,
    signup: signup,
    forgotPassword: forgotPassword,
  };
};

export const AuthContext = createContext<Auth>({
  user: null,
  signin: () => Promise.resolve(null),
  signout: () => Promise.resolve(),
  signup: () => Promise.resolve(null),
  forgotPassword: () => Promise.resolve(),
});

const ProviderAuth: React.FC = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

interface Auth {
  user: User | null;
  signin: (email: string, password: string) => Promise<User | null>;
  signout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<User | null>;
  forgotPassword: (email: string) => Promise<void>;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  updateEmail: (newEmail: string) => Promise<void>;
  leagues: League[];
}

export default ProviderAuth;
