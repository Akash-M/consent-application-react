// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = Object.assign({}, require('../../jest.config'), {
  coverageThreshold: {
    global: {
      statements: 92,
      branches: 82,
      lines: 92,
      functions: 91,
    },
  },
});
