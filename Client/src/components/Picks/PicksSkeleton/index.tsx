import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '300px',
  },
});

const PickTemplate = () => {
  return (
    <div>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

const PicksSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignContent="center" justify="center">
        {[0, 1, 2, 3, 4].map((x) => (
          <Grid item xs={12} key={x}>
            <PickTemplate />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PicksSkeleton;
