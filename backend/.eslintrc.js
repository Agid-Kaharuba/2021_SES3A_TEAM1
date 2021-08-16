module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    "react": {
      "version": "999.999.999"
    }
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": 'off',
    "@typescript-eslint/explicit-module-boundary-types": 'off',
    "@typescript-eslint/indent": [2, 2],
    "@typescript-eslint/no-explicit-any": 'off',
    "@typescript-eslint/no-this-alias": 'off',
    "class-methods-use-this": 'off',
    "func-names": 'off',
    "global-require": 'off',
    "guard-for-in": 'off',
    "import/extensions": 'off',
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "import/no-extraneous-dependencies": [2, { devDependencies: ['**/*.unit.ts', '**/test.ts'] }],
    "import/prefer-default-export": 'off',
    "max-len": ["error", { "code": 180 }],
    "no-await-in-loop": 'off',
    "no-param-reassign": 'off',
    "no-plusplus": 'off',
    "no-restricted-syntax": 'off',
    "no-underscore-dangle": 'off',
    "react": 'off'
  }
};
