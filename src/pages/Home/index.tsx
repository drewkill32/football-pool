import React from 'react';
import Picks from '../../components/Picks';
import WeekSlider from '../../components/WeekSlider';
import { Grid } from '@material-ui/core';

const Home = () => {
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
