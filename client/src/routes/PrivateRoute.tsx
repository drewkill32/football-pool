import React from 'react';
import { useAuth } from '../auth';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Layout from '../Layout';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.user ? (
          <Layout>{children}</Layout>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
