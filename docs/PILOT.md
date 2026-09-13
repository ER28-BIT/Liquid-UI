# Participation-to-benefits pilot

Open `/showcase/pilot.html` after `npm run showcase`, or select **Pilot workflow**
in the showcase navigation. This is a complete in-memory interaction prototype,
not an integration with a deployed ResonanceHub service. Use fictional text only.

## Try the journey

1. As AL, record participation and submit sample operating evidence.
2. Switch to MK, explain a missing detail and request a revision.
3. Return to AL and submit the corrected evidence.
4. As MK, record a rationale and accept the current revision.
5. As JT, record the community decision rationale.
6. Preview the illustrative 60/25/15 benefit policy. No money moves.
7. Submit new evidence as AL: the previous review, decision and allocation clear,
   while the ordered history retains their context.

Disabled actions include nearby instructions explaining the prerequisites.
Reset clears the page; reloading also starts a new simulation. Switching the
sample actor explores responsibilities and is not authentication or authorization.
No data is sent, saved to browser storage or uploaded. The history is a local
interaction aid, not a tamper-resistant audit log.

## System boundary

`system.css` supplies shared materials, functional labels, panels, controls and
an ordered `.liquid-process` indicator (`aria-current="step"`, `data-complete`).
The pilot has no private palette. `showcase/pilot-model.js` owns the illustrative
workflow rules, participants and allocation policy; it is not exported from the
UI package. A real product must supply its own policy and backend enforcement.

## Gaps to resolve with a product team

- Real identities, permissions and independent review assignments.
- Evidence upload, versioned records, persistence and concurrent edits.
- Agreed beneficiary policy, amounts, currencies and payment authorization.
- Rejection, withdrawal, appeal and reassignment workflows.
- Safari, physical-device and screen-reader user testing.

The current pilot validates shared component composition and recoverable revisions.
It does not claim those production integrations are complete.

## CI

`.github/workflows/ci.yml` runs on PRs to main, pushes to main and manual dispatch.
It installs the locked dependencies, verifies generated assets and unit contracts,
installs Chromium, runs the browser journey checks and checks package contents.
Browser captures are retained as workflow artifacts for seven days. It uses read
permissions and does not publish packages or deploy a website. Repository branch
protection is unchanged; maintainers can require the `validate` job separately.

Workflow setup follows the [Playwright CI guide](https://playwright.dev/docs/ci-intro).
