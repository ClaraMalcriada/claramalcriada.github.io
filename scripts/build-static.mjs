// Gera as superfícies estáticas (about.html PT, en/index.html, en/about.html)
// a partir dos MESMOS componentes React usados pelo App (fonte única).
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BOOKS, SERIES, amazonUrl, editionOf } from '../src/data/books.js';
import { loadSiteComponents, closeSiteComponents } from './ssr.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const DIST = join(ROOT, 'dist');
const SITE = 'https://claramalcriada.github.io';
const AUTHOR = 'Clara Malcriada';
const CSS_PLACEHOLDER = '__SITE_CSS__';

const site = {
  pt: JSON.parse(readFileSync(join(ROOT, 'src/data/site.pt.json'), 'utf8')),
  en: JSON.parse(readFileSync(join(ROOT, 'src/data/site.en.json'), 'utf8')),
};

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

// ---------------------------------------------------------------- JSON-LD

function personLd(lang, pageUrl) {
  const p = site[lang].personLd;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR,
    url: pageUrl,
    description: p.description,
    nationality: p.nationality,
    knowsLanguage: p.knowsLanguage,
    sameAs: site[lang].contact.socials.map((s) => s.href),
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  });
}

function itemListLd(lang) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: site[lang].itemListLd.name,
    itemListElement: BOOKS.map((b, i) => {
      const e = editionOf(b, lang);
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Book',
          name: e.title,
          author: { '@type': 'Person', name: AUTHOR },
          url: amazonUrl(lang, e.asin),
          asin: e.asin,
          inLanguage: lang === 'en' ? 'en-US' : 'pt-BR',
          bookFormat: 'https://schema.org/EBook',
        },
      };
    }),
  });
}

function faqLd(items) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });
}

// ---------------------------------------------------------------- head

function head({ lang, meta, canonical, hreflang, ogImage, jsonld }) {
  const [altLang, altHref] = hreflang;
  return `<!DOCTYPE html>
<html lang="${site[lang].lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="keywords" content="${esc(meta.keywords)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="${lang === 'en' ? 'en' : 'pt-BR'}" href="${esc(canonical)}" />
<link rel="alternate" hreflang="${altLang}" href="${esc(altHref)}" />
<meta property="og:site_name" content="${esc(AUTHOR)}">
<meta property="og:title" content="${esc(meta.ogTitle)}">
<meta property="og:description" content="${esc(meta.ogDescription)}">
<meta property="og:type" content="${meta.ogType}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:locale" content="${site[lang].ogLocale}">
<meta property="og:image" content="${esc(ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.twitterTitle)}">
<meta name="twitter:description" content="${esc(meta.twitterDescription)}">
${jsonld.map((ld) => `<script type="application/ld+json">${ld}</script>`).join('\n')}
<link rel="stylesheet" href="${CSS_PLACEHOLDER}">
</head>
<body>
<div class="min-h-screen bg-white">
`;
}

const FOOT = '</div>\n</body>\n</html>\n';

// ---------------------------------------------------------------- render

const heroData = (lang, which) => ({ ...site[lang], hero: site[lang].about[which] });

