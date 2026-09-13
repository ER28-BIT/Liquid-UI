# Liquid UI design strategy

## Systems with a human rhythm

Liquid UI translates Emanuel Ramos’s commitment to inclusive teams, learning,
creative expression & shared value into a reusable interface language. Its
central principle is **inclusion belongs in the design of a system**: who can
participate, how decisions are made & where benefits flow.

This is a product design strategy, not a personal biography. Talent strategy
contributes clear roles & fair participation; learning contributes guidance &
recoverable next steps; creative practice contributes rhythm, color & fluid
form; circular economics contributes visible beneficiaries & accountable flows.

## From principle to interface

| Source | Interface rule | Review question |
| --- | --- | --- |
| Inclusive participation | Name contributors, reviewers & beneficiaries; use clear labels, keyboard access & readable surfaces. | Can a new participant tell what they can do next? |
| Shared value | Show allocations, intended beneficiaries & release conditions together. | Can people see where value is intended to go? |
| Accountability | Present evidence, rationale, owner, status & exceptions as distinct information. | Is a completed check distinguishable from an authorized decision? |
| Learning & growth | Explain missing information with an actionable next step; retain context on errors. | Can a person recover without guessing? |
| Sound, water & movement | Use concentric forms, asymmetry & consistent spacing to create rhythm. Motion may acknowledge an action, never imply verification. | Does the expression help people orient themselves? |
| Color & creative expression | Use green, aqua, violet & warm gold as atmospheric accents; reserve governed palettes for explicit status. | Does meaning survive without color or transparency? |

## Visual direction

- Pair expressive serif display headings with system sans body text & monospaced
  references. The display token uses local fallbacks, avoiding font network calls.
- Use generous reading space, editorial section dividers & restrained rounded
  surfaces. Put dense records on opaque surfaces for predictable contrast.
- Standard glass carries context; strong glass prioritizes controls; tinted glass
  groups related information. Avoid stacking translucent layers behind data.
- Use ripple forms as decorative references to resonance. Do not present decorative
  graphics as telemetry. No ambient looping animation, sound or autoplay.
- Give people solid-surface controls & honor OS reduced-transparency, reduced-motion
  & forced-color settings. Never hide labels to preserve a visual effect.

## Product expression

| Product | Emphasis | Required visible context |
| --- | --- | --- |
| ResonanceHub | Clear records, evidence & coordination; green/aqua atmosphere | Submitter, independent reviewer, missing requirement, decision & rationale |
| Carbon Wallet | Governed allocations & accountable value; green/gold accents | Beneficiaries, amounts or percentages, approver, conditions & hold reasons |
| M2: Talent / Learning | Future adoption of the same inclusive language | Participation, guidance, opportunity & contribution; domain components remain local |

Product examples are explicitly illustrative. The showcase’s 60/25/15 allocation
is not a treasury decision. No sample action submits evidence, approves a project,
transfers funds or claims a live integration.

## v0.3 completion boundary

The release provides a dependency-free CSS/token contract, light/dark atmosphere,
three glass tiers, core primitive presentation, display typography, a working
interactive showcase & adoption guidance. Dialogs use native HTML semantics;
the showcase supplies keyboard tab & feedback examples. Products own behavior.

PR #1’s alternative React/Storybook monorepo is not part of this release. Figma
publication, framework wrappers, native-platform token outputs & registry
publication are separate deliverables, not implied by v0.3. Add them when a
consumer needs them & validate their behavior independently.

## Approved visual reference → repository implementation

The approved two-screen concept (ecosystem overview & project workspace) is the
reference for this revision. The earlier standalone conversation prototype is
not a package dependency or implementation source. All current screenshots come
from the repository showcase.

| Approved feature | Repository contract |
| --- | --- |
| Near-black charcoal atmosphere | Opt-in `themes.resonance` canvas & gradient tokens |
| Warm editorial headings | Locally bundled Cormorant Garamond display family |
| Clear operational text | Locally bundled DM Sans body family |
| Champagne actions | Resonance action tokens & `liquid-action` |
| Smoked glass & fine refraction edges | Material tokens & `liquid-panel` |
| Jade active participants | `liquid-person[aria-pressed]` |
| Violet contribution selection | Selection tokens & `liquid-record[aria-pressed]` |
| Illuminated geographic globe | Reusable `liquid-globe`, real geographic samples & consumer markers |
| Local accountability | Consumer-owned records assembled from shared components |

