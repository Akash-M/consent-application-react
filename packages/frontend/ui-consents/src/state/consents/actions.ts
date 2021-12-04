import { getConsents } from 'lib-api/src/consent';

export async function fetchConsents() {
  const response = await getConsents();
  dispatch();
}
