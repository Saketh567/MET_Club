# Project Post-Mortem & AI Guidance
**Project:** MET Club Website (Vanilla HTML/CSS/JS)
**Date:** September 2026

*This document serves as a "Lessons Learned" log and a strict set of guidelines for any AI agent assisting with future projects. Read this before initializing new work.*

---

## 1. Design Philosophy: Premium over Basic
*   **The Mistake:** Defaulting to standard, generic web layouts (e.g., standard white-background mobile menus, generic sans-serif ALL-CAPS fonts).
*   **The Solution:** Pushing for a highly editorial, "premium" aesthetic. We replaced clunky frosted-glass overlays with bold, solid-color (Ocean Green) sidebars. We dropped harsh ALL-CAPS text in favor of elegant Title-Case serif typography. 
*   **Future Rule:** **Never build a "basic" MVP.** Always assume the goal is a visually stunning, high-end design. Use tailored color palettes (Cream, Gold, Deep Green) and elegant typography (like `DM Serif Display`). 

## 2. Tech Stack: The Power of Vanilla
*   **The Choice:** We intentionally avoided modern, heavy frameworks like React, Next.js, and TypeScript.
*   **The Why:** For an informational/marketing website, Vanilla HTML/CSS/JS is drastically superior. It offers blazing-fast load times, zero maintenance debt (no `npm` package updates or deprecations), and is extremely easy for future university students to inherit and maintain.
*   **Future Rule:** Always use the right tool for the job. Don't use a heavy JS framework unless the project actually requires complex, dynamic state management. 

## 3. Global Navigation & Routing Traps
*   **The Mistake:** Using local anchor links (`href="#contact"`) inside a global navigation bar that is shared across multiple pages. This caused the links to fail when clicked from sub-pages (like `team.html`), because the browser was looking for a `#contact` ID that didn't exist on that specific page.
*   **The Solution:** Always use absolute relative routing (`href="index.html#contact"`) for global components.
*   **The Mistake (Part 2):** Injecting a mobile-only button (`nav-join-mobile`) into the HTML but forgetting to explicitly hide it on desktop screens, resulting in a "ghost" text link.
*   **Future Rule:** When designing responsive components, strictly isolate mobile-only and desktop-only elements using `@media` queries and `display: none;` to prevent visual bleeding.

## 4. Advanced CSS over Heavy JavaScript
*   **The Mistake:** Relying on JavaScript to add visual indicators or track UI states.
*   **The Solution:** We outsmarted complex logic by using modern CSS. We used the `:has()` selector to dynamically inject a red asterisk `*` next to labels only if their child `<input>` was required. We also styled invalid inputs exclusively using the `:invalid:not(:placeholder-shown)` pseudo-classes.
*   **Future Rule:** Push CSS to its absolute limits before reaching for JavaScript. It is faster, cleaner, and less prone to bugs.

## 5. Forms, Caching, and Interception
*   **The Mistake:** Form submissions failing silently because (A) an old legacy script was intercepting the submit button, and (B) the browser was aggressively caching the old JavaScript file.
*   **The Solution:** Deleted the conflicting inline scripts, enforced HTML5 `required` constraints, and utilized cache-busting on the script import (`<script src="script.js?v=13"></script>`).
*   **Future Rule:** Whenever you update core JavaScript logic, always bump the cache version in the HTML to ensure the user doesn't get stuck with a broken cached script.

## 6. Accessibility (A11y) is a Silent Superpower
*   **The Concept:** The fear that making a site accessible will ruin the visual beauty.
*   **The Solution:** True modern accessibility is entirely invisible to 99% of users. We added `aria-required` to forms, `autocomplete` tags (for cognitive accessibility autofill), `alt` tags, and clean keyboard `:focus-visible` rings. 
*   **Future Rule:** Build accessibility into the HTML foundation from Day 1. Use semantic tags (`<main>`, `<nav>`) and proper ARIA states immediately.

---

### Final Note to Future AI:
When the user asks you to build or design something, they have an incredible eye for detail and expect a highly polished, aesthetic, and functional result. Do not give them boilerplate code. Think deeply about edge cases (like cross-page routing and caching), write clean Vanilla code, and always prioritize an elegant user experience.
