import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogs } from '../blogs/index';
import Button from '../components/ui/Button';
import Seo from '../components/Seo';
import Tag from '../components/ui/Tag';

const markdownFiles = import.meta.glob('../blogs/*.md', { query: '?raw', import: 'default' });

function formatDate(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const meta = blogs.find(blog => blog.slug === slug);

  useEffect(() => {
    if (!meta) {
      navigate('/404', { replace: true });
      return undefined;
    }

    const key = `../blogs/${meta.file}`;
    const loadPost = markdownFiles[key];
    if (!loadPost) {
      navigate('/404', { replace: true });
      return undefined;
    }

    let active = true;
    setLoading(true);
    setContent('');
    loadPost().then(raw => {
      if (active) {
        setContent(raw);
        setLoading(false);
      }
    }, error => {
      if (!active) return;
      console.error(`Unable to load article "${slug}".`, error);
      navigate('/404', { replace: true });
    });
    window.scrollTo(0, 0);

    return () => {
      active = false;
    };
  }, [slug, meta, navigate]);

  return (
    <>
      <Seo
        title={meta?.title || 'Article not found'}
        description={meta?.description}
        type="article"
      />
      {loading ? (
        <div className="article-loading" role="status">Loading article…</div>
      ) : (
        <article className="article-page">
          <div className="article-container">
            <Link to="/#blogs" className="article-back">
              <span aria-hidden="true">←</span> All writing
            </Link>

            {meta && (
              <header className="article-header">
                <p className="article-meta">
                  <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{meta.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{meta.category}</span>
                </p>
                <div className="article-tags" aria-label="Article topics">
                  {meta.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </header>
            )}

            <div className="prose-article">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>

            <footer className="article-footer">
              <Link to="/#blogs" className="article-back">
                <span aria-hidden="true">←</span> More writing
              </Link>
              <Button to="/#contact" variant="text">
                Get in touch <span aria-hidden="true">↗</span>
              </Button>
            </footer>
          </div>
        </article>
      )}
    </>
  );
}
