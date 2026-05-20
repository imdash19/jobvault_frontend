import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/jobvault/', // Important: Match your GitHub repository name exactly
  plugins: [
    react(),
    tailwindcss(),
  ],
})