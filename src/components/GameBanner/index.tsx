import React from 'react';
import {
  Checkbox,
  createStyles,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { Pick, Team } from '../../models';

const useStyles = makeStyles(() =>
  createStyles({
    img: {
      width: '35px',
      height: '35px',
      margin: '0 2px',
    },
    paper: {
      minWidth: '280px',
      width: '100%',
    },
    team: {
      flexGrow: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      paddingRight: '20px',
      textOverflow: 'ellipsis',
    },
    score: {
      marginRight: '10px',
    },
  })
);

const TeamLine: React.FC<{
  team: Team;
  score: number | null | undefined;
  picked: boolean;
}> = ({ team, score, picked }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      alignContent="center"
      justify="center"
      wrap="nowrap"
      alignItems="center"
    >
      <Grid item>
        <img src={team.logos?.[0]} alt="" className={classes.img} />
      </Grid>
      <Grid item className={classes.team}>
        {`${team.school} ${team.mascot}`}
      </Grid>
      <Grid item className={classes.score}>
        {score}
      </Grid>
      <Checkbox checked={picked} />
    </Grid>
  );
};

const GameBanner: React.FC<{ pick: Pick }> = ({ pick }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container item spacing={1} direction="column">
        <TeamLine
          team={pick.away}
          score={pick.awayScore}
          picked={pick.pickTeamId === pick.away.id}
        />
        <TeamLine
          team={pick.home}
          score={pick.homeScore}
          picked={pick.pickTeamId === pick.home.id}
        />
      </Grid>
    </Paper>
  );
};

export default GameBanner;
