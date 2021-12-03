import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { StyledTableCell } from 'lib-components/src/components/table/StyledTableCell';

export function ListConsentTableHeader(): JSX.Element {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        {Object.keys(t('ListConsent.table.headers')).map((header) => {
          return <StyledTableCell key={header}>{header}</StyledTableCell>;
        })}
      </TableRow>
    </TableHead>
  );
}
