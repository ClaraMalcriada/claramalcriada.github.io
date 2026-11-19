// Suíte de testes CANON — lê dist/ após o build (node puro, sem servidor).
// O canon é FIXO: o teste falha se o site divergir dele.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BOOKS, SERIES, amazonUrl } from '../src/data/books.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://claramalcriada.github.io';

// ------------------------------------------------------------------ utils

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const read = (rel) => readFileSync(join(DIST, rel), 'utf8');

// url -> arquivo em dist (directory-index)
function urlToFile(url) {
  const u = new URL(url, SITE);
  let p = decodeURIComponent(u.pathname);
  p = p.replace(/\/index\.html$/, '/');
  if (p === '/' || p.endsWith('/')) return p === '/' ? 'index.html' : p.replace(/^\//, '') + 'index.html';
  return p.replace(/^\//, '');
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html')).map((f) => relative(DIST, f));

// páginas e idiomas
const PT_PAGES = ['index.html', 'about.html', 'privacy-policy.html', 'blog/index.html',
  ...htmlFiles.filter((f) => /^blog\/[^/]+\/index\.html$/.test(f))];
const EN_PAGES = ['en/index.html', 'en/about.html', 'en/privacy-policy.html', 'en/blog/index.html',
  ...htmlFiles.filter((f) => /^en\/blog\/[^/]+\/index\.html$/.test(f))];
const postSlugs = htmlFiles
  .filter((f) => /^blog\/[^/]+\/index\.html$/.test(f))
  .map((f) => f.replace(/^blog\//, '').replace(/\/index\.html$/, ''));
const langOf = (f) => (EN_PAGES.includes(f) ? 'en' : 'pt');

const headerOf = (html) => (html.match(/<header[\s\S]*?<\/header>/) || [''])[0];
const linksIn = (frag) => [...frag.matchAll(/<a\s[^>]*href="([^"]*)"/g)].map((m) => m[1]);
const jsonLdOf = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1])); // lança se não parseável

// ------------------------------------------------------------------ estado

const groups = [];
let cur = null;
function group(name) {
  cur = { name, checks: [] };
  groups.push(cur);
}

const check = (label, ok, detail) => cur.checks.push([label, ok, detail]);

if (!existsSync(DIST)) {
  console.error('dist/ não encontrado — rode npm run build antes de npm test');
  process.exit(1);
}

// ============================================================ 1. langSwitch
group('1. langSwitch por página');
{
  const expect = {
    'index.html': '/en/',
    'en/index.html': '/',
    'about.html': '/en/about.html',
    'en/about.html': '/about.html',
    'privacy-policy.html': '/en/privacy-policy.html',
    'en/privacy-policy.html': '/privacy-policy.html',
    'blog/index.html': '/en/blog/',
    'en/blog/index.html': '/blog/',
  };
  for (const s of postSlugs) {
    expect[`blog/${s}/index.html`] = `/en/blog/${s}/`;
    expect[`en/blog/${s}/index.html`] = `/blog/${s}/`;
  }
  for (const f of [...PT_PAGES, ...EN_PAGES]) {
    const header = headerOf(read(f));
    const links = linksIn(header);
    const sw = links.at(-1);
    const want = expect[f] ?? '/en/';
    check(`langSwitch ${f} -> ${want}`, sw === want, `encontrado: ${sw}`);
  }
}

// ============================================== 2. hreflang + sitemap
group('2. hreflang + sitemap');
{
  const pairRoot = { 'pt-BR': `${SITE}/`, en: `${SITE}/en/` };
  const pairAbout = { 'pt-BR': `${SITE}/about.html`, en: `${SITE}/en/about.html` };
  const pairPrivacy = { 'pt-BR': `${SITE}/privacy-policy.html`, en: `${SITE}/en/privacy-policy.html` };

  const hreflangs = (f) =>
    Object.fromEntries(
      [...read(f).matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
        .map((m) => [m[1], m[2]]),
    );

  for (const [f, pair] of [['index.html', pairRoot], ['en/index.html', pairRoot],
    ['about.html', pairAbout], ['en/about.html', pairAbout],
    ['privacy-policy.html', pairPrivacy], ['en/privacy-policy.html', pairPrivacy]]) {
    const got = hreflangs(f);
    check(`hreflang par mútuo em /${f === 'index.html' ? '' : f}`,
      got['pt-BR'] === pair['pt-BR'] && got.en === pair.en,
      `encontrado: ${JSON.stringify(got)}`);
  }

  // pares hreflang dos posts/índice do blog: grupo 8.
  // sitemap
  const sm = read('sitemap.xml');
  const urlBlocks = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const smUrls = urlBlocks.map((b) => (b.match(/<loc>([^<]+)<\/loc>/) || [])[1]).filter(Boolean);

  const altLinks = (block) =>
    Object.fromEntries(
      [...block.matchAll(/xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)]
        .map((m) => [m[1], m[2]]),
    );
  for (const [loc, pair] of [
    [`${SITE}/`, pairRoot],
    [`${SITE}/en/`, pairRoot],
    [`${SITE}/about.html`, pairAbout],
    [`${SITE}/en/about.html`, pairAbout],
    [`${SITE}/privacy-policy.html`, pairPrivacy],
    [`${SITE}/en/privacy-policy.html`, pairPrivacy],
  ]) {
    const block = urlBlocks.find((b) => b.includes(`<loc>${loc}</loc>`));
    const got = block ? altLinks(block) : null;
    check(`sitemap xhtml:link par em ${loc}`,
      !!got && got['pt-BR'] === pair['pt-BR'] && got.en === pair.en,
      `encontrado: ${JSON.stringify(got)}`);
  }
  for (const u of smUrls) {
    const f = urlToFile(u);
    check(`sitemap URL existe em dist: ${u}`, existsSync(join(DIST, f)), `faltando: ${f}`);
  }
}

// ============================================================ 3. nav
group('3. Nav por idioma');
{
  const ptNav = ['/about.html', '/#books', '/blog/', '/about.html#contato', '/#malcriada-books'];
  const enHomeNav = ['/en/about.html', '#books', '/en/blog/', '#contact', '#malcriada-books'];
  const enAboutNav = ['/en/about.html', '/en/#books', '/en/blog/', '/en/about.html#contact', '/en/#malcriada-books'];
  const enBlogNav = ['/en/about.html', '/en/#books', '/en/blog/', '/en/about.html#contact', '/en/#malcriada-books'];
  const expectNav = (f) => {
    if (f === 'en/index.html') return enHomeNav;
    if (f.startsWith('en/')) return enAboutNav;
    return ptNav;
  };
  for (const f of [...PT_PAGES, ...EN_PAGES]) {
    const header = headerOf(read(f));
    const links = linksIn(header);
    const nav = links.slice(0, -1); // último é o langSwitch
    const want = expectNav(f);
    check(`nav ${f}`, JSON.stringify(nav) === JSON.stringify(want),
      `encontrado: ${JSON.stringify(nav)}`);
  }
}

// ============================================================ 4. capas
group('4. Capas');
{
  const ptCovers = BOOKS.map((b) => b.cover);
  const enCovers = BOOKS.map((b) => b.coverEn);
  for (const f of htmlFiles) {
    const lang = langOf(f);
    const allowed = lang === 'en' ? enCovers : ptCovers;
    const found = [...read(f).matchAll(/src="(\/cover-[^"]+\.png)"/g)].map((m) => m[1]);
    for (const c of found) {
      check(`capa ${lang} permitida em /${f}: ${c}`, allowed.includes(c),
        lang === 'en' ? 'esperada apenas /cover-*-en.png do registry' : 'esperada capa PT do registry');
      check(`capa existe em dist: ${c}`, existsSync(join(DIST, c.replace(/^\//, ''))));
    }
  }
  for (const c of [...ptCovers, ...enCovers]) {
    check(`capa do registry existe em dist: ${c}`, existsSync(join(DIST, c.replace(/^\//, ''))));
  }
}

// ============================================================ 5. CSS único
group('5. CSS único');
{
  // google1198e19fa4d4f161.html é o arquivo de verificação do Google, não é
  // página gerada do site.
  const pages = htmlFiles.filter((x) => !/google.*\.html$/.test(x));
  for (const f of pages) {
    const html = read(f);
    check(`referencia /assets/site.css: ${f}`, html.includes('href="/assets/site.css"'));
    check(`sem __SITE_CSS__: ${f}`, !html.includes('__SITE_CSS__'));
    const hashCss = html.match(/href="[^"]*\/index-[^/]*\.css"/);
    check(`sem link index-HASH.css: ${f}`, !hashCss, hashCss?.[0]);
  }
}

// ======================================= 6. idioma / JSON-LD / ASINs
group('6. Idioma / JSON-LD / ASINs');
{
  const pages = htmlFiles.filter((x) => !/google.*\.html$/.test(x));
  for (const f of pages) {
    const lang = langOf(f);
    const html = read(f);
    const gotLang = (html.match(/<html lang="([^"]+)"/) || [])[1];
    check(`html lang ${lang === 'en' ? '"en"' : '"pt-BR"'}: ${f}`,
      gotLang === (lang === 'en' ? 'en' : 'pt-BR'), `encontrado: ${gotLang}`);

    let lds;
    try {
      lds = jsonLdOf(html);
      check(`JSON-LD parseável: ${f}`, true);
    } catch (e) {
      check(`JSON-LD parseável: ${f}`, false, e.message);
      continue;
    }
    const wantIn = lang === 'en' ? 'en-US' : 'pt-BR';
    for (const ld of lds.flat(9)) {
      if (ld && typeof ld === 'object' && 'inLanguage' in ld) {
        check(`inLanguage ${wantIn} em /${f}`, ld.inLanguage === wantIn,
          `encontrado: ${ld.inLanguage}`);
      }
    }

    // Cards de livro (links /dp/) + card da série: domain e ASIN vêm do registry.
    const asinsOk = lang === 'en'
      ? new Set([...BOOKS.map((b) => b.editions.en.asin), SERIES.en.asin])
      : new Set([...BOOKS.map((b) => b.editions.pt.asin), SERIES.pt.asin]);
    const domain = lang === 'en' ? 'https://www.amazon.com/dp/' : 'https://www.amazon.com.br/dp/';
    const isDp = (u) => /^https:\/\/www\.amazon\.(com|com\.br)\/dp\//.test(u);
    const dpOk = (u) => u.startsWith(domain) && asinsOk.has(u.slice(domain.length).split(/[?#]/)[0]);
    const hrefs = [...html.matchAll(/href="(https:\/\/www\.amazon\.[^"]+)"/g)].map((m) => m[1]);
    for (const h of hrefs) {
      // links de autor/loja (amazon.com/author/...) não são cards — ignorados.
      if (!isDp(h)) continue;
      check(`Amazon ${lang === 'en' ? 'EN' : 'PT'} correta em /${f}: ${h}`, dpOk(h),
        lang === 'en' ? 'esperado amazon.com/dp/<ASIN EN do registry>'
          : 'esperado amazon.com.br/dp/<ASIN PT do registry>');
    }
    // URLs de amazon dentro do JSON-LD
    const ldUrls = [];
    const collect = (o) => {
      if (!o || typeof o !== 'object') return;
      if (typeof o.url === 'string' && o.url.includes('amazon.')) ldUrls.push(o.url);
      for (const v of Object.values(o)) collect(v);
    };
    lds.forEach((ld) => collect(ld));
    for (const u of ldUrls) {
      if (!isDp(u)) continue;
      check(`Amazon ${lang} (JSON-LD) em /${f}: ${u}`, dpOk(u));
    }
  }
}

// ============================================================ 7. RSS
group('7. RSS');
{
  const posts = readdirSync(join(ROOT, 'content', 'posts')).filter((x) => x.endsWith('.md'));
  const rss = read('blog/rss.xml');
  const items = [...rss.matchAll(/<item>[\s\S]*?<\/item>/g)].map((m) => m[0]);
  check(`RSS: itens (${items.length}) == posts md (${posts.length})`,
    items.length === posts.length);
  for (const item of items) {
    const pub = (item.match(/<pubDate>([^<]+)<\/pubDate>/) || [])[1];
    const d = new Date(pub);
    check(`RSS pubDate RFC822 válido: ${pub}`,
      pub && !Number.isNaN(d.getTime()) && /\d{1,2} \w{3} \d{4}/.test(pub));
    const link = (item.match(/<link>([^<]+)<\/link>/) || [])[1];
    if (link) {
      const f = urlToFile(link);
      check(`RSS item URL existe em dist: ${link}`, existsSync(join(DIST, f)), `faltando: ${f}`);
    }
  }
}

// ============================================================ 8. Blog bilíngue
group('8. Blog bilíngue');
{
  const enBlogPages = htmlFiles.filter((f) => /^en\/blog\/[^/]+\/index\.html$/.test(f));
  const hreflangs = (f) =>
    Object.fromEntries(
      [...read(f).matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
        .map((m) => [m[1], m[2]]),
    );

  // contrapartes EN existem para todos os posts PT
  for (const s of postSlugs) {
    check(`contraparte EN existe: ${s}`, enBlogPages.includes(`en/blog/${s}/index.html`));
  }
  check(`posts EN (${enBlogPages.length}) == posts PT (${postSlugs.length})`,
    enBlogPages.length === postSlugs.length);

  for (const s of postSlugs) {
    const pair = { 'pt-BR': `${SITE}/blog/${s}/`, en: `${SITE}/en/blog/${s}/` };
    // hreflang par-a-par por post
    for (const f of [`blog/${s}/index.html`, `en/blog/${s}/index.html`]) {
      const got = hreflangs(f);
      check(`hreflang par do post em /${f}`,
        got['pt-BR'] === pair['pt-BR'] && got.en === pair.en,
        `encontrado: ${JSON.stringify(got)}`);
    }
    // langSwitch da tabela
    for (const [f, want] of [
      [`blog/${s}/index.html`, `/en/blog/${s}/`],
      [`en/blog/${s}/index.html`, `/blog/${s}/`],
    ]) {
      const sw = linksIn(headerOf(read(f))).at(-1);
      check(`langSwitch post ${s} (${f}) -> ${want}`, sw === want, `encontrado: ${sw}`);
    }
  }

  // langSwitch dos índices
  {
    const swPt = linksIn(headerOf(read('blog/index.html'))).at(-1);
    check('langSwitch blog index PT -> /en/blog/', swPt === '/en/blog/', `encontrado: ${swPt}`);
    const swEn = linksIn(headerOf(read('en/blog/index.html'))).at(-1);
    check('langSwitch blog index EN -> /blog/', swEn === '/blog/', `encontrado: ${swEn}`);
  }

  // nav EN nos posts do blog + índice EN
  const enBlogNav = ['/en/about.html', '/en/#books', '/en/blog/', '/en/about.html#contact', '/en/#malcriada-books'];
  for (const f of ['en/blog/index.html', ...enBlogPages]) {
    const nav = linksIn(headerOf(read(f))).slice(0, -1);
    check(`nav EN do blog: ${f}`, JSON.stringify(nav) === JSON.stringify(enBlogNav),
      `encontrado: ${JSON.stringify(nav)}`);
  }

  // inLanguage en-US nas páginas EN do blog
  for (const f of ['en/blog/index.html', ...enBlogPages]) {
    const lds = jsonLdOf(read(f));
    const ins = lds.flat(9)
      .filter((o) => o && typeof o === 'object' && 'inLanguage' in o)
      .map((o) => o.inLanguage);
    check(`inLanguage en-US: ${f}`, ins.length > 0 && ins.every((x) => x === 'en-US'),
      `encontrado: ${ins.join(', ')}`);
  }

  // sitemap: xhtml:link dos pares do blog
  {
    const sm = read('sitemap.xml');
    const urlBlocks = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    const altLinks = (block) =>
      Object.fromEntries(
        [...block.matchAll(/xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)]
          .map((m) => [m[1], m[2]]),
      );
    const pairs = [['blog/', 'en/blog/'],
      ...postSlugs.map((s) => [`blog/${s}/`, `en/blog/${s}/`])];
    for (const [ptPath, enPath] of pairs) {
      const ptUrl = `${SITE}/${ptPath}`;
      const enUrl = `${SITE}/${enPath}`;
      for (const [loc, pair] of [[ptUrl, { 'pt-BR': ptUrl, en: enUrl }], [enUrl, { 'pt-BR': ptUrl, en: enUrl }]]) {
        const block = urlBlocks.find((b) => b.includes(`<loc>${loc}</loc>`));
        const got = block ? altLinks(block) : null;
        check(`sitemap xhtml:link par em ${loc}`,
          !!got && got['pt-BR'] === pair['pt-BR'] && got.en === pair.en,
          `encontrado: ${JSON.stringify(got)}`);
      }
    }
  }

  // RSS EN
  {
    const rssEn = read('en/blog/rss.xml');
    const items = [...rssEn.matchAll(/<item>[\s\S]*?<\/item>/g)].map((m) => m[0]);
    check(`RSS EN: itens (${items.length}) == ${postSlugs.length}`, items.length === postSlugs.length);
    check('RSS EN: language en', /<language>en<\/language>/.test(rssEn));
    check(`RSS EN: canal ${SITE}/en/blog/`, rssEn.includes(`<link>${SITE}/en/blog/</link>`));
    for (const item of items) {
      const link = (item.match(/<link>([^<]+)<\/link>/) || [])[1];
      if (link) {
        const f = urlToFile(link);
        check(`RSS EN item URL existe em dist: ${link}`, existsSync(join(DIST, f)), `faltando: ${f}`);
      }
    }
  }
}

// ============================================================ 9. Privacy bilíngue
group('9. Privacy bilíngue');
{
  const footerOf = (html) => (html.match(/<footer[\s\S]*?<\/footer>/) || [''])[0];

  for (const f of ['privacy-policy.html', 'en/privacy-policy.html']) {
    check(`existe em dist: ${f}`, existsSync(join(DIST, f)));
  }

  // conteúdo: 6 seções com h2 em cada página
  for (const f of ['privacy-policy.html', 'en/privacy-policy.html']) {
    if (!existsSync(join(DIST, f))) continue;
    const main = (read(f).match(/<main[\s\S]*?<\/main>/) || [''])[0];
    const h2s = [...main.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map((m) => m[1]);
    check(`privacy 6 seções: ${f}`, h2s.length === 6, `encontrado: ${h2s.length} (${h2s.join(' | ')})`);
    check(`privacy dentro de max-w-[46rem]: ${f}`,
      main.includes('max-w-[46rem]') || read(f).includes('max-w-[46rem]'));
  }

  // footer privacy por idioma (em TODAS as páginas de cada idioma com footer
  // estático; index.html PT é o shell do SPA — footer renderiza no cliente)
  for (const f of htmlFiles.filter((x) => !/google.*\.html$/.test(x))) {
    const lang = langOf(f);
    const want = lang === 'en' ? '/en/privacy-policy.html' : '/privacy-policy.html';
    const footerLinks = linksIn(footerOf(read(f)));
    if (f === 'index.html' && footerLinks.length === 0) {
      check('footer privacy: index.html (shell SPA, footer client-side)', true);
      continue;
    }
    check(`footer privacy ${lang} em /${f}: ${want}`, footerLinks.includes(want),
      `encontrado: ${footerLinks.filter((h) => h.includes('privacy')).join(', ') || '(nenhum)'}`);
  }

  // hero EN com a mesma foto do PT
  {
    const hero = (read('en/index.html').match(/<section class="relative bg-gradient[\s\S]*?<\/section>/) || [''])[0];
    check('hero EN contém img /hero.png', /<img[^>]*src="\/hero\.png"/.test(hero));
    check('hero EN img tem alt', /<img[^>]*src="\/hero\.png"[^>]*alt="[^"]+"/.test(hero));
    const ptJson = JSON.parse(readFileSync(join(ROOT, 'src/data/site.pt.json'), 'utf8'));
    const enJson = JSON.parse(readFileSync(join(ROOT, 'src/data/site.en.json'), 'utf8'));
    check('hero PT e EN usam a mesma foto', ptJson.hero.image === enJson.hero.image,
      `PT: ${ptJson.hero.image} / EN: ${enJson.hero.image}`);
  }
}

// ============================== 10. Sem links cross-language exceto langSwitch
group('10. Sem links cross-language exceto langSwitch');
{
  // Exceção ÚNICA: o langSwitch (último <a> do header). hreflang no head é
  // <link>, não <a>, e nem entra aqui. Anchors (#...), mailto:, tel: e
  // URLs externas (http/https) são neutros.
  const footerOf = (html) => (html.match(/<footer[\s\S]*?<\/footer>/) || [''])[0];
  const langOfHref = (h) => (h.startsWith('/en/') ? 'en' : 'pt');
  const isInternal = (h) =>
    h.startsWith('/') || (!/^(https?:)?\/\//.test(h) && !/^(mailto|tel):/.test(h) && !h.startsWith('#'));
  const pages = htmlFiles.filter((x) => !/google.*\.html$/.test(x));

  for (const f of pages) {
    const lang = langOf(f);
    const html = read(f);
    const header = headerOf(html);
    const nav = linksIn(header).slice(0, -1); // último <a> do header = langSwitch
    const footer = linksIn(footerOf(html));
    const bad = [...nav, ...footer].filter((h) => isInternal(h) && langOfHref(h) !== lang);
    check(`sem cross-language: ${f}`, bad.length === 0,
      bad.length ? `links ${bad.length ? bad.join(', ') : ''} em página ${lang}` : '');
  }
}

// ------------------------------------------------------------------ saída

let failed = 0;
let total = 0;
for (const g of groups) {
  const failures = g.checks.filter(([, ok]) => !ok).map(([l, , d]) => `  ✗ ${l}${d ? ` — ${d}` : ''}`);
  const total0 = g.checks.length;
  total += total0;
  failed += failures.length;
  console.log(`\n[${failures.length ? 'FAIL' : 'PASS'}] ${g.name} — ${total0 - failures.length}/${total0}`);
  for (const f of failures) console.log(f);
}
console.log(`\n${failed === 0 ? 'CANON OK' : 'CANON VIOLADO'}: ${total - failed}/${total} checks`);
process.exit(failed ? 1 : 0);
