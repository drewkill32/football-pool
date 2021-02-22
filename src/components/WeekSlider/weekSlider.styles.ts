import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      //padding: '0 10px',
      //flexGrouth: 1,
      display: 'flex',
      minWidth: '200px',
      //width: '100%',
      maxHeight: '180px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slideContainer: {
      //padding: '0 20px',
      //width: '100%',

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
