import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const OUT = 'images';
if (!existsSync(OUT)) await mkdir(OUT);

const jobs = [
  // Hero — full-width, max 1920px wide
  {
    src: 'brand_assets/Hero Image/Podium-31.jpeg',
    out: `${OUT}/hero.webp`,
    width: 1920,
    quality: 82,
  },
  // About section — 2-col image, max 900px
  {
    src: 'brand_assets/Other Images/Podium-19.jpg',
    out: `${OUT}/about.webp`,
    width: 900,
    quality: 80,
  },
  // Portfolio section — 2-col image, max 900px
  {
    src: 'brand_assets/Other Images/Podium-17.jpg',
    out: `${OUT}/portfolio.webp`,
    width: 900,
    quality: 80,
  },
  // Team portraits — displayed at ~350px max, tight aspect
  {
    src: 'brand_assets/Other Images/Podium-32.jpg',
    out: `${OUT}/team-1.webp`,
    width: 700,
    quality: 80,
  },
  {
    src: 'brand_assets/Other Images/Podium-33.jpg',
    out: `${OUT}/team-2.webp`,
    width: 700,
    quality: 80,
  },
  {
    src: 'brand_assets/Other Images/Podium-35.jpg',
    out: `${OUT}/team-3.webp`,
    width: 700,
    quality: 80,
  },
  {
    src: 'brand_assets/Other Images/Podium-36.JPG',
    out: `${OUT}/team-4.webp`,
    width: 700,
    quality: 80,
  },
];

for (const job of jobs) {
  await sharp(job.src)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(job.out);

  // Report sizes
  const { size: inSize } = await import('fs').then(fs => ({
    size: fs.statSync(job.src).size,
  }));
  const { size: outSize } = await import('fs').then(fs => ({
    size: fs.statSync(job.out).size,
  }));
  const pct = Math.round((1 - outSize / inSize) * 100);
  console.log(`✓ ${job.src.split('/').pop()} → ${job.out.split('/').pop()}  ${(inSize/1024/1024).toFixed(1)}MB → ${(outSize/1024).toFixed(0)}KB  (${pct}% smaller)`);
}

console.log('\nDone! All images compressed to images/');
