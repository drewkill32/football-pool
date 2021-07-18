import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Team } from '../../models';

const useStyles = makeStyles(() =>
  createStyles({
    img: {
      minWidth: '35px',
      maxWidth: '55px',
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
        <Typography variant="h6" className={classes.score}>
          {score === null ? ' ' : score}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TeamImg;
