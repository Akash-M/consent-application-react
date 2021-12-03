# lib-api

Library of api calls relevant for the consent app.

[![lib-api](https://github.com/Akash-M/consent-application-react/actions/workflows/lib-api.yaml/badge.svg)](https://github.com/Akash-M/consent-application-react/actions/workflows/lib-api.yaml)

### Testing philosophy

#### Unit tests

The app is tested primarily through unit tests using [jest](https://jestjs.io/).

```sh
yarn workspace lib-api test:unit
```

### Linting

```sh
yarn workspace lib-api lint
```

- The app is tested through standard `eslint` packages with rules specified for a default React App. The respective
  configuration in present in the package.json file.
