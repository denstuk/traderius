module.exports = {
	verbose: true,
	preset: "ts-jest",
	testEnvironment: "node",
	setupFilesAfterEnv: ["./k6/main.ts"],
	testMatch: ["./**/?(*.)+(spec|test).ts"],
	clearMocks: true,
	maxWorkers: 1,
	silent: false,
};
