/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globalSetup: '<rootDir>/src/jest/globalSetup.ts',
  setupFiles: ['<rootDir>/src/jest/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/jest/setupFilesAfterEnv.ts'],
  globalTeardown: '<rootDir>/src/jest/globalTeardown.ts',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/jest/fileMock.ts',
    '@docusaurus/Link': '<rootDir>/src/jest/LinkMock.tsx',
    '@docusaurus/useDocusaurusContext':
      '<rootDir>/src/jest/useDocusaurusContextMock.ts',
    '@docusaurus/useBaseUrl': '<rootDir>/src/jest/useBaseUrlMock.ts',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
  testRegex: '/src/.+(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
};
