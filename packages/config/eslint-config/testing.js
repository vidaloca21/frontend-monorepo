import { config as prettierConfig } from './prettier.js'

/**
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [...prettierConfig]
