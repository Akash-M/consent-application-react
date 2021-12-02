import { atom } from 'recoil';

export const ConsentListState = atom<Consent.Detail[]>({
  key: 'ConsentListState',
  default: [],
});

export const ConsentListPaginatorState = atom<Consent.Paginator>({
  key: 'ConsentListPaginatorState',
  default: {
    currentPage: 1,
    perPage: 2,
  },
});
