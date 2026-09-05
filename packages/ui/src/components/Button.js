import React from 'react';

export function Button({ children, type = 'button', ...props }) {
  return React.createElement('button', { ...props, type, children });
}
