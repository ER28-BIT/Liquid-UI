import React from 'react';

export function Tabs({ tabs = [], activeIndex = 0 }) {
  return React.createElement(
    'div',
    { role: 'tablist' },
    tabs.map((tab, index) =>
      React.createElement('button', {
        key: tab,
        role: 'tab',
        'aria-selected': String(index === activeIndex),
        children: tab
      })
    )
  );
}
