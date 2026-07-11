import antfu from '@antfu/eslint-config'

export default antfu(
  {
    languageOptions: {
      globals: { placeholder: false, $: false },
    },
    rules: {
      '@/func-call-spacing': 'error',
      'antfu/no-import-dist': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'style/arrow-spacing': 'error',
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'style/comma-dangle': ['warn', 'always-multiline'],
      'style/indent': ['error', 2, { SwitchCase: 1 }],
      'style/keyword-spacing': 'error',
      'style/quotes': ['error', 'single'],
      'style/semi': ['error', 'never'],
      'style/space-before-blocks': 'error',
      'style/space-infix-ops': 'error',
    },
  },
  {
    files: ['test/**/*.{js,mjs}'],
    rules: {
      'style/quotes': ['error', 'double'],
      'style/semi': ['error', 'always', { omitLastInOneLineBlock: true }],
      // 'style/quote-props': 'off',
    },
  },
)
