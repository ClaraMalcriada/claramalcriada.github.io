export default function Hero({ data }) {
  const hero = data.hero;
  return (
    <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className={`grid ${hero.image ? 'md:grid-cols-2' : ''} gap-12 items-center`}>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {hero.title}{' '}
              {hero.accent && <span className="text-pink-600">{hero.accent}</span>}
            </h1>
            <p className="text-xl text-gray-700">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              {hero.primaryCta && (
                <a href={hero.primaryCta.href} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block">
                  {hero.primaryCta.label}
                </a>
              )}
              {hero.secondaryCta && (
                <a href={hero.secondaryCta.href} className="border border-pink-600 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-lg font-medium transition-colors inline-block">
                  {hero.secondaryCta.label}
                </a>
              )}
            </div>
          </div>
          {hero.image && (
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-pink-200 rounded-full opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
              <img
                src={hero.image}
                alt={hero.imageAlt}
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
