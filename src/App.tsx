import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AppTheme from './AppTheme';
import ProviderAuth from './auth';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PreseasonHome from './pages/Preseason';
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
            <PrivateRoute path="/preseason">
              <PreseasonHome />
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
