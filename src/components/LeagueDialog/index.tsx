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

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const LeagueDialog: React.FC<{
  onClose: (league: string) => void;
  selectedValue: string;
  open: boolean;
}> = (props) => {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [leagues, setLeagues] = useState<string[]>([]);

  const fetchLeagues = async () => {
    console.log('fetching leagues');
    try {
      const snapshot = await firestore
        .collection('leagues')
        .where('active', '==', true)
        .get();
      const data: string[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.id);
        console.log(doc.id, doc.data());
      });
      setLeagues(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
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
            key={league}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={league} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default LeagueDialog;
