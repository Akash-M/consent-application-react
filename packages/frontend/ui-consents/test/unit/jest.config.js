// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = Object.assign({}, require('../../jest.config'), {
  coverageThreshold: {
    global: {
      statements: 98.79,
      branches: 100,
      lines: 99.35,
      functions: 93.94,
    },
  },
});
