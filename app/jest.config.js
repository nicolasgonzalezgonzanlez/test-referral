module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ["./setupTests.js"],
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: ['/(.husky|docs|node_modules)/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/config/',
    '/dtos/',
    '/docs/',
    '/routes/',
    '/constants/',
    '/templates/',
    '/tests/',
  ],
  coverageDirectory: 'coverage/'
};
