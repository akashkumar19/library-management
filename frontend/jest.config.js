module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
};