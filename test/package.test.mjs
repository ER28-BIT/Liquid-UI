import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

test("exports only declared package files", async () => {
  for (const [specifier, target] of Object.entries(pkg.exports)) {
    assert.ok(target.startsWith("./"), `${specifier} must use a relative export`);
    await access(new URL(target.slice(2), root));
    assert.ok(pkg.files.includes(target.slice(2)), `${target} must be included in package files`);
  }
});

test("keeps the default export token-only", () => {
  assert.equal(pkg.exports["."], "./tokens.css");
  assert.equal(pkg.exports["./all.css"], "./all.css");
  assert.equal(pkg.exports["./primitives.css"], "./primitives.css");
});

test("combined stylesheet resolves its imports", async () => {
  const combined = await readFile(new URL("all.css", root), "utf8");
  const imports = [...combined.matchAll(/@import ["'](.+?)["'];/g)].map((match) => match[1]);
  assert.deepEqual(imports, ["./tokens.css", "./primitives.css"]);
  for (const path of imports) await access(new URL(path, root));
});

test("package & token versions agree", async () => {
  const tokens = JSON.parse(await readFile(new URL("tokens.json", root), "utf8"));
  assert.equal(pkg.version, tokens.meta.version);
});
