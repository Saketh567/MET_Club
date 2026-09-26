# MET Club Website - Release Notes v2.0 (The "Premium Aesthetic" Update)

## What's New ✨
- **Brand New Pages Added:**
  - `history.html`: A clean, legacy-focused timeline displaying past club leadership and team photos.
  - `gallery.html`: A high-energy masonry photo grid showcasing past projects, hackathons, and club life.
  - `blog.html`, `faq.html`, `newsletter.html`: New infrastructure pages set up and wired into the core navigation.
- **Redesigned Mobile Navigation:** Rebuilt the mobile hamburger menu from scratch. It now features a stunning deep ocean green sidebar overlay, elegant Title-Case serif typography, structured borders, and a beautiful Gold "Join MET" pill button at the bottom.
- **Form Upgrades (Showcase Page):** The "Share Your Story" form is now fully functional! It includes a required email field, proper POST routing to `formsubmit.co`, seamless JavaScript validation without annoying page refreshes, and an elegant 2x2 grid layout.

## Enhancements & Polish 💅
- **Footer Typography:** Increased the contrast, brightness, and font-weight of all footer headings to make them highly legible and visually distinct.
- **Intelligent Routing:** Fixed a major bug where navigation links (like "Contact" or "Events") would break if clicked from a sub-page. The navigation now uses absolute routing (`index.html#contact`) ensuring users are smoothly jumped to the right section regardless of what page they are currently on.
- **Dynamic Header Interactions:** The "MET" logo and the close button (X) now intelligently invert their colors to guarantee legibility against the mobile menu background.

## Code Cleanup 🧹
- Enforced strict "Title Case" casing on all raw HTML navigation links so CSS `capitalize` transitions operate cleanly.
- Busted the browser cache for JavaScript dependencies to ensure all users receive the latest form-validation logic instantly.
- Removed legacy dummy/prototype scripts that were previously intercepting form submissions.
