/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globalSetup: '<rootDir>/src/jest/globalSetup.ts',
    setupFiles: ['<rootDir>/src/jest/setupFiles.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/jest/setupFilesAfterEnv.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: '<rootDir>/tsconfig.test.json'
        }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    verbose: true,
};
