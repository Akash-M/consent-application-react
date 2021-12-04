import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setI18n } from 'react-i18next';

import { getConsents } from 'lib-api/src/consent';
import { consentListFixtures } from 'lib-api/src/fixtures';
import { customRenderer } from 'lib-utils/src/testing/factory';
import { I18N_MISSING_KEY, loadI18n } from 'lib-utils/src/testing/i18n';

import App from '$/App';
import AddConsent from '$/assets/locales/en/AddConsent.yaml';
import Global from '$/assets/locales/en/Global.yaml';
import ListConsent from '$/assets/locales/en/ListConsent.yaml';
import { ConsentListState } from '$/store/consents/atoms';

jest.mock('lib-api/src/consent', () => ({
  getConsents: jest.fn(),
}));

const initializeState = ({ set }: any) => {
  set(ConsentListState, consentListFixtures);
};

describe('<App />', () => {
  beforeAll(() => {
    setI18n(loadI18n('Global', { Global, AddConsent, ListConsent }));
  });

  beforeEach(jest.clearAllMocks);

  describe('should render after making api call to getConsents', () => {
    test('a list of consents with 2 entries by default on api success', async () => {
      (getConsents as jest.Mock).mockResolvedValueOnce(consentListFixtures);
      const { container } = customRenderer(App, initializeState);
      fireEvent.click(screen.getByText('Global.headers.listConsent'));
      await waitFor(() => {
        expect(screen.getByText('user1@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user2@email.com')).toBeTruthy();
      });
      expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
    });

    test('error on api error', async () => {
      (getConsents as jest.Mock).mockRejectedValueOnce('mock-error');
      const { container } = customRenderer(App, initializeState);
      fireEvent.click(screen.getByText('Global.headers.listConsent'));
      await waitFor(() => {
        expect(screen.getByText('ListConsent.errors.api')).toBeTruthy();
      });
      expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
    });
  });

  describe('should update table entries when paginator is updated', () => {
    test('displays second page when user clicks on next page and then back', async () => {
      (getConsents as jest.Mock).mockResolvedValueOnce(consentListFixtures);
      customRenderer(App, initializeState);
      fireEvent.click(screen.getByText('Global.headers.listConsent'));
      await waitFor(() => {
        expect(screen.getByText('user1@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user2@email.com')).toBeTruthy();
      });
      fireEvent.click(screen.getByLabelText(/next page/i));
      await waitFor(() => {
        expect(screen.getByText('user3@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user4@email.com')).toBeTruthy();
      });
      fireEvent.click(screen.getByLabelText(/previous page/i));
      await waitFor(() => {
        expect(screen.getByText('user1@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user2@email.com')).toBeTruthy();
      });
    });

    // TODO: add test for sorting.

    // TODO: add test for updating rows per page.
  });
});
