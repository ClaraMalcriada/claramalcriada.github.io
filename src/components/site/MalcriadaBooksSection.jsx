export default function MalcriadaBooksSection({ data }) {
  const s = data.malcriadaBooks;
  return (
    <section id={s.id} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{s.heading}</h2>
          <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">{s.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {s.steps.map((step, i) => (
            <div key={step.title} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-pink-600 text-sm font-semibold mb-2">0{i + 1}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-700 text-sm">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-700 mb-6">{s.note}</p>
          <a
            href={s.ctaHref}
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {s.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
