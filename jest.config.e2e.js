const config = require('./jest.config');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...config,
  testRegex: '/e2e/.+(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  collectCoverage: false,
};
