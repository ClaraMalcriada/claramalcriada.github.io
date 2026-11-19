export function Breadcrumb({ items }) {
  return (
    <nav className="text-sm text-gray-400 mt-6 mb-2" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.url}>
          {i > 0 && <span className="mx-2">›</span>}
          <a href={item.url} className="text-gray-400 hover:text-pink-600 transition-colors">
            {item.name}
          </a>
        </span>
      ))}
    </nav>
  );
}

export function BlogMain({ children }) {
  return <main className="max-w-[46rem] mx-auto px-5 py-10">{children}</main>;
}

export function PostMain({ children }) {
  return <main className="max-w-[42rem] mx-auto px-5 pb-10">{children}</main>;
}

export function PostHeader({ title, meta }) {
  return (
    <header className="mt-6 pb-5 border-b border-gray-200 mb-6">
      <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-3">{title}</h1>
      <div className="w-20 h-1 bg-pink-600 mb-4"></div>
      <p className="text-gray-500 text-sm">{meta}</p>
    </header>
  );
}

export function PostContent({ html }) {
  return <article className="post-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function H2({ children }) {
  return <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>;
}

export function PostCard({ post }) {
  const href = post.href ?? `/blog/${post.slug}/`;
  return (
    <article className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-1">
        <a href={href} className="hover:text-pink-600 transition-colors">
          {post.title}
        </a>
      </h3>
      <p className="text-sm text-gray-500 mb-1">{post.dateLabel}</p>
      <p className="text-gray-700">{post.description}</p>
    </article>
  );
}
