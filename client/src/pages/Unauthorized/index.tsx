import React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './unauthorized.styles';
import { useHistory, useLocation, useParams } from 'react-router';

const Unauthorized = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  //get query parameters
  const { path } = useParams<{ path: string }>();
  const params = useParams();

  console.log('params', { search: location.search, path, params, history });
  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.text}>
        You are not authorized to view this page.
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
