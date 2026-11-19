import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
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
      alt: file === 'IMG-20261019-WA0061.webp'
        ? 'Black-and-white landscape portrait of Jnani outdoors at night'
        : place
          ? `Travel photograph, likely from ${place.name}, ${place.region}`
          : 'Travel photograph',
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

function PhotoCard({ photo, index }) {
  const [failed, setFailed] = useState(false);
  const frameNumber = String(index + 1).padStart(2, '0');

  return (
    <figure className="photo-gallery-item" role="listitem">
      <div className="photo-gallery-frame">
        {failed ? (
          <div className="photo-gallery-error" role="img" aria-label={`${photo.alt}; image unavailable`}>
            Image unavailable
          </div>
        ) : (
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="photo-gallery-caption">
        <span className="photo-gallery-index">{frameNumber}</span>
        <span className="photo-gallery-place">
          {photo.place ? photo.place.name : 'Field notes'}
        </span>
        <span className="photo-gallery-region">
          {photo.place ? photo.place.region : 'Location not specified'}
        </span>
      </figcaption>
    </figure>
  );
}

export default function BeyondCode() {
  const stripRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const scrollPhotos = direction => {
    const strip = stripRef.current;
    if (!strip) return;

    strip.scrollBy({
      left: direction * strip.clientWidth * 0.8,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const handleGalleryKeyDown = event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      scrollPhotos(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  return (
    <section className="section-space beyond-section section-alt" aria-labelledby="beyond-code-title">
      <div className="content-width">
        <SectionHeading
          titleId="beyond-code-title"
          eyebrow="05 / Beyond the code"
          title="A different point of view."
          description="A few frames from the places and details that catch my eye."
        />

        <div className="photo-gallery-toolbar">
          <p>Outside of code, I enjoy taking photos.</p>
          {photos.length > 0 && (
            <div className="photo-gallery-controls" role="group" aria-label="Photo gallery controls">
              <span className="photo-gallery-count">{String(photos.length).padStart(2, '0')} FRAMES</span>
              <button
                type="button"
                className="photo-gallery-button"
                aria-label="Scroll photos left"
                onClick={() => scrollPhotos(-1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="photo-gallery-button"
                aria-label="Scroll photos right"
                onClick={() => scrollPhotos(1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>

        {photos.length > 0 ? (
          <div
            ref={stripRef}
            className="photo-gallery-scroll"
            role="list"
            tabIndex={0}
            aria-label="Photography gallery. Use the left and right arrow keys to browse."
            onKeyDown={handleGalleryKeyDown}
          >
            <div className="photo-gallery-track">
              {photos.map((photo, index) => (
                <PhotoCard key={photo.src} photo={photo} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="photo-empty-state">
            <p className="photo-empty-title">The gallery is ready.</p>
            <p className="photo-empty-copy">
              Add your favorite photos to <code>src/assets/photos</code> and they’ll appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
