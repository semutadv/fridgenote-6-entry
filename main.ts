// Entry for "Notes From a Passive-Aggressive Fridge" — one short note a
// smart fridge leaves its owner, written to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const NOTE =
  "Day 6 of the diet you announced to the whole family. The cake is still here. So is my respect, but one of us gets thrown out tonight.";

function targetDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function run(): void {
  const dir = targetDir();
  emptyDir(dir);
  writeFileSync(join(dir, "entry.txt"), NOTE + "\n", "utf8");
  console.log(`fridge note written: ${NOTE.length} chars`);
}

run();
