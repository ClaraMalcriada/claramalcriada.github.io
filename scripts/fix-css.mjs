// 1) Acha o CSS compilado do vite (dist/assets/index-*.css) e o publica como
//    dist/assets/site.css (URL estável para todas as páginas estáticas).
// 2) Copia os HTML gerados por build-static de public/ para dist/.
// 3) Substitui o placeholder __SITE_CSS__ pelo link real em todos os HTML
//    de dist/ e public/ (incluindo os posts do blog).
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');
const CSS_NAME = 'site.css';

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

// 1) publicar site.css
const assetsDir = join(DIST, 'assets');
if (!existsSync(assetsDir)) throw new Error('dist/assets/ não encontrado — rode vite build antes');
const compiled = readdirSync(assetsDir).filter((f) => /^index-.+\.css$/.test(f));
if (!compiled.length) throw new Error('nenhum dist/assets/index-*.css encontrado');
copyFileSync(join(assetsDir, compiled[0]), join(assetsDir, CSS_NAME));

// 2) sobrepor os HTML gerados em public/ -> dist/
for (const rel of ['about.html', join('en', 'index.html'), join('en', 'about.html'), 'privacy-policy.html', join('en', 'privacy-policy.html')]) {
  const src = join(PUBLIC, rel);
  if (existsSync(src)) {
    const dst = join(DIST, rel);
    mkdirSync(dirname(dst), { recursive: true });
    copyFileSync(src, dst);
  }
}

// 3) substituir placeholder em todos os HTML de dist/ e public/
const cssHref = '/assets/site.css';
let replaced = 0;
for (const file of [...walk(DIST), ...walk(PUBLIC)]) {
  if (!file.endsWith('.html')) continue;
  const original = readFileSync(file, 'utf8');
  let html = original.replaceAll('__SITE_CSS__', cssHref);
  // index.html do SPA referencia o CSS compilado com hash; apontar para a URL estável.
  html = html.replace(/href="\.?\/?assets\/index-[^"]+\.css"/, `href="${cssHref}"`);
  if (html !== original) {
    replaced++;
    writeFileSync(file, html);
  }
}

console.log(`fix-css: ${compiled[0]} -> assets/${CSS_NAME}; placeholder substituído em ${replaced} HTML`);
