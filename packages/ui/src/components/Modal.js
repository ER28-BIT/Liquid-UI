import React from 'react';
import { Card } from './Card.js';

export function Modal({ title, children, ...props }) {
  const titleId = title ? `${props.id ?? 'liquid-modal'}-title` : undefined;
  return React.createElement('section', {
    ...props,
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': titleId,
    children: React.createElement(Card, {
      children: [
        title ? React.createElement('h2', { key: 'title', id: titleId, children: title }) : null,
        React.createElement('div', { key: 'content', children })
      ]
    })
  });
}
