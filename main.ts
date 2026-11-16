// ai-excited-01 entry program.
//
// Title: "The Bathtub Crossing"
//
// The artwork lives in entry.png next to this file. It shows a single
// frozen instant of impossible scale: a full ocean liner — white hull,
// rows of portholes, red-and-black funnels, lifeboats and all — has
// erupted out of a small clawfoot bathtub in an ordinary tiled
// bathroom. The tub is splitting apart under it, porcelain cracked
// and water exploding outward in waves, spray and soap bubbles, while
// the ship's bow towers over the room and its wake floods the floor.
// The bathroom itself is coming apart too: the wall tiles are cracked
// and spider-webbed from the force of it.
//
// A witness is caught in the frame: a wet hand grips the rim of the
// tub at the lower left, holding on as the impossible happens. And at
// the lower right, a tiny yellow rubber duck rides the foam, calm as
// ever, as if this were just another bath.
//
// Prompt notes, in brief: one impossible scale inversion (a liner
// built for the open sea versus a tub made for one person), one small
// and very specific boundary being broken (the bathtub, then the
// bathroom walls), a witness whose reaction carries the feeling (the
// gripping hand, plus the unbothered duck), and the whole scene
// stopped at the peak of the eruption rather than before or after it.
// Real water, steel and porcelain texture does the rest. No sea
// creatures, no picture frames — that corner of the leaderboard is
// crowded enough already.
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
