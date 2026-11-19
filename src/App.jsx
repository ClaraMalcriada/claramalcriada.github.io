import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BOOKS, amazonUrl } from './data/books.js';
import sitePT from './data/site.pt.json';
import Header from './components/site/Header.jsx';
import Hero from './components/site/Hero.jsx';
import AboutSection from './components/site/AboutSection.jsx';
import BooksGrid from './components/site/BooksGrid.jsx';
import MalcriadaBooksSection from './components/site/MalcriadaBooksSection.jsx';
import ContactSection from './components/site/ContactSection.jsx';
import Footer from './components/site/Footer.jsx';

const books = BOOKS.map((b, i) => {
  const e = b.editions.pt;
  return {
    id: i + 1,
    name: b.id,
    title: e.title,
    subtitle: e.subtitle,
    series: e.series,
    originalPrice: e.originalPrice,
    price: e.price,
    image: b.cover,
    kindleUnlimited: e.kindleUnlimited,
    description: e.description,
    amazonLink: amazonUrl('pt', e.asin),
    seo: e.seo,
  };
});

function BlogSection() {
  const s = sitePT.blogSection;
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{s.heading}</h2>
          <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">{s.intro}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {s.posts.map((post) => (
            <a key={post.href} href={post.href} target="_self" className="block bg-gray-50 hover:bg-pink-50 rounded-lg p-6 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
              <p className="text-pink-600 text-sm mt-2">{s.readLabel}</p>
            </a>
          ))}
          <div className="text-center pt-2">
            <a href={s.allHref} target="_self" className="text-pink-600 hover:text-pink-800 font-medium">{s.allLabel}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const n = sitePT.newsletter;
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{n.heading}</h2>
          <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 mb-8">{n.intro}</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder={n.emailPlaceholder}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {n.submitLabel}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2 w-full text-center">
            {n.consentPre}{' '}
            <a href={n.privacyHref} className="text-pink-600 hover:text-pink-800">
              {n.consentLinkLabel}
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [activeBook, setActiveBook] = useState(null);

  const selectedBook = activeBook ? books.find(b => b.id === activeBook) : null;
  const seoData = selectedBook ? selectedBook.seo : {
    title: "Clara Malcriada | Livros Sarcásticos e Patadas Verbais",
    description: "Clara Malcriada escreve livros sobre sarcasmo, ironia e patadas verbais. Disponíveis na Amazon em formato Kindle.",
    keywords: "Clara Malcriada, livro de sarcasmo, Amazon, Kindle",
    url: `https://claramalcriada.github.io/#patadas-arabes}`,
    image: `https://claramalcriada.github.io/cover-patadas-arabes.png`
  };

  seoData.url = `https://claramalcriada.github.io/#${selectedBook ? selectedBook.name : ''}`;
  seoData.image = `https://claramalcriada.github.io/cover-${selectedBook ? selectedBook.name : ''}.png`

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:type" content={selectedBook ? "book" : "website"} />
        <link rel="canonical" href={seoData.url} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header data={sitePT} />
        <Hero data={sitePT} />
        <AboutSection data={sitePT} />
        <BooksGrid lang="pt" data={sitePT} onSelect={setActiveBook} />
        <MalcriadaBooksSection data={sitePT} />
        <BlogSection />
        <NewsletterSection />
        <ContactSection data={sitePT} />
        <Footer data={sitePT} />
      </div>
    </>
  );
}
