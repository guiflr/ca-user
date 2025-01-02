module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    testRegex: '.*\\.test\\.js$',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/dist/$1',
    },
  };
  