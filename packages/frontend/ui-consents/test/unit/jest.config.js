// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = Object.assign({}, require('../../jest.config'), {
  coverageThreshold: {
    global: {
      statements: 96,
      branches: 75,
      lines: 96,
      functions: 90,
    },
  },
});
