import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogs } from '../blogs/index';

// Eagerly import all markdown files
const markdownFiles = import.meta.glob('../blogs/*.md', { query: '?raw', import: 'default' });

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const meta = blogs.find(b => b.slug === slug);

  useEffect(() => {
    if (!meta) {
      navigate('/404', { replace: true });
      return;
    }
    const key = `../blogs/${slug}.md`;
    if (markdownFiles[key]) {
      markdownFiles[key]().then(raw => {
        setContent(raw);
        setLoading(false);
      });
    } else {
      navigate('/404', { replace: true });
    }
    window.scrollTo(0, 0);
  }, [slug, meta, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--fg-muted)' }}>
          Loading…
        </span>
      </div>
    );
  }

  const formatted = meta
    ? new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <main className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          to="/#blogs"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-12 transition-opacity hover:opacity-60"
          style={{ color: 'var(--fg-muted)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          All Posts
        </Link>

        {/* Meta */}
        {meta && (
          <div className="mb-10 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{formatted}</span>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>{meta.readTime}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {meta.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Markdown content */}
        <div className="prose-jn4ni">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

        {/* Divider + back */}
        <div className="mt-16 pt-8 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: 'var(--fg-muted)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            More Posts
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: 'var(--fg)' }}
          >
            Get in Touch
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Prose styles */}
      <style>{`
        .prose-jn4ni { color: var(--fg); }
        .prose-jn4ni h1 {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(2rem, 5vw, 3rem);
          letter-spacing: 0.04em;
          line-height: 1.1;
          color: var(--fg);
          margin-bottom: 1.5rem;
        }
        .prose-jn4ni h2 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--fg);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .prose-jn4ni h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--fg);
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .prose-jn4ni p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.8;
          color: var(--fg-muted);
          margin-bottom: 1.25rem;
        }
        .prose-jn4ni strong {
          color: var(--fg);
          font-weight: 600;
        }
        .prose-jn4ni em {
          font-style: italic;
          color: var(--fg-muted);
        }
        .prose-jn4ni a {
          color: var(--fg);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-jn4ni a:hover { opacity: 0.6; }
        .prose-jn4ni ul, .prose-jn4ni ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: var(--fg-muted);
          font-size: 0.9375rem;
          line-height: 1.8;
        }
        .prose-jn4ni li { margin-bottom: 0.4rem; }
        .prose-jn4ni blockquote {
          border-left: 2px solid var(--fg);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          color: var(--fg-muted);
          font-style: italic;
        }
        .prose-jn4ni hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2.5rem 0;
        }
        .prose-jn4ni code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8125rem;
          background: var(--bg-alt);
          padding: 0.15em 0.4em;
          border: 1px solid var(--border);
          color: var(--fg);
        }
        .prose-jn4ni pre {
          background: var(--bg-alt) !important;
          border: 1px solid var(--border);
          padding: 1.25rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .prose-jn4ni pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.8125rem;
          line-height: 1.7;
          color: var(--fg);
        }
        .prose-jn4ni table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        .prose-jn4ni th, .prose-jn4ni td {
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--border);
          color: var(--fg-muted);
          text-align: left;
        }
        .prose-jn4ni th {
          color: var(--fg);
          background: var(--bg-alt);
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}
