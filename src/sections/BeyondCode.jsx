import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useReveal } from '../utils/useReveal';
import photoMetadata from '../assets/photos-optimized/metadata.json';

const photoModules = import.meta.glob('../assets/photos-optimized/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const photoSources = new Map(
  Object.entries(photoModules).map(([path, src]) => [path.split('/').pop(), src])
);

const photos = photoMetadata
  .map(({ file, width, height, place }) => {
    const src = photoSources.get(file);
    if (!src) throw new Error(`Missing optimized photo asset: ${file}`);

    return {
      src,
      width,
      height,
      place,
      name: file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

function PhotoCard({ photo, index, total, reduceMotion }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.figure
      className="photo-card photo-gallery-item"
      role="listitem"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : (index % 5) * 0.07,
      }}
    >
      <div className="photo-gallery-frame">
        {photo.place && (
          <div className="photo-gallery-place">
            <span className="photo-gallery-place-label">CAPTURED IN</span>
            <span className="photo-gallery-place-name">{photo.place}</span>
          </div>
        )}
        <motion.img
          src={photo.src}
          alt={photo.name}
          width={photo.width}
          height={photo.height}
          aria-hidden={!loaded}
          loading="lazy"
          decoding="async"
          initial={false}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: 'easeOut' }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
        <AnimatePresence initial={false}>
          {!loaded && !failed && (
            <motion.div
              key="loading"
              className="photo-loading-state"
              role="status"
              aria-label={`Loading photo frame ${frameNumber} of ${total}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            >
              <motion.div
                className="photo-loader-graphic"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 4v8l5 3" />
                </svg>
              </motion.div>
              <span className="photo-loader-label">DEVELOPING FRAME</span>
              <span className="photo-loader-index">{frameNumber} / {String(total).padStart(2, '0')}</span>
              {!reduceMotion && (
                <span className="photo-loader-track" aria-hidden="true">
                  <motion.span
                    className="photo-loader-sweep"
                    animate={{ x: ['-100%', '225%'] }}
                    transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
              )}
            </motion.div>
          )}
          {failed && (
            <motion.div
              key="error"
              className="photo-loading-error"
              role="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            >
              PHOTO UNAVAILABLE
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <figcaption className="photo-gallery-caption">
        <span className="photo-gallery-index">FRAME {frameNumber}</span>
        <span className="photo-gallery-name">{photo.name}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function BeyondCode() {
  const sectionRef = useReveal();
  const scrollContainerRef = useRef(null);
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });
  const galleryX = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useLayoutEffect(() => {
    const viewport = stripRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    const measureScrollDistance = () => {
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setScrollDistance(current => (current === distance ? current : distance));
    };

    measureScrollDistance();
    const observer = new ResizeObserver(measureScrollDistance);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const scrollPhotos = direction => {
    const strip = stripRef.current;
    if (!strip) return;

    const staticGallery = reduceMotion || window.matchMedia('(max-width: 767px)').matches;
    if (staticGallery) {
      strip.scrollBy({
        left: direction * strip.clientWidth * 0.8,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      return;
    }

    const step = scrollDistance / Math.max(photos.length - 1, 1);
    window.scrollBy({ top: direction * step, behavior: 'smooth' });
  };

  return (
    <section id="beyond-code" className="beyond-section px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="content-width">
        <div ref={sectionRef} className="reveal section-heading">
          <div>
            <span className="section-label">04 — Beyond the Code</span>
            <div className="section-rule" />
          </div>
          <p className="section-intro">A few frames from the places and details that catch my eye.</p>
        </div>

        <div className="beyond-heading">
          <div>
            <h2
              className="display-heading"
            >
              A different<br />point of view.
            </h2>
            <p>Outside of code, I enjoy taking photos.</p>
          </div>

          {photos.length > 0 && (
            <div className="photo-gallery-controls" role="group" aria-label="Photo gallery controls">
              <span className="photo-gallery-count">
                {String(photos.length).padStart(2, '0')} FRAMES
              </span>
              <motion.button
                type="button"
                className="photo-gallery-button"
                aria-label="Scroll photos left"
                onClick={() => scrollPhotos(-1)}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                className="photo-gallery-button"
                aria-label="Scroll photos right"
                onClick={() => scrollPhotos(1)}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </motion.button>
            </div>
          )}
        </div>

        <div className="mt-8">
          {photos.length > 0 ? (
            <div
              ref={scrollContainerRef}
              className={`photo-scroll-container${reduceMotion ? ' is-static' : ''}`}
              style={{ height: reduceMotion ? 'auto' : `calc(100vh + ${scrollDistance}px)` }}
            >
              <div className="photo-gallery-sticky">
                <div
                  ref={stripRef}
                  className="photo-gallery-scroll"
                  role="list"
                  tabIndex={0}
                  aria-label="Photography gallery. Scroll down to browse or swipe horizontally on touchscreens."
                >
                  <motion.div
                    ref={trackRef}
                    className="photo-gallery-track"
                    style={{ x: reduceMotion ? 0 : galleryX }}
                  >
                    {photos.map((photo, index) => (
                      <PhotoCard
                        key={photo.src}
                        photo={photo}
                        index={index}
                        total={photos.length}
                        reduceMotion={reduceMotion}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
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
    </section>
  );
}
