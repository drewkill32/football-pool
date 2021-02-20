import React from 'react';

import { useHistory } from 'react-router';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { AccountCircle, ExitToApp, Home } from '@material-ui/icons';
import { useAuth } from '../auth';

const NavDrawer = () => {
  const history = useHistory();
  const { signout } = useAuth();
  return (
    <div>
      <div />
      <List>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.push('/profile')}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => signout(() => history.push('/'))}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Signout" />
        </ListItem>
      </List>
    </div>
  );
};

export default NavDrawer;
