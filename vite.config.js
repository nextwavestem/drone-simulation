import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/drone-simulation/',  // replace <repo-name> with your repository name
});
