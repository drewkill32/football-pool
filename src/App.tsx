import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AppTheme from './AppTheme';
import ProviderAuth from './auth';
import WeekContextProvider from './context/WeekContext.Provider';
import Admin from './pages/Admin';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import GlobalRoute from './routes/GlobalRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <AppTheme>
      <ProviderAuth>
        <WeekContextProvider>
          <Router>
            <Switch>
              <GlobalRoute path="/login">
                <Login />
              </GlobalRoute>
              <GlobalRoute path="/signup">
                <Signup />
              </GlobalRoute>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>
              <PrivateRoute path="/admin">
                <Admin />
              </PrivateRoute>
              <PrivateRoute path="/game/:id">
                <Game />
              </PrivateRoute>
              <GlobalRoute path="*">
                <NotFound />
              </GlobalRoute>
            </Switch>
          </Router>
        </WeekContextProvider>
      </ProviderAuth>
    </AppTheme>
  );
}

export default App;
