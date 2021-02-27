import React, { useEffect, useState } from 'react';

import { useAuth } from '../../auth';
import { useSelectedWeek } from '../../context/WeekContext.Provider';
import PicksSkeleton from './PicksSkeleton';
import { Pick } from '../../models';
import { Grid } from '@material-ui/core';

import GameBanner from '../GameBanner';

const sleep = (ms: number) =>
  new Promise((response) => setTimeout(response, ms));

const Picks: React.FC = () => {
  const [selectedWeek] = useSelectedWeek();
  const [picks, setPicks] = useState<Pick[]>();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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
              <GameBanner pick={pick} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Picks;
