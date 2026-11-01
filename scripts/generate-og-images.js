/**
 * Generates the Open Graph images referenced by page metadata.
 *
 * Every og-* asset referenced in src/ was missing from public/, so every
 * og:image on the site resolved to a 404 (or was absent entirely). This
 * script builds them from the site's own logo and brand palette.
 *
 * Usage: node scripts/generate-og-images.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');
const W = 1200;
const H = 630;

// Brand palette from src/app/globals.css
const NIGHT = '#0A0A0F';
const MIDNIGHT = '#1A1A2E';
const GOLD = '#FFD700';
const CYAN = '#00F5FF';
const WHITE = '#F8F9FA';
const MUTED = '#9AA3B2';

/**
 * Each entry maps an output filename to its headline/subheadline.
 * The logo is composited in from public/og-icon.png.
 */
const IMAGES = [
  { file: 'og-image.png', kicker: 'BAHRAIN NIGHTS', head: 'Events, Nightlife &\nThings to Do in Bahrain', sub: 'Your complete guide to happenings in Bahrain', accent: GOLD },
  { file: 'og-restaurants.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Best Restaurants\nin Bahrain', sub: 'Where to eat in Bahrain - from fine dining to street food', accent: GOLD },
  { file: 'og-cafes.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Best Cafes\nin Bahrain', sub: 'Coffee, shisha and brunch spots worth the trip', accent: CYAN },
  { file: 'og-brunch.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Best Brunches\nin Bahrain', sub: 'Weekend brunch done right, every location', accent: CYAN },
  { file: 'og-nightlife.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Bahrain Nightlife\nGuide', sub: 'Lounges, clubs and late-night favourites', accent: GOLD },
  { file: 'og-weekend.jpg', kicker: 'BAHRAIN NIGHTS', head: "What's Happening\nin Bahrain This Weekend", sub: 'Your weekend, sorted', accent: CYAN },
  { file: 'og-hotels.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Best Hotels\nin Bahrain', sub: 'Staycations, five-star luxury and everything between', accent: GOLD },
  { file: 'og-events.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Events\nin Bahrain This Week', sub: 'Concerts, exhibitions and things to do right now', accent: GOLD },
  { file: 'og-things-to-do.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Things to Do\nin Bahrain', sub: 'The complete Bahrain bucket list', accent: CYAN },
  { file: 'og-ladies-night.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Ladies Night\nin Bahrain', sub: 'Where to go, what to wear and when to go', accent: GOLD },
  { file: 'og-international.jpg', kicker: 'BAHRAIN NIGHTS', head: 'International\nEvents in Bahrain', sub: 'Global acts, exhibitions and touring shows', accent: CYAN },
  { file: 'og-tours.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Tours &\nExperiences in Bahrain', sub: 'Guided tours and things worth the day out', accent: GOLD },
  { file: 'og-attractions.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Attractions\nin Bahrain', sub: 'Landmarks, museums and places worth visiting', accent: CYAN },
  { file: 'og-default.jpg', kicker: 'BAHRAIN NIGHTS', head: 'Things to Do\nin Bahrain', sub: 'Events, dining, nightlife and more', accent: GOLD },
];

/**
 * Per-country OG images for /international/[country]. These live in
 * public/images/ because that is the path the page metadata references
 * (`/images/og-<country>.jpg`). Before this existed, every one of the
 * 27 country pages pointed at a non-existent file.
 */
