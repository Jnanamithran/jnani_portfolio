import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[2px]" style={{ background: 'var(--border)' }}>
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: 'var(--fg)',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  );
}
