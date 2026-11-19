import sharp from 'sharp';
import { mkdir, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import { extname, join, parse, resolve } from 'node:path';

const sourceDirectory = resolve('src/assets/photos');
const outputDirectory = resolve('src/assets/photos-optimized');
const socialImageSource = resolve('public/profile.jpg');
const sourceExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);
const photoPlaces = new Map([
  ['121.jpg', { name: 'Railway Platform', region: 'India' }],
  ['123.jpg', { name: 'Railway Platform', region: 'India' }],
  ['20260109_110652.jpg', { name: 'Kerala', region: 'India' }],
  ['20260109_111245.jpg', { name: 'Kerala', region: 'India' }],
  ['IMG_20260822_155424121.jpg', { name: 'Jaisalmer', region: 'Rajasthan · India' }],
  ['IMG_20260822_155657391.jpg', { name: 'Jaisalmer', region: 'Rajasthan · India' }],
  ['IMG_20260823_183125259.jpg', { name: 'Jaisalmer', region: 'Rajasthan · India' }],
  ['IMG_20260827_111143906.jpg', { name: 'Manali', region: 'Himachal Pradesh · India' }],
  ['IMG_20260827_113304929.jpg', { name: 'Solang Valley', region: 'Manali · Himachal Pradesh' }],
  ['IMG_20260827_124623048.jpg', { name: 'Rohtang Pass', region: 'Himachal Pradesh · India' }],
  ['Picsart_26-08-23_16-16-42-098.jpg', { name: 'Kuldhara', region: 'Jaisalmer · Rajasthan' }],
  ['Picsart_26-08-23_19-49-56-999.jpg', { name: 'Sam Sand Dunes', region: 'Jaisalmer · Rajasthan' }],
  ['Picsart_26-08-25_02-40-42-434.jpg', { name: 'Thar Desert', region: 'Jaisalmer · Rajasthan' }],
]);

await mkdir(outputDirectory, { recursive: true });
await sharp(socialImageSource)
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
  .jpeg({ quality: 85 })
  .toFile(resolve('public/og-image.jpg'));

const sourceFiles = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter(entry => entry.isFile() && sourceExtensions.has(extname(entry.name).toLowerCase()))
  .map(entry => entry.name)
  .sort();

const outputNames = sourceFiles.map(file => `${parse(file).name}.webp`);
if (new Set(outputNames).size !== outputNames.length) {
  throw new Error('Photo filenames must be unique when their extensions are removed.');
}

const photoMetadata = [];
for (let index = 0; index < sourceFiles.length; index += 1) {
  const sourcePath = join(sourceDirectory, sourceFiles[index]);
  const outputPath = join(outputDirectory, outputNames[index]);

  const image = await sharp(sourcePath)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);

  photoMetadata.push({
    file: outputNames[index],
    width: image.width,
    height: image.height,
    place: photoPlaces.get(sourceFiles[index]) ?? null,
  });
}

const expectedOutputs = new Set(outputNames);
for (const name of await readdir(outputDirectory)) {
  if (name.endsWith('.webp') && !expectedOutputs.has(name)) {
    await unlink(join(outputDirectory, name));
  }
}

await writeFile(
  join(outputDirectory, 'metadata.json'),
  `${JSON.stringify(photoMetadata)}\n`,
  'utf8'
);

const [sourceBytes, outputBytes] = await Promise.all([
  Promise.all(sourceFiles.map(file => stat(join(sourceDirectory, file)))).then(stats =>
    stats.reduce((total, fileStats) => total + fileStats.size, 0)
  ),
  Promise.all(outputNames.map(file => stat(join(outputDirectory, file)))).then(stats =>
    stats.reduce((total, fileStats) => total + fileStats.size, 0)
  ),
]);

const toMegabytes = bytes => (bytes / (1024 * 1024)).toFixed(1);
console.log(`Optimized ${sourceFiles.length} photos: ${toMegabytes(sourceBytes)} MB -> ${toMegabytes(outputBytes)} MB.`);
