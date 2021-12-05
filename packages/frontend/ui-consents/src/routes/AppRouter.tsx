import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesEnum } from '$/routes/routes-enum';
import AddConsent from '$/views/AddConsent';
import ListConsent from '$/views/ListConsent';

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<AddConsent />} path={`/${AppRoutesEnum.AddConsent}`} />

      <Route element={<ListConsent />} path={`/${AppRoutesEnum.ListConsent}`} />
    </Routes>
  );
}
