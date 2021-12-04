/* eslint-disable import/named,@typescript-eslint/restrict-template-expressions */
import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  ConsentListPaginatorState,
  ConsentListState,
} from '$/store/consents/atoms';
import './ListConsentGrid.scss';
import { ToolBar } from './ToolBar';
import { filterModel, generateColumnModel, sortModel } from './grid-config';

export function ListConsentGrid(): JSX.Element {
  const { t } = useTranslation();

  const [paginator, setPaginator] = useRecoilState(ConsentListPaginatorState);
  const consentList = useRecoilValue(ConsentListState);

  const columns = generateColumnModel(t);

  const [sortConfig, setSortConfig] = useState<GridSortModel>(sortModel);

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
        autoHeight={true}
        className="consent-grid"
        columns={columns}
        components={{
          Toolbar: ToolBar,
        }}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        initialState={{ filter: filterModel.filter }}
        pageSize={paginator.perPage}
        rows={consentList}
        rowsPerPageOptions={[2, 5, 10]}
        sortModel={sortConfig}
        onPageSizeChange={handleChangeRowsPerPage}
        onSortModelChange={(model) => setSortConfig(model)}
      />
    </section>
  );
}
