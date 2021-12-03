import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import { StyledTableCell } from 'lib-components/src/scss/components/table/StyledTableCell';
import { StyledTableRow } from 'lib-components/src/scss/components/table/StyledTableRow';
import { TablePaginationActions } from 'lib-components/src/scss/components/table/TablePaginationActions';

import {
  ConsentListPaginatorState,
  ConsentListState,
} from '$/store/consents/atoms';
import './ListConsentTable.scss';

export function ListConsentTable(): JSX.Element {
  const { t } = useTranslation();

  const tableHeaders: Record<string, string[]> = t('ListConsent.table.headers');

  const [paginator, setPaginator] = useRecoilState(ConsentListPaginatorState);
  const consentList = useRecoilValue(ConsentListState);

  const handleChangePage = (event: any, newPage: number) => {
    setPaginator((oldPaginator) => ({
      ...oldPaginator,
      currentPage: newPage,
    }));
  };

  const handleChangeRowsPerPage = (event: React.BaseSyntheticEvent) => {
    setPaginator(() => ({
      currentPage: 0,
      perPage: Number.parseInt(event.target.value, 10),
    }));
  };

  return (
    <section className="list-consent-table">
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {Object.keys(tableHeaders).map((header) => {
                return <StyledTableCell key={header}>{header}</StyledTableCell>;
              })}
            </TableRow>
          </TableHead>

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

          <TableFooter>
            <TableRow>
              <TablePagination
                ActionsComponent={TablePaginationActions}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                colSpan={3}
                count={consentList.length}
                id="consent-list-paginator"
                page={paginator.currentPage}
                rowsPerPage={paginator.perPage}
                rowsPerPageOptions={[2, 5, { label: 'All', value: -1 }]}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </section>
  );
}
