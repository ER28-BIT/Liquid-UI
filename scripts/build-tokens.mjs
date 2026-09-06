import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const source = JSON.parse(await readFile(new URL("tokens.json", root), "utf8"));

const specialNames = new Map([
  ["color.canvas.default", "color-canvas"],
  ["color.surface.default", "color-surface"],
  ["color.text.primary", "color-text"],
  ["color.border.subtle", "color-border"],
  ["color.border.focus", "color-focus"],
  ["color.brand.primary", "color-brand"],
  ["layout.contentMax", "layout-content-max"],
  ["layout.readingMax", "layout-reading-max"],
  ["layout.controlHeight", "control-height"]
]);

const kebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

function variableName(path) {
  const joined = path.join(".");
  if (specialNames.has(joined)) return `--liquid-${specialNames.get(joined)}`;
  if (path[0] === "color" && path[1] === "status") {
    const role = { foreground: "fg", background: "bg", border: "border" }[path[3]];
    return `--liquid-status-${path[2]}-${role}`;
  }
  if (path[0] === "semantic") return `--liquid-${path.slice(1).map(kebab).join("-")}`;
  return `--liquid-${path.map(kebab).join("-")}`;
}

function flatten(value, path = [], output = []) {
  for (const [key, child] of Object.entries(value)) {
    if (child && typeof child === "object" && !Array.isArray(child)) flatten(child, [...path, key], output);
    else output.push([variableName([...path, key]), String(child)]);
  }
  return output;
}

function declarations(value) {
  return flatten(value).map(([name, token]) => `  ${name}: ${token};`).join("\n");
}

const base = {
  color: source.color,
  semantic: source.semantic,
  font: source.font,
  space: source.space,
  radius: source.radius,
  shadow: source.shadow,
  motion: source.motion,
  layout: source.layout
};

const dark = source.themes.dark;
const css = `/* Generated from tokens.json by scripts/build-tokens.mjs. Do not edit directly. */
:root {
  color-scheme: light;
${declarations(base)}
}

[data-liquid-theme="dark"] {
  color-scheme: dark;
${declarations(dark)}
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --liquid-motion-fast: 0ms;
    --liquid-motion-normal: 0ms;
    --liquid-motion-slow: 0ms;
  }
}
`;

const target = new URL("tokens.css", root);
if (process.argv.includes("--check")) {
  assert.equal(await readFile(target, "utf8"), css, "tokens.css is out of date; run npm run build");
} else {
  await writeFile(target, css);
}
