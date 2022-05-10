module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "semi": ["error", "always"],
    "eol-last": ["error", "always"],
    "no-var": "error",
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: true,
      },
    ],
    "no-console": "error",
    "no-unused-expressions": "error",
  },
  ignorePatterns: ["*.test.ts"],
};
