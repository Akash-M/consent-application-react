import Pagination from '@mui/material/Pagination';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getConsents } from 'lib-api/src/consent';

import { ConsentListPaginatorState, ConsentListState } from '$/store/consents/atoms';
import { ConsentListSelector } from '$/store/consents/selectors';
import './ListConsent.scss';

export function ListConsent(): JSX.Element {
  const { t } = useTranslation(['Global', 'ListConsent']);

  const tableHeaders: Record<string, string[]> = t('ListConsent.table.headers');

  const [consentList, setConsentList] = useRecoilState(ConsentListState);
  // const visibleConsentList = useRecoilState(ConsentListSelector);
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

  const fetchConsentList = async () => {
    setConsentList(await getConsents());
  };

  useEffect(() => {
    void fetchConsentList();
  }, []);

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
          {consentList.map((consent: Consent.Detail) => {
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
        count={consentListPaginator.perPage}
        variant="outlined"
        onChange={handlePageChange}
      />
    </article>
  );
}
