import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span
        className="font-display"
        style={{ fontSize: 'clamp(6rem, 20vw, 16rem)', color: 'var(--border)', lineHeight: 1 }}
      >
        404
      </span>
      <p className="font-body text-base mt-4 mb-8" style={{ color: 'var(--fg-muted)' }}>
        This page doesn't exist. Maybe it was deleted, maybe it never was.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </main>
  );
}
