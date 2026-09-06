import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../primitives.css", import.meta.url), "utf8");
const all = await readFile(new URL("../all.css", import.meta.url), "utf8");

const primitives = ["glass", "button", "badge", "card", "field", "input", "select", "textarea", "notice", "progress", "nav-item"];

test("publishes the core primitive surface", () => {
  for (const primitive of primitives) {
    assert.ok(css.includes(`.liquid-${primitive}`), `missing liquid-${primitive}`);
  }
});

test("uses semantic tokens instead of fixed color values", () => {
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
  assert.match(css, /var\(--liquid-action-primary\)/);
  assert.match(css, /var\(--liquid-product-accent\)/);
});

test("covers interactive and accessibility states", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /:disabled/);
  assert.match(css, /\[aria-disabled="true"\]/);
  assert.match(css, /\[aria-invalid="true"\]/);
  assert.match(css, /\[aria-current="page"\]/);
  assert.match(css, /forced-colors: active/);
  assert.match(css, /prefers-reduced-transparency: reduce/);
  assert.match(css, /backdrop-filter/);
});

test("provides a combined stylesheet entry point", () => {
  assert.match(all, /@import "\.\/tokens\.css";/);
  assert.match(all, /@import "\.\/primitives\.css";/);
});
