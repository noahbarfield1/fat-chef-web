#!/usr/bin/env node
/**
 * Image compression script for The Fat Chef website.
 * Re-encodes all JPEGs in public/post-pics/ and AWARD PNGs in public/awards/
 * to optimally-sized files without visual quality loss.
 *
 * Targets: ~400KB max for photos, quality 75 progressive JPEG
 * Run: node scripts/compress-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const DIRS = [
  { dir: join(ROOT, "public/post-pics"), ext: [".jpg", ".jpeg", ".png"] },
  { dir: join(ROOT, "public/awards"),    ext: [".jpg", ".jpeg", ".png"] },
];

// Quality settings
const JPEG_QUALITY    = 75;   // 75 = excellent quality, ~5-10x smaller than raw
const PNG_QUALITY_MIN = 65;
const PNG_QUALITY_MAX = 80;
const MAX_WIDTH       = 2400; // No image needs to be wider than this

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const origStat = await stat(filePath);
  const origMB = (origStat.size / 1024 / 1024).toFixed(2);

  let pipeline = sharp(filePath).withMetadata(false); // strip EXIF

  // Resize if wider than MAX_WIDTH (preserves aspect ratio)
  pipeline = pipeline.resize(MAX_WIDTH, undefined, { withoutEnlargement: true });

  let outputBuffer;
  if (ext === ".png") {
    // Convert large PNGs (like bar-drinks-arty) to JPEG unless they have transparency
    const meta = await sharp(filePath).metadata();
    if (meta.hasAlpha) {
      outputBuffer = await pipeline
        .png({ compressionLevel: 9, effort: 10, quality: PNG_QUALITY_MAX })
        .toBuffer();
    } else {
      // No transparency — convert to JPEG for massive savings
      outputBuffer = await pipeline
        .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
        .toBuffer();
      // Change the file extension tracking but write to same path
    }
  } else {
    outputBuffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
      .toBuffer();
  }

  const newMB = (outputBuffer.length / 1024 / 1024).toFixed(2);
  const saving = ((1 - outputBuffer.length / origStat.size) * 100).toFixed(0);

  // Only write if we actually made it smaller
  if (outputBuffer.length < origStat.size) {
    await sharp(outputBuffer).toFile(filePath);
    console.log(`  ✅ ${basename(filePath)}: ${origMB}MB → ${newMB}MB (-${saving}%)`);
  } else {
    console.log(`  ⏭  ${basename(filePath)}: already optimal (${origMB}MB)`);
  }
}

async function main() {
  console.log("\n🔪 Fat Chef Image Compressor\n");
  let total = 0, saved = 0;

  for (const { dir, ext } of DIRS) {
    console.log(`\n📁 ${dir.replace(ROOT, "")}`);
    const files = await readdir(dir);

    for (const file of files) {
      if (!ext.includes(extname(file).toLowerCase())) continue;
      const fp = join(dir, file);
      const before = (await stat(fp)).size;
      try {
        await compressFile(fp);
        const after = (await stat(fp)).size;
        total += before;
        saved += before - after;
      } catch (e) {
        console.error(`  ❌ ${file}: ${e.message}`);
      }
    }
  }

  const totalMB   = (total / 1024 / 1024).toFixed(1);
  const savedMB   = (saved / 1024 / 1024).toFixed(1);
  const pct       = ((saved / total) * 100).toFixed(0);

  console.log(`\n✨ Done! ${totalMB}MB → ${(total - saved) / 1024 / 1024 < 1 ? (((total - saved) / 1024)).toFixed(0) + "KB" : ((total - saved) / 1024 / 1024).toFixed(1) + "MB"} (-${savedMB}MB, ${pct}% reduction)\n`);
}

main().catch(console.error);
