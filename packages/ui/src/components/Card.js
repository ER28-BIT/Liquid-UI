import React from 'react';
import { GlassSurface } from './GlassSurface.js';

export function Card({ children, ...props }) {
  return React.createElement(GlassSurface, { ...props, tier: 'elevated', children });
}
