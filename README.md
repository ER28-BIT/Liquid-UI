# Liquid-UI

Design tokens for Resonance products.

## Foundation

The source of truth is [`tokens.json`](./tokens.json). The checked-in
[`dist/liquid-ui.css`](./dist/liquid-ui.css) file exposes the same foundation
as CSS custom properties so products can adopt the system without a framework.

The initial token set covers:

- Color roles for surfaces, content, borders, and actions
- A spacing scale
- Typography families and sizes
- Common radii and focus treatment

Use semantic tokens (for example, `var(--liquid-color-action-primary)`) in
product code instead of hard-coding palette values. Add new tokens to
`tokens.json`, then update the CSS distribution in the same change.

## Usage

```html
<link rel="stylesheet" href="dist/liquid-ui.css">
```

```css
.button {
  background: var(--liquid-color-action-primary);
  border-radius: var(--liquid-radius-md);
  color: var(--liquid-color-content-on-action);
  padding: var(--liquid-space-2) var(--liquid-space-4);
}
```

## GitHub access

Automation should use a fine-grained token or GitHub App scoped only to the
intended organization/account. Grant Contents read/write for code operations;
Pull requests and Issues write access are optional for collaboration. No broad
account access is required.
