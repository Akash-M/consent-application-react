module.exports = {
  extends: ['kirinus'], // This is an open source eslint definition.
  parserOptions: {
    project: ['./tsconfig.eslint.json', './packages/*/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    jest: {
      version: 'latest',
    },
    react: {
      version: 'latest',
    },
  },
  ignorePatterns: ['**/storybook-static/*.js'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'ordered-imports/ordered-imports': [
      'error',
      {
        'group-ordering': [
          {
            name: 'current workspace',
            match: '^(\\$|#|\\.\\.?)/',
            order: 40,
          },
          {
            name: 'monorepo packages',
            match: '^(lib|ui)-.*/src',
            order: 30,
          },
          { name: 'third party', match: '.*', order: 20 },
          {
            name: 'framework libraries',
            match: '^react.*',
            order: 10,
          },
        ],
      },
    ],
    'eslint-comments/disable-enable-pair': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: false,
        reservedFirst: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-add-event-listener': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