async function main() {
  const c = await loadSiteComponents();
  const r = (el) => renderToStaticMarkup(el);
  const mk = (Comp, props, ...children) => React.createElement(Comp, props, ...children);
  const pg = (lang) => site[lang];

  // ---------------------------------------------------------- about.html (PT)
  {
    const lang = 'pt';
    const d = pg(lang);
    const canonical = `${SITE}/about.html`;
    const faqs = d.faq.items;
    const body = [
      r(mk(c.Header, { data: d, langSwitchHref: '/en/about.html' })),
      r(mk(c.Hero, { data: heroData(lang, 'aboutHero') })),
      r(mk(c.StaticMain, null,
          mk(c.AboutSection, { lang, data: d, variant: 'lead' }),
          mk(c.BooksGrid, { lang, data: d, variant: 'list', intro: false, heading: d.booksSection.publishedHeading }),
          mk(c.FaqSection, { data: d }),
      )),
      r(mk(c.ContactSection, { data: d })),
      r(mk(c.Footer, { data: d })),
    ].join('\n');

    const html =
      head({
        lang,
        meta: d.meta.about,
        canonical,
        hreflang: ['en', `${SITE}/en/about.html`],
        ogImage: `${SITE}/hero.png`,
        jsonld: [personLd(lang, canonical), itemListLd(lang), faqLd(faqs)],
      }) + body + FOOT;

    writeFileSync(join(PUBLIC, 'about.html'), html);
  }

  // ---------------------------------------------------------- en/index.html
  {
    const lang = 'en';
    const d = pg(lang);
    const canonical = `${SITE}/en/`;
    const body = [
      r(mk(c.Header, {
        data: d,
        langSwitchHref: '/',
        nav: [
          { ...d.nav[0] },
          { label: d.nav[1].label, href: '#books' },
          { ...d.nav[2] },
          { label: d.nav[3].label, href: '#contact' },
          { ...d.nav[4], href: '#malcriada-books' },
        ],
      })),
      r(mk(c.Hero, { data: d })),
      r(mk(c.AboutSection, { lang, data: d })),
      r(mk(c.BooksGrid, { lang, data: d, showSeries: true })),
      r(mk(c.MalcriadaBooksSection, { data: d })),
      r(mk(c.ContactSection, { data: d })),
      r(mk(c.Footer, { data: d })),
    ].join('\n');

    const html =
      head({
        lang,
        meta: d.meta.home,
        canonical,
        hreflang: ['pt-BR', `${SITE}/`],
        ogImage: `${SITE}/hero.png`,
        jsonld: [personLd(lang, canonical), itemListLd(lang)],
      }) + body + FOOT;

    mkdirSync(join(PUBLIC, 'en'), { recursive: true });
    writeFileSync(join(PUBLIC, 'en', 'index.html'), html);
  }

  // ---------------------------------------------------------- en/about.html
  {
    const lang = 'en';
    const d = pg(lang);
    const canonical = `${SITE}/en/about.html`;
    const faqs = d.faq.items;
    const body = [
      r(mk(c.Header, { data: d, langSwitchHref: '/about.html' })),
      r(mk(c.Hero, { data: heroData(lang, 'aboutHero') })),
      r(mk(c.StaticMain, null,
          mk(c.AboutSection, { lang, data: d, variant: 'lead' }),
          mk(c.BooksGrid, { lang, data: d, variant: 'list', intro: false, heading: d.booksSection.publishedHeading }),
          mk(c.FaqSection, { data: d }),
      )),
      r(mk(c.ContactSection, { data: d })),
      r(mk(c.Footer, { data: d })),
    ].join('\n');

    const html =
      head({
        lang,
        meta: d.meta.about,
        canonical,
        hreflang: ['pt-BR', `${SITE}/about.html`],
        ogImage: `${SITE}/hero.png`,
        jsonld: [personLd(lang, canonical), itemListLd(lang), faqLd(faqs)],
      }) + body + FOOT;

    mkdirSync(join(PUBLIC, 'en'), { recursive: true });
    writeFileSync(join(PUBLIC, 'en', 'about.html'), html);
  }

  // ---------------------------------------------------------- privacy-policy.html (PT)
  {
    const lang = 'pt';
    const d = pg(lang);
    const canonical = `${SITE}/privacy-policy.html`;
    const body = [
      r(mk(c.Header, { data: d, langSwitchHref: '/en/privacy-policy.html' })),
      r(mk(c.Hero, { data: { ...d, hero: d.privacy.hero } })),
      r(mk(c.StaticMain, null, mk(c.PrivacySection, { data: d }))),
      r(mk(c.Footer, { data: d })),
    ].join('\n');

    const html =
      head({
        lang,
        meta: d.meta.privacy,
        canonical,
        hreflang: ['en', `${SITE}/en/privacy-policy.html`],
        ogImage: `${SITE}/hero.png`,
        jsonld: [personLd(lang, canonical)],
      }) + body + FOOT;

    writeFileSync(join(PUBLIC, 'privacy-policy.html'), html);
  }

  // ---------------------------------------------------------- en/privacy-policy.html
  {
    const lang = 'en';
    const d = pg(lang);
    const canonical = `${SITE}/en/privacy-policy.html`;
    const body = [
      r(mk(c.Header, { data: d, langSwitchHref: '/privacy-policy.html' })),
      r(mk(c.Hero, { data: { ...d, hero: d.privacy.hero } })),
      r(mk(c.StaticMain, null, mk(c.PrivacySection, { data: d }))),
      r(mk(c.Footer, { data: d })),
    ].join('\n');

    const html =
      head({
        lang,
        meta: d.meta.privacy,
        canonical,
        hreflang: ['pt-BR', `${SITE}/privacy-policy.html`],
        ogImage: `${SITE}/hero.png`,
        jsonld: [personLd(lang, canonical)],
      }) + body + FOOT;

    mkdirSync(join(PUBLIC, 'en'), { recursive: true });
    writeFileSync(join(PUBLIC, 'en', 'privacy-policy.html'), html);
  }

  // ---------------------------------------------------------- index.html (/)
  // O shell do SPA (vite) não renderiza o header no servidor; injetamos o
  // header SSR (mesmos componentes) dentro de #root para SEO/nav estático.
  {
    const d = pg('pt');
    const shellPath = join(DIST, 'index.html');
    if (existsSync(shellPath)) {
      const headerHtml = r(mk(c.Header, { data: d }));
      const shell = readFileSync(shellPath, 'utf8');
      const patched = shell.replace(
        '<div id="root"></div>',
        `<div id="root">\n${headerHtml}\n</div>`,
      );
      if (patched !== shell) writeFileSync(shellPath, patched);
    }
  }

  await closeSiteComponents();
  console.log('build-static: about.html, en/index.html, en/about.html, privacy-policy.html, en/privacy-policy.html gerados em public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
