import { ConsentEntry } from '$/types/consent';

export const mockConsentList: ConsentEntry[] = [
  {
    username: 'user1',
    email: 'user1@email.com',
    consent: {
      newsletter: true,
      ads: false,
      statistics: true,
    },
  },
  {
    username: 'user2',
    email: 'user2@email.com',
    consent: {
      newsletter: true,
      ads: true,
      statistics: true,
    },
  },
  {
    username: 'user3',
    email: 'user3@email.com',
    consent: {
      newsletter: false,
      ads: false,
      statistics: false,
    },
  },
];
