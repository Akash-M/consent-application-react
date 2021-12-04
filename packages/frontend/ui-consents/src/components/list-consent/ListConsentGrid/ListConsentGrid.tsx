/* eslint-disable import/named,@typescript-eslint/restrict-template-expressions */
import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { ConsentListState } from '$/store/consents/atoms';
import './ListConsentGrid.scss';
import { ToolBar } from './ToolBar';
import {
  PerPage,
  filterModel,
  generateColumnModel,
  sortModel,
} from './grid-config';

export function ListConsentGrid(): JSX.Element {
  const { t } = useTranslation();

  const consentList = useRecoilValue(ConsentListState);

  const columns = generateColumnModel(t);

  const [sortConfig, setSortConfig] = useState<GridSortModel>(sortModel);

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
        pageSize={PerPage}
        rows={consentList}
        rowsPerPageOptions={[PerPage]}
        sortModel={sortConfig}
        onSortModelChange={(model) => setSortConfig(model)}
      />
    </section>
  );
}
