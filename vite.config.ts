import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin({ ssr: true })],
  assetsInclude: [/\/static\/.*$/],
  build: {
    target: 'esnext',
  },
});
