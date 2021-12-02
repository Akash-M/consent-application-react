import { fireEvent, screen, waitFor } from '@testing-library/react';
import { setI18n } from 'react-i18next';

import { customRenderer } from 'lib-utils/src/testing/factory';
import { I18N_MISSING_KEY, loadI18n } from 'lib-utils/src/testing/i18n';

import App from '$/App';
import AddConsent from '$/assets/locales/en/AddConsent.yaml';
import Global from '$/assets/locales/en/Global.yaml';
import { ConsentListState } from '$/store/consents/atoms';
import { mockConsentList } from '#/fixtures/consent-list';

const initializeState = ({ set }: any) => {
  set(ConsentListState, mockConsentList);
};

describe('<App />', () => {
  beforeAll(() => {
    setI18n(loadI18n('Global', { Global, AddConsent }));
  });

  beforeEach(jest.clearAllMocks);

  test('should render screen to add new consent entry by default with button disabled', () => {
    const { container } = customRenderer(App, initializeState);
    expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should append new entry to existing list and display toast message on success', async () => {
    customRenderer(App, initializeState);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: 'user4' } });
    fireEvent.change(inputs[1], { target: { value: 'user4@email.com' } });
    fireEvent.click(screen.getByText('Global.consents.newsletter'));
    fireEvent.click(screen.getByText('Global.consents.ads'));
    fireEvent.click(screen.getByText('Global.consents.statistics'));
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('AddConsent.success')).toBeTruthy();
    });
  });
});
