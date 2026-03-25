import { useReveal } from '../utils/useReveal';
import { blogs } from '../blogs/index';
import BlogCard from '../components/BlogCard';

export default function Blogs() {
  const labelRef = useReveal();
  const listRef = useReveal(0.05);

  return (
    <section id="blogs" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div ref={labelRef} className="reveal mb-16">
          <span className="section-label">03 — Writing</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--fg)' }} />
          <p className="mt-6 font-body text-base max-w-lg" style={{ color: 'var(--fg-muted)' }}>
            Technical deep-dives, architecture breakdowns, and lessons from shipping real systems.
          </p>
        </div>

        {/* List */}
        <div ref={listRef} className="stagger-children reveal space-y-3">
          {blogs.map(blog => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
