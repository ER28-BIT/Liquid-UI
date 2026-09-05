import React from 'react';

export function GlassSurface({ tier = 'default', children, ...props }) {
  return React.createElement('div', {
    ...props,
    'data-surface-tier': tier,
    children
  });
}
