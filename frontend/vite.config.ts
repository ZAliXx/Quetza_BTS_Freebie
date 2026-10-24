//import react, { reactCompilerPreset } from '@vitejs/plugin-react'
//import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Quetza_BTS_Freebie/', // igual que el repo, respetando mayúsculas
})
