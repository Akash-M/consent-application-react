export const mockConsentList: Consent.Detail[] = [
  {
    consentUuid: '2bd8e0da-c846-4d14-94b3-497638492175',
    username: 'user1',
    email: 'user1@email.com',
    consent: {
      newsletter: true,
      ads: false,
      statistics: true,
    },
  },
  {
    consentUuid: '894753bd-28bc-4b8e-884c-fcbae468e636',
    username: 'user2',
    email: 'user2@email.com',
    consent: {
      newsletter: true,
      ads: true,
      statistics: true,
    },
  },
  {
    consentUuid: 'bddd88d9-ca60-4bec-b1b6-55d0583aa619',
    username: 'user3',
    email: 'user3@email.com',
    consent: {
      newsletter: false,
      ads: false,
      statistics: false,
    },
  },
];
