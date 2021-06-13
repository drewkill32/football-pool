import React, { useState, Fragment } from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';

const AccountButton = () => {
  const history = useHistory();
  const { signout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (cb: () => void | undefined) => {
    setAnchorEl(null);
    if (typeof cb === 'function') {
      cb();
    }
  };
  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose(() => history.push('/profile'))}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClose(() => {
              signout().then(() => history.push('/'));
            })
          }
        >
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default AccountButton;
