import { fixupPluginRules } from '@eslint/compat'
import eslint from '@eslint/js'
import markdown from '@eslint/markdown'
import pluginEslintComment from 'eslint-plugin-eslint-comments'
import pluginImport from 'eslint-plugin-import'
import pluginTurbo from 'eslint-plugin-turbo'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

/**
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  eslint.configs.recommended,
  {
    name: 'base/eslint-rule-setup',
    rules: {
      'sort-imports': 'off',
      'no-unused-vars': 'off',
      'no-empty-pattern': 'off',
    },
  },
  {
    name: 'base/language-setup',
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    name: 'base/import-plugin-config',
    ...pluginImport.flatConfigs.recommended,
    rules: {
      'import/no-named-as-default': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent', 'index'], 'unknown'],
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'react-dom', group: 'builtin', position: 'before' },
            { pattern: '@dexp', group: 'external', position: 'after' },
            { pattern: '@pages', group: 'internal', position: 'before' },
            { pattern: '@widgets', group: 'internal', position: 'before' },
            { pattern: '@features', group: 'internal', position: 'before' },
            { pattern: '@entities', group: 'internal', position: 'before' },
            { pattern: '@shared', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    name: 'base/unused-import-plugin-config',
    plugins: {
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    name: 'base/eslint-comment-plugin-config',
    plugins: {
      'eslint-comments': fixupPluginRules(pluginEslintComment),
    },
    rules: {
      'eslint-comments/require-description': 'error',
    },
  },
  {
    name: 'base/turbo-plugin-config',
    plugins: {
      turbo: pluginTurbo,
    },
    rules: {
      'turbo/no-undeclared-env-vars': [
        'warn',
        {
          allowList: ['VITE_*'],
        },
      ],
    },
  },
  {
    name: 'base/markdown-config',
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    processor: 'markdown/markdown',
  },
  {
    name: 'base/ignore-setup',
    ignores: ['node_modules/**', 'dist/**', 'scripts/**', '.*/**', '**/*.config.*', '!**/eslint.config.js', '*.yaml'],
  },
]
