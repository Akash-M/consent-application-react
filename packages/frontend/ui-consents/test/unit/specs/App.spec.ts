import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setI18n } from 'react-i18next';

import { consentListFixtures } from 'lib-api/src/fixtures';
import { customRenderer } from 'lib-utils/src/testing/factory';
import { loadI18n } from 'lib-utils/src/testing/i18n';

import App from '$/App';
import AddConsent from '$/assets/locales/en/AddConsent.yaml';
import Global from '$/assets/locales/en/Global.yaml';
import { ConsentListState } from '$/store/consents/atoms';

const initializeState = ({ set }: any) => {
  set(ConsentListState, consentListFixtures);
};

describe('<App />', () => {
  beforeAll(() => {
    setI18n(loadI18n('Global', { Global, AddConsent }));
  });

  beforeEach(jest.clearAllMocks);

  test('should toggle theme when user switches theme', async () => {
    customRenderer(App, initializeState);
    fireEvent.click(screen.getByTestId('Brightness4Icon'));
    await waitFor(() => {
      expect(screen.getByTestId('Brightness7Icon')).toBeTruthy();
    });
  });
});
