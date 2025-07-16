import { defineConfig } from 'vite'  // ✅ Adicione esta linha
import react from '@vitejs/plugin-react'

export default defineConfig({  // ✅ Agora funciona
  plugins: [react()],
  base: "/"  // ✅ Para URLs limpas
})
