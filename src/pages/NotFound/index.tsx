import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './notfound.styles';
import { useHistory } from 'react-router';

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.text}>
        The Page does not exist
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => history.push('/')}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
