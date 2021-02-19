interface FakeAuth {
  signin: (
    login: { email: string; password: string },
    cb: (user: { email: string; name: string }) => void
  ) => void;
  signout: (cb: () => void) => void;
}

const fakeAuth: FakeAuth = {
  signin(login, cb: (user: { email: string; name: string }) => void) {
    setTimeout(() => cb({ email: login.email, name: login.email }), 500);
  },
  signout(cb: () => void) {
    setTimeout(cb, 500);
  },
};

export default fakeAuth;
