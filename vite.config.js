import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        // Add more pages as needed
        'dashboard': './src/pages/dashboard.html'

      },
    },
  },
});