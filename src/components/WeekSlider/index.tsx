import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useDebounce } from '../../hooks/useDebounce';
import { Week } from '../../models';
import WeekCard, { Arrow } from '../WeekCard';
import { useStyles } from './weekSlider.styles';
import { useSelectedWeek } from '../../context/WeekContext.Provider';

const WeekSlider = () => {
  const [index, setIndex] = useState(0);
  const [season, setSeason] = useState<Week[]>();

  const [, setWeek] = useSelectedWeek();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('sample/db/seasons.json');
        const data = (await response.json()) as Week[];
        setSeason(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const debouncedIndex = useDebounce(index, 200) as number;

  useEffect(() => {
    if (season !== undefined) {
      setWeek(season[debouncedIndex]);
    }
  }, [debouncedIndex, season, setWeek]);

  const classes = useStyles();
  return season ? (
    <div className={classes.root}>
      <Arrow
        direction="left"
        onClick={() => {
          setIndex((i) => i - 1);
        }}
        disabled={index === 0}
      />
      <SwipeableViews
        index={index}
        onChangeIndex={(i) => {
          setIndex(i);
        }}
        className={classes.root}
        slideClassName={classes.slideContainer}
        resistance
      >
        {season.map((week) => (
          <WeekCard key={`${week.season}-${week.week}`} week={week} />
        ))}
      </SwipeableViews>
      <Arrow
        direction="right"
        onClick={() => {
          setIndex((i) => i + 1);
        }}
        disabled={index === season.length - 1}
      />
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default WeekSlider;
