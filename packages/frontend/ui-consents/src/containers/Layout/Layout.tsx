/* eslint-disable import/named */
import {
  Theme,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Routes } from 'react-router-dom';

import { darkTheme, lightTheme } from 'lib-components/src/theme/theme';

import SiteHeader from '$/components/SiteHeader';
import { AppRoutes } from '$/router/routes';
import AddConsent from '$/views/AddConsent';
import ListConsent from '$/views/ListConsent';
import './Layout.scss';

export function Layout(): JSX.Element {
  const { t } = useTranslation(['Global']);
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  let theme: Theme = createTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
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
            <Route element={<AddConsent />} path={`/${AppRoutes.AddConsent}`} />
            <Route
              element={<ListConsent />}
              path={`/${AppRoutes.ListConsent}`}
            />
          </Routes>
        </section>
      </article>
    </ThemeProvider>
  );
}
