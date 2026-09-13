# Liquid UI

Liquid UI is the shared design-token foundation for Resonance products. It gives ResonanceHub, Carbon Wallet, and future interfaces one visual language while allowing each product to own its workflows and domain components.

## v0.3 atmospheric foundation

This release defines product-neutral tokens for:

- Brand, canvas, surface, text, border, and focus colors
- Governed states: `verified`, `pending`, `not-ready`, `warning`, `rejected`, `simulated`, and `restricted`
- Typography, spacing, radius, shadow, motion, and layout
- Reduced-motion behavior
- Explicit light and dark theme contracts
- Atmospheric gradients, three glass tiers, refraction borders, blur, and glow
- Reduced-transparency fallbacks alongside reduced-motion behavior
- Product accent hooks that preserve product identity without moving product
  workflows into the library

The status palette is tested for WCAG AA text contrast. Color must never be the only way a product communicates status; pair every status color with visible text or an icon with an accessible label.

The design strategy is **systems with a human rhythm**: make participation,
accountable decisions & shared value visible. Read [DESIGN-STRATEGY.md](./DESIGN-STRATEGY.md)
for the persona-to-interface rules, [COMPONENTS.md](./COMPONENTS.md) for semantic
markup responsibilities & [CHANGELOG.md](./CHANGELOG.md) for the release scope.

## Usage

Consume the CSS contract from the package:

```css
@import "@resonance/liquid-ui/tokens.css";

.verification-status {
  color: var(--liquid-status-verified-fg);
  background: var(--liquid-status-verified-bg);
  border: 1px solid var(--liquid-status-verified-border);
  border-radius: var(--liquid-radius-pill);
}
```

Design and non-CSS tooling may consume `tokens.json` directly.

Core CSS primitives are available without a framework dependency:

```css
@import "@resonance/liquid-ui/all.css";
```

Use the `liquid-` prefix for buttons, governed-status badges, cards, form
controls, notices, progress indicators, navigation items, dialogs, tabs & toasts. Load
`primitives.css` separately when an application already loads `tokens.css`.
The primitives style presentation only; accessible names, labels, live-region
roles, and form relationships remain explicit responsibilities of product
markup.

Use `.liquid-glass`, `.liquid-glass--strong`, and `.liquid-glass--tint` to
express contextual depth. These surfaces automatically become opaque when a
user requests reduced transparency. Product interfaces should use atmosphere
to clarify hierarchy, never as a substitute for visible labels or status text.

## Showcase

Run the included server, then open `http://127.0.0.1:4173` to review the
interactive showcase in light & dark themes:

```bash
npm run showcase
```

Display settings also provides a solid-surfaces control. All product records
are illustrative; interactions do not modify evidence or move funds.

Use the light theme by default. Apply the dark contract explicitly at an
application boundary:

```html
<html data-liquid-theme="dark">
```

Products may override `--liquid-product-accent`,
`--liquid-product-accent-strong`, and `--liquid-product-accent-soft` after
loading Liquid UI. Shared primitives should consume these hooks instead of
hard-coding a product color.

`tokens.css` is generated from `tokens.json`. Run `npm run build` after token
changes and `npm test` before opening a pull request.

Until the first package release, products may vendor `tokens.css` as a
commit-pinned snapshot. The snapshot must name the exact Liquid UI commit and
load before product styles. See [ADOPTION.md](./ADOPTION.md) for the temporary
contract and merge gates.

## Product boundary

Liquid UI owns shared tokens and stable interface primitives. ResonanceHub owns evidence, advisor, attestation, and audit workflows. Carbon Wallet owns asset, governance, and policy-controlled wallet workflows. Product-specific components should only move into Liquid UI after they have proven reusable in both products.

## Validation

```bash
npm test
```

## Versioning

`0.3.x` is the atmospheric foundation contract. Additive tokens may be introduced in minor releases; renaming or changing the meaning of a published token requires a new major version once the package reaches `1.0.0`.

## Distribution status

The package remains private and `UNLICENSED`. Do not publish it to a public
registry until repository ownership, package visibility, and licensing have
been explicitly approved.

## Approved Resonance application system

The approved visual concept is implemented in the repository through:

- `themes.resonance` in `tokens.json`: charcoal, champagne, jade & violet contracts
- `system.css`: reusable shell, panels, participants, contribution rows & benefits
- `components/globe.js`: reusable geographic globe with consumer-supplied markers
- `assets/fonts`: bundled display/body fonts & licenses
- `showcase/index.html`: sample product content assembled from those exports

```css
@import "@resonance/liquid-ui/system.css";
```

Use `class="liquid-app" data-liquid-theme="resonance"` at your application boundary.
Import `@resonance/liquid-ui/globe.js` only if using the optional globe. The token-only
default export remains unchanged. See COMPONENTS.md & THIRD-PARTY.md.

Run the showcase as above. Overview, Project & Components are working pages; the
region, participant, contribution & benefit controls select illustrative context.
`/showcase/consumer.html` demonstrates a second consumer using only package code.

For browser verification:

```bash
npm ci
npx playwright install chromium
npm run test:browser
```

The check produces actual repository screenshots in `docs/previews/`. No image
creator or conversation visualization is used to render those previews.
