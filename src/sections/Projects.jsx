import SectionHeading from '../components/ui/SectionHeading';
import { projects } from '../utils/projects';
import ProjectCard from '../components/ProjectCard';

const [featuredProject, ...otherProjects] = projects;

export default function Projects() {
  return (
    <section id="projects" className="section-space section-alt px-6">
      <div className="content-width">
        <SectionHeading
          eyebrow="02 / Work"
          title="Selected work."
          description="Case studies across full-stack products, AI-enabled tools, and connected hardware."
        />

        <div className="project-list">
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
