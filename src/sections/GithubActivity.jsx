import { useEffect, useMemo, useState } from 'react';
import { projects } from '../utils/projects';
import { useReveal } from '../utils/useReveal';
import { useGithubContributions } from '../utils/GithubContributionsContext';

const REPOSITORIES_URL = 'https://api.github.com/users/Jnanamithran/repos?per_page=100&sort=updated';
const selectedProjects = projects.filter(project => project.github);

function getWeeks(contributions) {
  const weeks = [];
  for (let index = 0; index < contributions.length; index += 7) {
    weeks.push(contributions.slice(index, index + 7));
  }
  return weeks;
}

function getMonthMarkers(weeks) {
  let previousMonth = '';

  return weeks.reduce((markers, week, index) => {
    const date = week[0]?.date;
    if (!date) return markers;

    const monthKey = date.slice(0, 7);
    if (monthKey !== previousMonth) {
      markers.push({
        index,
        key: monthKey,
        label: new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
          month: 'short',
          timeZone: 'UTC',
        }),
      });
      previousMonth = monthKey;
    }

    return markers;
  }, []);
}

function ContributionCalendar({ data }) {
  const weeks = useMemo(() => getWeeks(data.contributions), [data.contributions]);
  const monthMarkers = useMemo(() => getMonthMarkers(weeks), [weeks]);

  return (
    <div
      className="github-contribution-chart"
      role="img"
      aria-label={`${data.total.lastYear} GitHub contributions in the last year`}
    >
      <div className="github-contribution-scroll">
        <div
          className="github-contribution-months"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, 0.625rem)` }}
          aria-hidden="true"
        >
          {monthMarkers.map(marker => (
            <span key={marker.key} style={{ gridColumnStart: marker.index + 1 }}>
              {marker.label}
            </span>
          ))}
        </div>
        <div
          className="github-contribution-weeks"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, 0.625rem)` }}
          aria-hidden="true"
        >
          {weeks.map(week => (
            <div className="github-contribution-week" key={week[0]?.date}>
              {week.map(day => (
                <span
                  key={day.date}
                  className="github-contribution-cell"
                  data-level={day.level}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>
        <span>{data.total.lastYear.toLocaleString()} contributions in the last year</span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map(level => (
            <span key={level} className="github-contribution-cell" data-level={level} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}

function RepositoryCard({ repository }) {
  const pushedAt = repository.pushed_at
    ? new Date(repository.pushed_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No pushes recorded';

  return (
    <a
      className="github-repo-card block p-5"
      href={repository.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-xl leading-tight" style={{ color: 'var(--fg)' }}>
          {repository.project.title}
        </h4>
        <span className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }} aria-label={`${repository.stargazers_count} stars`}>
          ★ {repository.stargazers_count.toLocaleString()}
        </span>
      </div>
      <p className="mt-3 min-h-12 font-body text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
        {repository.description || repository.project.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-3 font-mono text-xs" style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}>
        <span>{repository.language || 'Language not specified'}</span>
        <span>Updated {pushedAt}</span>
      </div>
    </a>
  );
}

export default function GithubActivity() {
  const sectionRef = useReveal();
  const activityRef = useReveal(0.05);
  const repositoriesRef = useReveal(0.05);
  const contributionState = useGithubContributions();
  const [repositoryState, setRepositoryState] = useState({ status: 'loading', repositories: [], missing: [], error: '' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepositories() {
      try {
        const response = await fetch(REPOSITORIES_URL, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}.`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('GitHub returned an unexpected repository list.');

        const repositoriesByName = new Map(data.map(repository => [repository.name.toLowerCase(), repository]));
        const repositories = selectedProjects.flatMap(project => {
          const name = project.github.split('/').filter(Boolean).pop().toLowerCase();
          const repository = repositoriesByName.get(name);
          return repository ? [{ ...repository, project }] : [];
        });
        const foundNames = new Set(repositories.map(repository => repository.project.id));
        const missing = selectedProjects
          .filter(project => !foundNames.has(project.id))
          .map(project => project.title);

        setRepositoryState({ status: 'ready', repositories, missing, error: '' });
      } catch (error) {
        if (error.name === 'AbortError') return;
        setRepositoryState({
          status: 'error',
          repositories: [],
          missing: [],
          error: error.message || 'Unable to load selected repositories.',
        });
      }
    }

    loadRepositories();
    return () => controller.abort();
  }, []);

  return (
    <section id="github-activity" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={sectionRef} className="reveal mb-12">
          <span className="section-label">08 — Live GitHub Activity</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--accent)' }} />
          <p className="mt-6 max-w-lg font-body text-base" style={{ color: 'var(--fg-muted)' }}>
            Recent contribution history and selected repositories, loaded from public GitHub data.
          </p>
        </div>

        <div ref={activityRef} className="reveal github-activity-card p-5 md:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl" style={{ color: 'var(--fg)' }}>Contribution history</h3>
              <p className="mt-1 font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>Past year</p>
            </div>
            <a
              className="btn-ghost inline-flex items-center gap-2"
              href="https://github.com/Jnanamithran"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile <span aria-hidden="true">↗</span>
            </a>
          </div>

          {contributionState.status === 'loading' && (
            <p className="font-mono text-sm" style={{ color: 'var(--fg-muted)' }}>Loading contribution history…</p>
          )}
          {contributionState.status === 'error' && (
            <p className="font-mono text-sm" role="status" style={{ color: 'var(--fg-muted)' }}>
              Could not load the live contribution graph: {contributionState.error}
            </p>
          )}
          {contributionState.status === 'ready' && <ContributionCalendar data={contributionState.data} />}
          <p className="mt-4 font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>
            Contribution graph data via{' '}
            <a className="github-activity-link" href="https://github-contributions-api.jogruber.de/" target="_blank" rel="noopener noreferrer">
              github-contributions-api
            </a>
            .
          </p>
        </div>

        <div ref={repositoriesRef} className="reveal mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl" style={{ color: 'var(--fg)' }}>Selected repositories</h3>
              <p className="mt-2 font-body text-sm" style={{ color: 'var(--fg-muted)' }}>
                Live stars, languages, and latest push dates.
              </p>
            </div>
            <a
              href="https://github.com/Jnanamithran?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex font-mono text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: 'var(--fg-muted)' }}
            >
              All repositories ↗
            </a>
          </div>

          {repositoryState.status === 'loading' && (
            <p className="font-mono text-sm" style={{ color: 'var(--fg-muted)' }}>Loading repositories…</p>
          )}
          {repositoryState.status === 'error' && (
            <p className="font-mono text-sm" role="status" style={{ color: 'var(--fg-muted)' }}>
              Could not load live repository details: {repositoryState.error}{' '}
              <a className="github-activity-link" href="https://github.com/Jnanamithran?tab=repositories" target="_blank" rel="noopener noreferrer">
                View repositories on GitHub.
              </a>
            </p>
          )}
          {repositoryState.status === 'ready' && repositoryState.repositories.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repositoryState.repositories.map(repository => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
            </div>
          )}
          {repositoryState.status === 'ready' && repositoryState.repositories.length === 0 && (
            <p className="font-mono text-sm" role="status" style={{ color: 'var(--fg-muted)' }}>
              No selected public repositories were returned.{' '}
              <a className="github-activity-link" href="https://github.com/Jnanamithran?tab=repositories" target="_blank" rel="noopener noreferrer">
                Browse GitHub.
              </a>
            </p>
          )}
          {repositoryState.status === 'ready' && repositoryState.missing.length > 0 && (
            <p className="mt-4 font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>
              Not returned by the public API: {repositoryState.missing.join(', ')}.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
