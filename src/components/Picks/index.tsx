import React, { useEffect, useState } from 'react';

import { useAuth } from '../../auth';
import { useSelectedWeek } from '../../context/WeekContext.Provider';
import PicksSkeleton from './PicksSkeleton';
import { Pick } from '../../models';
import { ButtonBase, createStyles, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import GameBanner from '../GameBanner';

const sleep = (ms: number) =>
  new Promise((response) => setTimeout(response, ms));

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      textAlign: 'left',
      width: '100%',
    },
  })
);

const Picks: React.FC = () => {
  const [selectedWeek] = useSelectedWeek();
  const [picks, setPicks] = useState<Pick[]>();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const doTheThing = async () => {
      setLoading(true);
      const url = `sample/db/picks-userid-${user?.id}.json`;
      try {
        await sleep(700);
        const response = await fetch(url);
        const data = (await response.json()) as Pick[];
        const thisWeeksPicks = data.filter(
          (p) => p.weekNum === selectedWeek?.week
        );
        setPicks(thisWeeksPicks);
      } catch (error) {
        console.error(`unable to fetch data from ${url}. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    doTheThing();
  }, [selectedWeek, user?.id]);

  return (
    <div>
      {loading ? (
        <PicksSkeleton />
      ) : (
        <Grid container spacing={5}>
          {picks?.map((pick) => (
            <Grid item xs={12}>
              <ButtonBase
                className={classes.button}
                onClick={() => history.push(`/game/${pick.gameId}`)}
              >
                <GameBanner pick={pick} />
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Picks;
