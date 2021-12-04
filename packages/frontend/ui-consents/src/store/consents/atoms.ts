import { atom } from 'recoil';

import { AppThemes } from 'lib-components/src/theme/app-theme';

export const ConsentListState = atom<Consent.Detail[]>({
  key: 'ConsentListState',
  default: [],
});

export const ConsentListPaginatorState = atom<Consent.Paginator>({
  key: 'ConsentListPaginatorState',
  default: {
    currentPage: 0,
    perPage: 2,
  },
});

export const AppThemeState = atom<AppThemes>({
  key: 'AppThemeState',
  default: AppThemes.Light,
});
