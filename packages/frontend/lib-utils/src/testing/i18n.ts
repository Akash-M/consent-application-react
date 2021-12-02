/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next';

export { SUPPORTED_LANGUAGES } from '../i18n';
export const I18N_MISSING_KEY = '[i18n-missing-translation]';

// Use key name instead of translation text to avoid snapshots failing when updating text
const getGenericTranslation = (
  messages: Record<string, any>,
  namespace: string,
  path?: string,
): Record<string, any> => {
  for (const key of Object.keys(messages)) {
    if (typeof messages[key] === 'object') {
      if (Array.isArray(messages[key])) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        messages[key] = [messages[key][0]];
      }
      getGenericTranslation(messages[key], `${path ?? namespace}.${key}`);
    } else {
      let message = key;
      // Check for interpolations
      const interpolations = [
        ...(messages[key] as string).matchAll(/{{(\w+)}}/gi),
      ];
      if (interpolations.length > 0) {
        message = `${key} [${interpolations
          .map(([match, name]) => `${name}: ${match}`)
          .join(',')}]`;
      }
      messages[key] = `${path ?? namespace}.${message}`;
    }
  }
  return messages;
};

// Load only DE translations
function sanitizeTranslationRecords(translationRecords: Record<string, any>) {
  const deMessages: Record<string, any> = {};
  for (const [ns, values] of Object.entries(translationRecords)) {
    deMessages[ns] = getGenericTranslation(values, ns);
  }
  return {
    de: deMessages,
  };
}

export function loadI18n(
  defaultNamespace: string,
  translationRecords: Record<string, any>,
): typeof i18n {
  void i18n.init({
    lng: 'de',
    fallbackLng: 'de',
    defaultNS: defaultNamespace,
    // Include all namespaces.
    ns: Object.keys(translationRecords),
    nsSeparator: '.',
    debug: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    // This will help us find in which namespace the key is missing
    appendNamespaceToMissingKey: true,
    parseMissingKeyHandler(key) {
      return `${I18N_MISSING_KEY}: ${key}`;
    },
    react: {
      // Do not trigger DOM updates when changing language
      bindI18n: false,
      useSuspense: true,
    },
    resources: sanitizeTranslationRecords(translationRecords),
    returnObjects: true,
  });

  return i18n;
}
