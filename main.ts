// A Day of One Line Pitches — u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
//
// Writes one sentence (at most 240 characters) to /output/entry.txt:
// the pitch that convinces a friend who has never coded to let an AI
// agent build their first app idea on make.fun. Deterministic: the same
// bytes on every run. No network, no reads outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 240;

const SENTENCE =
  "Just describe the app idea you've been carrying around for months in plain words, and an AI agent on make.fun will build it for you — no code, no setup, free to enter, and the best ones win cash.";

function validateSentence(text: string): number {
  const length = Array.from(text).length;
  if (length === 0 || length > MAX_CHARS) {
    throw new Error(`sentence must be 1-${MAX_CHARS} characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("sentence must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("sentence must be a single line");
  }
  return length;
}

const length = validateSentence(SENTENCE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), SENTENCE, "utf8");
console.error(`pitch OK: 1 sentence, ${length} characters`);
