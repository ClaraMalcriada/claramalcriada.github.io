export function StaticMain({ children }) {
  return (
    <main className="py-12 bg-white">
      <div className="container mx-auto px-4">{children}</div>
    </main>
  );
}

export default function AboutSection({ data, variant = 'full' }) {
  const about = data.about;

  if (variant === 'lead') {
    return (
      <div className="max-w-3xl mx-auto mb-12">
        <p
          className="text-lg text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: about.lead }}
        />
      </div>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{about.heading}</h2>
          <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
          {about.bio.map((paragraph, i) => (
            <p
              key={i}
              className={`text-lg text-gray-700 leading-relaxed ${i > 0 ? 'mt-4' : ''}`}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {about.specialties.map((item, i) => (
            <div key={item.title} className="bg-pink-50 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                  {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 18.477 14.754 18 16.5 18c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
