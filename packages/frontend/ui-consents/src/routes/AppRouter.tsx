import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesEnum } from '$/routes/routes-enum';
import AddConsent from '$/views/AddConsent';

export default function AppRoutes(): JSX.Element {
  const ListConsent = lazy(() => import('$/views/ListConsent'));

  return (
    <Routes>
      <Route element={<AddConsent />} path={`/${AppRoutesEnum.AddConsent}`} />

      <Route element={<ListConsent />} path={`/${AppRoutesEnum.ListConsent}`} />
    </Routes>
  );
}
