import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { AppRoutesEnum } from '$/routes/routes-enum';

export default function AppNavigation(): JSX.Element {
  const { t } = useTranslation();

  return (
    <aside className="layout__links">
      <NavLink to={`/${AppRoutesEnum.AddConsent}`}>
        {t('Global.headers.addConsent')}
      </NavLink>

      <NavLink to={`/${AppRoutesEnum.ListConsent}`}>
        {t('Global.headers.listConsent')}
      </NavLink>
    </aside>
  );
}
