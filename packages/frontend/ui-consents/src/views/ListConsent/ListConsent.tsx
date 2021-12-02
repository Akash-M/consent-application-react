import Pagination from '@mui/material/Pagination';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ConsentListPaginatorState } from '$/store/consents/atoms';
import { ConsentListSelector } from '$/store/consents/selectors';
import './ListConsent.scss';

export function ListConsent(): JSX.Element {
  const { t } = useTranslation(['Global', 'ListConsent']);

  const tableHeaders: Record<string, string[]> = t('ListConsent.table.headers');

  const consentList = useRecoilValue(ConsentListSelector);
  const consentListPaginator = useRecoilValue(ConsentListPaginatorState);
  const setConsentListPaginator = useSetRecoilState(ConsentListPaginatorState);

  const handlePageChange = (
    event: React.BaseSyntheticEvent,
    newPage: number,
  ) => {
    setConsentListPaginator((oldPaginator) => ({
      ...oldPaginator,
      currentPage: newPage,
    }));
  };

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
          {consentList.map((consent, index) => {
            return (
              <tr key={index} data-testid="consent-entry">
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
        count={consentListPaginator.perPage}
        variant="outlined"
        onChange={handlePageChange}
      />
    </article>
  );
}
