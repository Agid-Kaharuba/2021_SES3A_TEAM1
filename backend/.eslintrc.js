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
  },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    '@typescript-eslint/indent': [2, 2],
    'import/extensions': 'off',
    'func-names': 'off',
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "global-require": 'off',
    "max-len": ["error", { "code": 180 }],
    "import/prefer-default-export": 'off',
    "@typescript-eslint/no-explicit-any": 'off',
    "@typescript-eslint/explicit-module-boundary-types": 'off',
    "no-underscore-dangle": 'off'
  },
};
