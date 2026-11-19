import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../blogs/index';
import BlogCard from '../components/BlogCard';
import { useReveal } from '../utils/useReveal';

const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

function formatDate(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function Blogs() {
  const sectionRef = useReveal();
  const featuredRef = useReveal(0.1);
  const journalRef = useReveal(0.05);
  const [activeCategory, setActiveCategory] = useState('All');
  const featured = activeCategory === 'All' ? blogs.find(blog => blog.featured) : null;
  const visibleBlogs = blogs.filter(blog => (
    activeCategory === 'All'
      ? !blog.featured
      : blog.category === activeCategory
  ));

  return (
    <section id="blogs" className="section-space px-6">
      <div className="content-width">
        <div ref={sectionRef} className="reveal section-heading">
          <div>
            <span className="section-label">03 — Writing</span>
            <div className="section-rule" />
          </div>
          <p className="section-intro">
            Notes from building, debugging, and learning how systems fit together.
          </p>
        </div>

        {featured && (
          <Link ref={featuredRef} to={`/blog/${featured.slug}`} className="reveal featured-article">
            <div className="featured-article-meta">
              <span>FEATURED ARTICLE</span>
              <span>{featured.category}</span>
            </div>
            <div className="featured-article-content">
              <div>
                <p className="featured-article-date">
                  {formatDate(featured.date)} <span aria-hidden="true">·</span> {featured.readTime}
                </p>
                <h2>{featured.title}</h2>
                <p className="featured-article-description">{featured.description}</p>
                <div className="project-card-tags">
                  {featured.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
              <span className="featured-article-arrow" aria-hidden="true">↗</span>
            </div>
            <span className="featured-article-link">Read the article <span aria-hidden="true">→</span></span>
          </Link>
        )}

        <div ref={journalRef} className="reveal">
          <div className="journal-toolbar">
            <h2 className="journal-subheading">From the journal</h2>
            <div className="journal-filters" role="group" aria-label="Filter articles by category">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  className={`journal-filter${activeCategory === category ? ' is-active' : ''}`}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="journal-list" aria-live="polite">
            {visibleBlogs.length > 0 ? visibleBlogs.map(blog => (
              <BlogCard key={blog.slug} blog={blog} formatDate={formatDate} />
            )) : (
              <p className="journal-empty">No articles in this category yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
