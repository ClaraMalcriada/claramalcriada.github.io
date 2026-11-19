export default function Footer({ data }) {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">{data.footer.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {data.footer.links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                title={link.title}
                className="text-gray-400 hover:text-pink-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