We preserve the reference's composition & material hierarchy, not its invented
project claims or geographic inaccuracies. The real globe is geographic point
geometry, not the generated image's photographic atmosphere. Status colors keep
meaning consistent; amber denotes pending review and violet denotes selection.
Extra decorative slogans & inactive search/sound controls are omitted.

The visual acceptance process is a comparison of actual browser captures against
the approved concept, alongside interaction, keyboard, fallback & consumer tests.
See `docs/VALIDATION.md` and `docs/previews/`.

## Source authority & reuse contract

The approved two-screen image, Emanuel's supplied direction & biography, and the
Standard Economics globe reference are the design inputs. New generated concepts
are not authorities for changing the composition. D3 is a geometry tool; it does
not choose the aesthetic. Review actual repository browser captures against the
approved image before accepting a visual change.

| Source input | Concrete decision | Reusable implementation |
| --- | --- | --- |
| Approved image: black atmosphere, ivory type, thin edges | Preserve charcoal canvas, champagne display/actions, restrained glass | `themes.resonance`, material tokens, `system.css` |
| Approved image: jade, amber & violet points joined across geography | Fine geographic arcs; selected relationships gain light | `liquid-globe.connections`, shared globe/brand tokens |
| Standard Economics globe: luminous geographic points | Real land samples, fine point texture, user-controlled rotation | Geographic data generator & framework-neutral Canvas component |
| Blockchain imagery | Explicit nodes & named relationships; show evidence, review & release conditions separately | Validated connection data, records, review panel & benefit strip |
| Bio: collaborate & grow | Relationships describe knowledge exchange & mentorship, not anonymous traffic | Consumer-supplied labels; showcase learning fixtures |
| Bio: inclusion in who participates | Give people named roles, keyboard selection & equivalent list access | Participant controls, globe marker & relationship lists |
| Bio: how decisions are made & where benefits flow | Keep reviewer, missing evidence & named approval conditions visible | Project workspace composition & benefit components |
| Bio: sound, color, movement & spoken word | Editorial type cadence, restrained illumination, optional motion & concise human language | Shared type/spacing/globe tokens; reduced-motion behavior |

The employment history establishes the people-first domain; employer logos and
brand palettes are not visual sources. Fatherhood informs care for the people
using a system, not an invented family motif. Sound is not implemented: adding
it requires a useful interaction and explicit opt-in, not ambient playback.

### Relationship contract

A connection is supplied by the consuming product: `{id, source, target, label}`.
Endpoints refer to marker IDs. The component does not infer partnerships,
transactions, consensus, token ownership or verification from proximity. The
showcase labels relationships as illustrative; real products own their evidence.
Arcs use D3's orthographic projection and geographic path clipping. Point-cloud
rendering remains Canvas for efficiency; neither representation is an image asset.

The independent consumer uses London/Tokyo data with the same component and CSS.
No region names, biography text, project records or demo palette live in the
component. Equivalent relationship text is available through List mode and in
forced-color mode. Replacing markers that are still referenced by connections is
rejected: clear connections first when replacing a complete dataset.

### Acceptance boundary

This implementation interprets the approved composition in code. It does not
claim pixel identity with the reference's photographic globe. The remaining
fidelity questions are geographic texture, atmosphere & proportional balance;
review them in actual browser screenshots, not generated alternatives. Automated
checks establish behavior and reuse, not a subjective B+ design grade.

## Functional color, not increased saturation

The expanded palette encodes product functions: jade participation, cyan
learning, blue evidence, violet decisions and copper shared value. These map to
Emanuel's emphasis on people, growth, accountable decisions and distribution of
benefits. Brand atmosphere remains separate. Every role has theme-specific
foreground/background/border/accent tokens and a readable label.

Do not assign a different hue to two places solely to make the globe colorful
when they perform the same function. Functional role takes precedence over
regional decoration. Status continues to communicate outcomes using the existing
seven-state contract. Selection, focus, role and status are independent layers.
