module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended',
    // "plugin:vue/essential",
    // "eslint:recommended",
    "@vue/standard"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  rules: {
    'no-unused-vars': 'warn',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-var': 'error',
    'no-console': 'warn',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'keyword-spacing': [
      'error',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'no-trailing-spaces': 'error',
    'prefer-const': 'warn',
    'operator-linebreak': [
      'error',
      'after',
      {
        'overrides': {
          '?': 'before',
          ':': 'before',
          '===': 'ignore',
        },
      },
    ],   
    "vue/max-attributes-per-line": ["warn", {
        "singleline": 2,
        "multiline": {
            "max": 1,
            "allowFirstLine": false
        }
    }],
    'vue/require-default-prop': 'off',
    'vue/no-unused-components': "warn",
    'vue/no-unused-vars': "warn",
    'vue/valid-v-on': "off",
  },
}
