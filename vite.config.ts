import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Automatically detect deployment environment:
// On Netlify or root domains -> '/'
// On GitHub Actions Pages -> '/pcbcourse/'
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' && !process.env.NETLIFY;
const basePath = process.env.VITE_BASE_PATH || (isGitHubPages ? '/pcbcourse/' : '/');

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: true,
  }
});
