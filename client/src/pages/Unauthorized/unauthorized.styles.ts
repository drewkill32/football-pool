import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      width: "100vw",
    },
    text: {
      color: theme.palette.primary.contrastText,
      fontSize: "5vmin",
    },
    button: {
      marginTop: "20px",
      color: theme.palette.secondary.contrastText,
    },
  })
);
