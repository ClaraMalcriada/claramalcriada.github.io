export default function Header({ data, langSwitchHref, nav: navOverride }) {
  const sw = langSwitchHref ? { ...data.langSwitch, href: langSwitchHref } : data.langSwitch;
  const nav = navOverride ?? data.nav;
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-pink-600">{data.brand}</div>
        </div>
        <nav className="hidden md:flex space-x-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              title={item.title}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={sw.href}
            title={sw.title}
            className="text-gray-500 hover:text-pink-600 transition-colors text-sm"
          >
            {sw.label}
          </a>
        </nav>
        <button className="md:hidden text-gray-700" aria-label={data.brand}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
