import { getConsents, postConsent } from '$/consent';

describe('Consents Api', () => {
  test('getConsents', async () => {
    expect((await getConsents()).length).toBe(5);
  });

  test('postConsent', async () => {
    const mockNewConsent: Consent.NewEntry = {
      username: 'user6',
      email: 'user6@email.com',
      consent: {
        newsletter: true,
        ads: true,
        statistics: true,
      },
    };
    await postConsent(mockNewConsent);
    expect((await getConsents()).length).toBe(6);
  });
});
