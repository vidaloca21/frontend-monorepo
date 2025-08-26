import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(__dirname, './tsconfig.app.json'),
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        http: resolve(__dirname, 'src/http/index.ts'),
        utils: resolve(__dirname, 'src/utils/index.ts'),
      },
      formats: ['cjs', 'es'],
      fileName: (format, entryName) => (format === 'es' ? `${entryName}.js` : `${entryName}.cjs`),
    },
    outDir: 'dist',
    rollupOptions: {
      external: [/@ci-repo\/.*/, 'react', 'react-dom', 'react-router', 'zustand'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
