export default function PrivacySection({ data }) {
  const p = data.privacy;
  return (
    <div className="max-w-[46rem] mx-auto">
      {p.intro && (
        <p
          className="text-lg text-gray-700 leading-relaxed mb-8"
          dangerouslySetInnerHTML={{ __html: p.intro }}
        />
      )}
      {p.sections.map((s) => (
        <section key={s.heading} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{s.heading}</h2>
          {s.paragraphs.map((t, i) => (
            <p
              key={i}
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t }}
            />
          ))}
        </section>
      ))}
    </div>
  );
}
