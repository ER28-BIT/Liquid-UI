# Liquid-UI (liquid-glass-design-system)

Dedicated design-system repository for reusable Liquid Glass foundations and UI primitives.

## Packages

- `@liquid-glass/tokens`: source tokens + Style Dictionary outputs for CSS variables, TypeScript/JS, Tailwind, Swift, and Android resources.
- `@liquid-glass/ui`: reusable UI primitives (`GlassSurface`, `Button`, `Input`, `Card`, `Modal`, `Tabs`, `Toast`) plus motion/accessibility helpers.

## Source-of-truth model

- **Tokens:** centrally managed and exported to code and Figma.
- **Components:** code is the behavioral/accessibility authority; Figma is the visual/interaction spec.
- **Brand exploration:** Figma first.
- **Production implementation:** repo first.

## Figma alignment

Use the same primitive naming hierarchy across design and code.

- Figma: `surface/glass/default`
- Code token: `--surface-glass-default`

## Included first release scope

- Foundation tokens
- Light + dark atmospheric themes
- Motion primitives
- Accessibility modes: reduced motion, reduced transparency, high contrast
- Core components: GlassSurface, Button, Input, Card, Modal, Tabs, Toast
- Storybook stories for foundations and components

## Token pipeline

- Token source: `packages/tokens/src/tokens.json`
- Transform/build: Style Dictionary (`packages/tokens/style-dictionary.config.json`)
- Outputs:
  - CSS variables: `dist/css/tokens.css`
  - JavaScript: `dist/ts/tokens.js`
  - Tailwind: `dist/tailwind/theme.js`
  - Swift: `dist/swift/Tokens.swift`
  - Android resources: `dist/android/tokens.xml`

## Development

```bash
# Requires Node.js 22+
npm install
npm test
npm run build
```
