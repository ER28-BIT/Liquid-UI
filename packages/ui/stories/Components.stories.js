import React from 'react';
import { GlassSurface, Button, Input, Card, Modal, Tabs, Toast } from '../src/index.js';

export default {
  title: 'Components/Overview'
};

export const CoreComponents = {
  render: () =>
    React.createElement('div', {
      style: { display: 'grid', gap: '12px' },
      children: [
        React.createElement(GlassSurface, { key: 'glass', children: 'GlassSurface' }),
        React.createElement(Button, { key: 'button', children: 'Button' }),
        React.createElement(Input, { key: 'input', placeholder: 'Input' }),
        React.createElement(Card, { key: 'card', children: 'Card' }),
        React.createElement(Modal, { key: 'modal', title: 'Modal', children: 'Modal Content' }),
        React.createElement(Tabs, { key: 'tabs', tabs: ['One', 'Two'] }),
        React.createElement(Toast, { key: 'toast', children: 'Toast' })
      ]
    })
};
