import React from 'react';
import { Card } from './Card.js';

let modalIdCounter = 0;

function nextModalBaseId() {
  modalIdCounter += 1;
  return `liquid-modal-${modalIdCounter}`;
}

export function Modal({ title, children, ...props }) {
  const modalBaseId = props.id ?? nextModalBaseId();
  const titleId = title ? `${modalBaseId}-title` : undefined;
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
