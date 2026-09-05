import test from 'node:test';
import assert from 'node:assert/strict';
import * as ui from '../src/index.js';

test('exports required initial component set', () => {
  for (const key of ['GlassSurface', 'Button', 'Input', 'Card', 'Modal', 'Tabs', 'Toast']) {
    assert.equal(typeof ui[key], 'function', `${key} should be exported`);
  }
});

test('exports motion and accessibility primitives', () => {
  assert.equal(ui.motionPrimitives.duration.fast, '120ms');
  const reduced = ui.applyAccessibilityModes({
    reducedMotion: true,
    reducedTransparency: true,
    highContrast: true
  });
  assert.deepEqual(reduced, {
    '--motion-multiplier': '0',
    '--surface-opacity': '0.92',
    '--contrast-boost': '1.2'
  });
});
