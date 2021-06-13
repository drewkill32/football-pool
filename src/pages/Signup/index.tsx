import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { Paper, Button, Typography, InputAdornment } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';

import { useAuth } from '../../auth';
import { useStyles } from './Signup.styles';
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
  return { pathname: '/profile' };
}

const Signup = () => {
  const classes = useStyles();

  const history = useHistory();
  const auth = useAuth();
  const from = useFrom();

  const signup = async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (password !== confirmPassword) {
      console.error('the passwords do not match.');
      return;
    }
    try {
      console.log(auth);
      var creds = await auth.signup(email, password);
      console.log({ creds: creds });
      history.replace(from);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <img src={logo} alt="logo" />
      <FinalForm initialValues={{ email: '', password: '' }} onSubmit={signup}>
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
                  autofocus
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
                <Field
                  name="confirmPassword"
                  label="Comnfirm Password"
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
                  Already have an account? <Link to="/login">Log In</Link>
                </Typography>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  <Typography style={{ color: 'white' }}>Sign up</Typography>
                </Button>
              </form>
            </Paper>
          );
        }}
      </FinalForm>
    </div>
  );
};

export default Signup;
