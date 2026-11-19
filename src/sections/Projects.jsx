import { useReveal } from '../utils/useReveal';
import { projects } from '../utils/projects';
import ProjectCard from '../components/ProjectCard';

const [featuredProject, ...otherProjects] = projects;

export default function Projects() {
  const sectionRef = useReveal();
  const projectsRef = useReveal(0.05);

  return (
    <section id="projects" className="section-space px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="content-width">
        <div ref={sectionRef} className="reveal section-heading">
          <div>
            <span className="section-label">02 — Work</span>
            <div className="section-rule" />
          </div>
          <p className="section-intro">
            Systems, interfaces, and experiments built around real problems.
          </p>
        </div>

        <div ref={projectsRef} className="reveal project-list">
          <ProjectCard project={featuredProject} featured />
          <div className="project-grid">
            {otherProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
