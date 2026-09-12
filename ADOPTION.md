# Product adoption contract

This document defines the temporary integration path for ResonanceHub and
Carbon Wallet while `@resonance/liquid-ui` is not registry-published.

## Snapshot rules

1. Copy `tokens.css` without modifying the token contract.
2. Add a header containing the exact source repository and commit SHA.
3. Load the snapshot before the product stylesheet.
4. Map existing product aliases to `--liquid-*` semantic tokens in the product
   stylesheet. Product aliases may preserve an established visual treatment.
5. Keep workflow behavior and domain language in the product repository.

## Full v0.3 visual adoption

Token-only adoption supplies variables; it does not automatically restyle a product.
For glass & component presentation, also copy `primitives.css` from the **same
commit** & load it after `tokens.css`. Copy `all.css` only when retaining its
relative sibling imports. Do not copy the showcase layout into a product.

Apply shared classes incrementally to existing product markup. Use an opaque
surface for evidence details, amounts & approval conditions. Keep the product’s
existing accessible behavior, data wiring & authorization checks. See
[COMPONENTS.md](./COMPONENTS.md) & [DESIGN-STRATEGY.md](./DESIGN-STRATEGY.md).

Verify the operator console’s submit/review/exception views and the wallet’s
allocation/hold/approval views against their existing product tests. Rollback is
restoring the previous pinned styles; no data migration is involved.

## Merge gates

- Product type checks, tests, and production build pass.
- Keyboard focus remains visible.
- Governed status colors retain visible text or an accessible label.
- Reduced-motion behavior remains active.
- No product workflow or authorization boundary changes as part of a token-only
  adoption pull request.

## Release migration

After an approved package release, replace the snapshot with:

```css
@import "@resonance/liquid-ui/tokens.css";
```

Then remove the snapshot and pin the package version in the product lockfile.
