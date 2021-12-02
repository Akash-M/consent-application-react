import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Routes } from 'react-router-dom';

import { AppRoutes } from '$/router/routes';
import AddConsent from '$/views/AddConsent';
import ListConsent from '$/views/ListConsent';
import './Layout.scss';

export function Layout(): JSX.Element {
  const { t } = useTranslation(['Global']);

  return (
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
          <Route element={<ListConsent />} path={`/${AppRoutes.ListConsent}`} />
        </Routes>
      </section>
    </article>
  );
}
