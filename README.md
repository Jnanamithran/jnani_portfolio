# JN4NI Portfolio

The personal portfolio of Jnanamithran M, built with React, Vite, Tailwind CSS,
and Framer Motion. The design pairs a restrained dark palette with editorial
typography, responsive layouts, and motion that respects reduced-motion
preferences.

## Portfolio sections

- **Home** — introduction and links to work and contact.
- **About** — a concise introduction, profile photograph, location, and current
  learning interests.
- **Work** — EKIP, LeafyLoop, V.I.P.E.R., Interactive Wedding Invite, and
  ToothSavvy. EKIP has a dedicated case study at `/projects/ekip`.
- **Writing** — existing technical articles with category filters and reading
  details.
- **Beyond the Code** — a horizontally scrollable photography gallery.
- **Contact** — email, configured social links, and the EmailJS contact form.

Project previews are illustrative when original product screenshots are not
available. Project source and demo links are shown only when configured.

## Development

Requires Node.js and npm.

```powershell
npm install
npm run dev
```

Open <http://localhost:5173>. Useful commands:

```powershell
npm run lint
npm run build
npm run preview
npm run optimize:photos
```

The development and production build commands optimize gallery images
automatically. Add original photos to `src/assets/photos`; generated WebP
copies are written to the ignored `src/assets/photos-optimized` directory.
Originals are left unchanged. Images are orientation-corrected and limited to
1800 pixels per side to reduce transfer and build size.
Verified place labels can be added by original filename in `photoPlaces` in
`scripts/optimize-photos.mjs`; photos without a known location stay unlabeled.

## Contact form

The contact form uses EmailJS. Its service, template, and public-key
configuration is in `src/services/contact.js`.
