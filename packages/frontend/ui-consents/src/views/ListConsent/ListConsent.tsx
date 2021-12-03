import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import { getConsents, getConsentsCount } from 'lib-api/src/consent';

import { ConsentListPaginatorState } from '$/store/consents/atoms';
import './ListConsent.scss';

export function ListConsent(): JSX.Element {
  const { t } = useTranslation(['Global', 'ListConsent']);

  const tableHeaders: Record<string, string[]> = t('ListConsent.table.headers');

  const [paginator, setPaginator] = useRecoilState(ConsentListPaginatorState);
  const [consentsCount, setConsentsCount] = useState(0);
  const [visibleConsentList, setVisibleConsentList] = useState<
    Consent.Detail[]
  >([]);

  const handlePageChange = (
    event: React.BaseSyntheticEvent,
    newPage: number,
  ) => {
    setPaginator((oldPaginator) => ({
      ...oldPaginator,
      currentPage: newPage,
    }));
  };

  const fetchConsentList = async () => {
    setConsentsCount(await getConsentsCount());
    setVisibleConsentList(await getConsents(paginator));
  };

  useEffect(() => {
    void fetchConsentList();
  }, [paginator]);

  return (
    <article className="list-consent">
      <h2>{t('ListConsent.header')}</h2>

      <table className="ca-table">
        <thead>
          <tr>
            {Object.keys(tableHeaders).map((header) => {
              return <th key={header}>{tableHeaders[header]}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {visibleConsentList.map((consent: Consent.Detail) => {
            return (
              <tr key={consent.consentUuid} data-testid="consent-entry">
                <td>{consent.username}</td>

                <td>{consent.email}</td>

                <td>
                  <p>
                    {consent.consent.newsletter &&
                      t('Global.consents.newsletter')}
                  </p>
                  <p>{consent.consent.ads && t('Global.consents.ads')}</p>
                  <p>
                    {consent.consent.statistics &&
                      t('Global.consents.statistics')}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        count={Math.round(consentsCount / paginator.perPage)}
        page={paginator.currentPage}
        variant="outlined"
        onChange={handlePageChange}
      />
    </article>
  );
}
