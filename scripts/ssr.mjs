// Carrega os componentes React do site via vite ssrLoadModule, para uso em
// build-static.mjs e build-blog.mjs (renderização estática compartilhada).
import { createServer } from 'vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

let serverPromise = null;

function getServer() {
  serverPromise ??= createServer({
    root: ROOT,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true },
  });
  return serverPromise;
}

export async function loadSiteComponents() {
  const server = await getServer();
  const [Header, Hero, AboutSection, BooksGrid, MalcriadaBooksSection, ContactSection, Footer, Faq, Blog, PrivacySection] = await Promise.all([
    server.ssrLoadModule('/src/components/site/Header.jsx'),
    server.ssrLoadModule('/src/components/site/Hero.jsx'),
    server.ssrLoadModule('/src/components/site/AboutSection.jsx'),
    server.ssrLoadModule('/src/components/site/BooksGrid.jsx'),
    server.ssrLoadModule('/src/components/site/MalcriadaBooksSection.jsx'),
    server.ssrLoadModule('/src/components/site/ContactSection.jsx'),
    server.ssrLoadModule('/src/components/site/Footer.jsx'),
    server.ssrLoadModule('/src/components/site/Faq.jsx'),
    server.ssrLoadModule('/src/components/site/Blog.jsx'),
    server.ssrLoadModule('/src/components/site/PrivacySection.jsx'),
  ]);
  return {
    Header: Header.default,
    Hero: Hero.default,
    AboutSection: AboutSection.default,
    StaticMain: AboutSection.StaticMain,
    BooksGrid: BooksGrid.default,
    MalcriadaBooksSection: MalcriadaBooksSection.default,
    ContactSection: ContactSection.default,
    Footer: Footer.default,
    FaqSection: Faq.FaqSection,
    PrivacySection: PrivacySection.default,
    Breadcrumb: Blog.Breadcrumb,
    BlogMain: Blog.BlogMain,
    PostMain: Blog.PostMain,
    PostHeader: Blog.PostHeader,
    PostContent: Blog.PostContent,
    H2: Blog.H2,
    PostCard: Blog.PostCard,
  };
}

export async function closeSiteComponents() {
  if (serverPromise) {
    const server = await serverPromise;
    await server.close();
    serverPromise = null;
  }
}
