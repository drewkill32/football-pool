import React, { useEffect, useState } from "react";

import { useAuth } from "../../auth";
import { useSelectedWeek } from "../../context/WeekContext.Provider";
import PicksSkeleton from "./PicksSkeleton";
import { Pick, Team } from "../../models";
import {
  Checkbox,
  createStyles,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import { CheckBox } from "@material-ui/icons";
const sleep = (ms: number) =>
  new Promise((response) => setTimeout(response, ms));

const useStyles = makeStyles(() =>
  createStyles({
    img: {
      width: "45px",
      height: "45px",
    },
    team: {
      flexGrow: 1,
    },
    score: {
      marginRight: "10px",
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
      alignItems="center"
    >
      <Grid item>
        <img src={team.logos?.[0]} alt="" className={classes.img} />
      </Grid>
      <Grid item className={classes.team}>
        {team.school} {team.mascot}
      </Grid>
      <Grid item className={classes.score}>
        {score}
      </Grid>
      <Checkbox checked={picked} />
    </Grid>
  );
};

const Picks: React.FC<{ className: string | undefined }> = ({ className }) => {
  const classes = useStyles();
  const [selectedWeek] = useSelectedWeek();
  const [picks, setPicks] = useState<Pick[]>();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const doTheThing = async () => {
      setLoading(true);
      const url = `sample/db/picks-userid-${user?.id}.json`;
      try {
        // await sleep(100);
        const response = await fetch(url);
        const data = (await response.json()) as Pick[];
        const thisWeeksPicks = data.filter(
          (p) => p.weekNum === selectedWeek?.week
        );
        setPicks(thisWeeksPicks);
        console.log(thisWeeksPicks);
      } catch (error) {
        console.error(`unable to fetch data from ${url}. ${error}`);
      } finally {
        setLoading(false);
      }
    };
    doTheThing();
  }, [selectedWeek, user?.id]);

  return (
    <div className={className}>
      {loading ? (
        <PicksSkeleton />
      ) : (
        <Grid container spacing={5}>
          {picks?.map((pick) => (
            <Grid item xs={12}>
              <Paper>
                <Grid
                  container
                  item
                  spacing={1}
                  key={pick.id}
                  direction="column"
                >
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
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Picks;
