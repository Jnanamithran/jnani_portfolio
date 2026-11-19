import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const DETAILS = [
  { label: 'Based in', value: 'Kerala, India' },
  { label: 'Exploring', value: 'Systems design · developer tooling · real-time apps' },
  { label: 'Availability', value: 'Open to opportunities' },
];

export default function About() {
  return (
    <section id="about" className="section-space about-section">
      <div className="content-width">
        <SectionHeading
          eyebrow="01 / About"
          title="A little context."
          description="I care about the thinking behind software as much as the interface people use."
        />

        <div className="about-layout">
          <figure className="about-portrait">
            <img
              src="/profile.jpg"
              alt="Portrait of Jnani outdoors among plants"
              width="731"
              height="707"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>JN4NI</span>
              <span>KERALA, INDIA</span>
            </figcaption>
          </figure>

          <div className="about-copy">
            <h3 className="about-lede">
              Fourth-year Computer Science &amp; Engineering undergraduate at APJ Abdul Kalam
              Technological University.
            </h3>
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

            <Button href="#contact" variant="text">
              Start a conversation <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
