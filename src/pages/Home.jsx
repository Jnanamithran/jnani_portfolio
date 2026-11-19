import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Blogs from '../sections/Blogs';
import BeyondCode from '../sections/BeyondCode';
import Contact from '../sections/Contact';

export default function Home() {
  const { hash, pathname, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (pathname === '/') window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    let secondFrame;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (!target) return;
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth';
        target.scrollIntoView({ behavior, block: 'start' });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [hash, key, pathname]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blogs />
      <BeyondCode />
      <Contact />
    </>
  );
}
