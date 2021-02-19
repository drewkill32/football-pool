import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const GlobalRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return children;
      }}
    />
  );
};

export default GlobalRoute;
