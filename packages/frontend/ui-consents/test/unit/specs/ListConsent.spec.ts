import { fireEvent, screen } from '@testing-library/react';
import { setI18n } from 'react-i18next';

import { customRenderer } from 'lib-utils/src/testing/factory';
import { I18N_MISSING_KEY, loadI18n } from 'lib-utils/src/testing/i18n';

import App from '$/App';
import AddConsent from '$/assets/locales/en/AddConsent.yaml';
import Global from '$/assets/locales/en/Global.yaml';
import ListConsent from '$/assets/locales/en/ListConsent.yaml';
import { ConsentListState } from '$/store/consents/atoms';
import { mockConsentList } from '#/fixtures/consent-list';

const initializeState = ({ set }: any) => {
  set(ConsentListState, mockConsentList);
};

describe('<App />', () => {
  beforeAll(() => {
    setI18n(loadI18n('Global', { Global, AddConsent, ListConsent }));
  });

  beforeEach(jest.clearAllMocks);

  test('should render list of consents with 2 entries by default', () => {
    const { container } = customRenderer(App, initializeState);
    fireEvent.click(screen.getByText('Global.headers.listConsent'));
    expect(container.firstChild!.textContent).not.toContain(I18N_MISSING_KEY);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('user1')).toBeTruthy();
    expect(screen.getByText('user2')).toBeTruthy();
  });

  test('should change page when user clicks on paginator', () => {
    const { container } = customRenderer(App, initializeState);
    fireEvent.click(screen.getByText('Global.headers.listConsent'));
    fireEvent.click(screen.getByText('2'));
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText('user3')).toBeTruthy();
  });
});
