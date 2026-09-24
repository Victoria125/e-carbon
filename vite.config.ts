import * as path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const apiTarget = process.env.VITE_API_URL_INTERNAL || 'http://localhost:5174'// trocar para produção
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  root: 'src',
  publicDir: '../public',

  build: {
    // Sourcemap apenas em desenvolvimento para facilitar debug
    sourcemap: !isProduction,

    // Output para a raiz do projeto
    outDir: '../dist',
    emptyOutDir: true,

    // Otimizações de produção
    minify: isProduction ? 'terser' : 'esbuild',

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      external: ['fs', 'path', 'os'],
      output: {
        // Nomes de arquivos com hash para cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        // Code splitting otimizado
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'utils': ['clsx', 'tailwind-merge']
        }
      }
    },

    // Otimizações adicionais
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline de assets pequenos (< 4KB) - reduz requisições HTTP
    reportCompressedSize: true,

    // Otimização de assets (imagens, fontes, etc)
    assetsDir: 'assets',
    copyPublicDir: true
  },

  server: {
    sourcemapIgnoreList: false,
    allowedHosts: true,
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Preview server (para testar build de produção localmente)
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  plugins: [
    react(),
    tailwind(),

    // Compressão Gzip (para todos os assets incluindo imagens)
    // Nota: PNGs já são comprimidos, gzip adiciona apenas ~5-10%
    // Para otimização real de PNGs: usar ferramentas como TinyPNG, ImageOptim antes do projeto
    isProduction && viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Apenas arquivos > 10KB
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|png|jpg|jpeg)$/i // Incluir imagens
    }),

    // Compressão Brotli (melhor que gzip, suportado por navegadores modernos)
    isProduction && viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|png|jpg|jpeg)$/i // Incluir imagens
    })
  ].filter(Boolean),

  esbuild: {
    sourcemap: !isProduction,
    // Remove comentários e otimiza em produção
    legalComments: isProduction ? 'none' : 'inline',
    minifyIdentifiers: isProduction,
    minifySyntax: isProduction,
    minifyWhitespace: isProduction
  },

  // Otimização de dependências
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    exclude: ['fs', 'path', 'os']
  }
})
