import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
    },
    header: {
      textAlign: 'center',
    },
    paper: {
      [theme.breakpoints.down('xs')]: {
        width: '280px',
      },
      [theme.breakpoints.up('sm')]: {
        width: '430px',
      },

      padding: theme.spacing(2),
      margin: theme.spacing(1),
    },
    form: {
      height: '450px',
      display: 'flex',
      margin: theme.spacing(1),
      justifyContent: 'space-around',
      flexDirection: 'column',
    },
  })
);
