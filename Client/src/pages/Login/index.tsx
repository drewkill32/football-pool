import React from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { Paper, Button, Typography, InputAdornment } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';

import { useAuth } from '../../auth';
import { useStyles } from './Login.styles';
import { TextInput } from '../../components/common/forms/TextInput';
import logo from './logo60.png';

function hasPathname(obj: any): obj is { from: { pathname: string } } {
  return (
    !!obj && typeof obj === 'object' && 'from' in obj && 'pathname' in obj.from
  );
}

function useFrom(): { pathname: string } {
  const location = useLocation();
  if (
    hasPathname(location.state) &&
    location.state.from.pathname !== '/login'
  ) {
    return location.state.from;
  }
  return { pathname: '/' };
}

const Login = () => {
  const classes = useStyles();

  const history = useHistory();
  const auth = useAuth();
  const from = useFrom();

  const login = async (values: { email: string; password: string }) => {
    await auth.signin(values.email, values.password);
    history.push(from);
  };

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <img src={logo} alt="logo" />
      <FinalForm initialValues={{ email: '', password: '' }} onSubmit={login}>
        {({ handleSubmit }) => {
          return (
            <Paper className={classes.paper}>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Typography className={classes.header}>
                  Log in to your account
                </Typography>
                <Field
                  name="email"
                  label="Email"
                  component={TextInput}
                  variant="outlined"
                  required
                  autoFocus
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  name="password"
                  label="Password"
                  component={TextInput}
                  type="password"
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography style={{ textAlign: 'center' }}>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </Typography>
                <Typography style={{ textAlign: 'center' }}>
                  <Link to="/forgotpassword">Forgot Password</Link>
                </Typography>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  <Typography style={{ color: 'white' }}>Login</Typography>
                </Button>
              </form>
            </Paper>
          );
        }}
      </FinalForm>
    </div>
  );
};

export default Login;
