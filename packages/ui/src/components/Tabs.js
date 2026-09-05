import React from 'react';

let tabsIdCounter = 0;

function nextTabsIdBase() {
  tabsIdCounter += 1;
  return `liquid-tabs-${tabsIdCounter}`;
}

export function Tabs({ tabs = [], activeIndex = 0, idBase }) {
  const resolvedIdBase = idBase ?? nextTabsIdBase();
  const normalizedTabs = tabs.map((tab) =>
    typeof tab === 'string' ? { label: tab, panel: tab } : tab
  );
  const activeTab = normalizedTabs[activeIndex];

  return React.createElement(
    'div',
    {},
    [
      React.createElement(
        'div',
        { key: 'tablist', role: 'tablist' },
        normalizedTabs.map((tab, index) =>
          React.createElement('button', {
            key: `${resolvedIdBase}-${index}`,
            type: 'button',
            role: 'tab',
            id: `${resolvedIdBase}-tab-${index}`,
            'aria-selected': index === activeIndex,
            'aria-controls': `${resolvedIdBase}-panel-${index}`,
            tabIndex: index === activeIndex ? 0 : -1,
            children: tab.label
          })
        )
      ),
      activeTab
        ? React.createElement('div', {
            key: 'panel',
            role: 'tabpanel',
            id: `${resolvedIdBase}-panel-${activeIndex}`,
            'aria-labelledby': `${resolvedIdBase}-tab-${activeIndex}`,
            children: activeTab.panel
          })
        : null
    ]
  );
}
