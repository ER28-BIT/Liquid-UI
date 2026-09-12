# Component contract

Load `tokens.css` followed by `primitives.css`, or use `all.css`. CSS is the package
surface; `showcase/showcase.js` is a reference implementation, not an exported
behavior library. Keep semantic markup & event handling in the consuming product.

| Primitive | CSS | Required markup / behavior |
| --- | --- | --- |
| Glass surface | `.liquid-glass`, `--strong`, `--tint` | Choose a semantic container; use opaque inner surfaces for critical records. |
| Button | `.liquid-button`, `--primary`, `--secondary`, `--quiet`, `--danger` | Native button; explicit type; visible name. Prefer native `disabled`; `aria-disabled` alone does not block actions. |
| Card | `.liquid-card`, `--raised`, `--glass` | Heading & meaningful grouping; optional `__header`, `__body`, `__footer`. |
| Input | `.liquid-field`, `.liquid-input`, `.liquid-select`, `.liquid-textarea` | Associated label; connect hints/errors through `aria-describedby`; set `aria-invalid` after validation fails. |
| Badge | `.liquid-badge[data-status]` | Visible status text. Decorative dot conveys no additional meaning. |
| Notice | `.liquid-notice[data-tone]` | Use status/alert live roles only for dynamically relevant feedback, not every static message. |
| Progress | `.liquid-progress` | Native progress element with label, current value & maximum. Explain what the measure means. |
| Navigation | `.liquid-nav-item` | Real destination; `aria-current="page"` on the active page. |
| Modal | `.liquid-dialog` | Native `dialog`, named by `aria-labelledby`; use `showModal()`, Escape & a visible close action. Restore focus to the opener. |
| Tabs | `.liquid-tablist`, `.liquid-tab`, `.liquid-tabpanel` | Tablist/tab/tabpanel roles; unique IDs & reciprocal relationships; roving tabindex; arrow/Home/End navigation; hide inactive panels. |
| Toast | `.liquid-toast` | A pre-existing polite live region; visible dismissal; no forced timeout for essential information. |

See the showcase for concrete dialog, tab, field, notice & toast markup. The
example interactions are local previews with no persistence or network calls.

## Accessible display modes

Set `data-liquid-theme="dark"` on an application boundary for dark mode. The
base root contract is light. Nested light overrides inside a dark boundary are
not provided; use a single application theme boundary.

Set `data-liquid-transparency="reduced"` on an ancestor for opaque glass. OS
reduced transparency remains authoritative even when that manual setting is off.
Unsupported backdrop filters also fall back to opaque surfaces. Forced colors
retain borders & focus outlines. Use opaque surfaces for small body text &
records; validate contrast again when overriding a product palette.

`--liquid-font-family-display` is optional expressive typography for headings;
`--liquid-font-sans` remains the default. Keep figures & operational labels in the
sans/mono families. Reduced-motion tokens continue to govern action transitions.
