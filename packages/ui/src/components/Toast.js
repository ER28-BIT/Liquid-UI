import React from 'react';

export function Toast({ children, ...props }) {
  return React.createElement('div', {
    ...props,
    role: 'status',
    'aria-live': 'polite',
    children
  });
}
