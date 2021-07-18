import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './unauthorized.styles';
import { useHistory, useLocation } from 'react-router';

const Unauthorized = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  console.log('params', { search: location.search });
  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.text}>
        You are not authorized to view the site
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

export default Unauthorized;
