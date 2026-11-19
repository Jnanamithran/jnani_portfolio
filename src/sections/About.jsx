import { useReveal } from '../utils/useReveal';

const DETAILS = [
  { label: 'Based in', value: 'Kerala, India' },
  { label: 'Exploring', value: 'Systems design · developer tooling · real-time apps' },
  { label: 'Availability', value: 'Open to opportunities' },
];

export default function About() {
  const sectionRef = useReveal();
  const textRef = useReveal();
  const portraitRef = useReveal(0.1);

  return (
    <section id="about" className="section-space px-6">
      <div className="content-width">
        <div ref={sectionRef} className="reveal section-heading">
          <div>
            <span className="section-label">01 — About</span>
            <div className="section-rule" />
          </div>
        </div>

        <div className="about-layout">
          <div ref={portraitRef} className="reveal about-portrait-wrap">
            <div className="about-portrait">
              <img src="/profile.jpg" alt="Jnanamithran M" loading="lazy" decoding="async" />
              <span className="about-portrait-caption">JNANAMITHRAN M · KERALA, INDIA</span>
            </div>
            <span className="about-portrait-index" aria-hidden="true">01 / 04</span>
          </div>

          <div ref={textRef} className="reveal about-copy">
            <h2 className="display-heading">Developer.<br />Designer.<br /><span>Builder.</span></h2>
            <p>
              I’m Jnanamithran M, a third-year Computer Science &amp; Engineering undergraduate
              at APJ Abdul Kalam Technological University (KTU), based in Kerala, India.
            </p>
            <p>
              I like taking software from a real problem to a clear, dependable product.
              I’m especially interested in full-stack systems, AI-enabled knowledge tools,
              and the design decisions that make complex products easier to use and maintain.
            </p>

            <dl className="about-details">
              {DETAILS.map(detail => (
                <div className="about-detail" key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>

            <a href="#contact" className="text-link about-contact-link">
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
