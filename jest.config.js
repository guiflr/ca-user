/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  rootDir: "./src/tests",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};