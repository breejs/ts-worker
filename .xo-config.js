module.exports = {
  prettier: true,
  space: true,
  extends: ['xo-lass'],
  overrides: [
    {
      files: ['*.ts', '*/**.ts'],
      parserOptions: {
        project: 'types/tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off'
      }
    }
  ],
  parser: '@typescript-eslint/parser'
};
