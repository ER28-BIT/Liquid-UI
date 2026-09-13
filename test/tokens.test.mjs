import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const json = JSON.parse(await readFile(new URL("../tokens.json", import.meta.url), "utf8"));
const css = await readFile(new URL("../tokens.css", import.meta.url), "utf8");
const adoption = await readFile(new URL("../ADOPTION.md", import.meta.url), "utf8");

const requiredStatuses = ["verified", "pending", "not-ready", "warning", "rejected", "simulated", "restricted"];

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("publishes the v0.3 atmospheric foundation contract", () => {
  assert.equal(json.meta.version, "0.3.0");
  assert.equal(json.meta.status, "atmospheric-foundation");
});

test("defines every governed product state", () => {
  assert.deepEqual(Object.keys(json.color.status).sort(), [...requiredStatuses].sort());
  for (const status of requiredStatuses) {
    assert.deepEqual(Object.keys(json.color.status[status]).sort(), ["foreground", "background", "border"].sort());
  }
});

test("status text meets WCAG AA contrast on its background", () => {
  for (const status of requiredStatuses) {
    const { foreground, background } = json.color.status[status];
    assert.ok(contrast(foreground, background) >= 4.5, `${status} must meet 4.5:1 contrast`);
  }
});

test("dark-theme status text meets WCAG AA contrast", () => {
  for (const status of requiredStatuses) {
    const { foreground, background } = json.themes.dark.color.status[status];
    assert.ok(contrast(foreground, background) >= 4.5, `dark ${status} must meet 4.5:1 contrast`);
  }
});

test("CSS exposes every governed state and reduced-motion behavior", () => {
  for (const status of ["verified", "pending", "not-ready", "warning", "rejected", "simulated", "restricted"]) {
    for (const role of ["fg", "bg", "border"]) {
      assert.match(css, new RegExp(`--liquid-status-${status}-${role}:`));
    }
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\[data-liquid-theme="dark"\]/);
  assert.match(css, /--liquid-product-accent:/);
  assert.match(css, /--liquid-action-primary:/);
  assert.match(css, /--liquid-color-surface-glass-strong:/);
  assert.match(css, /--liquid-color-surface-glass-tint:/);
  assert.match(css, /--liquid-color-border-highlight:/);
  assert.match(css, /--liquid-gradient-atmosphere:/);
  assert.match(css, /--liquid-gradient-resonance:/);
  assert.match(css, /--liquid-gradient-wallet:/);
  assert.match(css, /--liquid-blur-md:/);

  // Guard against accidental renames of the published v0.1 contract.
  assert.match(css, /--liquid-color-link:/);
  assert.match(css, /--liquid-font-sans:/);
  assert.match(css, /--liquid-font-mono:/);
  for (const key of ["tight", "normal", "relaxed"]) {
    assert.match(css, new RegExp(`--liquid-line-height-${key}:`));
  }
});

test("documents a safe pre-release adoption path", () => {
  assert.match(adoption, /exact source repository and commit SHA/);
  assert.match(adoption, /Load the snapshot before the product stylesheet/);
  assert.match(adoption, /No product workflow or authorization boundary changes/);
  assert.match(adoption, /@resonance\/liquid-ui\/tokens\.css/);
});

test("body text & primary actions retain AA contrast in both themes", () => {
  for (const theme of [json, ...Object.values(json.themes)]) {
    for (const foreground of Object.values(theme.color.text)) {
      if (foreground === theme.color.text.inverse) continue;
      for (const background of [theme.color.surface.default, theme.color.surface.raised, theme.color.canvas.default]) {
        assert.ok(contrast(foreground, background) >= 4.5, `${foreground} on ${background} must meet AA`);
      }
    }
    for (const background of [theme.semantic.action.primary, theme.semantic.action.primaryHover]) {
      assert.ok(contrast(theme.color.text.inverse, background) >= 4.5, 'primary action must meet AA');
    }
  }
});

test("Resonance status labels meet AA on their badge backgrounds", () => {
  for (const {foreground, background} of Object.values(json.themes.resonance.color.status)) {
    assert.ok(contrast(foreground, background) >= 4.5);
  }
});
