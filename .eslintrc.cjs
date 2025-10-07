// .eslintrc.js
module.exports = {
  env: {
    // Enables global variables for browser (e.g., window, document)
    browser: true,

    // Enables ECMAScript 2021 globals and syntax (e.g., optional chaining)
    es2024: true,

    // Enables global variables for Node.js (e.g., require, module)
    node: true,
  },
  extends: [
    // Extends ESLint's built-in recommended rule set (a solid set of best practices)
    'eslint:recommended',
  ],
  parserOptions: {
    // Allows parsing the latest ECMAScript syntax (e.g., ES2024+)
    ecmaVersion: 'latest',

    // Allows use of ECMAScript modules (import/export syntax)
    sourceType: 'module',

    ecmaFeatures: {
      // Enables parsing of import assertions (used in some advanced import scenarios)
      importAssertions: true,
    },
  },
  rules: {
    // Warns when console.log or other console methods are used
    // Useful to avoid leaving debug code in production
    'no-console': 'warn',

    // Warns when variables are defined but not used
    // Helps keep code clean and avoid unnecessary declarations
    'no-unused-vars': 'warn',
  },
};
