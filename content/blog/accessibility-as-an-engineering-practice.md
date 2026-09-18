---
title: "Accessibility Is an Engineering Practice, Not a Checklist"
description: "Why accessibility is a property of the codebase rather than the UI, and what to do about it on a portfolio without a design team."
date: "2026-04-21"
tags:
  - Lessons Learned
  - Frontend
  - Accessibility
  - Web Standards
draft: false
---

Most accessibility guides I have read are framed as checklists: add `alt` text, ensure contrast 4.5:1, label your inputs. The checklist framing is not wrong, but it misses the deeper point. **Accessibility is a property of the codebase, not the UI.** You do not "add accessibility" by sprinkling `aria-label` attributes at the end. You build software in a way that accessibility is the default.

Here is what that looks like in practice.

## The semantic baseline

The first thing I do on any page is check the heading order. One `<h1>` per page, no skipping levels, and headings describe the structure of the content rather than the visual styling. This is the cheapest accessibility win in web development and it is almost always ignored.

The second thing is the landmark structure. Every page should have:

- A `<header>` for site-wide navigation
- A `<main>` for the page content (one per page)
- A `<footer>` for site-wide metadata
- `<nav>` for navigation regions, with `aria-label` if there is more than one

I have a `<SkipLink>` component that is the first focusable element on every page. It takes the user to the `<main>` and bypasses the navigation. The implementation is six lines of CSS and one `<a>`. There is no excuse for not having one.

## Forms that work with a screen reader

The most common form bug is an unlabeled input. The fix is not `aria-label`. The fix is `<label htmlFor="email">Email</label>` paired with `id="email"` on the input. The label is then clickable, the input has an accessible name, and the relationship is encoded in the DOM rather than in an aria attribute.

For errors, I use `aria-describedby` to point the input at the error message:

```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && <p id="email-error">Please enter a valid email address.</p>}
```

The same pattern works for helper text, password requirements, anything that augments the label. The principle is that **the screen reader reads what the user sees, in the order the user sees it**.

## Focus management is the hardest part

Keyboard navigation breaks at exactly two points: modals and route changes. For modals, focus must move to the dialog when it opens, trap inside it, and return to the trigger when it closes. For route changes, focus should move to the new `<h1>` so screen reader users know where they are.

Both of these require JavaScript. There is no way to do this with CSS alone, and any framework that promises "accessible by default" is fudging it. I wrote a small `useFocusOnRouteChange` hook for the blog navigation, and a small `useFocusTrap` for the mobile menu. They are not complex, but they require intentionality.

## Color contrast as a first-class constraint

I pick palettes in a dark and light variant and verify both with a contrast tool before writing any CSS. The default text on background ratio is at least 7:1 (AAA). The muted text is at least 4.5:1 (AA). The accent color on background is at least 4.5:1.

This sounds tedious. It is tedious. The good news is that once you pick a palette that works, you never have to think about it again. The bad news is that every "pretty" palette you found on a dribbble shot does not pass, and you will have to find a new one.

## Why this matters for a portfolio

A portfolio is, definitionally, something that strangers will look at. Some of those strangers use assistive technology. Some of them are colorblind. Some of them have motor impairments and cannot use a mouse. None of them care that the design is "clean" if they cannot use it.

The thing I have come to believe is that accessibility is a forcing function for design quality. The pages that hold up best under accessibility scrutiny are also the ones that load fastest, read clearest, and survive the most refactors. The discipline of asking "can a screen reader use this?" produces software that is better in every other way as a side effect.

If you are a student engineer reading this: pick one accessibility habit and keep it for a month. Label your inputs. Add a skip link. Set `aria-current="page"` on the active nav link. Make it automatic. Then pick another. Within a year, accessibility stops being something you think about and starts being how you write code.
