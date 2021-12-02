import { appCatalogApi } from './axios';

export async function getConsents(): Promise<Consent.Detail[]> {
  return await appCatalogApi.get('/consents');
}

export async function postConsent(
  consent: Consent.Detail,
): Promise<Consent.Detail> {
  return await appCatalogApi.post(`/consents`, { consent });
}
