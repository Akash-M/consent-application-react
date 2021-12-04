import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import { TablePaginationActions } from 'lib-components/src/components/table/TablePaginationActions';

import {
  ConsentListPaginatorState,
  ConsentListState,
} from '$/store/consents/atoms';

export function ListConsentTableFooter(): JSX.Element {
  const { t } = useTranslation();

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
    <TableFooter>
      <TableRow>
        <TablePagination
          ActionsComponent={TablePaginationActions}
          SelectProps={{
            inputProps: {
              'aria-label': t('ListConsent.table.pagination.perPage'),
            },
            native: true,
          }}
          colSpan={3}
          count={consentList.length}
          page={paginator.currentPage}
          rowsPerPage={paginator.perPage}
          rowsPerPageOptions={[
            2,
            5,
            { label: t('ListConsent.table.pagination.all'), value: -1 },
          ]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  );
}
