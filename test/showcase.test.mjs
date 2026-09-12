import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const showcaseCss = await readFile(new URL("showcase/showcase.css", root), "utf8");
const showcaseIndex = await readFile(new URL("showcase/index.html", root), "utf8");
const server = await readFile(new URL("scripts/serve-showcase.mjs", root), "utf8");

test("showcase token source link is served as JSON", () => {
  assert.match(showcaseIndex, /href="\/tokens\.json"/);
  assert.match(server, /"\.json": "application\/json; charset=utf-8"/);
});

test("reduced-transparency mode removes translucent showcase orbits", () => {
  assert.match(showcaseCss, /prefers-reduced-transparency: reduce/);
  assert.match(showcaseCss, /\.art-orbit \{ opacity: 1; box-shadow: none; \}/);
});
