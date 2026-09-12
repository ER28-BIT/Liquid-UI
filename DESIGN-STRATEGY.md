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
