import React from 'react';
import { Redirect, useLocation, useParams } from 'react-router';
import { useAuth } from '../../auth';

const LeagueHome = () => {
  const { league } = useParams<{ league: string }>();
  const { user } = useAuth();
  const location = useLocation();
  if (user && user.leagues) {
    console.log('the user is a member of the league');
    return <div>{league}</div>;
  } else {
    return (
      <Redirect
        to={{
          pathname: `/unauthorized?path=${location.pathname}`,
          state: { from: location },
        }}
      />
    );
  }
};

export default LeagueHome;
