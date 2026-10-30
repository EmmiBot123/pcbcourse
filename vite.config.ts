import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// When deployed on Netlify, Netlify injects NETLIFY="true" -> base is '/'
// Otherwise defaults to '/pcbcourse/' for GitHub Pages
const isNetlify = process.env.NETLIFY === 'true';
const basePath = process.env.VITE_BASE_PATH || (isNetlify ? '/' : '/pcbcourse/');

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
