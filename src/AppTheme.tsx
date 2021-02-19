import React from 'react';
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#97cf65',
      main: '#669e37',
      dark: '#366f00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a78172',
      main: '#775447',
      dark: '#4a2b20',
      contrastText: '#ffffff',
    },
  },
});

const AppTheme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
