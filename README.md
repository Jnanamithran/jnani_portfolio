# JN4NI Portfolio

The personal portfolio of Jnanamithran M, built with React, Vite, Tailwind CSS,
and Framer Motion. The design pairs warm editorial typography with responsive
layouts, accessible light and dark themes, and motion that respects
reduced-motion preferences.

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

Project cards use clearly marked screenshot slots instead of illustrative
product mockups. Add real screenshots where marked, and confirm the TODO fields
for project role, outcomes, and any missing live or repository links before
publishing those case studies as final.

The build generates `public/og-image.jpg` at 1200×630 from `public/profile.jpg`.
Replace it with approved social artwork when available, and update
`scripts/optimize-photos.mjs` if the source changes.

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
Best-effort place guesses are stored by original filename in `photoPlaces` in
`scripts/optimize-photos.mjs`; review or correct them before publishing.
Unidentified photos use a generic "Location not specified" caption.

## Contact form

The contact form uses EmailJS. Its service, template, and public-key
configuration is read from `VITE_EMAILJS_SERVICE_ID`,
`VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`. Copy `.env.example`
to `.env.local` for local work, then configure the same values in Vercel.
Vite-prefixed variables are included in browser code; they configure EmailJS
but do not make a client-side public key secret. The form also uses a honeypot
and a 30-second per-browser cooldown as lightweight abuse controls.
