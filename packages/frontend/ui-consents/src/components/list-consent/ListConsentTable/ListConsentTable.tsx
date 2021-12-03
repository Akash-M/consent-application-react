import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { StyledTableCell } from 'lib-components/src/components/table/StyledTableCell';
import { StyledTableRow } from 'lib-components/src/components/table/StyledTableRow';

import ListConsentTableFooter from '$/components/list-consent/ListConsentTableFooter';
import ListConsentTableHeader from '$/components/list-consent/ListConsentTableHeader';
import {
  ConsentListPaginatorState,
  ConsentListState,
} from '$/store/consents/atoms';
import './ListConsentTable.scss';

export function ListConsentTable(): JSX.Element {
  const { t } = useTranslation();

  const paginator = useRecoilValue(ConsentListPaginatorState);
  const consentList = useRecoilValue(ConsentListState);

  return (
    <section className="list-consent-table">
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ minWidth: 650 }}>
          <ListConsentTableHeader />

          <TableBody>
            {(paginator.perPage > 0
              ? consentList.slice(
                  paginator.currentPage * paginator.perPage,
                  paginator.currentPage * paginator.perPage + paginator.perPage,
                )
              : consentList
            ).map((consent) => (
              <StyledTableRow key={consent.consentUuid}>
                <StyledTableCell>{consent.username}</StyledTableCell>

                <StyledTableCell>{consent.email}</StyledTableCell>

                <StyledTableCell>
                  <p>
                    {consent.consent.newsletter &&
                      t('Global.consents.newsletter')}
                  </p>

                  <p>{consent.consent.ads && t('Global.consents.ads')}</p>

                  <p>
                    {consent.consent.statistics &&
                      t('Global.consents.statistics')}
                  </p>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>

          <ListConsentTableFooter />
        </Table>
      </TableContainer>
    </section>
  );
}
