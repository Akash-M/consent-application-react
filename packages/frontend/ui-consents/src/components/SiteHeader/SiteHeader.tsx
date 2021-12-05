import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from 'react';

import { AppThemes } from 'lib-components/src/theme/app-theme';

import { ThemeContext } from '$/contexts/ThemeContext';
import './SiteHeader.scss';

export function SiteHeader(): JSX.Element {
  const { appTheme, setAppTheme, theme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setAppTheme &&
      setAppTheme(
        appTheme === AppThemes.Light ? AppThemes.Dark : AppThemes.Light,
      );
  };

  return (
    <nav className="site-header">
      <h2>Consents App</h2>

      {theme && (
        <IconButton color="inherit" sx={{ ml: 1 }} onClick={toggleTheme}>
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      )}
    </nav>
  );
}
