import { User } from './AuthContext.Provider';

interface FakeAuth {
  signin: (
    login: { email: string; password: string },
    cb: (user: User) => void
  ) => void;
  signout: (cb: () => void) => void;
}

const fakeAuth: FakeAuth = {
  signin(login, cb: (user: User) => void) {
    setTimeout(() => cb({ id: 1, email: login.email, name: login.email }), 500);
  },
  signout(cb: () => void) {
    setTimeout(cb, 500);
  },
};

export default fakeAuth;
