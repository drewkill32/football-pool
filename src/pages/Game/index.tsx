import React, { useEffect, useState } from 'react';
import {
  Avatar,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { useAuth } from '../../auth';
import GameDetail from '../../components/GameDetail';
import PicksSkeleton from '../../components/Picks/PicksSkeleton';
import { Pick } from '../../models';
import { getOrdinalSuffix } from '../../utils';

const sleep = (ms: number) =>
  new Promise((response) => setTimeout(response, ms));

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '70%',
      minWidth: '280px',
    },
    ownerContainer: {
      marginTop: '20px',
    },
    right: {
      textAlign: 'right',
    },
  })
);

interface Owner {
  id: number;
  pick: 'home' | 'away';
  rank: number;
  name: string;
}

const createOwners = (length: number): Owner[] => {
  const array = [];
  const owners = [
    'Drew',
    'Mike',
    'Gene',
    'Ben',
    'Matt',
    'Gregg',
    'Ryan',
    'Von',
    'Sean',
    'Jimmy',
    'Tom',
  ];

  for (let i = 0; i < length; i++) {
    array.push({
      id: i,
      pick: Math.round(Math.random()) === 0 ? 'home' : 'away',
      rank: i + 1,
      name: owners[i % length],
    } as Owner);
  }
  return array;
};

const OwnerChip: React.FC<{ owner: Owner; align: 'left' | 'right' }> = ({
  owner,
  align,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        spacing={3}
        direction={align === 'left' ? 'row' : 'row-reverse'}
        alignContent="center"
        alignItems="center"
      >
        <Grid item>
          <Avatar>{owner.name[0]}</Avatar>
        </Grid>
        <Grid className={align === 'right' ? classes.right : ''}>
          <Grid item container direction="column">
            <Grid item>{owner.name}</Grid>
            <Grid item>{getOrdinalSuffix(owner.rank)}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const Game = () => {
  const classes = useStyles();
  const { id: gameId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pick, setPick] = useState<Pick>();
  const owners = createOwners(10);
  useEffect(() => {
    const doTheThing = async () => {
      setLoading(true);
      const url = `/sample/db/picks-userid-${user?.id}.json`;
      try {
        await sleep(200);
        const response = await fetch(url);
        const data = (await response.json()) as Pick[];
        const idnum = parseInt(gameId);
        const thisGame = data.find((p) => p.gameId === idnum);
        if (thisGame) {
          setPick({ ...thisGame, startDate: new Date(thisGame.startDate) });
        }
      } catch (error) {
        console.error(`unable to fetch data from ${url}. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    doTheThing();
  }, [user?.id, gameId]);

  return (
    <div className={classes.root}>
      {loading || !pick ? (
        <PicksSkeleton />
      ) : (
        <Paper>
          <GameDetail game={pick} />{' '}
        </Paper>
      )}
      {pick && (
        <Grid container className={classes.ownerContainer}>
          <Grid item xs={5}>
            {owners
              .filter((o) => o.pick === 'home')
              .map((x) => (
                <OwnerChip align="left" key={x.id} owner={x} />
              ))}
          </Grid>
          <Grid item xs={2}>
            <Divider orientation="vertical" variant="middle" />
          </Grid>
          <Grid item xs={5}>
            {owners
              .filter((o) => o.pick === 'away')
              .map((x) => (
                <OwnerChip align="right" key={x.id} owner={x} />
              ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Game;
