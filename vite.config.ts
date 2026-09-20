import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` makes the production build work from any folder or sub-path
// (GitHub Pages, a shared host, opening dist/ behind any static server).
// Change it to '/' if you always deploy at the domain root.
export default defineConfig({
  base: './michel-portfolio',
  build: { assetsDir: 'static' },
  plugins: [react()],
});
