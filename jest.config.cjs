module.exports = {
  cacheDirectory: '<rootDir>/.jest-cache',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.jest.test.ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { module: 'CommonJS', jsx: 'react-jsx', target: 'ES2020', esModuleInterop: true, types: ['jest', '@testing-library/jest-dom'] } }],
  },
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  collectCoverageFrom: ['src/components.tsx'],
  coverageReporters: ['text', 'html'],
};
