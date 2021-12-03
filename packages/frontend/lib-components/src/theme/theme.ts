// eslint-disable-next-line import/named
import { Theme, createTheme } from '@mui/material/styles';

// define light theme colors
export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007487',
    },
    secondary: {
      main: '#961b0c',
    },
  },
});

// define dark theme colors
export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007487',
    },
    secondary: {
      main: '#961b0c',
    },
  },
});
