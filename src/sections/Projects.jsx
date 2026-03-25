import { useReveal } from '../utils/useReveal';
import { projects } from '../utils/projects';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const labelRef = useReveal();
  const gridRef = useReveal(0.05);

  return (
    <section id="projects" className="py-28 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div ref={labelRef} className="reveal mb-16 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="section-label">02 — Projects</span>
            <div className="mt-3 w-10 h-px" style={{ background: 'var(--fg)' }} />
          </div>
          <p className="font-body text-sm max-w-xs text-right" style={{ color: 'var(--fg-muted)' }}>
            Selected work. Hover to explore.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="stagger-children reveal grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          }}
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
