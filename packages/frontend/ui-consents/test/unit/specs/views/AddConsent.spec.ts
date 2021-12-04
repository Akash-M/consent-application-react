import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setI18n } from 'react-i18next';

import { postConsent } from 'lib-api/src/consent';
import { consentListFixtures } from 'lib-api/src/fixtures';
import { customRenderer } from 'lib-utils/src/testing/factory';
import { I18N_MISSING_KEY, loadI18n } from 'lib-utils/src/testing/i18n';

import App from '$/App';
import AddConsent from '$/assets/locales/en/AddConsent.yaml';
import Global from '$/assets/locales/en/Global.yaml';
import { ConsentListState } from '$/store/consents/atoms';

jest.mock('lib-api/src/consent', () => ({
  postConsent: jest.fn(),
}));

const initializeState = ({ set }: any) => {
  set(ConsentListState, consentListFixtures);
};

describe('<App />', () => {
  beforeAll(() => {
    setI18n(loadI18n('Global', { Global, AddConsent }));
  });

  beforeEach(jest.clearAllMocks);

  describe('should render add consent entry screen', () => {
    test('without any form validation messages by default', () => {
      const { container } = customRenderer(App, initializeState);
      expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
    });

    test('with form validation messages when user clicks on submit and form is invalid', async () => {
      const { container } = customRenderer(App, initializeState);
      fireEvent.click(screen.getByText('AddConsent.addButton'));
      await waitFor(() => {
        expect(screen.getByText('AddConsent.errors.consents')).toBeTruthy();
      });
      expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
    });
  });

  describe('should trigger api call when user submits form', () => {
    test('displays toast message on success', async () => {
      const mockEntry: Consent.NewEntry = {
        username: 'user6',
        email: 'user6@email.com',
        consent: {
          newsletter: true,
          ads: true,
          statistics: true,
        },
      };

      (postConsent as jest.Mock).mockResolvedValueOnce(mockEntry);
      customRenderer(App, initializeState);
      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[0], { target: { value: mockEntry.username } });
      fireEvent.change(inputs[1], { target: { value: mockEntry.email } });
      fireEvent.click(screen.getByText('Global.consents.newsletter'));
      fireEvent.click(screen.getByText('Global.consents.ads'));
      fireEvent.click(screen.getByText('Global.consents.statistics'));
      fireEvent.click(screen.getByText('AddConsent.addButton'));
      await waitFor(() => {
        expect(postConsent).toHaveBeenCalledTimes(1);
      });
      await waitFor(() => {
        expect(screen.getByText('AddConsent.success')).toBeTruthy();
      });
    });

    test('displays toast message on error', async () => {
      (postConsent as jest.Mock).mockRejectedValueOnce('mock-error');
      customRenderer(App, initializeState);
      const inputs = screen.getAllByRole('textbox');

      fireEvent.change(inputs[0], { target: { value: 'user6' } });
      fireEvent.change(inputs[1], { target: { value: 'user6@email.com' } });
      fireEvent.click(screen.getByText('Global.consents.newsletter'));
      fireEvent.click(screen.getByText('Global.consents.ads'));
      fireEvent.click(screen.getByText('Global.consents.statistics'));
      fireEvent.click(screen.getByText('AddConsent.addButton'));
      await waitFor(() => {
        expect(postConsent).toHaveBeenCalledTimes(1);
      });
      await waitFor(() => {
        expect(screen.getByText('AddConsent.errors.api')).toBeTruthy();
      });
    });
  });
});
