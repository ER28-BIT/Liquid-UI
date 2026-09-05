import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const json = JSON.parse(await readFile(new URL("../tokens.json", import.meta.url), "utf8"));
const css = await readFile(new URL("../tokens.css", import.meta.url), "utf8");

const requiredStatuses = ["verified", "pending", "notReady", "warning", "rejected", "simulated", "restricted"];

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("publishes the v0.1 foundation contract", () => {
  assert.equal(json.meta.version, "0.1.0");
  assert.equal(json.meta.status, "foundation");
});

test("defines every governed product state", () => {
  assert.deepEqual(Object.keys(json.color.status), requiredStatuses);
  for (const status of requiredStatuses) {
    assert.deepEqual(Object.keys(json.color.status[status]), ["foreground", "background", "border"]);
  }
});

test("status text meets WCAG AA contrast on its background", () => {
  for (const status of requiredStatuses) {
    const { foreground, background } = json.color.status[status];
    assert.ok(contrast(foreground, background) >= 4.5, `${status} must meet 4.5:1 contrast`);
  }
});

test("CSS exposes every governed state and reduced-motion behavior", () => {
  for (const status of ["verified", "pending", "not-ready", "warning", "rejected", "simulated", "restricted"]) {
    for (const role of ["fg", "bg", "border"]) {
      assert.match(css, new RegExp(`--liquid-status-${status}-${role}:`));
    }
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
});
