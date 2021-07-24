import { url } from 'inspector';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router';
import { useAuth } from '../../auth';
import { firestore } from '../../utils/firebase';

const LeagueHome = () => {
  const { league } = useParams<{ league: string }>();
  const { user } = useAuth();
  const location = useLocation();
  console.log({ league, user, location });
  const [isLoading, setIsLoading] = useState(false);
  const [leagueInfo, setLeagueInfo] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const snap = await firestore.collection('leagues').doc(league).get();
      const leagueInfo = snap.data();
      setLeagueInfo(leagueInfo);
    };

    getData();
  }, []);
  if (user && user.leagues?.length > 0) {
    console.log('the user is a member of the league');
    return <div>{league}</div>;
  } else {
    console.log({
      user,
      leagueLength: user?.leagues?.length,
      leagues: user?.leagues,
    });
    return <div>UNKNOWN LEAGUE: {league}</div>;
    // return (
    //   <Redirect
    //     to={{
    //       pathname: `/unauthorized?path=${location.pathname}`,
    //       state: { from: location, league: league },
    //     }}
    //   />
    //);
  }
};

export default LeagueHome;
