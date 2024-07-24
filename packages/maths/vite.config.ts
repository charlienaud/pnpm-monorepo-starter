import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'MyLib',
      fileName: 'my-lib',
    },
  },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
});
