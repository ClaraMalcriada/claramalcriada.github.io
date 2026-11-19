import { BOOKS, SERIES, amazonUrl, editionOf } from '/src/data/books.js';

export default function BooksGrid({ lang, data, variant = 'grid', ids = null, showSeries = false, onSelect, heading, intro = true }) {
  const s = data.booksSection;
  const list = BOOKS.filter((b) => !ids || ids.includes(b.id));
  const sectionId = variant === 'grid' ? 'books' : undefined;
  const headingText = heading ?? s.heading;

  return (
    <section id={sectionId} className={variant === 'grid' ? 'py-20 bg-gray-50' : ''}>
      <div className="container mx-auto px-4">
        {headingText && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{headingText}</h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
            {intro && <p className="text-lg text-gray-700">{s.intro}</p>}
          </div>
        )}
        <div className={variant === 'grid' ? 'grid md:grid-cols-2 gap-12' : 'max-w-3xl mx-auto space-y-6'}>
          {list.map((book) => (
            <BookCardCompact
              key={book.id}
              lang={lang}
              data={data}
              book={book}
              variant={variant}
              onClick={onSelect ? () => onSelect(BOOKS.indexOf(book) + 1) : undefined}
            />
          ))}
        </div>
        {showSeries && <SeriesCard lang={lang} data={data} />}
      </div>
    </section>
  );
}

export function BookCardCompact({ lang, data, book, variant = 'list', onClick }) {
  const s = data.booksSection;
  const e = editionOf(book, lang);
  const href = amazonUrl(lang, e.asin);

  const cover = lang === 'en' && book.coverEn ? book.coverEn : book.cover;
  const alt = lang === 'en' ? `Cover of ${e.title}` : `Capa de ${e.title}`;

  if (variant === 'grid') {
    return (
      <div
        id={book.id}
        onClick={onClick}
        className={`flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ${onClick ? 'cursor-pointer' : ''}`}
      >
        <img
          src={cover}
          alt={alt}
          className="w-full md:w-80 h-auto aspect-[2/3] object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          loading="lazy"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{e.title}</h3>
            {e.subtitle && <p className="text-sm text-gray-600 mb-3">{e.subtitle}</p>}
            {e.series && <p className="text-xs text-gray-500 mb-4">{e.series}</p>}
            <p className="text-gray-700 text-sm mb-4">{e.description ?? e.blurb}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between">
            <div className="flex justify-between items-center">
              <div>
                {e.originalPrice && <p className="text-sm text-gray-500 line-through">{e.originalPrice}</p>}
                <span className="text-lg font-semibold text-pink-600">{e.price}</span>
              </div>
              {e.kindleUnlimited && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">
                  {s.kuLabel}
                </span>
              )}
            </div>
            <a
              href={href}
              className="text-pink-600 hover:text-pink-800 font-medium mt-2 md:mt-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.buyLinkLabel}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-lg shadow-md p-6 items-start sm:items-center hover:shadow-xl transition-shadow duration-300">
      <img
        src={cover}
        alt={alt}
        loading="lazy"
        width={90}
        className="rounded"
      />
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{e.title}</h3>
        <p className="text-gray-700 text-sm mb-1">{e.blurb}</p>
        <p className="text-xs text-gray-500 mb-3">
          {e.series ? `${s.seriesName} · ` : ''}ASIN {e.asin}
          {e.price ? ` · ${e.price}` : ''}
          {e.kindleUnlimited ? ` · ${s.kuLabel}` : ''}
        </p>
        <a
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          href={href}
          rel="noopener"
        >
          {s.buyCta}
        </a>
      </div>
    </div>
  );
}

function SeriesCard({ lang, data }) {
  const s = data.booksSection;
  const series = SERIES[lang];
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{s.seriesHeading}</h3>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{series.title}</h3>
        <p className="text-gray-700 text-sm mb-3">{series.blurb}</p>
        <p className="text-xs text-gray-500 mb-3">{s.seriesMetaLabel} {series.asin}</p>
        <a
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          href={series.url}
          rel="noopener"
        >
          {s.seriesBuyLabel}
        </a>
      </div>
    </div>
  );
}
