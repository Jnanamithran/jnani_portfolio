import { createContext, useContext, useEffect, useState } from 'react';

const CONTRIBUTIONS_URL = 'https://github-contributions-api.jogruber.de/v4/Jnanamithran?y=last';
const GithubContributionsContext = createContext(null);

export function GithubContributionsProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', data: null, error: '' });

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      try {
        const response = await fetch(CONTRIBUTIONS_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Contribution service returned ${response.status}.`);

        const data = await response.json();
        if (
          !data
          || !Array.isArray(data.contributions)
          || typeof data.total?.lastYear !== 'number'
          || !data.contributions.every(day => (
            typeof day.date === 'string'
            && typeof day.count === 'number'
            && typeof day.level === 'number'
          ))
        ) {
          throw new Error('Contribution service returned an unexpected response.');
        }

        setState({ status: 'ready', data, error: '' });
      } catch (error) {
        if (error.name === 'AbortError') return;
        setState({
          status: 'error',
          data: null,
          error: error.message || 'Unable to load contribution history.',
        });
      }
    }

    loadContributions();
    return () => controller.abort();
  }, []);

  return (
    <GithubContributionsContext.Provider value={state}>
      {children}
    </GithubContributionsContext.Provider>
  );
}

export function useGithubContributions() {
  const state = useContext(GithubContributionsContext);
  if (!state) throw new Error('useGithubContributions must be used within its provider.');
  return state;
}
