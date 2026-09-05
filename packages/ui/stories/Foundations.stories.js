import React from 'react';
import { motionPrimitives } from '../src/index.js';

export default {
  title: 'Foundations/Tokens'
};

export const MotionPrimitives = {
  render: () =>
    React.createElement('pre', {
      children: JSON.stringify(motionPrimitives, null, 2)
    })
};
