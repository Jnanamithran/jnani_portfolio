import { Link } from 'react-router-dom';
import { useReveal } from '../utils/useReveal';

const FOCUS = [
  'Document ingestion for PDF, DOCX, XLSX, and TXT files',
  'Hybrid retrieval with source-cited answers',
  'Workspace and department-aware document permissions',
];

const STACK = [
  'React',
  'Node.js',
  'Express',
  'FastAPI',
  'PostgreSQL',
  'Qdrant',
  'Ollama',
  'Docker',
];

const WORKFLOW = [
  {
    title: 'Ingest documents',
    description: 'Bring supported files into the workspace and prepare their content for search.',
  },
  {
    title: 'Retrieve relevant context',
    description: 'Use semantic and hybrid retrieval to find information related to a question.',
  },
  {
    title: 'Answer with sources',
    description: 'Generate a contextual response with citations, respecting document access rules.',
  },
];

export default function CurrentlyBuilding() {
  const sectionRef = useReveal();
  const projectRef = useReveal(0.1);
  const timelineRef = useReveal(0.1);

  return (
    <section id="currently-building" className="py-28 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={sectionRef} className="reveal mb-16">
          <span className="section-label">05 — Currently Building</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--accent)' }} />
        </div>

        <article
          ref={projectRef}
          className="reveal border p-6 md:p-10"
          style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16">
            <div className="flex flex-col items-start">
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 border font-mono text-xs tracking-widest uppercase"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  Active development
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>
                  Development prototype
                </span>
              </div>

              <p className="section-label mb-3">Enterprise Knowledge Intelligence Platform</p>
              <h2
                className="font-display text-6xl md:text-8xl leading-none tracking-wide"
                style={{ color: 'var(--fg)' }}
              >
                EKIP
              </h2>
              <p className="font-body text-base leading-relaxed mt-6 max-w-xl" style={{ color: 'var(--fg-muted)' }}>
                A local-first knowledge workspace that helps teams find answers in their documents,
                with citations and access controls built into the retrieval workflow.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="https://github.com/Jnanamithran/ekip-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Explore repository
                  <span aria-hidden="true">↗</span>
                </a>
                <Link to="/blog/ekip-enterprise-knowledge-intelligence" className="btn-ghost inline-flex items-center">
                  Read project notes
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="section-label mb-4">Current focus</h3>
                <ul className="space-y-4">
                  {FOCUS.map((item, index) => (
                    <li key={item} className="flex gap-4 font-body text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                      <span className="font-mono text-xs pt-0.5" style={{ color: 'var(--fg)' }}>
                        0{index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <h3 className="section-label mb-4">Technology</h3>
                <div className="flex flex-wrap gap-2">
                  {STACK.map(technology => (
                    <span key={technology} className="tag">{technology}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <div
          ref={timelineRef}
          className="build-timeline reveal mt-14 pt-8 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <h3 className="section-label">From document to grounded answer</h3>
          <div className="relative mt-8">
            <div className="build-timeline-rail" aria-hidden="true">
              <span className="build-timeline-progress" />
            </div>
            <ol className="build-timeline-list" aria-label="EKIP document question workflow">
              {WORKFLOW.map((step, index) => (
                <li key={step.title} className="build-timeline-step">
                  <span className="build-timeline-node" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h4 className="font-display text-2xl tracking-wide" style={{ color: 'var(--fg)' }}>
                    {step.title}
                  </h4>
                  <p className="font-body text-sm leading-relaxed mt-2" style={{ color: 'var(--fg-muted)' }}>
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
