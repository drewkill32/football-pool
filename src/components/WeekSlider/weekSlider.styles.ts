import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '0 10px',
      flexGrouth: 1,
      display: 'flex',
      minWidth: '200px',
      width: '100%',
      maxHeight: '180px',
    },
    slideContainer: {
      padding: '0 10px',
    },
    slide: {
      padding: 15,
      minHeight: 100,
      color: '#fff',
    },
    slide1: {
      backgroundColor: '#FEA900',
    },
    slide2: {
      backgroundColor: '#B3DC4A',
    },
    slide3: {
      backgroundColor: '#6AC0FF',
    },
  })
);
