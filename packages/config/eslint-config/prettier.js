import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/**
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  {
    name: 'prettier/prettier-plugin-config',
    ...pluginPrettierRecommended,
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]
