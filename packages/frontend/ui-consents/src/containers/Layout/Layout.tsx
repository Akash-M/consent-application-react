/* eslint-disable import/named */
import CssBaseline from '@mui/material/CssBaseline';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';

import {
  AppThemes,
  darkTheme,
  lightTheme,
} from 'lib-components/src/theme/app-theme';

import SiteHeader from '$/components/SiteHeader';
import { ThemeContext } from '$/contexts/ThemeContext';
import AppNavigation from '$/routes/AppNavigation';
import AppRoutes from '$/routes/AppRouter';
import './Layout.scss';

export function Layout(): JSX.Element {
  const [appTheme, setAppTheme] = useState<AppThemes>(AppThemes.Light);

  const theme: Theme = createTheme(
    appTheme === AppThemes.Light ? lightTheme : darkTheme,
  );

  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SiteHeader />

        <article className="layout">
          <AppNavigation />

          <section className="layout__screens">
            <AppRoutes />
          </section>
        </article>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
