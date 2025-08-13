const { defineConfig, globalIgnores } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {},
    },

    extends: compat.extends(
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:@docusaurus/recommended',
    ),

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['eslint.config.js', '**/babel.config.js', 'pdf/export.js'],

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  globalIgnores([
    'build/',
    'coverage/',
    '.docusaurus/',
    'node_modules/',
    'static/',
  ]),
]);
