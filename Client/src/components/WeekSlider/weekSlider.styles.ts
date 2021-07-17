import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      minWidth: '200px',
      maxHeight: '180px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slideContainer: {
      padding: '0 5px',
    },
    slide: {
      minHeight: 100,
      color: '#fff',
      margin: '0 auto',
      width: '200px',
    },
    slide1: {
      backgroundColor: '#FEA900',
    },
    slide2: {
      backgroundColor: '#B3DC4A',
      margin: '0 -20',
    },
    slide3: {
      backgroundColor: '#6AC0FF',
    },
  })
);
