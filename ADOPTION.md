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
