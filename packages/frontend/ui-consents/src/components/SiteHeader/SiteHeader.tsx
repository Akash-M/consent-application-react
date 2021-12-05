import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import React from 'react';

import './SiteHeader.scss';

export function SiteHeader({ theme }: any): JSX.Element {
  /*const [currentTheme, setCurrentTheme] = useRecoilState(AppThemeState);

  const toggleTheme = () => {
    setCurrentTheme(
      currentTheme === AppThemes.Light ? AppThemes.Dark : AppThemes.Light,
    );
  };*/

  return (
    <nav className="site-header">
      <h2>Consents App</h2>

      <IconButton color="inherit" sx={{ ml: 1 }}>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </nav>
  );
}
