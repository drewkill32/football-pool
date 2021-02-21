import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AppTheme from './AppTheme';
import ProviderAuth from './auth';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import GlobalRoute from './routes/GlobalRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <AppTheme>
      <ProviderAuth>
        <Router>
          <GlobalRoute exact path="/login">
            <Login />
          </GlobalRoute>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>
            <GlobalRoute>
              <NotFound />
            </GlobalRoute>
          </Switch>
        </Router>
      </ProviderAuth>
    </AppTheme>
  );
}

export default App;
