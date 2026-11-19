export default function ProjectVisual({ project }) {
  return (
    <div className="project-visual" aria-hidden="true">
      <div className="project-visual-heading">
        <span>SCREENSHOT SLOT</span>
        <span>{project.id.toUpperCase()} / 01</span>
      </div>
      <div className="project-visual-placeholder">
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="5" y="7" width="38" height="34" rx="1" />
          <path d="M5 15h38M12 11h.01M16 11h.01M20 11h.01M13 33l8-8 6 6 5-5 5 7" />
        </svg>
        <strong>Product screenshot</strong>
        <span>Replace with a real project image</span>
      </div>
      <div className="project-visual-footer">
        <span>IMAGE TO SUPPLY</span>
        <span>{project.title}</span>
      </div>
    </div>
  );
}
