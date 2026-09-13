# Repository validation

The screenshots in `previews/` are browser captures of `showcase/index.html`,
using `system.css`, generated tokens, bundled fonts & the globe component.
They are not generated art or a separate HTML implementation.

## Reproduce

1. `npm ci`
2. `npm test`
3. `npx playwright install chromium`
4. `npm run test:browser`
5. `npm pack --dry-run`

The browser runner starts/stops its own loopback server. An existing Chromium
can be selected with `LIQUID_BROWSER_EXECUTABLE`; optional launch flags use the
JSON-array `LIQUID_BROWSER_ARGS` environment variable. Neither changes product
code. The default requires only Playwright's installed Chromium.

## Review scope

- Generated tokens, legacy exports, all theme text/action contrast & status badges
- Marker validation, globe projection & bounded geographic samples
- Geographic rendering, bundled fonts & no missing local assets
- Region → project → participant → contribution → review preview interactions
- Native dialog Escape/focus return, list selection & reduced-motion behavior
- Solid surfaces & forced-color list fallback
- Overview, project & catalog at 320, 390, 768, 1024 & 1600px widths
- A second consumer with distinct markers & no showcase stylesheet
- Component detach/reconnect behavior

Screenshots capture the approved Resonance expression. Light/dark are supported
legacy themes; they do not attempt to reproduce the reference's dark materials.

## Limits

Browser automation uses Chromium. Safari/Firefox & physical-device performance
have not been certified. OS font fallbacks cover characters outside the bundled
Latin subsets. The globe's small-island detail is limited by its 1:110m source.
No full screen-reader audit or production product integration is claimed.

## Latest run

25 repository tests passed. The browser checks described above passed in local
headless Chromium. Package dry run includes 23 files (about 241 KB compressed),
including shared styles, globe geometry, the bundled D3 runtime, fonts & licenses.
Relationship tests cover orphaned endpoints, copied inputs, horizon clipping &
alignment with point projection. Browser checks cover relationship list text
and atomic rejection when replacing referenced markers.

Functional roles: all five labels meet 4.5:1 text contrast on their role surfaces
in light, dark & Resonance. Browser checks include the five-role catalog; the
independent consumer uses evidence-role markers. Status tests remain unchanged.
