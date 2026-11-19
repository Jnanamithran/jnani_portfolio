import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const GITHUB_USERNAME = 'Jnanamithran';
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_CHART_URL = 'https://ghchart.rshah.org';
const GITHUB_CHART_COLOR = 'a9402d';

export default function Live() {
  const [chartFailed, setChartFailed] = useState(false);

  return (
    <section id="live" className="section-space live-section">
      <div className="content-width">
        <SectionHeading
          eyebrow="03 / Activity"
          title="A small window into the work."
          description="A contribution snapshot, kept secondary to the projects themselves."
        />

        <article className="activity-card">
          <div className="activity-card-heading">
            <div>
              <span className="activity-label">GITHUB CONTRIBUTIONS · LAST YEAR</span>
              <h3>Building in public, one commit at a time.</h3>
            </div>
            <Button
              href={GITHUB_PROFILE_URL}
              variant="text"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Jnanamithran's GitHub profile (opens in a new tab)"
            >
              GitHub profile <span aria-hidden="true">↗</span>
            </Button>
          </div>

          {chartFailed ? (
            <p className="activity-state" role="alert">
              The contribution chart could not be loaded.{' '}
              <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                View the GitHub profile instead.
              </a>
            </p>
          ) : (
            <div className="activity-chart">
              <img
                src={`${GITHUB_CHART_URL}/${GITHUB_CHART_COLOR}/${GITHUB_USERNAME}`}
                alt={`Daily contribution calendar for ${GITHUB_USERNAME}; each square represents one day.`}
                width="663"
                height="100"
                loading="lazy"
                decoding="async"
                onError={() => setChartFailed(true)}
              />
            </div>
          )}
          <p className="activity-caption">Brighter squares represent days with more contributions.</p>
        </article>
      </div>
    </section>
  );
}
