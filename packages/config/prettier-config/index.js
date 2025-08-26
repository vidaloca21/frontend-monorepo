/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss', 'prettier-plugin-css-order'],
  singleQuote: true,
  semi: false,
  useTabs: false,
  tabWidth: 2,
  // trailingComma: 'es5',
  printWidth: 120,
  // bracketSpacing: true,
  // bracketSameLine: false,
  // arrowParens: 'avoid',
  singleAttributePerLine: true,
  // htmlWhitespaceSensitivity: 'css',
  endOfLine: 'auto',
  // vueIndentScriptAndStyle: false,
}
