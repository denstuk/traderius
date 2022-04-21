module.exports = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["./tests/main.ts"],
    testMatch: ["./**/?(*.)+(spec|test).ts"],
    clearMocks: true,
    maxWorkers: 1,
    silent: false,
}