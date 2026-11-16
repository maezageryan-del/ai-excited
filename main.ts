// ai-excited-01 entry program.
//
// Title: "Too Big for the Pot"
//
// The artwork lives in entry.png next to this file. It shows a single
// frozen instant of impossible growth: a full-grown ancient oak, roots
// and all, has burst out of a little terracotta flowerpot that was
// sitting on a kitchen windowsill. The pot is still coming apart —
// clay shards and soil hang in the air around the exposed root ball —
// while the canopy has smashed clean through the window frame and
// keeps going into the daylight outside. An orange tabby that was
// napping on the sill is caught mid-leap, tail puffed, paws out,
// staring back at the tree that evicted it.
//
// Prompt notes, in brief: one impossible scale inversion (a centuries-
// old tree versus a pot that fits in one hand), one small and very
// specific boundary being broken (the flowerpot, then the window),
// a witness whose reaction carries the feeling (the cat), and the
// whole scene stopped at the peak of the eruption rather than before
// or after it. Sunlight through real leaf and bark texture does the
// rest. No sea creatures, no picture frames — that corner of the
// leaderboard is crowded enough already.
//
// The grader runs this program and expects the picture to appear as
// entry.png inside the output directory, so all we do is carry the
// file across, byte for byte.
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
