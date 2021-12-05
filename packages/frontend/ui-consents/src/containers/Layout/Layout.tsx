/* eslint-disable import/named */
import CssBaseline from '@mui/material/CssBaseline';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import React, { lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Routes } from 'react-router-dom';

import {
  AppThemes,
  darkTheme,
  lightTheme,
} from 'lib-components/src/theme/app-theme';

import SiteHeader from '$/components/SiteHeader';
import { ThemeContext } from '$/contexts/ThemeContext';
import { AppRoutes } from '$/router/routes';
import AddConsent from '$/views/AddConsent';
import './Layout.scss';

export function Layout(): JSX.Element {
  const { t } = useTranslation(['Global']);
  const ListConsent = lazy(() => import('$/views/ListConsent'));

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
          <aside className="layout__links">
            <NavLink to={`/${AppRoutes.AddConsent}`}>
              {t('Global.headers.addConsent')}
            </NavLink>

            <NavLink to={`/${AppRoutes.ListConsent}`}>
              {t('Global.headers.listConsent')}
            </NavLink>
          </aside>

          <section className="layout__screens">
            <Routes>
              <Route
                element={<AddConsent />}
                path={`/${AppRoutes.AddConsent}`}
              />

              <Route
                element={<ListConsent />}
                path={`/${AppRoutes.ListConsent}`}
              />
            </Routes>
          </section>
        </article>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
