# stackEnd Onboarding: Mobile Design Guide

Status: Living specification  
Last updated: 15 October 2026  
Applies to: `index.html`, `styles.css`, and `app.js`

## Purpose

This document defines how the stackEnd client onboarding experience should behave and feel on phones and small tablets. It is the reference for future mobile changes. Whenever a new screen, question type, component, or interaction is added, update this document in the same change.

The mobile experience should feel like a focused conversation rather than a compressed desktop form. It must remain calm, readable, fast, and easy to complete with one hand.

## Mobile principles

1. **One clear task at a time.** Each screen should make the next action obvious.
2. **Progress stays visible.** Users should always know where they are without losing useful screen space.
3. **Touch first.** Interactive targets must be comfortably tappable and separated.
4. **Ask only what applies.** Conditional sections should appear immediately after the answer that triggers them.
5. **Protect user effort.** Answers are saved locally, and navigation must not unexpectedly clear data.
6. **Use plain language.** Labels should be short, specific, and understandable without technical knowledge.
7. **Keep the primary action reachable.** Back and continue actions stay available near the bottom of the viewport.

## Supported viewport range

The interface must work without horizontal scrolling from **320 px to 900 px** wide.

| Range | Layout mode | Expected behavior |
| --- | --- | --- |
| 320-479 px | Compact phone | Single-column forms, compact spacing, full-width content |
| 480-680 px | Large phone | Single-column forms with slightly more breathing room |
| 681-900 px | Small tablet | Two-column fields where useful; compact desktop sidebar may remain |
| 901 px and above | Desktop | Standard desktop layout |

Primary QA widths: **320, 360, 390, 430, 768, and 900 px**.

## Global mobile layout

- The page must never be narrower than 320 px or create horizontal overflow.
- Main content uses 18 px side gutters on phones.
- Form content is one column at 680 px and below.
- Cards use 20 px internal padding on phones and 16 px vertical separation.
- Long text, URLs, filenames, and review values must wrap safely.
- Fixed or sticky elements must respect `env(safe-area-inset-bottom)` and must not cover the final field.
- Motion should be subtle and disabled when `prefers-reduced-motion: reduce` is active.

## Welcome page

### Header

- Use a 68 px header on phones.
- Keep the stackEnd mark visible at all times.
- Hide the “Already started?” helper text; retain the **Resume onboarding** button.
- The header must not wrap at 320 px.

### Hero

- Stack the copy above the visual.
- Use a fluid headline between 38 and 47 px with tight but readable line height.
- Keep the headline to approximately four lines at 320 px.
- Stack the primary action and duration note vertically.
- The **Get started** button should be at least 52 px high and may become full width below 390 px.
- Decorative elements may be simplified or hidden when they compete with the primary action.

### Process and footer

- Display process steps vertically with a divider between steps.
- Keep each step readable without requiring horizontal swiping.
- Stack footer content and keep the contact link easy to tap.

## Onboarding wizard

### Mobile header and progress

- Hide the desktop sidebar at 680 px and below.
- Show a compact header containing the brand and **Restart** action.
- Keep the 4-step progress bar directly below the header.
- The progress bar values are 25%, 50%, 75%, and 100%.
- The current step title remains in the page content; do not duplicate the entire desktop stepper.
- The header may become sticky only if it does not reduce the usable viewport excessively when the keyboard is open.

### Section introductions

- Step eyebrow: 10-11 px uppercase.
- Main step heading: 30-32 px on phones.
- Supporting text: at least 15 px with a 1.55-1.7 line height.
- Keep the introduction visually separate from the first form card.

### Form cards

- Use a single column at 680 px and below.
- Card radius: 14-16 px.
- Card padding: 20 px on phones.
- Card titles should wrap naturally; number badges remain aligned to the top.
- Avoid nested card styling that creates heavy borders. Conditional panels use a light background and one subtle border.

### Inputs

- Text inputs and selects must be at least 48 px high on phones.
- Textareas start at a minimum height of 112 px.
- Form text must remain at least 16 px on mobile to avoid browser zoom during input.
- Labels appear above controls and remain visible while typing.
- Required and optional markers must not be the only indication of validation state.
- Error messages appear next to the relevant field or choice group.
- Keyboard types should match the field: email, telephone, URL, date, and numeric where applicable.

### Choice controls

- Service cards, checkbox options, and radio options become one column at 680 px and below.
- Each option must provide a minimum 48 px tap area.
- Tapping anywhere on the option selects it.
- Selected state must use more than colour: border weight, check state, or text must also change.
- Purpose cards may include a short secondary line, but should remain compact.

### File uploads

- Upload areas remain full width.
- The visible upload target must be at least 112 px high.
- File guidance should fit without clipping at 320 px.
- Long filenames must wrap and must not overflow their container.
- Never request passwords or private account credentials through an upload or text field.

### Conditional flows

