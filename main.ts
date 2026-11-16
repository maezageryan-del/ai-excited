// ai-excited-01 entry program.
//
// The artwork lives in entry.png next to this file. The grader runs this
// program and expects the picture to appear as entry.png inside the output
// directory, so all we do is carry the file across, byte for byte.
//
// The output directory comes from MAKEFUN_OUTPUT_DIR when it is set and
// falls back to /output, which is where the grading container mounts it.

import { copyFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const target = join(outDir, 'entry.png');

try {
  copyFileSync(source, target);
  const { size } = statSync(target);
  console.log(`entry.png delivered to ${target} (${size} bytes)`);
} catch (err) {
  console.error(`could not deliver entry.png to ${target}: ${err.message}`);
  process.exit(1);
}
