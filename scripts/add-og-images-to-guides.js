/**
 * One-off codemod: adds an `images` entry to every guide page's openGraph
 * block, so guide pages stop shipping without an og:image.
 *
 * Guide pages each declare their own openGraph object, which REPLACES the
 * root layout's openGraph - including its og:image. Before this, 37 of 37
 * guide pages served no og:image at all, and the assets they pointed at
 * elsewhere on the site 404'd.
 *
 * Run: node scripts/add-og-images-to-guides.js
 */
const fs = require('fs');
const path = require('path');

const GUIDES = path.join(__dirname, '..', 'src', 'app', 'guides');

/** Route prefix -> OG image constant name in src/lib/og.ts */
function pickImage(relPath) {
  const p = relPath.toLowerCase();
  if (
    p.includes('best-fine-dining') ||
    p.includes('best-steakhouses') ||
    p.includes('best-lebanese') ||
    p.includes('best-korean') ||
    p.includes('best-mexican') ||
    p.includes('best-turkish')
  ) {
    return { importName: 'OG_IMAGES', expr: 'OG_IMAGES.restaurants' };
  }
  return { importName: 'OG_IMAGE', expr: 'OG_IMAGE' };
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name === 'page.tsx') out.push(full);
  }
  return out;
}

function main() {
  const files = walk(GUIDES);
  let changed = 0;
  const imports = new Map();

  for (const file of files) {
    let src = fs.readFileSync(file, 'utf8');

    if (/\n\s*images:\s*\[/.test(src)) {
      console.log(`  skip (already has images): ${path.relative(process.cwd(), file)}`);
      continue;
    }

    const rel = path.relative(path.join(__dirname, '..'), file);
    const { importName, expr } = pickImage(rel);

    // Insert `images: [...]` as the last key of the openGraph block.
    const ogMatch = src.match(/(\n\s*openGraph:\s*\{)([\s\S]*?)(\n(\s*)\},)/);
    if (!ogMatch) {
      console.log(`  NO openGraph block: ${rel}`);
      continue;
    }

    const indent = ogMatch[4] || '    ';
    const block = ogMatch[2];
    const imageEntry = `\n${indent}images: [${expr}],`;

    src = src.replace(ogMatch[0], `${ogMatch[1]}${block}${imageEntry}${ogMatch[3]}`);

    // Add the import after the last existing import statement.
    if (!imports.has(importName)) imports.set(importName, new Set());
    imports.get(importName).add(file);

    fs.writeFileSync(file, src, 'utf8');
    changed++;
    console.log(`  updated: ${rel}`);
  }

  // Insert imports, grouped by which constant each file needs.
  for (const [importName, fileSet] of imports) {
    for (const file of fileSet) {
      let src = fs.readFileSync(file, 'utf8');
      if (src.includes("from '@/lib/og'")) continue;

      const importLine = `import { ${importName} } from '@/lib/og';`;
      const importRe = /^(import[^\n]*\n)/m;
      const m = src.match(importRe);
      if (m) {
        src = src.replace(importRe, `${importLine}\n${m[1]}`);
      } else {
        // No imports at all - put it after the "use client" directive if present.
        src = `${importLine}\n${src}`;
      }
      fs.writeFileSync(file, 'utf8', 'utf8');
    }
    console.log(`  imports: ${importName} -> ${fileSet.size} file(s)`);
  }

  console.log(`\nUpdated ${changed} guide page(s).`);
}

main();
