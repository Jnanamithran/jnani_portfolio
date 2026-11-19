import { lazy, Suspense } from 'react';
import { GithubContributionsProvider } from '../utils/GithubContributionsContext';
import Hero from '../sections/Hero';
import DeveloperDashboard from '../sections/DeveloperDashboard';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Blogs from '../sections/Blogs';
import CurrentlyBuilding from '../sections/CurrentlyBuilding';
import InteractiveTerminal from '../sections/InteractiveTerminal';
import BeyondCode from '../sections/BeyondCode';
import Contact from '../sections/Contact';

const GithubActivity = lazy(() => import('../sections/GithubActivity'));

export default function Home() {
  return (
    <GithubContributionsProvider>
      <>
        <Hero />
        <DeveloperDashboard />
        <About />
        <Projects />
        <Blogs />
        <CurrentlyBuilding />
        <InteractiveTerminal />
        <BeyondCode />
        <Suspense fallback={<div className="py-12 text-center font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>Loading GitHub activity…</div>}>
          <GithubActivity />
        </Suspense>
        <Contact />
      </>
    </GithubContributionsProvider>
  );
}
