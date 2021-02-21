import React from 'react';
import Picks from '../../components/Picks';
import WeekSlider from '../../components/WeekSlider';
import WeekContextProvider from '../../context/WeekContext.Provider';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    picks: {
      flexGrow: 1,
      width: '100%',
    },
  })
);

const Home = () => {
  const classes = useStyles();
  return (
    <WeekContextProvider>
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
          <Picks className={classes.picks} />
        </Grid>
      </Grid>
    </WeekContextProvider>
  );
};

export default Home;
