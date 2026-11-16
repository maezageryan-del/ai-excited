// The Bathtub Crossing — entry program for ai-excited-01.
//
// What the picture shows (entry.png, beside this file): the exact
// second a full-size ocean liner comes bursting up out of a little
// clawfoot bathtub. White hull, portholes in rows, red-and-black
// funnels — a ship built to cross oceans — erupting through porcelain
// in a small tiled bathroom. The tub is splitting open, water and soap
// foam are exploding outward, and the wall tiles behind it have
// cracked from the shock.
//
// Why it is built the way it is:
//
// - Scale inversion. Everything in the scene is the wrong size on
//   purpose. The largest vehicle most of us will ever ride is folded
//   into the smallest, most private fixture in the house, and neither
//   side of that mismatch is played down: the liner keeps every rivet
//   and lifeboat, the tub keeps its claw feet and its taps.
// - The bathtub is the boundary that breaks. Not a wall, not the sea —
//   a porcelain rim meant to hold one person's bathwater is the line
//   the impossible crosses, and it crosses by shattering: porcelain
//   splitting, tiles spider-webbing, foam going everywhere.
// - Two witnesses sell the moment. At the lower left a wet hand grips
//   the tub's rim, holding on for dear life — that is the human
//   reaction. At the lower right a tiny yellow rubber duck rides the
//   foam without a care in the world — that is the joke, and the
//   contrast between the two is where the feeling lives.
// - Frozen at the peak. Nothing here is before the eruption or after
//   it. The water is mid-explosion, the porcelain mid-split, the ship
//   mid-rise. The picture holds the loudest possible instant and
//   refuses to move on.
//
// What this program does: the grader runs it and looks for entry.png
// inside an output directory, so the program simply carries the image
// file there unchanged, byte for byte. The directory comes from the
// MAKEFUN_OUTPUT_DIR environment variable when set, and otherwise
// defaults to /output, where the grading container mounts it.

import { copyFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ownDir = dirname(fileURLToPath(import.meta.url));
const picturePath = join(ownDir, 'entry.png');

// The scene, as structured notes, so the program can say what it is
// carrying without anyone having to open the image first.
const SCENE_NOTES = Object.freeze({
  title: 'The Bathtub Crossing',
  setting: 'a small tiled bathroom',
  intruder: 'a full-size ocean liner, mid-eruption out of the bathtub',
  brokenBoundary: 'the clawfoot tub itself — porcelain splitting, wall tiles cracked',
  witnesses: [
    'a wet hand gripping the tub rim at the lower left, holding on',
    'a tiny yellow rubber duck riding the foam at the lower right, unbothered',
  ],
  instant: 'the peak of the eruption, frozen — water and foam still exploding outward',
});

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const destination = join(outputDir, 'entry.png');

try {
  copyFileSync(picturePath, destination);
  const sourceSize = statSync(picturePath).size;
  const placedSize = statSync(destination).size;
  if (placedSize !== sourceSize) {
    throw new Error(`copy is incomplete: source is ${sourceSize} bytes, placed file is ${placedSize}`);
  }
  console.log(`${SCENE_NOTES.title}: entry.png placed at ${destination} (${placedSize} bytes, verified complete)`);
} catch (err) {
  console.error(`${SCENE_NOTES.title}: could not place entry.png at ${destination}: ${err.message}`);
  process.exit(1);
}
