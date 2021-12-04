/* eslint-disable import/named,@typescript-eslint/restrict-template-expressions */
import Tooltip from '@mui/material/Tooltip';
import {
  DataGrid,
  GridColumns,
  GridSortDirection,
  GridSortModel,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  ConsentListPaginatorState,
  ConsentListState,
} from '$/store/consents/atoms';
import './ListConsentTable.scss';

export function ListConsentTable(): JSX.Element {
  const { t } = useTranslation();

  const [paginator, setPaginator] = useRecoilState(ConsentListPaginatorState);
  const consentList = useRecoilValue(ConsentListState);

  const generateConsent = (consent: any) => {
    const data = [];
    if (consent.newsletter) data.push(t('Global.consents.newsletter'));
    if (consent.ads) data.push(t('Global.consents.ads'));
    if (consent.statistics) data.push(t('Global.consents.statistics'));
    return data.join(', ');
  };

  const columns: GridColumns = [
    {
      field: 'username',
      headerName: t('ListConsent.table.headers.username'),
      sortable: true,
      width: 250,
    },
    {
      field: 'email',
      headerName: t('ListConsent.table.headers.email'),
      sortable: true,
      width: 250,
    },
    {
      field: 'consent',
      headerName: t('ListConsent.table.headers.consent'),
      renderCell: (params: any) => {
        const toolTipValue = generateConsent(params.row.consent);
        return (
          <Tooltip title={toolTipValue}>
            <span className="table-cell-trucate">{toolTipValue}</span>
          </Tooltip>
        );
      },
      valueGetter: (params: GridValueGetterParams) => {
        return generateConsent(params.row.consent);
      },
      width: 500,
    },
  ];

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'username',
      sort: 'asc' as GridSortDirection,
    },
    {
      field: 'email',
      sort: 'asc' as GridSortDirection,
    },
  ]);

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    setPaginator(() => ({
      currentPage: 0,
      perPage: rowsPerPage,
    }));
  };

  return (
    <section className="list-consent-table">
      <DataGrid
        pagination
        className="consent-grid"
        columns={columns}
        disableColumnMenu={true}
        pageSize={paginator.perPage}
        rows={consentList}
        rowsPerPageOptions={[2, 5, 10]}
        sortModel={sortModel}
        onPageSizeChange={handleChangeRowsPerPage}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </section>
  );
}
