import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ListConsentGrid from '$/components/list-consent/ListConsentGrid';
import { fetchConsents } from '$/state/consents/actions';
import { ApplicationState } from '$/store';
import './ListConsent.scss';

export function ListConsent(): JSX.Element {
  const { t } = useTranslation(['ListConsent']);
  const dispatch = useDispatch();

  const consents = useSelector(
    (state: ApplicationState) => state.consentsReducer,
  );

  const fetchConsentList = () => {
    console.log(consents.loading);
    dispatch(fetchConsents);
    console.log(consents.loading);
  };

  useEffect(() => {
    void fetchConsentList();
    console.log(consents.loading);
  }, []);

  return (
    <article className="list-consent">
      <h2>{t('ListConsent.header')}</h2>

      <Suspense fallback={<div>{t('Global.loader')}</div>}>
        <ListConsentGrid />
      </Suspense>
    </article>
  );
}
