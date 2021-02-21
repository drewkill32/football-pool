import React, { useState } from 'react';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';

import { GameData, Team, Pick } from '../../models';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: 'calc(100vh - 90px)',
      width: '100%',
    },
    grid: {
      width: '100%',
    },
  })
);

const getData = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const isGameCompleted = (g: any) => {
  return g.home_score !== null && g.away_score !== null;
};

const getGameWinner = (game: any): number | undefined => {
  if (isGameCompleted(game)) {
    return game.home_points > game.away_points ? game.home_id : game.away_id;
  } else {
    return undefined;
  }
};

const getTeam = (teamId: number, teamData: any[]): Team | undefined => {
  const team = teamData.find((t) => t.id === teamId);
  if (team) {
    return {
      id: team.id,
      school: team.school,
      mascot: team.mascot,
      conference: team.conference,
      division: team.devision,
      abbreviation: team.abbreviation,
      alt_color: team.alt_color,
      color: team.color,
      logos: team.logos,
    };
  }
  return undefined;
};

const Admin = () => {
  const classes = useStyles();
  const [games, setGames] = useState<GameData[]>();

  const [picks, setPicks] = useState<Pick[]>();

  const handleGetTeamData = async () => {
    try {
      const [gameData, teamData] = await Promise.all([
        getData('sample/db/games.json'),
        getData('sample/db/teams.json'),
      ]);

      const games: GameData[] = gameData.map((g: any) => {
        return {
          id: g.id,
          homeScore: g.home_points,
          awayScore: g.away_points,
          weekNum: g.week,
          gameCompleted: isGameCompleted(g),
          winner: getGameWinner(g),
          home: getTeam(g.home_id, teamData),
          away: getTeam(g.away_id, teamData),
        };
      });
      console.log(games);
      setGames(games);
    } catch (error) {
      console.log(`Error fetching data.${error}.`);
    }
  };

  const handleGetPickData = async () => {
    try {
      setPicks(undefined);
      const gameData = (await getData('sample/db/games.json')) as GameData[];
      let i = 1;
      setPicks(
        gameData.map((g: GameData) => {
          return {
            ...g,
            id: i++,
            gameId: g.id,
            pickTeamId: g.home.id,
            result: g.winner === g.home.id ? 1 : 0,
          };
        })
      );
    } catch (error) {
      console.log(`Error fetching data.${error}.`);
    }
  };

  return (
    <Paper className={classes.root}>
      <Grid
        container
        justify="center"
        alignContent="center"
        spacing={3}
        className={classes.grid}
        direction="column"
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetTeamData}
          >
            Get Game Data
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rowsMax={15}
            rows={15}
            label="Games"
            variant="outlined"
            value={games && JSON.stringify(games, undefined, 2)}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetPickData}
          >
            Get Sample Pick Data
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rowsMax={15}
            rows={15}
            label="Picks"
            variant="outlined"
            value={picks && JSON.stringify(picks, undefined, 2)}
          ></TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Admin;
