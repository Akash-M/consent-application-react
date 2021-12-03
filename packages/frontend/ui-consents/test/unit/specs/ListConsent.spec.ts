import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setI18n } from 'react-i18next';

import { consentListFixtures } from 'lib-api/src/fixtures';
import { customRenderer } from 'lib-utils/src/testing/factory';
import { I18N_MISSING_KEY, loadI18n } from 'lib-utils/src/testing/i18n';

import App from '$/App';
import AddConsent from '$/assets/locales/en/AddConsent.yaml';
import Global from '$/assets/locales/en/Global.yaml';
import ListConsent from '$/assets/locales/en/ListConsent.yaml';
import { ConsentListState } from '$/store/consents/atoms';

const initializeState = ({ set }: any) => {
  set(ConsentListState, consentListFixtures);
};

describe('<App />', () => {
  beforeAll(() => {
    setI18n(loadI18n('Global', { Global, AddConsent, ListConsent }));
  });

  beforeEach(jest.clearAllMocks);

  test('should render list of consents with 2 entries by default', async () => {
    const { container } = customRenderer(App, initializeState);
    fireEvent.click(screen.getByText('Global.headers.listConsent'));
    await waitFor(() => {
      expect(screen.getByText('user1@email.com')).toBeTruthy();
    });
    expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should change page when user clicks on paginator', async () => {
    const { container } = customRenderer(App, initializeState);
    fireEvent.click(screen.getByText('Global.headers.listConsent'));
    await waitFor(() => {
      expect(screen.getByText('user1@email.com')).toBeTruthy();
    });
    fireEvent.click(screen.getByLabelText(/next page/i));
    await waitFor(() => {
      expect(screen.getByText('user3@email.com')).toBeTruthy();
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
