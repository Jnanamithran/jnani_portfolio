import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Live from '../sections/Live';
import Projects from '../sections/Projects';
import Blogs from '../sections/Blogs';
import Contact from '../sections/Contact';

const BeyondCode = lazy(() => import('../sections/BeyondCode'));

function DeferredGallery() {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '800px 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="beyond-code" ref={sectionRef} className="deferred-gallery-shell">
      {shouldLoad ? (
        <Suspense fallback={<div className="deferred-gallery-placeholder" role="status">Loading photography…</div>}>
          <BeyondCode />
        </Suspense>
      ) : (
        <div className="deferred-gallery-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}

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
      <Seo
        title="Full-Stack Developer & Designer"
        description="Jnanamithran M (JN4NI) — Computer Science undergraduate in Kerala building full-stack projects and AI-enabled tools."
      />
      <Hero />
      <About />
      <Projects />
      <Live />
      <Blogs />
      <DeferredGallery />
      <Contact />
    </>
  );
}
