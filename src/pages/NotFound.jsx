import Button from '../components/ui/Button';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <Seo title="Page not found" description="The requested portfolio page could not be found." />
      <p className="not-found-kicker">404 · Page not found</p>
      <h1 id="not-found-title" className="not-found-code">404</h1>
      <p className="not-found-copy">
        This page doesn’t exist. Maybe it was deleted, maybe it never was.
      </p>
      <Button to="/">Back to Home</Button>
    </section>
  );
}
