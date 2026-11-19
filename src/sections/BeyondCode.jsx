import { useReveal } from '../utils/useReveal';

const photoModules = import.meta.glob('../assets/photos/*.{avif,gif,jpeg,jpg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const photos = Object.entries(photoModules)
  .map(([path, src]) => ({
    src,
    name: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function BeyondCode() {
  const sectionRef = useReveal();
  const galleryRef = useReveal(0.1);

  return (
    <section id="beyond-code" className="py-28 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={sectionRef} className="reveal mb-12">
          <span className="section-label">07 — Beyond the Code</span>
          <div className="mt-3 w-10 h-px" style={{ background: 'var(--accent)' }} />
        </div>

        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16 items-start">
          <div className="reveal space-y-5" ref={useReveal()}>
            <h2
              className="font-display leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--fg)' }}
            >
              A different point of view.
            </h2>
            <p className="font-body text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Outside of code, I enjoy taking photos. This is a space for favorite frames,
              glimpses of my workspace, creative experiments, and the details that inspire me.
            </p>
            <p className="font-mono text-xs tracking-wide" style={{ color: 'var(--fg-muted)' }}>
              JPG · PNG · WEBP · AVIF · GIF
            </p>
          </div>

          <div ref={galleryRef} className="reveal">
            {photos.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {photos.map(photo => (
                  <figure key={photo.src} className="photo-card overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <figcaption className="px-3 py-2 font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>
                      {photo.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="photo-empty-state flex min-h-64 flex-col items-center justify-center p-8 text-center">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  aria-hidden="true"
                >
                  <path d="M3 7h3l2-3h8l2 3h3v13H3z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <p className="mt-4 font-display text-xl" style={{ color: 'var(--fg)' }}>The gallery is ready.</p>
                <p className="mt-2 max-w-sm font-body text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  Add your favorite photos to <code>src/assets/photos</code> and they’ll appear here.
                  Use descriptive filenames for captions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
