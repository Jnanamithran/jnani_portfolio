import { useReveal } from '../utils/useReveal';
import { useGithubContributions } from '../utils/GithubContributionsContext';

const TECHNOLOGIES = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'Qdrant',
  'Ollama',
];

const LEARNING = [
  'Systems design',
  'Developer tooling',
  'Real-time application architectures',
];

export default function DeveloperDashboard() {
  const sectionRef = useReveal();
  const cardsRef = useReveal(0.05);
  const contributionState = useGithubContributions();

  return (
    <section id="dashboard" className="py-24 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={sectionRef} className="reveal mb-12">
          <span className="section-label">01 — Developer Dashboard</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--accent)' }} />
          <p className="mt-6 max-w-lg font-body text-base" style={{ color: 'var(--fg-muted)' }}>
            A quick snapshot of what I’m building, learning, and exploring.
          </p>
        </div>

        <div ref={cardsRef} className="dashboard-grid reveal">
          <a className="dashboard-card dashboard-card-building" href="#currently-building">
            <div className="flex items-center justify-between gap-3">
              <span className="dashboard-kicker">Currently building</span>
              <span className="dashboard-status"><span aria-hidden="true" /> Active</span>
            </div>
            <div>
              <h2 className="font-display text-5xl md:text-6xl leading-none" style={{ color: 'var(--fg)' }}>EKIP</h2>
              <p className="mt-3 max-w-sm font-body text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                Local-first enterprise knowledge intelligence, with cited answers and role-based access.
              </p>
              <span className="dashboard-link mt-5 inline-block">Explore the build <span aria-hidden="true">↗</span></span>
            </div>
          </a>

          <a className="dashboard-card dashboard-card-technology" href="#projects">
            <span className="dashboard-kicker">Main technologies</span>
            <div className="mt-5 flex flex-wrap gap-2">
              {TECHNOLOGIES.map(technology => (
                <span key={technology} className="tag">{technology}</span>
              ))}
            </div>
          </a>

          <a className="dashboard-card dashboard-card-github" href="#github-activity">
            <span className="dashboard-kicker">GitHub activity · past year</span>
            {contributionState.status === 'ready' && (
              <div className="mt-5">
                <span className="font-display text-4xl" style={{ color: 'var(--fg)' }}>
                  {contributionState.data.total.lastYear.toLocaleString()}
                </span>
                <p className="mt-1 font-body text-sm" style={{ color: 'var(--fg-muted)' }}>contributions</p>
              </div>
            )}
            {contributionState.status === 'loading' && (
              <p className="mt-5 font-mono text-sm" style={{ color: 'var(--fg-muted)' }}>Loading activity…</p>
            )}
            {contributionState.status === 'error' && (
              <p className="mt-5 font-mono text-sm" style={{ color: 'var(--fg-muted)' }}>
                Activity unavailable: {contributionState.error}
              </p>
            )}
            <span className="dashboard-link mt-4 inline-block">View contribution history <span aria-hidden="true">↗</span></span>
          </a>

          <article className="dashboard-card dashboard-card-location">
            <span className="dashboard-kicker">Location</span>
            <div className="mt-auto pt-6">
              <p className="font-display text-2xl" style={{ color: 'var(--fg)' }}>Kerala, India</p>
              <p className="mt-1 font-body text-sm" style={{ color: 'var(--fg-muted)' }}>Based in God’s Own Country</p>
            </div>
          </article>

          <article className="dashboard-card dashboard-card-learning">
            <span className="dashboard-kicker">Currently learning</span>
            <ul className="mt-4 space-y-2">
              {LEARNING.map(item => (
                <li key={item} className="flex items-center gap-2 font-body text-sm" style={{ color: 'var(--fg-muted)' }}>
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <a className="dashboard-card dashboard-card-availability" href="#contact">
            <span className="dashboard-kicker">Availability</span>
            <div className="mt-auto pt-6">
              <p className="font-display text-2xl leading-tight" style={{ color: 'var(--fg)' }}>
                Open to opportunities
              </p>
              <span className="dashboard-link mt-3 inline-block">Let’s connect <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
