import { Link } from 'react-router-dom';
import Tag from './ui/Tag';

export default function BlogCard({ blog, formatDate }) {
  return (
    <Link to={`/blog/${blog.slug}`} className="journal-card">
      <div className="journal-card-number" aria-hidden="true">/</div>
      <div className="journal-card-main">
        <div className="journal-card-meta">
          <span>{formatDate(blog.date)}</span>
          <span>{blog.category}</span>
          <span>{blog.readTime}</span>
        </div>
        <h4>{blog.title}</h4>
        <p>{blog.description}</p>
        <div className="project-card-tags">
          {blog.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
      <span className="journal-card-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
