#!/usr/bin/env node
/**
 * Image compression script for The Fat Chef website.
 * Compresses to temp files first, then renames to avoid file-lock issues.
 *
 * Run: node scripts/compress-images-v2.mjs
 */

import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const DIRS = [
  { dir: join(ROOT, "public/post-pics"), ext: [".jpg", ".jpeg", ".png"] },
  { dir: join(ROOT, "public/awards"),    ext: [".jpg", ".jpeg", ".png"] },
];

const JPEG_QUALITY    = 75;
const MAX_WIDTH       = 2000;  // 2000px is plenty for web
const MAX_HEIGHT      = 2000;

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const origStat = await stat(filePath);
  const origMB = (origStat.size / 1024 / 1024).toFixed(2);

  // Skip if already under 500KB
  if (origStat.size < 500 * 1024) {
    console.log(`  ⏭  ${basename(filePath)}: already small (${origMB}MB)`);
    return { before: origStat.size, after: origStat.size };
  }

  const tempPath = filePath + ".tmp";

  try {
    let pipeline = sharp(filePath, { failOnError: false })
      .withMetadata(false)
      .resize(MAX_WIDTH, MAX_HEIGHT, { fit: "inside", withoutEnlargement: true });

    if (ext === ".png") {
      const meta = await sharp(filePath).metadata();
      if (meta.hasAlpha) {
        await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(tempPath);
      } else {
        await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true }).toFile(tempPath);
      }
    } else {
      await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true }).toFile(tempPath);
    }

    const newStat = await stat(tempPath);
    const newMB = (newStat.size / 1024 / 1024).toFixed(2);
    const saving = ((1 - newStat.size / origStat.size) * 100).toFixed(0);

    if (newStat.size < origStat.size) {
      // Delete original, rename temp to original
      await unlink(filePath);
      await rename(tempPath, filePath);
      console.log(`  ✅ ${basename(filePath)}: ${origMB}MB → ${newMB}MB (-${saving}%)`);
      return { before: origStat.size, after: newStat.size };
    } else {
      await unlink(tempPath);
      console.log(`  ⏭  ${basename(filePath)}: already optimal (${origMB}MB)`);
      return { before: origStat.size, after: origStat.size };
    }
  } catch (e) {
    // Clean up temp file on error
    try { await unlink(tempPath); } catch {}
    console.error(`  ❌ ${basename(filePath)}: ${e.message}`);
    return { before: origStat.size, after: origStat.size };
  }
}

async function main() {
  console.log("\n🔪 Fat Chef Image Compressor v2\n");
  let totalBefore = 0, totalAfter = 0;

  for (const { dir, ext } of DIRS) {
    console.log(`\n📁 ${dir.replace(ROOT, "")}`);
    let files;
    try {
      files = await readdir(dir);
    } catch {
      console.log("  (directory not found, skipping)");
      continue;
    }

    for (const file of files) {
      if (!ext.includes(extname(file).toLowerCase())) continue;
      const fp = join(dir, file);
      const { before, after } = await compressFile(fp);
      totalBefore += before;
      totalAfter += after;
    }
  }

  const beforeMB = (totalBefore / 1024 / 1024).toFixed(1);
  const afterMB  = (totalAfter / 1024 / 1024).toFixed(1);
  const savedMB  = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
  const pct      = totalBefore > 0 ? ((1 - totalAfter / totalBefore) * 100).toFixed(0) : 0;

  console.log(`\n✨ Done! ${beforeMB}MB → ${afterMB}MB (saved ${savedMB}MB, ${pct}% reduction)\n`);
}

main().catch(console.error);
