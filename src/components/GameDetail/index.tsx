import React from 'react';
import { Grid } from '@material-ui/core';
import { GameData } from '../../models';
import { format } from 'date-fns';
import TeamImg from '../TeamImg';

const GameDetail: React.FC<{ game: GameData }> = ({ game }) => {
  console.log('game =>', game);
  return (
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
  );
};

export default GameDetail;
