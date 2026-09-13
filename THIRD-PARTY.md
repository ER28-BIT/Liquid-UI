# Third-party assets

## Geography

`components/globe-data.js` contains deterministic point samples of Natural Earth
1:110m land, distributed through World Atlas 2.0.2. Natural Earth data is public
domain. It describes geography only; light points do not represent users,
transactions, deployments or economic activity.

- Source topology: https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json
- Project: https://github.com/topojson/world-atlas
- Natural Earth terms: https://www.naturalearthdata.com/about/terms-of-use/
- Decoded source: `scripts/data/land-110m.geojson`
- Rebuild: `npm ci` then `npm run build:globe`

The sampler and live relationship renderer use d3-geo 3.1.1. A local, tree-shaken
ES module supplies orthographic projection, horizon clipping & geographic paths.
Rebuild it with `npm run build:d3`; no CDN or external geography request is needed.
D3-geo, d3-array & internmap licenses are included in `assets/licenses/`. At this scale some small islands are omitted by source
geometry; consumer markers are separate, supplied geographic coordinates.

## Fonts

Cormorant Garamond (display) & DM Sans (body) are bundled as Latin WOFF2 subsets
from their Fontsource packages under SIL Open Font License 1.1. The license files
are included beside the fonts in `assets/fonts`. CSS family aliases are used for
scoping; the font files themselves are unmodified. Extended writing systems
fall back to the configured system fonts.

## Reference boundary

The approved visual concept informed the composition, materials & typography.
No generated image is used as an interface background, control or globe. No
Standard Economics code, fonts or imagery are copied into this package.
