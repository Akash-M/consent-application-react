import { selector } from 'recoil';

import { ConsentListPaginatorState, ConsentListState } from './atoms';

export const ConsentListSelector = selector({
  key: 'ConsentListSelector',
  get: ({ get }) => {
    const { currentPage, perPage } = get(ConsentListPaginatorState);
    const lastTrainingIndex = currentPage * perPage;
    const firstTrainingIndex = lastTrainingIndex - perPage;
    return get(ConsentListState).slice(firstTrainingIndex, lastTrainingIndex);
  },
});
