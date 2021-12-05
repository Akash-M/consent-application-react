import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ListConsentGrid from '$/components/list-consent/ListConsentGrid';
import { ApplicationState } from '$/store';
import { fetchConsents } from '$/store/consents/actions';
import './ListConsent.scss';

export function ListConsent(): JSX.Element {
  const { t } = useTranslation(['ListConsent']);
  const dispatch = useDispatch();

  const consents = useSelector(
    (state: ApplicationState) => state.consentsReducer,
  );

  const fetchConsentList = () => {
    dispatch(fetchConsents);
  };

  useEffect(() => {
    void fetchConsentList();
  }, []);

  return (
    <article className="list-consent">
      <h2>{t('ListConsent.header')}</h2>

      {consents.loading ? <div>{t('Global.loader')}</div> : <ListConsentGrid />}
    </article>
  );
}
