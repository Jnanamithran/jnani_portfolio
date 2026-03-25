import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const { slug, title, date, description, tags, readTime } = blog;
  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link
      to={`/blog/${slug}`}
      className="group block p-6 border transition-all duration-200"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--card-bg)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--fg)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{formatted}</span>
            <span className="font-mono text-xs" style={{ color: 'var(--border)' }}>·</span>
            <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{readTime}</span>
          </div>
          <h3
            className="font-body text-lg font-medium leading-snug transition-colors duration-200"
            style={{ color: 'var(--fg)' }}
          >
            {title}
          </h3>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: 'var(--fg-muted)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
