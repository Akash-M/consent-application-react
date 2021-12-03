import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  ConsentListPaginatorState,
  ConsentListState,
} from '$/store/consents/atoms';
import './ListConsentTable.scss';

function TablePaginationActions(props: {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: any;
}) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        aria-label="first page"
        disabled={page === 0}
        onClick={handleFirstPageButtonClick}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton
        aria-label="previous page"
        disabled={page === 0}
        onClick={handleBackButtonClick}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        aria-label="next page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleNextButtonClick}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>

      <IconButton
        aria-label="last page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleLastPageButtonClick}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export function ListConsentTable(): JSX.Element {
  const { t } = useTranslation();

  const tableHeaders: Record<string, string[]> = t('ListConsent.table.headers');

  const [paginator, setPaginator] = useRecoilState(ConsentListPaginatorState);
  const consentList = useRecoilValue(ConsentListState);

  // TODO: move this to `lib-components`.
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  // TODO: move this to `lib-components`.
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

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
