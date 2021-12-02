// eslint-disable-next-line unicorn/prevent-abbreviations
import i18n from 'i18next';
jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
  },
}));
import { loadI18n } from '$/testing/i18n';

describe('loadI18n', () => {
  const Default = {
    key: 'a message',
    interpolated: 'greetings {{name}}',
    nested: {
      m1: 'a message in nested key',
      array: ['a', 'b'],
    },
  };

  test('should replace messages as keys', () => {
    loadI18n('Default', { Default });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const initFn = i18n.init as jest.Mock;
    expect(initFn).toHaveBeenCalledWith({
      lng: 'de',
      fallbackLng: 'de',
      defaultNS: 'Default',
      ns: ['Default'],
      nsSeparator: '.',
      debug: false,
      keySeparator: '.',
      interpolation: {
        escapeValue: false,
      },
      appendNamespaceToMissingKey: true,
      parseMissingKeyHandler: expect.any(Function),
      react: {
        bindI18n: false,
        useSuspense: true,
      },
      resources: expect.anything(),
      returnObjects: true,
    });
    const { resources, parseMissingKeyHandler } = initFn.mock.calls[0][0];
    expect(resources).toEqual({
      de: {
        Default: {
          key: 'Default.key',
          interpolated: 'Default.interpolated [name: {{name}}]',
          nested: {
            m1: 'Default.nested.m1',
            array: ['Default.nested.array.0'],
          },
        },
      },
    });
    expect(parseMissingKeyHandler('key')).toEqual(
      '[i18n-missing-translation]: key',
    );
  });
});
