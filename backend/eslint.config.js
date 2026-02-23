export default [
  {
    files: ['**/*.js'], // onyl check .js files in server directory
    rules: {
      semi: 'error', // force semicolons
      'no-unused-vars': 'warn', // warn if variables are unused
    },
  },
];
