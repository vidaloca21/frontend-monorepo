import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

import { config as libraryConfig } from './library.js'

/**
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...libraryConfig,
  {
    name: 'react/react-plugin-config',
    ...pluginReact.configs.flat.recommended,
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'react/react-hook-plugin-config',
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: 'useIsomorphicLayoutEffect',
        },
      ],
    },
  },
  {
    name: 'react/jsx-a11y-plugin-config',
    ...pluginJsxA11y.flatConfigs.recommended,
  },
  {
    name: 'react/language-setup',
    languageOptions: {
      ecmaVersion: 'latest',
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
]
