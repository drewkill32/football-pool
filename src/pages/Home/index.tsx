import React from 'react';
import Picks from '../../components/Picks';
import WeekSlider from '../../components/WeekSlider';
import { Grid } from '@material-ui/core';
import { useAuth } from '../../auth';
import { Redirect } from 'react-router';

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  if (user?.leagues?.length === 0) {
    return (
      <Redirect
        to={{ pathname: '/profile', state: { redirectReason: 'no-league' } }}
      />
    );
  }
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      alignContent="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <WeekSlider />
      </Grid>
      <Grid item xs={12}>
        <Picks />
      </Grid>
    </Grid>
  );
};

export default Home;
