import { atom } from 'recoil';

export const ConsentListState = atom<Consent.Detail[]>({
  key: 'ConsentList',
  default: [],
});

export interface ConsentListPaginator {
  perPage: number;
  currentPage: number;
}
export const ConsentListPaginatorState = atom<ConsentListPaginator>({
  key: 'ConsentListPaginator',
  default: {
    currentPage: 1,
    perPage: 2,
  },
});
