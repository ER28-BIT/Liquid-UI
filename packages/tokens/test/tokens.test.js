import test from 'node:test';
import assert from 'node:assert/strict';
import { tokens, figmaToCodeTokenExample } from '../src/index.js';

test('includes required foundation token groups', () => {
  for (const key of ['color', 'typography', 'spacing', 'radius', 'shadow', 'blur']) {
    assert.ok(tokens[key], `missing token group: ${key}`);
  }
});

test('includes required theme and accessibility groups', () => {
  assert.ok(tokens.theme.light.atmosphere.background.value);
  assert.ok(tokens.theme.dark.atmosphere.background.value);
  assert.ok(tokens.accessibility.reducedMotion.durationMultiplier.value);
  assert.ok(tokens.accessibility.reducedTransparency.surfaceOpacity.value);
  assert.ok(tokens.accessibility.highContrast.textBoost.value);
});

test('documents figma-to-code token naming alignment', () => {
  assert.equal(figmaToCodeTokenExample.figma, 'surface/glass/default');
  assert.equal(figmaToCodeTokenExample.css, '--surface-glass-default');
});
