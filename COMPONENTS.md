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

## Approved Resonance system (opt-in)

```css
@import "@resonance/liquid-ui/system.css";
```

```html
<div class="liquid-app" data-liquid-theme="resonance">
  <div class="liquid-frame">
    <header class="liquid-topbar"><span class="liquid-brand">Your product</span></header>
    <div class="liquid-workspace">
      <nav class="liquid-sidebar" aria-label="Product navigation">…</nav>
      <main class="liquid-main">…</main>
    </div>
  </div>
</div>
```

`system.css` imports the existing token & primitive contract and defines the
approved opt-in application language. It carries all component layout, palette,
materials & typography. The showcase stylesheet only frames the demonstration.
The existing light/dark contracts & token-only default export remain available.

| Reusable component | Main classes | Consumer responsibility |
| --- | --- | --- |
| Application shell | `liquid-app`, `liquid-frame`, `liquid-topbar`, `liquid-workspace`, `liquid-sidebar`, `liquid-main` | Routes, page labels & current navigation |
| Atlas layout | `liquid-atlas`, `liquid-atlas__intro`, `liquid-atlas__map` | Regional context & content |
| Context surface | `liquid-panel`, `liquid-panel--glass`, `liquid-context__visual`, `liquid-context__footer` | Named headings & relevant actions |
| Participant control | `liquid-person-list`, `liquid-person`, `liquid-avatar` | Real names, roles & selection state |
| Contribution selection | `liquid-records`, `liquid-record`, `liquid-state` | Label each button fully; preserve visible status & authorship |
| Decision view | `liquid-master-detail`, `liquid-decision` | Evidence, rationale & authorization behavior |
| Benefits view | `liquid-benefit-strip`, `liquid-benefits`, `liquid-approval` | Actual allocation policy & approval conditions |
| Primary action | `liquid-action` | Native button/link behavior; visible label |

Material & selection colors are generated tokens. A selected violet row is a
selection, not a pending/verified status. `received` is neutral informational
text; it does not invent an eighth governed state or imply verified evidence.
Explicit governed badges retain the original seven-state palette.

## Globe component

The optional `liquid-globe` Web Component is a Canvas component with a locally bundled D3 geographic runtime
with an equivalent native-button list. It uses shared CSS tokens from `system.css`.
Import it once from a browser or bundler entry point (not a server-rendering path):

```js
import '@resonance/liquid-ui/globe.js';
const globe = document.querySelector('liquid-globe');
globe.markers = [
  { id: 'site-1', label: 'Your site', coordinates: [-61.5, 15.5] }
];
globe.selected = 'site-1'; // selects & centers, without dispatching an event
globe.focus([-25, 14]);  // optionally adjust view without changing selection
globe.addEventListener('liquid-select', ({ detail }) => {
  // detail.id is the consumer-supplied marker ID.
  // Load your own context; this event does not authorize any action.
});
```

```html
<liquid-globe aria-label="Project locations"></liquid-globe>
```

Coordinates are longitude/latitude in degrees. IDs must be unique nonempty
strings and labels nonempty text. Invalid data throws before replacing existing
markers. Consumer data is copied & labels rendered as text. Markers are not
stored, fetched or transmitted by the component. Programmatic selection does
not fire `liquid-select`, avoiding event feedback loops.

The component uses light DOM for shared theme inheritance. It owns its children;
do not insert application markup inside it. Its internal classes use the
`liquid-globe__` namespace. `liquid-globe--mini` is decorative: pair it with
`aria-hidden="true" inert`, as shown in the showcase.

Rotation starts off. Users can drag, use rotation buttons, or select a marker
from List. Device reduced-motion preference overrides the motion toggle. Forced
colors exposes the list. Disconnection removes listeners, observers & animation.
A single component supports dynamic marker replacement & reconnection. No sound
is implemented in this release; no inactive sound control is displayed.

See `showcase/consumer.html` for a second, minimal consumer that imports the same
CSS/module with different markers & no showcase styles or product fixtures.

### Geographic relationships (D3 runtime)

```js
import '@resonance/liquid-ui/globe.js';
const globe = document.querySelector('liquid-globe');
globe.markers = [
  {id: 'a', label: 'Community chapter', coordinates: [-61.5, 15.5]},
  {id: 'b', label: 'Learning chapter', coordinates: [-0.2, 5.6]}
];
globe.connections = [
  {id: 'exchange', source: 'a', target: 'b', label: 'Peer learning exchange'}
];
```

`connections` defaults to `[]`; IDs must be unique, endpoints must be distinct
existing marker IDs, and every relationship requires a label. Getters return
copies. Invalid assignments leave existing data intact. Clear connections before
replacing markers with unrelated IDs. Selection emphasizes incident edges;
rotation clips arcs at the globe horizon. List mode exposes endpoint names and
labels without needing to interpret the visualization. The same API is exercised
by `showcase/consumer.html` with unrelated data. D3 is bundled locally; rebuild
with `npm run build:d3`. It owns geometry, while shared tokens own appearance.
