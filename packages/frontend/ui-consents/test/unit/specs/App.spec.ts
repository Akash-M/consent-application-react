import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setI18n } from 'react-i18next';

import { customRenderer } from 'lib-utils/src/testing/factory';
import { loadI18n } from 'lib-utils/src/testing/i18n';

import App from '$/App';
import AddConsent from '$/assets/locales/en/AddConsent.yaml';
import Global from '$/assets/locales/en/Global.yaml';
import store from '$/store';

describe('<App />', () => {
  beforeAll(() => {
    setI18n(loadI18n('Global', { Global, AddConsent }));
  });

  beforeEach(jest.clearAllMocks);

  test('should toggle theme when user switches theme', async () => {
    customRenderer(App, store);
    await waitFor(() => {
      expect(screen.getByTestId('Brightness4Icon')).toBeTruthy();
    });
    fireEvent.click(screen.getByTestId('Brightness4Icon'));
    await waitFor(() => {
      expect(screen.getByTestId('Brightness7Icon')).toBeTruthy();
    });
    fireEvent.click(screen.getByTestId('Brightness7Icon'));
    await waitFor(() => {
      expect(screen.getByTestId('Brightness4Icon')).toBeTruthy();
    });
  });
});
