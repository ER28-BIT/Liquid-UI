export const motionPrimitives = {
  duration: {
    fast: '120ms',
    normal: '220ms',
    slow: '360ms'
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)'
  }
};

export function applyAccessibilityModes({ reducedMotion, reducedTransparency, highContrast } = {}) {
  return {
    '--motion-multiplier': reducedMotion ? '0' : '1',
    '--surface-opacity': reducedTransparency ? '0.92' : '0.16',
    '--contrast-boost': highContrast ? '1.2' : '1'
  };
}
