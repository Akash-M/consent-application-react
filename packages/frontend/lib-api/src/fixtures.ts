export const consentListFixtures: Consent.Detail[] = [
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
      newsletter: true,
      ads: false,
      statistics: false,
    },
  },
  {
    consentUuid: '8a951f4e-4ef0-4c4d-ae2e-51e2ba14f1b0',
    username: 'user4',
    email: 'user4@email.com',
    consent: {
      newsletter: false,
      ads: true,
      statistics: false,
    },
  },
  {
    consentUuid: '6311dcdf-a8c9-4357-ba11-c70589da4f4f',
    username: 'user5',
    email: 'user5@email.com',
    consent: {
      newsletter: false,
      ads: false,
      statistics: true,
    },
  },
];
