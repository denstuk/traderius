const defaultConfig = require("../conventions/jest.config");
module.exports = { ...defaultConfig, modulePathIgnorePatterns: ["./k6/units"] };
