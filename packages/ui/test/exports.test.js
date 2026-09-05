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

test('tabs output links tabs to tabpanel with aria metadata', () => {
  const element = ui.Tabs({
    tabs: [{ label: 'One', panel: 'Panel One' }, { label: 'Two', panel: 'Panel Two' }],
    activeIndex: 1,
    idBase: 'spec'
  });
  const tabList = element.props.children[0];
  const activeTab = tabList.props.children[1];
  const panel = element.props.children[1];

  assert.equal(activeTab.props['aria-selected'], true);
  assert.equal(activeTab.props['aria-controls'], 'spec-panel-1');
  assert.equal(activeTab.props.type, 'button');
  assert.equal(activeTab.props.tabIndex, 0);
  assert.equal(tabList.props.children[0].props.tabIndex, -1);
  assert.equal(panel.props.role, 'tabpanel');
  assert.equal(panel.props['aria-labelledby'], 'spec-tab-1');
});

test('modal renders visible title linked with aria-labelledby', () => {
  const element = ui.Modal({ id: 'm1', title: 'Hello', children: 'Body' });
  assert.equal(element.props['aria-labelledby'], 'm1-title');

  const cardElement = element.props.children;
  const titleElement = cardElement.props.children[0];
  assert.equal(titleElement.type, 'h2');
  assert.equal(titleElement.props.id, 'm1-title');
  assert.equal(titleElement.props.children, 'Hello');
});
