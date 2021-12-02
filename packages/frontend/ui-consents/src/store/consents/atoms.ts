import { atom } from 'recoil';

// TODO: move this to `lib-api` and load from there.
const defaultConsentList: Consent.Detail[] = [
  {
    consentUuid: '2bd8e0da-c846-4d14-94b3-497638492175',
    username: 'asd',
    email: 'asd@gmail.com',
    consent: {
      newsletter: true,
      ads: false,
      statistics: true,
    },
  },
  {
    consentUuid: '894753bd-28bc-4b8e-884c-fcbae468e636',
    username: 'qwe',
    email: 'qwe@gmail.com',
    consent: {
      newsletter: true,
      ads: true,
      statistics: true,
    },
  },
  {
    consentUuid: 'bddd88d9-ca60-4bec-b1b6-55d0583aa619',
    username: 'zxc',
    email: 'zxc@gmail.com',
    consent: {
      newsletter: false,
      ads: false,
      statistics: false,
    },
  },
];

export const ConsentListState = atom<Consent.Detail[]>({
  key: 'ConsentList',
  default: defaultConsentList,
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
