export function FaqCard({ q, a }) {
  return (
    <div className="bg-pink-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{q}</h3>
      <p className="text-gray-700">{a}</p>
    </div>
  );
}

export function FaqSection({ data, items }) {
  const faqs = items ?? data.faq.items;
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.faq.heading}</h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <FaqCard key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}
