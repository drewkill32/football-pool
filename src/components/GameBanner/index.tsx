import React from "react";
import {
  ButtonBase,
  Checkbox,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import {
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "@material-ui/icons";

import { green, red } from "@material-ui/core/colors";
import { Pick } from "../../models";
import { useHistory } from "react-router";
import GameDetail from "../GameDetail";

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      minWidth: "280px",
      width: "100%",
    },
    button: {
      textAlign: "left",
      width: "100%",
    },
    h2hCheckbox: {
      position: "absolute",
      bottom: 0,
    },
    button: {
      textAlign: "left",
      width: "100%",
    },
  })
);

const GameBanner: React.FC<{ pick: Pick }> = ({ pick }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <ButtonBase
            className={classes.button}
            onClick={() => history.push(`/game/${pick.gameId}`)}
          >
            <Grid
              item
              container
              alignContent="center"
              justify="center"
              wrap="nowrap"
              alignItems="center"
            >
              <GameDetail game={pick} />
            </Grid>
          </ButtonBase>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container direction="row" justify="space-around">
          <Grid item>
            {pick.pickTeamId === pick.away.id &&
            pick.winner !== pick.pickTeamId ? (
              <CancelIcon style={{ color: red[500] }} />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </Grid>
          <Grid item>
            {pick.isHead2Head ? (
              <CancelIcon style={{ color: red[500] }} />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </Grid>
          <Grid item>
            {pick.pickTeamId === pick.away.id &&
            pick.winner !== pick.pickTeamId ? (
              <CancelIcon style={{ color: red[500] }} />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GameBanner;
