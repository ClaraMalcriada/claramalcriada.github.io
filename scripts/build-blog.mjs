// Gera o blog bilíngue (PT + EN): posts + índices + RSS em public/blog/ e
// public/en/blog/. O chrome (header, hero, breadcrumb, footer, cards de livro,
// FAQ) vem dos MESMOS componentes React do site via ssrLoadModule. O conteúdo
// vem dos .md em content/posts/ (PT) e content/posts-en/ (EN), pareados por
// slug; datas são idênticas nos dois idiomas e só title/description/keywords
// (e o corpo) são traduzidos.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { marked } from 'marked';
import { BOOKS, amazonUrl, editionOf } from '../src/data/books.js';
import { loadSiteComponents, closeSiteComponents } from './ssr.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIRS = {
  pt: join(ROOT, 'content', 'posts'),
  en: join(ROOT, 'content', 'posts-en'),
};
const OUT_DIRS = {
  pt: join(ROOT, 'public', 'blog'),
  en: join(ROOT, 'public', 'en', 'blog'),
};
const SITE = 'https://claramalcriada.github.io';
const AUTHOR = 'Clara Malcriada';
const LANG_META = {
  pt: { htmlLang: 'pt-BR', ogLocale: 'pt_BR', inLanguage: 'pt-BR', rssSelf: '/blog/rss.xml' },
  en: { htmlLang: 'en', ogLocale: 'en_US', inLanguage: 'en-US', rssSelf: '/en/blog/rss.xml' },
};
const SITE_LANG = {
  pt: JSON.parse(readFileSync(join(ROOT, 'src/data/site.pt.json'), 'utf8')),
  en: JSON.parse(readFileSync(join(ROOT, 'src/data/site.en.json'), 'utf8')),
};
const CSS_PLACEHOLDER = '__SITE_CSS__';

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('frontmatter ausente');
  const [, fmBody, body] = m;
  const meta = {};
  let currentKey = null;
  for (const line of fmBody.split('\n')) {
    if (/^\s*-\s+/.test(line) && currentKey) {
      (meta[currentKey] ??= []).push(line.replace(/^\s*-\s+/, '').trim().replace(/^["']|["']$/g, ''));
      continue;
    }
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      let v = kv[2].trim();
      if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      else if (v === '') continue;
      else v = v.replace(/^["']|["']$/g, '');
      meta[currentKey] = v;
    }
  }
  return { meta, body };
}

function extractFaq(html) {
  const faqs = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = re.exec(html)) && faqs.length < 3) {
    const q = match[1].replace(/<[^>]+>/g, '').trim();
    let a = match[2].replace(/<[^>]+>/g, '').trim();
    if (a.length > 300) a = a.slice(0, 297).trimEnd() + '…';
    faqs.push({ q, a });
  }
  if (faqs.length !== 3) throw new Error(`FAQ incompleto (${faqs.length}/3)`);
  return faqs;
}

const esc = s => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

const mk = (Comp, props, ...children) => React.createElement(Comp, props, ...children);
const r = (el) => renderToStaticMarkup(el);

// URLs pareadas por idioma. hreflang "en" cobre as páginas EN (mesma
// convenção usada pelo build-static para /en/ e /en/about.html).
const postUrl = (lang, slug) => lang === 'en' ? `${SITE}/en/blog/${slug}/` : `${SITE}/blog/${slug}/`;
const indexUrl = (lang) => lang === 'en' ? `${SITE}/en/blog/` : `${SITE}/blog/`;
// href do langSwitch no header: caminho relativo, como nas outras páginas.
const relPostUrl = (lang, slug) => postUrl(lang, slug).replace(SITE, '');
const relIndexUrl = (lang) => indexUrl(lang).replace(SITE, '');

function htmlPage({ lang, title, description, keywords, canonical, ogType, jsonldHtml, content, pair }) {
  const L = LANG_META[lang];
  const [selfTag, altTag] = lang === 'en' ? ['en', 'pt-BR'] : ['pt-BR', 'en'];
  const hreflangHtml = pair ? `
<link rel="alternate" hreflang="${selfTag}" href="${esc(canonical)}" />
<link rel="alternate" hreflang="${altTag}" href="${esc(pair)}" />` : '';
  return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="keywords" content="${esc(keywords)}">
<link rel="canonical" href="${esc(canonical)}">${hreflangHtml}
<meta property="og:site_name" content="${esc(AUTHOR)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:locale" content="${L.ogLocale}">
<link rel="alternate" type="application/rss+xml" title="Blog | ${esc(AUTHOR)}" href="${L.rssSelf}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
${jsonldHtml ?? ''}
<link rel="stylesheet" href="${CSS_PLACEHOLDER}">
</head>
<body>
<div class="min-h-screen bg-white">
${content}
</div>
</body>
</html>
`;
}

function bookId(id) {
  const book = BOOKS.find((b) => b.id === id);
  if (!book) throw new Error(`livro desconhecido: ${id}`);
  return book;
}

// Nav EN dos posts do blog (o site.en.json aponta Blog -> /blog/ PT; aqui o
// Blog deve apontar para o próprio blog EN).
const EN_NAV = [
  { label: 'About', href: '/en/about.html' },
  { label: 'Books', href: '/en/#books' },
  { label: 'Blog', href: '/en/blog/' },
  { label: 'Contact', href: '/en/about.html#contact' },
  { label: 'Malcriada Books', href: '/en/#malcriada-books' },
];

function siteChrome(c, lang, { hero, breadcrumb }) {
  const d = SITE_LANG[lang];
  const headerProps = lang === 'en'
    ? { data: d, nav: EN_NAV, langSwitchHref: breadcrumb?.langSwitchHref }
    : { data: d, langSwitchHref: breadcrumb?.langSwitchHref };
  let out = r(mk(c.Header, headerProps));
  if (hero) out += r(mk(c.Hero, { data: { ...d, hero } }));
  if (breadcrumb?.items) {
    out += r(mk('div', { className: 'max-w-[46rem] mx-auto px-5' },
      mk(c.Breadcrumb, { items: breadcrumb.items.map((b) => ({ name: b.name, url: b.url.replace(SITE, '') || '/' })) })));
  }
  return out;
}

const footer = (c, lang) => r(mk(c.Footer, { data: SITE_LANG[lang] }));

function loadPosts(lang) {
  const files = readdirSync(POSTS_DIRS[lang]).filter(f => f.endsWith('.md')).sort();
  return files.map(file => {
    const raw = readFileSync(join(POSTS_DIRS[lang], file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    for (const k of ['title', 'slug', 'date', 'description', 'keywords']) {
      if (!meta[k]) throw new Error(`${lang}/${file}: frontmatter sem '${k}'`);
    }
    const html = marked.parse(body);
    const faq = extractFaq(html);
    const bookIds = Array.isArray(meta.books) ? meta.books : [meta.books].filter(Boolean);
    if (!bookIds.length) throw new Error(`${lang}/${file}: nenhum livro citado`);
    return { file, meta, html, faq, bookIds };
  });
}

function assertPairs(ptPosts, enPosts) {
  if (ptPosts.length !== enPosts.length) {
    throw new Error(`paridade PT/EN: ${ptPosts.length} posts PT vs ${enPosts.length} EN`);
  }
  for (const p of ptPosts) {
    const e = enPosts.find(x => x.meta.slug === p.meta.slug);
    if (!e) throw new Error(`post EN ausente para slug '${p.meta.slug}'`);
    if (e.meta.date !== p.meta.date) {
      throw new Error(`data divergente em '${p.meta.slug}': PT ${p.meta.date} vs EN ${e.meta.date}`);
    }
  }
}

async function main() {
  const c = await loadSiteComponents();

  const postsByLang = { pt: loadPosts('pt'), en: loadPosts('en') };
  assertPairs(postsByLang.pt, postsByLang.en);

  for (const lang of ['pt', 'en']) {
    const d = SITE_LANG[lang];
    const posts = postsByLang[lang];
    const OUT_DIR = OUT_DIRS[lang];
    mkdirSync(OUT_DIR, { recursive: true });

    for (const post of posts) {
      const { meta, html, faq, bookIds } = post;
      const url = postUrl(lang, meta.slug);
      const pairUrl = postUrl(lang === 'en' ? 'pt' : 'en', meta.slug);
      const L = LANG_META[lang];
      const desc = meta.description.length > 155 ? meta.description.slice(0, 155) : meta.description;

      const articleLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.title,
        description: desc,
        inLanguage: L.inLanguage,
        author: { '@type': 'Person', name: AUTHOR, url: lang === 'en' ? `${SITE}/en/about.html` : `${SITE}/about.html` },
        publisher: { '@type': 'Person', name: AUTHOR },
        datePublished: meta.date,
        dateModified: meta.date,
        keywords: meta.keywords,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      });
      const faqLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
      const booksLd = JSON.stringify(bookIds.map(id => {
        const e = editionOf(bookId(id), lang);
        return {
          '@context': 'https://schema.org',
          '@type': 'Book',
          name: e.title,
          author: { '@type': 'Person', name: AUTHOR },
          url: amazonUrl(lang, e.asin),
          inLanguage: L.inLanguage,
          bookFormat: 'https://schema.org/EBook',
          asin: e.asin,
        };
      }));

      const minutes = Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200));
      const dateLabel = new Date(`${meta.date}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR',
        { day: 'numeric', month: 'long', year: 'numeric' });
      const byline = lang === 'en'
        ? `${dateLabel} · ${minutes} min read · by ${AUTHOR}`
        : `${dateLabel} · ${minutes} min de leitura · por ${AUTHOR}`;

      const body = [
        siteChrome(c, lang, {
          breadcrumb: {
            langSwitchHref: relPostUrl(lang === "en" ? "pt" : "en", meta.slug),
            items: [
              { name: 'Home', url: lang === 'en' ? `${SITE}/en/` : `${SITE}/` },
              { name: 'Blog', url: indexUrl(lang) },
              { name: meta.title, url },
            ],
          },
        }),
        r(mk(c.PostMain, null,
          mk(c.PostHeader, { title: meta.title, meta: byline }),
          mk(c.PostContent, { html }),
          mk(c.BooksGrid, { lang, data: d, variant: 'list', ids: bookIds, heading: d.blogSection.citedHeading, intro: false }),
          mk(c.FaqSection, { data: d, items: faq }),
        )),
        footer(c, lang),
      ].join('\n');

      const jsonldHtml = [
        articleLd,
        faqLd,
        booksLd,
      ].map(ld => `<script type="application/ld+json">${ld}</script>`).join('\n');
      const page = htmlPage({
        lang,
        title: `${meta.title} | ${AUTHOR}`,
        description: desc,
        keywords: meta.keywords,
        canonical: url,
        ogType: 'article',
        jsonldHtml,
        content: body,
        pair: pairUrl,
      });
      mkdirSync(join(OUT_DIR, meta.slug), { recursive: true });
      writeFileSync(join(OUT_DIR, meta.slug, 'index.html'), page);
    }

    // ------------------------------------------------------------ RSS
    const rfc822 = iso => new Date(`${iso}T12:00:00Z`).toUTCString();
    const lastBuild = posts.map(p => p.meta.date).sort().at(-1);
    const rssMeta = lang === 'en'
      ? {
          title: `Blog | ${AUTHOR}`,
          description: 'Clara Malcriada on sarcasm, irony and the art of insulting with elegance.',
          language: 'en',
        }
      : {
          title: `Blog | ${AUTHOR}`,
          description: 'Posts de Clara Malcriada sobre sarcasmo, ironia e a arte de insultar com elegância.',
          language: 'pt-BR',
        };

    const rssItems = posts.map(p => `
<item>
<title>${esc(p.meta.title)}</title>
<link>${postUrl(lang, p.meta.slug)}</link>
<guid>${postUrl(lang, p.meta.slug)}</guid>
<pubDate>${rfc822(p.meta.date)}</pubDate>
<description>${esc(p.meta.description)}</description>
<content:encoded><![CDATA[${p.html}]]></content:encoded>
</item>`).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
<title>${esc(rssMeta.title)}</title>
<link>${indexUrl(lang)}</link>
<description>${esc(rssMeta.description)}</description>
<language>${rssMeta.language}</language>
<lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
<atom:link href="${SITE}${LANG_META[lang].rssSelf}" rel="self" type="application/rss+xml"/>${rssItems}
</channel>
</rss>
`;

    writeFileSync(join(OUT_DIR, 'rss.xml'), rss);

    // ------------------------------------------------------ índice do blog
    const listingItems = posts.map(p => r(mk(c.PostCard, {
      post: {
        slug: p.meta.slug,
        href: lang === 'en' ? `/en/blog/${p.meta.slug}/` : undefined,
        title: p.meta.title,
        description: p.meta.description,
        dateLabel: new Date(p.meta.date + 'T12:00:00').toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR',
          { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    }))).join('\n');

    const listingLd = `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: lang === 'en' ? `${AUTHOR}'s Blog` : `Blog de ${AUTHOR}`,
      url: indexUrl(lang),
      inLanguage: LANG_META[lang].inLanguage,
      author: { '@type': 'Person', name: AUTHOR, url: lang === 'en' ? `${SITE}/en/about.html` : `${SITE}/about.html` },
      blogPost: posts.map(p => ({
        '@type': 'BlogPosting',
        headline: p.meta.title,
        url: postUrl(lang, p.meta.slug),
        datePublished: p.meta.date,
        author: { '@type': 'Person', name: AUTHOR },
      })),
    })}</script>`;

    const indexMeta = lang === 'en'
      ? {
          title: `Blog | ${AUTHOR}`,
          description: 'Clara Malcriada on sarcasm, irony and the art of insulting with elegance — from the Chinese tradition to the Russian.',
          keywords: 'clara malcriada, blog, sarcasm, insults, elegant insult',
        }
      : {
          title: `Blog | ${AUTHOR}`,
          description: 'Posts de Clara Malcriada sobre sarcasmo, ironia e a arte de insultar com elegância — da tradição chinesa à russa.',
          keywords: 'clara malcriada, blog, sarcasmo, patadas, insulto elegante',
        };

    const body = [
      siteChrome(c, lang, {
        hero: d.blogHero,
        breadcrumb: {
          langSwitchHref: relIndexUrl(lang === 'en' ? 'pt' : 'en'),
          items: [
            { name: 'Home', url: lang === 'en' ? `${SITE}/en/` : `${SITE}/` },
            { name: 'Blog', url: indexUrl(lang) },
          ],
        },
      }),
      r(mk(c.BlogMain, null,
        mk('div', { dangerouslySetInnerHTML: { __html: listingItems } }),
        mk(c.BooksGrid, { lang, data: d, variant: 'list', heading: d.blogSection.startHeading, intro: false }),
      )),
      footer(c, lang),
    ].join('\n');

    writeFileSync(join(OUT_DIR, 'index.html'), htmlPage({
      lang,
      title: indexMeta.title,
      description: indexMeta.description,
      keywords: indexMeta.keywords,
      canonical: indexUrl(lang),
      ogType: 'website',
      jsonldHtml: listingLd,
      content: body,
      pair: indexUrl(lang === 'en' ? 'pt' : 'en'),
    }));

    console.log(`blog ${lang}: ${posts.length} posts + índice + rss em ${OUT_DIR.replace(ROOT + '/', '')}`);
    for (const p of posts) console.log(`  - ${p.meta.slug}`);
  }

  await closeSiteComponents();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
