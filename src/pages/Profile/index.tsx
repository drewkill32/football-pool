import {
  Button,
  Card,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useAuth } from '../../auth';
import LeagueDialog from '../../components/LeagueDialog';
import { League } from '../../models';
import { firestore } from '../../utils/firebase';
import { Link, useLocation } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'spaceAround',
    alignContent: 'center',
    margin: '.5rem',
  },
  layoutMiddle: {
    marginLeft: '1rem',
    flexGrow: 1,
  },
});

const useRedirectState = () => {
  const { state } = useLocation();
  if (typeof state === 'object' && state !== null) {
    return state as { redirectReason: string };
  }
  return { redirectReason: '' };
};

const Profile = () => {
  const { user } = useAuth();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<League>();
  const [redirectReason, setRedirectReason] = React.useState<string>(
    useRedirectState().redirectReason
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (value: League) => {
    setOpen(false);
    setSelectedValue(value);
    if (user && value?.slug) {
      user.leagues = [value];
    }
    await firestore.collection('users').doc(user?.id).set(
      {
        leagues: user?.leagues,
      },
      { merge: true }
    );
  };
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            User Profile
          </Typography>
          <div className={classes.layout}>
            <Typography color="textSecondary">EMAIL</Typography>
            <Typography className={classes.layoutMiddle}>
              {user?.email}
            </Typography>
            <Button variant="contained" color="primary" size="small">
              Update Email
            </Button>
          </div>
          <Divider />
          <div className={classes.layout}>
            <Typography color="textSecondary">LEAGUE</Typography>
            {user?.leagues && user.leagues.length > 0 ? (
              <Link to={`leagues/${user.leagues[0].slug}`}>
                <Typography className={classes.layoutMiddle}>
                  {user.leagues[0].name}
                </Typography>
              </Link>
            ) : (
              <>
                <Typography
                  color="textSecondary"
                  className={classes.layoutMiddle}
                >
                  You are not in a league
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleClickOpen}
                >
                  Join a League
                </Button>
              </>
            )}
          </div>
          <Divider />
          <div className={classes.layout}>
            <Typography color="textSecondary">SEASON</Typography>
            <Typography className={classes.layoutMiddle}>
              {new Date().getFullYear()}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <LeagueDialog
        open={open}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
      <Snackbar
        autoHideDuration={5000}
        open={redirectReason === 'no-league'}
        onClose={() => {
          setRedirectReason('');
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning">You must select a league!</Alert>
      </Snackbar>
      ;
    </>
  );
};

export default Profile;
