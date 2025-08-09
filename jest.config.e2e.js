/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  testRegex: '/e2e/.+(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  collectCoverage: false,
  // https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
        useESM: true,
      },
    ],
  },
};
