/* eslint-disable import/named,@typescript-eslint/restrict-template-expressions */
import {
  GridColumns,
  GridInitialState,
  GridSortModel,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { TFunction } from 'react-i18next';

import { ToolTip } from './ToolTip';

export enum SortFields {
  Username = 'username',
  Email = 'email',
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export const sortModel: GridSortModel = [
  {
    field: SortFields.Username,
    sort: SortDirection.Ascending,
  },
  {
    field: SortFields.Email,
    sort: SortDirection.Ascending,
  },
];

export const filterModel: GridInitialState = {
  filter: {
    filterModel: {
      items: [
        {
          columnField: 'username',
          operatorValue: 'contains',
          value: '',
        },
      ],
    },
  },
};

export const generateConsentText = (
  consent: Consent.Detail['consent'],
  t: TFunction<'translation', undefined>,
): string => {
  const data = [];
  if (consent.newsletter) data.push(t('Global.consents.newsletter'));
  if (consent.ads) data.push(t('Global.consents.ads'));
  if (consent.statistics) data.push(t('Global.consents.statistics'));
  return data.join(', ');
};

export const generateColumnModel = (
  t: TFunction<'translation', undefined>,
): GridColumns => {
  return [
    {
      field: 'username',
      headerName: t('ListConsent.table.headers.username'),
      filterable: true,
      sortable: true,
      width: 250,
    },
    {
      field: 'email',
      headerName: t('ListConsent.table.headers.email'),
      filterable: true,
      sortable: true,
      width: 250,
    },
    {
      field: 'consent',
      headerName: t('ListConsent.table.headers.consent'),
      filterable: false,
      renderCell: (params: any) => {
        return ToolTip({ value: generateConsentText(params.row.consent, t) });
      },
      valueGetter: (params: GridValueGetterParams) => {
        return generateConsentText(params.row.consent, t);
      },
      width: 500,
    },
  ];
};
