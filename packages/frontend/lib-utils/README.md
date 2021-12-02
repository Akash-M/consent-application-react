# lib-utils

Library of utility files relevant for the consent app.

[![lib-utils](https://github.com/Akash-M/consent-app-react/actions/workflows/lib-utils.yaml/badge.svg)](https://github.com/Akash-M/consent-app-react/actions/workflows/lib-utils.yaml)

### Testing philosophy

#### Unit tests

The app is tested primarily through unit tests using [jest](https://jestjs.io/).

```sh
yarn workspace lib-utils test:unit
```

### Linting

```sh
yarn workspace lib-utils lint
```

- The app is linted through custom `eslint` rules specified globally. Additionally, we make use
  of `prettier` to automate as much as possible.

```sh
yarn workspace lib-utils lint
```
