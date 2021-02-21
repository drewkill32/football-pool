import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import WeekSlider from '../../components/WeekSlider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  })
);

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <WeekSlider />
      <p>Hello</p>
    </div>
  );
};

export default Home;
