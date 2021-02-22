import React from 'react';

import {
  makeStyles,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Theme,
  Divider,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Week } from '../../models';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.background.default,
    marginBottom: '2px',
    fontSize: '1.5em',
  },
  subHeader: {
    backgroundColor: theme.palette.grey[200],
    marginBottom: '8px',
  },
  card: {
    borderRadius: 5,
    textAlign: 'center',
    maxWidth: '400px',
    minWidth: '200px',
    margin: '0 auto',
  },
}));

export const Arrow: React.FC<{
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}> = ({ direction, onClick, disabled }) => {
  return (
    <IconButton disabled={disabled} onClick={onClick}>
      {direction === 'left' ? (
        <ChevronLeft className="slide-left" />
      ) : (
        <ChevronRight className="slide-right" />
      )}
    </IconButton>
  );
};

const WeekCard: React.FC<{ week: Week }> = ({ week }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Grid container className={classes.header}>
          <Grid item xs={12} className={classes.header}>
            <Typography>Season {week.season}</Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} className={classes.subHeader}>
            <Typography>Week {week.week}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="primary">W-L</Typography>

            <Typography>0-0</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="primary">Picks</Typography>

            <Typography>0/{week.games || 0}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeekCard;
