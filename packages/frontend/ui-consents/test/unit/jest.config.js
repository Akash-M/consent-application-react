// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = Object.assign({}, require('../../jest.config'), {
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 97,
      lines: 98,
      functions: 90,
    },
  },
});
