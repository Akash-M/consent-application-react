import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { getConsents } from 'lib-api/src/consent';

import ListConsentGrid from '$/components/list-consent/ListConsentGrid';
import { ConsentListState } from '$/store/consents/atoms';
import './ListConsent.scss';

export function ListConsent(): JSX.Element {
  const { t } = useTranslation(['ListConsent']);

  const setConsentList = useSetRecoilState(ConsentListState);
  const [loading, setLoading] = useState(false);

  const fetchConsentList = async () => {
    setLoading(true);
    try {
      setConsentList(await getConsents());
    } catch {
      toast.error(t('ListConsent.errors.api'), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchConsentList();
  }, []);

  return (
    <article className="list-consent">
      <h2>{t('ListConsent.header')}</h2>

      {loading ? <div>{t('Global.loader')}</div> : <ListConsentGrid />}
    </article>
  );
}