const COUNTRIES = [
  ['uae', 'UAE', 'Events in the UAE'],
  ['saudi-arabia', 'Saudi Arabia', 'Events in Saudi Arabia'],
  ['qatar', 'Qatar', 'Events in Qatar'],
  ['kuwait', 'Kuwait', 'Events in Kuwait'],
  ['oman', 'Oman', 'Events in Oman'],
  ['jordan', 'Jordan', 'Events in Jordan'],
  ['lebanon', 'Lebanon', 'Events in Lebanon'],
  ['turkiye', 'Turkiye', 'Events in Turkiye'],
  ['cyprus', 'Cyprus', 'Events in Cyprus'],
  ['egypt', 'Egypt', 'Events in Egypt'],
  ['morocco', 'Morocco', 'Events in Morocco'],
  ['south-africa', 'South Africa', 'Events in South Africa'],
  ['nigeria', 'Nigeria', 'Events in Nigeria'],
  ['uk', 'UK', 'Events in the UK'],
  ['germany', 'Germany', 'Events in Germany'],
  ['france', 'France', 'Events in France'],
  ['spain', 'Spain', 'Events in Spain'],
  ['italy', 'Italy', 'Events in Italy'],
  ['greece', 'Greece', 'Events in Greece'],
  ['india', 'India', 'Events in India'],
  ['pakistan', 'Pakistan', 'Events in Pakistan'],
  ['singapore', 'Singapore', 'Events in Singapore'],
  ['malaysia', 'Malaysia', 'Events in Malaysia'],
  ['thailand', 'Thailand', 'Events in Thailand'],
  ['indonesia', 'Indonesia', 'Events in Indonesia'],
  ['philippines', 'Philippines', 'Events in the Philippines'],
  ['usa', 'USA', 'Events in the USA'],
];

const XML_ESCAPES = {
  '&': '&' + 'amp;',
  '<': '&' + 'lt;',
  '>': '&' + 'gt;',
  '"': '&' + 'quot;',
  "'": '&' + 'apos;',
};

