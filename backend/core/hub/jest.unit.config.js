const defaultConfig = require("../conventions/jest.config");
module.exports = { ...defaultConfig, modulePathIgnorePatterns: ["./tests/integration"] }
