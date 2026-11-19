import sharp from 'sharp';
import { mkdir, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import { extname, join, parse, resolve } from 'node:path';

const sourceDirectory = resolve('src/assets/photos');
const outputDirectory = resolve('src/assets/photos-optimized');
const sourceExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);
const photoPlaces = new Map([
  ['IMG_20260823_183125259.jpg', 'Jaisalmer, Rajasthan'],
  ['IMG_20260827_124623048.jpg', 'Rohtang Pass, Himachal Pradesh'],
]);

await mkdir(outputDirectory, { recursive: true });

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
