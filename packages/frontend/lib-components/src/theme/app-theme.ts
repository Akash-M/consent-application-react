/* eslint-disable import/named */
import { Theme, createTheme } from '@mui/material/styles';

export enum AppThemes {
  Dark = 'dark',
  Light = 'light',
}

// define light theme colors
export const lightTheme: Theme = createTheme({
  palette: {
    mode: AppThemes.Light,
    primary: {
      main: '#00535c',
    },
    divider: '#007587',
    text: {
      primary: '#000000',
      secondary: '#2b3547',
    },
  },
});

// define dark theme colors
export const darkTheme: Theme = createTheme({
  palette: {
    mode: AppThemes.Dark,
    primary: {
      main: '#00535c',
    },
    divider: '#007587',
    background: {
      default: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#eaeaec',
    },
  },
});
