import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useAuth } from '../../auth';
import LeagueDialog from '../../components/LeagueDialog';
import { firestore } from '../../utils/firebase';

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

const Profile = () => {
  const { user } = useAuth();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (value: string) => {
    setOpen(false);
    setSelectedValue(value);
    if (user) {
      user.leagues = [value];
    }
    await firestore.collection('users').doc(user?.id).set(
      {
        leagues: user?.leagues,
      },
      { merge: true }
    );
    console.log('league => ', value);
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
              <Typography className={classes.layoutMiddle}>
                {user.leagues[0]}
              </Typography>
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
    </>
  );
};

export default Profile;
