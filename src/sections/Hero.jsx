import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import heroPortrait from '../assets/photos-optimized/IMG-20261019-WA0061.webp';

export default function Hero() {
  return (
    <section id="home" className="hero-stage" aria-labelledby="hero-title">
      <figure className="hero-portrait">
        <img
          src={heroPortrait}
          alt="Black-and-white landscape portrait of Jnani looking to the right"
          width="1800"
          height="1013"
          fetchPriority="high"
        />
      </figure>

      <div className="hero-grid">
        <div className="hero-content">
          <p className="hero-kicker">Full-stack developer · Computer Science &amp; Engineering · Kerala, India</p>
          <h1 id="hero-title" className="hero-title">
            I build <span>systems,</span><br />
            not just websites.
          </h1>
          <p className="hero-summary">
            Full-stack projects, AI-enabled tools, and considered interfaces—built around useful problems.
          </p>
          <div className="hero-actions">
            <Button href="#projects">View work <span aria-hidden="true">↘</span></Button>
            <Button href="#contact" variant="secondary">Get in touch</Button>
          </div>
          <Link className="hero-featured-link" to="/projects/ekip">
            <span className="hero-featured-label">Featured project</span>
            <span>EKIP <span aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </div>
      <span className="hero-side-note" aria-hidden="true">JN4NI · SELECTED WORK</span>
    </section>
  );
}
