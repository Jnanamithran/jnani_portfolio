import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ProjectVisual from './ProjectVisual';

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ProjectCard({ project, featured = false }) {
  const reduceMotion = useReducedMotion();
  const cardMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.article
      className={`project-card${featured ? ' project-card-featured' : ''}`}
      {...cardMotion}
    >
      <div className="project-card-art">
        <ProjectVisual project={project} />
      </div>

      <div className="project-card-content">
        <div className="project-card-meta">
          <span className="project-category">{project.category}</span>
          {project.status && <span className="project-status">{project.status}</span>}
        </div>

        <div>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-description">{project.description}</p>
        </div>

        <div className="project-card-tags" aria-label="Technologies">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>

        <div className="project-card-actions">
          {project.caseStudy && (
            <Link className={featured ? 'project-action project-action-primary' : 'project-action'} to={`/projects/${project.caseStudy}`}>
              Case study <ArrowIcon />
            </Link>
          )}
          {project.demo && (
            <a className="project-action" href={project.demo} target="_blank" rel="noopener noreferrer">
              Live <ArrowIcon />
            </a>
          )}
          {project.github && (
            <a className="project-action" href={project.github} target="_blank" rel="noopener noreferrer">
              Source <ArrowIcon />
            </a>
          )}
          {project.blog && (
            <Link className="project-action project-action-muted" to={project.blog}>
              Article <ArrowIcon />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
