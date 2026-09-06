# Liquid UI

Liquid UI is the shared design-token foundation for Resonance products. It gives ResonanceHub, Carbon Wallet, and future interfaces one visual language while allowing each product to own its workflows and domain components.

## v0.2 theme foundation

This release defines product-neutral tokens for:

- Brand, canvas, surface, text, border, and focus colors
- Governed states: `verified`, `pending`, `not-ready`, `warning`, `rejected`, `simulated`, and `restricted`
- Typography, spacing, radius, shadow, motion, and layout
- Reduced-motion behavior
- Explicit light and dark theme contracts
- Product accent hooks that preserve product identity without moving product
  workflows into the library

The status palette is tested for WCAG AA text contrast. Color must never be the only way a product communicates status; pair every status color with visible text or an icon with an accessible label.

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
controls, notices, progress indicators, and navigation items. Load
`primitives.css` separately when an application already loads `tokens.css`.
The primitives style presentation only; accessible names, labels, live-region
roles, and form relationships remain explicit responsibilities of product
markup.

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

`0.1.x` is a foundation contract. Additive tokens may be introduced in minor releases; renaming or changing the meaning of a published token requires a new major version once the package reaches `1.0.0`.

## Distribution status

The package remains private and `UNLICENSED`. Do not publish it to a public
registry until repository ownership, package visibility, and licensing have
been explicitly approved.
