import React, { useState } from 'react';
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@material-ui/core';

import { useStyles } from './layout.styles';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { Menu } from '@material-ui/icons';
import NavDrawer from './NavDrawer';
import AccountButton from './AccountButton';

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            St. Pete College Football Pick'em
          </Typography>
          <Hidden xsDown>
            <nav>
              <Button color="inherit" onClick={() => history.push('/')}>
                Home
              </Button>
              <Button color="inherit" onClick={() => history.push('/admin')}>
                Admin
              </Button>
              <AccountButton />
            </nav>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Hidden smUp>
        <nav className={classes.drawer}>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <NavDrawer />
          </Drawer>
        </nav>
      </Hidden>

      <Container maxWidth="lg" className={classes.container}>
        <main>
          <div className={classes.toolbar} />
          <div className={classes.content} id="content">
            {children}
          </div>
        </main>
      </Container>
    </div>
  );
};

export default Layout;
