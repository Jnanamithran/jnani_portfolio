import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const { title, description, tags, demo, github, blog } = project;

  return (
    <article className="project-card p-6 flex flex-col gap-5 h-full">
      {/* Image placeholder */}
      <div
        className="w-full aspect-video relative overflow-hidden"
        style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              var(--border) 0px,
              var(--border) 1px,
              transparent 1px,
              transparent 12px
            )`,
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl tracking-widest" style={{ color: 'var(--border)' }}>
            {title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3">
        <h3 className="font-display text-2xl leading-tight" style={{ color: 'var(--fg)' }}>
          {title}
        </h3>

        <p className="font-body text-sm leading-relaxed flex-1" style={{ color: 'var(--fg-muted)' }}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60"
            style={{ color: 'var(--fg)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60"
            style={{ color: 'var(--fg-muted)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Source
          </a>
        )}
        {blog && (
          <Link
            to={blog}
            className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60 ml-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            Read
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}
