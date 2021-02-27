import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { GameData, Team } from '../../models';

import { format } from 'date-fns';

const useStyles = makeStyles(() =>
  createStyles({
    img: {
      height: '75px',
      margin: '0 2px',
    },
    paper: {
      minWidth: '280px',
      width: '100%',
    },
    team: {
      flexGrow: 1,
      margin: '0 8px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',

      textOverflow: 'ellipsis',
      maxWidth: '200px',
    },
  })
);

const TeamImg: React.FC<{ team: Team; score: number | null }> = ({
  team,
  score,
}) => {
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const [teamName, setTeamName] = useState(`${team.school} ${team.mascot}`);

  useEffect(() => {
    media
      ? setTeamName(team.abbreviation)
      : setTeamName(`${team.school} ${team.mascot}`);
  }, [media, team.school, team.mascot, team.abbreviation]);

  return (
    <Grid item container direction="column" alignItems="center">
      <Grid item>
        <Typography className={classes.team}>{teamName}</Typography>
      </Grid>
      <Grid item>
        <img className={classes.img} src={team.logos?.[0]} alt={team.school} />
      </Grid>
      <Grid item>
        <Typography variant="h6">{score === null ? ' ' : score}</Typography>
      </Grid>
    </Grid>
  );
};

const GameDetail: React.FC<{ game: GameData }> = ({ game }) => {
  const classes = useStyles();
  console.log('game =>', game);
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        item
        spacing={2}
        direction="row"
        wrap="nowrap"
        alignItems="center"
      >
        <TeamImg team={game.away} score={game.awayScore} />
        <Grid
          item
          container
          justify="center"
          direction="column"
          spacing={1}
          style={{ textAlign: 'center' }}
        >
          <Grid item>@</Grid>
          <Grid item>{format(game.startDate, 'E MMM do')}</Grid>
          <Grid item>
            {game.timeTBD ? 'TBD' : format(game.startDate, 'H:mm a')}
          </Grid>
        </Grid>
        <TeamImg team={game.home} score={game.homeScore} />
      </Grid>
    </Paper>
  );
};

export default GameDetail;