- Newly revealed content appears immediately below the triggering choice.
- Hidden fields are disabled and excluded from validation and saved form data.
- Switching an answer may preserve prior values, but hidden values must not appear in the review summary.
- **Update or upgrade** and **Maintenance services** remain short paths: current URL, requested support, then review.
- **New site or system** reveals the full product, content, domain, hosting, and delivery flow.
- When both services are selected, Social Media appears first and Software Development follows it.

### Bottom actions

- Back and primary actions remain in a sticky action bar on phones.
- Minimum button height: 48 px.
- The primary action receives more visual weight and space than Back.
- The bar uses an opaque or strongly blurred background so content does not reduce legibility.
- Add bottom safe-area padding on devices with a home indicator.
- The form must include enough bottom spacing that the action bar never covers the final control.

## Review and completion

- Review cards use a single-column definition list on phones.
- The **Edit** action stays visible in each card header.
- Do not display irrelevant conditional fields or large runs of “Not provided.”
- Confirmation must have a comfortably tappable label, not only a small checkbox.
- Success actions stack vertically on phones.
- Printing is a secondary action; returning to the summary remains clear.

## Visual language

Maintain the existing stackEnd system:

- Primary ink: `#172033`
- Dark navigation: `#0b1220`
- Primary blue: `#315ee7`
- Muted text: `#687289`
- Border: `#dfe4ec`
- Page background: `#f7f8fa`
- Success green: `#17966b`
- Display type: Manrope
- Body type: DM Sans

Mobile styling should feel precise and spacious. Use colour for state and hierarchy, not decoration. Shadows should be light and borders should remain visible in bright outdoor conditions.

## Accessibility requirements

- Meet WCAG 2.2 AA contrast for text, controls, borders, and focus states.
- Preserve visible keyboard focus.
- Maintain logical source and tab order after conditional content appears.
- Every input needs an explicit accessible name.
- Choice groups use `fieldset` and `legend`.
- Buttons use action labels, not vague text such as “Next” when a clearer label fits.
- Status and validation changes should be announced with an appropriate live region when screen-reader support is added.
- Do not rely on hover behavior for essential information.
- Support `prefers-reduced-motion`.

## Performance and resilience

- The first screen should remain usable if external fonts are slow or unavailable.
- Avoid large decorative media on mobile.
- Keep JavaScript progressive: content and labels should remain understandable before scripts run.
- Local saving failures must not block form completion.
- Restored drafts must migrate renamed service values without losing answers.

## Mobile QA checklist

Run this checklist after every layout or flow change:

- [ ] No horizontal scrolling at 320 px.
- [ ] Header actions fit at 320 px.
- [ ] Headings do not clip or create single-word orphan lines where avoidable.
- [ ] All inputs use at least 16 px text and 48 px height.
- [ ] All tap targets are at least 44 x 44 px; primary form controls use 48 px.
- [ ] Keyboard opening does not hide the active control or action buttons.
- [ ] Sticky actions do not cover the final field.
- [ ] Safe-area padding works on iPhone-style home indicator layouts.
- [ ] Both service cards fit as a clear one-column list.
- [ ] New software, update, and maintenance branches reveal the correct fields.
- [ ] Social Media and Software Development can be completed together.
- [ ] Required-field errors scroll into view and remain understandable.
- [ ] Uploaded filenames wrap safely.
- [ ] Review cards show only applicable answers.
- [ ] Restart confirmation fits without scrolling horizontally.
- [ ] Back, resume, refresh, and restored-draft behavior preserve expected progress.
- [ ] Reduced-motion mode removes nonessential smooth scrolling and transitions.

## Current implementation status

Already implemented:

- Desktop sidebar is replaced by a compact mobile header below 680 px.
- Four-step mobile progress bar is present.
- Forms, service cards, review details, and choice grids collapse to one column.
- Form actions are sticky on phones.
- Success actions and modal actions stack vertically.
- Software Development conditional panels are responsive.

Next mobile refinements:

1. Increase phone input and select height from 45 px to 48 px.
2. Set mobile form control text to 16 px.
3. Add bottom safe-area padding to the sticky action bar.
4. Make the primary hero action full width on narrow phones.
5. Add reduced-motion styles.
6. Prevent hidden conditional values from appearing in review summaries.
7. Run visual QA at all primary widths when browser preview is available.

## Decision log

Record mobile decisions here so this guide evolves with the implementation.

| Date | Decision | Reason | Files affected |
| --- | --- | --- | --- |
| 15 Oct 2026 | Use 680 px as the phone-to-tablet breakpoint | Matches the current wizard and form layout transition | `styles.css` |
| 15 Oct 2026 | Keep onboarding actions sticky on phones | Long conditional forms need a consistently reachable next action | `styles.css` |
| 15 Oct 2026 | Keep update and maintenance software paths short | Existing-system enquiries need assessment before a full discovery brief | `index.html`, `app.js` |

## Maintenance rule

For every future mobile-facing change:

1. Update the implementation.
2. Update the relevant section of this file.
3. Add or revise the QA checklist if a new interaction is introduced.
4. Add a decision-log entry when the change establishes or reverses a design rule.
