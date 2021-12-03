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
    await waitFor(() => {
      expect(screen.getByText('user2@email.com')).toBeTruthy();
    });
    expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
  });

  describe('should update table entries when paginator is updated', () => {
    test('displays second page when user clicks on next page and then back', async () => {
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

    test('displays last page when user clicks on last page and then first page', async () => {
      customRenderer(App, initializeState);
      fireEvent.click(screen.getByText('Global.headers.listConsent'));
      await waitFor(() => {
        expect(screen.getByText('user1@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user2@email.com')).toBeTruthy();
      });
      fireEvent.click(screen.getByLabelText(/last page/i));
      await waitFor(() => {
        expect(screen.getByText('user5@email.com')).toBeTruthy();
      });
      fireEvent.click(screen.getByLabelText(/first page/i));
      await waitFor(() => {
        expect(screen.getByText('user1@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user2@email.com')).toBeTruthy();
      });
    });

    test('displays all entries when user tries to display more entries', async () => {
      customRenderer(App, initializeState);
      fireEvent.click(screen.getByText('Global.headers.listConsent'));
      await waitFor(() => {
        expect(screen.getByText('user1@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user2@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        fireEvent.click(screen.getByLabelText('rows per page'));
      });
      await waitFor(() => {
        fireEvent.click(screen.getByText('5'));
      });
      // FIXME:
      /*await waitFor(() => {
        expect(screen.getByText('user1@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user2@email.com')).toBeTruthy();
      });*/
      /*await waitFor(() => {
        fireEvent.click(screen.getByText('5'));
      });*/
      /*await waitFor(() => {
        expect(screen.getByText('user3@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user4@email.com')).toBeTruthy();
      });
      await waitFor(() => {
        expect(screen.getByText('user5@email.com')).toBeTruthy();
      });*/
    });
  });
});
