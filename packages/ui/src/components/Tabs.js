import React from 'react';

export function Tabs({ tabs = [], activeIndex = 0, idBase = 'liquid-tabs' }) {
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
            key: tab.label,
            role: 'tab',
            id: `${idBase}-tab-${index}`,
            'aria-selected': index === activeIndex,
            'aria-controls': `${idBase}-panel-${index}`,
            children: tab.label
          })
        )
      ),
      activeTab
        ? React.createElement('div', {
            key: 'panel',
            role: 'tabpanel',
            id: `${idBase}-panel-${activeIndex}`,
            'aria-labelledby': `${idBase}-tab-${activeIndex}`,
            children: activeTab.panel
          })
        : null
    ]
  );
}
