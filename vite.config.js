import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

const directoryIndex = (mount) => ({
  name: `directory-index-${mount}`,
  configureServer(server) {
    server.middlewares.use(mount, (req, res, next) => {
      if (req.url.endsWith('/')) req.url = `${req.url}index.html`
      else if (!/\.[a-z0-9]+$/i.test(req.url)) req.url = `${req.url}/index.html`
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use(mount, (req, res, next) => {
      if (req.url.endsWith('/')) req.url = `${req.url}index.html`
      else if (!/\.[a-z0-9]+$/i.test(req.url)) req.url = `${req.url}/index.html`
      next()
    })
  }
})

// Dev: serve /assets/site.css a partir do último build (dist/assets/site.css).
// 404 se nunca foi buildado — é fallback aceitável em dev.
const siteCss = {
  name: 'site-css',
  configureServer(server) {
    server.middlewares.use('/assets/site.css', (req, res) => {
      const file = join(root, 'dist/assets/site.css')
      if (existsSync(file)) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
        res.end(readFileSync(file))
      } else {
        res.statusCode = 404
        res.end()
      }
    })
  },
}

export default defineConfig({
  plugins: [react(), directoryIndex('/blog'), directoryIndex('/en'), siteCss],
  base: "/"
})
