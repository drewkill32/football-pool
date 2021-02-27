import React from 'react';
import {
  ButtonBase,
  Checkbox,
  createStyles,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { Pick, Team } from '../../models';
import { useHistory } from 'react-router';

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
    button: {
      textAlign: 'left',
      width: '100%',
    },
  })
);

const TeamLine: React.FC<{
  team: Team;
  score: number | null | undefined;
}> = ({ team, score, children }) => {
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
      {children}
    </Grid>
  );
};

const GameBanner: React.FC<{ pick: Pick }> = ({ pick }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ButtonBase
      className={classes.button}
      onClick={() => history.push(`/game/${pick.gameId}`)}
    >
      <Paper className={classes.paper}>
        <Grid container item spacing={1} direction="column">
          <TeamLine team={pick.away} score={pick.awayScore}>
            <Grid>
              <Checkbox checked={pick.pickTeamId === pick.away.id} />
            </Grid>
            {pick.head2Headpick && (
              <Grid>
                <Checkbox checked={pick.head2Headpick === pick.away.id} />
              </Grid>
            )}
          </TeamLine>
          <TeamLine team={pick.home} score={pick.homeScore}>
            <Grid>
              <Checkbox checked={pick.pickTeamId === pick.home.id} />
            </Grid>
            {pick.head2Headpick && (
              <Grid>
                <Checkbox checked={pick.head2Headpick === pick.home.id} />
              </Grid>
            )}
          </TeamLine>
        </Grid>
      </Paper>
    </ButtonBase>
  );
};

export default GameBanner;