function escapeXml(s) {
  return String(s).replace(/[&<>"']/g, (c) => XML_ESCAPES[c]);
}

/**
 * Builds the SVG canvas. Text is laid out manually so the output does not
 * depend on fontconfig having any particular family installed.
 */
function buildSvg(spec) {
  const logoH = 64;
  const logoW = Math.round((spec.logoAspect || 3.32) * logoH);
  const logoX = 80;
  const logoY = 70;

  const headLines = spec.head.split('\n');
  const headSize = headLines.length > 1 ? 74 : 80;
  const headLineHeight = headSize + 12;
  const headTop = 250;

  const headText = headLines
    .map(
      (line, i) =>
        `<text x="80" y="${headTop + i * headLineHeight}" font-family="Helvetica, Arial, sans-serif" font-size="${headSize}" font-weight="800" fill="${WHITE}" letter-spacing="-1">${escapeXml(line)}</text>`
    )
    .join('');

  // Accent rule under the headline
  const ruleY = headTop + headLines.length * headLineHeight + 6;

  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${NIGHT}"/>
        <stop offset="55%" stop-color="${MIDNIGHT}"/>
        <stop offset="100%" stop-color="#241a3d"/>
      </linearGradient>
      <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${spec.accent}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${spec.accent}" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="6" fill="${spec.accent}"/>
    <circle cx="1080" cy="120" r="260" fill="${spec.accent}" opacity="0.07"/>
    <circle cx="180" cy="600" r="220" fill="${CYAN}" opacity="0.05"/>
    <rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#glow)"/>

    <!-- brand wordmark, composited in from public/logo.png -->
    <image href="data:image/png;base64,__LOGO__" x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}"/>

    ${headText}

    <rect x="80" y="${ruleY}" width="120" height="7" fill="${spec.accent}"/>

    <text x="80" y="${ruleY + 52}" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="500" fill="${MUTED}">${escapeXml(spec.sub)}</text>

    <text x="80" y="${H - 52}" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="${WHITE}" letter-spacing="3">BAHRAIN NIGHTS</text>
    <text x="${W - 80}" y="${H - 52}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="${MUTED}">bahrainnights.com</text>
  </svg>`;
}

async function main() {
  const logoPath = path.join(PUBLIC, 'logo.png');
  if (!fs.existsSync(logoPath)) {
    console.error('Missing public/logo.png - cannot compose OG images.');
    process.exit(1);
  }

  // The wordmark lives inside a large transparent canvas. Trim to its
  // actual bounding box so it sits correctly on the OG canvas, and
  // recolour it white so it reads on the dark background.
  const logoMeta = await sharp(logoPath).metadata();
  const resized = sharp(logoPath).resize({ width: 800 });
  const { data, info } = await resized.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * info.channels + 3] > 16) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) {
    console.error('Could not locate the logo content in public/logo.png');
    process.exit(1);
  }

  const pad = 4;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const width = Math.min(info.width - left, maxX - left + pad);
  let height = Math.min(info.height - top, maxY - top + pad);

  // ---------------------------------------------------------------------
  // Drop the legacy caption under the wordmark.
  //
  // public/logo.png is the "Bahrain-Nights" script wordmark with a
  // "HD Productions Bahrain" caption beneath it. "HD Productions" is a
  // DIFFERENT company's name: every brand surface on the site (page copy,
  // Organization schema, og:site_name, footer) says "Bahrain Nights", and
  // the operating entity is Bahrain Nights W.L.L. Shipping that caption on
  // every social share image and every email would put a third party's
  // name on top of the brand.
  //
  // The separator is detected from the RIGHT EDGE of the ink. The script
  // wordmark's strokes reach the full width of the logo (right edge ~x=655
  // at width 800); the caption below is a narrower, centred line (right edge
  // ~x=586). So the last row whose ink still reaches the wordmark's right
  // edge is the bottom of the wordmark.
  // ---------------------------------------------------------------------
  {
    const rowMaxX = [];
    for (let y = top; y < top + height; y++) {
      let mx = -1;
      for (let x = left; x < left + width; x++) {
        if (data[(y * info.width + x) * info.channels + 3] > 16) mx = x;
      }
      rowMaxX.push(mx);
    }
    const overallMaxX = Math.max(...rowMaxX);
    const edgeFloor = overallMaxX - 60; // the caption sits far inside this
    let last = -1;
    for (let i = 0; i < rowMaxX.length; i++) {
      if (rowMaxX[i] >= edgeFloor) last = i;
    }
    if (last > 0 && last < rowMaxX.length - 1) {
      console.log(`  logo: dropping legacy caption (rows ${top + last + 1}..${top + height - 1} of ${top}..${top + height - 1})`);
      height = last + 1;
    } else {
      console.log('  logo: no caption band detected - using full wordmark');
    }
  }

  // The source wordmark is black glyphs on a transparent canvas. For the OG
  // canvas (dark background) we want WHITE glyphs that stay transparent
  // between them - flattening onto white would paint a white box over the
  // background instead.
  //
  // So: keep the alpha channel exactly as-is and force the RGB to white.
  const resizedPng = await sharp(logoPath).resize({ width: 800 }).png().toBuffer();
  const { data: raw, info: rawInfo } = await sharp(resizedPng)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Copy the cropped region into a fresh RGBA buffer, replacing RGB with white.
  const whiteRaw = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    const srcRow = (top + y) * rawInfo.width;
    for (let x = 0; x < width; x++) {
      const src = (srcRow + left + x) * rawInfo.channels;
      const dst = (y * width + x) * 4;
      const alpha = raw[src + 3];
      whiteRaw[dst] = 255;
      whiteRaw[dst + 1] = 255;
      whiteRaw[dst + 2] = 255;
      whiteRaw[dst + 3] = alpha;
    }
  }

  const logoBuf = await sharp(whiteRaw, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toBuffer();

  const aspect = width / height;
  console.log(`  logo trimmed to ${width}x${height} (aspect ${aspect.toFixed(2)})`);

  const logoB64 = logoBuf.toString('base64');

  // Email logo: the SAME wordmark but BLACK glyphs on a WHITE background.
  // Emails render on light backgrounds, so the OG canvas treatment (white
  // glyphs on dark) is inverted here. Unlike the OG logo we DO flatten onto
  // white - the email background is white, so transparent pixels becoming
  // white is exactly what we want, and it avoids dark-mode email clients
  // showing a black box.
  //
  // Two-step pipeline on purpose: resize to a buffer FIRST, then extract the
  // bounding box from that buffer. A single chained resize->extract failed
  // with "extract_area: bad extract area".
  const emailResized = await sharp(logoPath).resize({ width: 800 }).png().toBuffer();
  const { data: eData, info: eInfo } = await sharp(emailResized)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Reuse the SAME wordmark crop the OG canvas uses - including the
  // legacy-caption cut - so the email logo and the share images carry
  // exactly the same mark.
  const eLeft = left;
  const eTop = top;
  const eWidth = width;
  const eHeight = height;

  const blackRaw = Buffer.alloc(eWidth * eHeight * 4);
  for (let y = 0; y < eHeight; y++) {
    const srcRow = (eTop + y) * eInfo.width;
    for (let x = 0; x < eWidth; x++) {
      const src = (srcRow + eLeft + x) * eInfo.channels;
      const dst = (y * eWidth + x) * 4;
      const alpha = eData[src + 3];
      // Composite the source glyph over white using its alpha as coverage:
      //   out = src * alpha + 255 * (1 - alpha)
      // Opaque glyph pixels keep their own colour (black for this wordmark);
      // fully transparent pixels become white; edges anti-alias in between.
      const r = eData[src], g = eData[src + 1], b = eData[src + 2];
      blackRaw[dst] = Math.round(r * alpha + 255 * (1 - alpha));
      blackRaw[dst + 1] = Math.round(g * alpha + 255 * (1 - alpha));
      blackRaw[dst + 2] = Math.round(b * alpha + 255 * (1 - alpha));
      blackRaw[dst + 3] = 255;
    }
  }

  const emailLogoPath = path.join(PUBLIC, 'logo-email.png');
  await sharp(blackRaw, { raw: { width: eWidth, height: eHeight, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(emailLogoPath);
  console.log(`  wrote logo-email.png         ${eWidth}x${eHeight} (black on white)`);

  // Schema wordmark: the SAME crop, black glyphs on a TRANSPARENT background.
  // Used for the Organization schema logo, so the structured data shows the
  // same "Bahrain-Nights" mark as every share image and email - not the full
  // public/logo.png, which still carries the legacy "HD Productions Bahrain"
  // caption underneath.
  const transparentRaw = Buffer.alloc(eWidth * eHeight * 4);
  for (let y = 0; y < eHeight; y++) {
    const srcRow = (eTop + y) * eInfo.width;
    for (let x = 0; x < eWidth; x++) {
      const src = (srcRow + eLeft + x) * eInfo.channels;
      const dst = (y * eWidth + x) * 4;
      transparentRaw[dst] = eData[src];
      transparentRaw[dst + 1] = eData[src + 1];
      transparentRaw[dst + 2] = eData[src + 2];
      transparentRaw[dst + 3] = eData[src + 3];
    }
  }
  const wordmarkPath = path.join(PUBLIC, 'logo-wordmark.png');
  await sharp(transparentRaw, { raw: { width: eWidth, height: eHeight, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(wordmarkPath);
  console.log(`  wrote logo-wordmark.png      ${eWidth}x${eHeight} (black on transparent)`);

  const render = async (spec, outPath) => {
    const svg = buildSvg({ ...spec, logoAspect: aspect }).replace('__LOGO__', logoB64);
    const isJpg = outPath.endsWith('.jpg');

    let pipeline = sharp(Buffer.from(svg));
    if (isJpg) pipeline = pipeline.flatten({ background: NIGHT }).jpeg({ quality: 88, mozjpeg: true });
    else pipeline = pipeline.png({ compressionLevel: 9 });

    await pipeline.toFile(outPath);

    const { size } = fs.statSync(outPath);
    return size;
  };

  for (const spec of IMAGES) {
    const outPath = path.join(PUBLIC, spec.file);
    const size = await render(spec, outPath);
    console.log(`  wrote ${spec.file.padEnd(26)} ${(size / 1024).toFixed(1)} KB`);
  }
  console.log(`\nGenerated ${IMAGES.length} OG images at ${W}x${H} in public/`);

  // Country images for /international/[country] -> public/images/og-<slug>.jpg
  const countryDir = path.join(PUBLIC, 'images');
  fs.mkdirSync(countryDir, { recursive: true });

  let countryCount = 0;
  for (const [slug, name, head] of COUNTRIES) {
    const outPath = path.join(countryDir, `og-${slug}.jpg`);
    const spec = {
      head,
      sub: 'International events listings from Bahrain Nights',
      accent: GOLD,
    };
    await render(spec, outPath);
    countryCount++;
  }
  console.log(`Generated ${countryCount} country OG images in public/images/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
