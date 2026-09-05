import React from 'react';
import { Card } from './Card.js';

export function Modal({ title, children, ...props }) {
  return React.createElement('section', {
    ...props,
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': title,
    children: React.createElement(Card, { children })
  });
}
