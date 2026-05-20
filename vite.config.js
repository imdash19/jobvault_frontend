import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/jobvault_frontend/', // Important: Change this to your exact GitHub repository name
  plugins: [
    react(),
    tailwindcss(),
  ],
})