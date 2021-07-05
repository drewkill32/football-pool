import React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { firestore } from '../../utils/firebase';
import { useState } from 'react';
import { League } from '../../models';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const LeagueDialog: React.FC<{
  onClose: (league: League) => void;
  selectedValue: League | undefined;
  open: boolean;
}> = ({ onClose, selectedValue, open }) => {
  const classes = useStyles();
  const [leagues, setLeagues] = useState<League[]>([]);

  const fetchLeagues = async () => {
    console.log('fetching leagues');
    try {
      const snapshot = await firestore
        .collection('leagues')
        .where('active', '==', true)
        .get();
      const data: League[] = [];
      snapshot.forEach((doc) => {
        const { name } = doc.data();
        data.push({ name, slug: doc.id });
      });
      setLeagues(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    if (selectedValue) {
      onClose(selectedValue);
    }
  };

  const handleListItemClick = (value: League) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      onEnter={() => fetchLeagues()}
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Select a League</DialogTitle>
      <List>
        {leagues.map((league) => (
          <ListItem
            button
            onClick={() => handleListItemClick(league)}
            key={league.slug}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={league.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default LeagueDialog;
