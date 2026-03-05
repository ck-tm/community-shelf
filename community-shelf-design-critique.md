# Community Shelf — Design Critique

**URL:** library.costico.eu
**Date:** March 5, 2026
**Viewports tested:** Desktop (1440px), Mobile (375px)

---

## 1. First Impression (2-second test)

**What draws the eye:** The serif headline "Your Neighborhood Library, Online" immediately grabs attention — the Instrument Serif typeface is distinctive and gives the page a warm, literary character. The teal accent on "Library" reinforces brand color. The eye then moves to the two CTAs.

**Emotional reaction:** Warm, inviting, trustworthy. The cream/beige background (`#f8f4ed`) paired with deep teal (`#074e52`) creates a bookish, cozy feeling — very well-matched to the product. It feels like a place a community organizer would trust.

**Purpose clarity:** Immediately clear. Within 2 seconds I know: it's a free tool for running a community lending library online. The badge "Free for every community" + headline + subhead work together effectively.

**What works well:**
- The serif + sans-serif pairing (Instrument Serif headings / DM Sans body) is elegant and distinctive — not a typical SaaS look
- The warm cream-teal color palette is cohesive and unique
- The "Free for every community" badge builds trust before the headline

---

## 2. Visual Hierarchy

### What's working

- **Clear reading order:** Badge → Headline → Subhead → CTA — textbook hero layout, well-executed
- **Typography hierarchy:** The headline at ~4.5rem is dominant, the subhead at ~1.25rem provides a clear step-down, feature titles at ~1.25rem are appropriately weighted
- **Feature cards** have consistent structure: icon → title → description
- **Whitespace** is generous — sections breathe. The `py-24` spacing between sections gives each room to exist independently

### Issues to address

**A. The hero is vertically too tall / empty**
The hero section takes up the entire viewport at 1440px without showing a single pixel of the next section. There's roughly 200px of dead space below the CTAs before the fold. A visitor might not realize there's more content below.

*Suggestion:* Either reduce the bottom padding (`pb-24` → `pb-16` on desktop) or add a visual element — a subtle product screenshot, an illustration, or even a decorative book-spine graphic — to fill the space and draw the eye downward. A small scroll indicator (chevron-down) could also help.

**B. No social proof above the fold**
The page asks visitors to "Create Your Library" before showing any evidence that real people use the product. The "Libraries Already Using Community Shelf" section is buried near the bottom.

*Suggestion:* Add a small social proof element beneath the CTAs — even something simple like "Trusted by 5 community libraries" or a row of small library logos/avatars.

**C. Feature cards — icon color accent is subtle**
Each feature card has a different accent color on the icon background, but the differences are extremely subtle (variations between `#074e52`, `#0a5c5f`, `#0d7377`, `#0d9488`). Only the amber "Lending & Returns" icon stands out as truly different. The color coding doesn't communicate meaning.

*Suggestion:* Either make the accent colors more distinct (use the amber, teal, and perhaps blue to create a clear visual pattern), or simplify to one consistent color. Half-measures in color coding are worse than no color coding.

**D. The bottom CTA banner has lost copy improvements**
The live site still shows the old copy: "Start Your Library Today" and "Get Started Free" — the source code has the improved versions ("Ready to Share?" / "Create Your Free Library") but they haven't been deployed.

---

## 3. Usability

### Navigation

**Works well:**
- Sticky nav with backdrop blur is clean and functional
- Logo + "Log in" + "Get Started" is the right set of elements
- Dark mode toggle is appropriately subtle (secondary action)

**Issues:**

**A. No in-page navigation**
For a single-page landing, there's no way to jump to Features or Libraries sections from the nav. The only anchor link is the "See It in Action" CTA which scrolls to `#libraries`. Users who scroll back up have no way to quickly return to a section.

*Suggestion:* Consider adding subtle nav links: "Features" and "Libraries" in the navbar, especially once more sections are added.

**B. "See It in Action" sets wrong expectations**
This CTA text implies a demo or video, but it just scrolls to a list of library links. If there's only one library (Synopsis Library) listed, this feels underwhelming.

*Suggestion:* If there are few libraries, consider renaming back to "Explore Libraries" or "See Examples". Alternatively, link to a showcase/demo of an actual library rather than just a directory.

**C. Mobile: CTAs stack well, but tap targets are good**
The mobile layout is clean — CTAs stack vertically, feature cards become single-column. No horizontal overflow issues. Button sizes (py-3.5 px-7) are comfortable for touch.

---

## 4. Consistency

### What's consistent
- Border radius: `rounded-2xl` used consistently on all cards and the CTA banner (`rounded-3xl` for the banner to differentiate)
- Typography: Headings consistently use `font-heading` (Instrument Serif), body uses DM Sans
- Spacing: Sections use consistent `py-24 px-4 sm:px-6 lg:px-8`
- Cards: Hover behavior (translate-y + shadow) is identical across feature cards and library cards

### Inconsistencies found

**A. Three competing CTAs with different labels**
The nav says "Get Started", the hero says "Create Your Library", and the bottom banner says "Get Started Free" (or "Create Your Free Library" in source). Three different labels for the same action (/register) is confusing.

*Suggestion:* Unify to one primary label. Use "Create Your Library" everywhere — it's the most specific and compelling. The nav button can be shorter: "Get Started" is fine there due to space constraints, but at minimum the two page CTAs should match.

**B. Footer is minimal to the point of being incomplete**
The footer has only a logo and copyright. No links to Terms, Privacy, Contact, or social media. For a product asking people to sign up, this feels unfinished and may hurt trust.

*Suggestion:* Add at minimum: a contact email or link, and Terms/Privacy links if they exist.

---

## 5. Accessibility Spot-Check

### Good practices already in place
- `aria-label` on the dark mode toggle button
- `aria-hidden="true"` on decorative icons (Lucide icons)
- Semantic HTML structure (sections, nav, footer, headings)
- Good heading hierarchy (h1 → h2 → h3)

### Concerns

**A. Subtitle text contrast may be low**
The subtitle uses `text-sand-400` which maps to `#b5a48f` on the `cream` background (`#f8f4ed`). Estimated contrast ratio: ~2.5:1. This fails WCAG AA for normal text (needs 4.5:1) and is borderline even for large text (needs 3:1).

*Suggestion:* Darken subtitle text to at least `sand-500` or higher. The same issue applies to feature card descriptions which also use `text-sand-400`.

**B. "See It in Action" ghost button contrast**
The secondary CTA uses `text-sand-400` which has the same low-contrast issue against the cream background.

*Suggestion:* Use `text-teal-800` or `text-sand-500` minimum for the secondary button text.

**C. Bottom CTA banner body text**
`text-teal-100/70` (teal-100 at 70% opacity) on `bg-teal-800` may have borderline contrast. Worth checking.

**D. No skip-to-content link**
The page has no skip link for keyboard users to bypass the navigation.

---

## 6. Specific Improvement Recommendations

### High Priority

| # | Issue | Fix |
|---|---|---|
| 1 | **Subtitle/body text too low contrast** | Change `text-sand-400` to a darker shade (at least `#8a7a66`) for all body copy on the cream background |
| 2 | **Hero feels empty** | Add a product screenshot, illustration, or book-spine visual element to the hero area. Alternatively, reduce vertical padding so the features section peeks above the fold |
| 3 | **No social proof above the fold** | Add a "Trusted by X libraries" line or small logos beneath the hero CTAs |
| 4 | **Deploy the updated copy** | The source code has better copy than what's live — deploy it |

### Medium Priority

| # | Issue | Fix |
|---|---|---|
| 5 | **Unify CTA labels** | Use "Create Your Library" consistently for the primary action |
| 6 | **Add footer links** | Add Contact, Terms, Privacy at minimum |
| 7 | **Feature icon colors lack purpose** | Either diversify meaningfully (different color per category) or use one consistent teal |
| 8 | **"See It in Action" underwhelms** | Link to an actual library demo rather than just the directory, or rename to "Browse Libraries" |

### Low Priority / Polish

| # | Issue | Fix |
|---|---|---|
| 9 | **Add skip-to-content link** | `<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>` |
| 10 | **Add scroll hint to hero** | A subtle animated chevron-down or a visual element breaking the fold line |
| 11 | **Consider a hero image** | A screenshot of an actual library catalog (like Synopsis Library) would ground the product and show rather than tell |
| 12 | **Animate feature cards on scroll** | Cards currently animate on page load via CSS — consider Intersection Observer to trigger animations as they enter the viewport |

---

## 7. What's Working Really Well

The design is already strong — it's not a typical SaaS template. Specifically:

- **Color palette** — the warm cream + deep teal is distinctive, bookish, and trustworthy. Very well-matched to the audience.
- **Typography** — Instrument Serif for headings is a bold choice that pays off. It feels like a real library, not a tech startup.
- **Card design** — the subtle ring borders, warm backgrounds, and gentle hover animations feel polished without being flashy.
- **Dark mode** — properly considered with dedicated `night-*` tokens rather than just inverting. The navbar toggle is appropriately low-key.
- **Mobile layout** — clean, no breakage, good touch targets. The single-column feature cards read well.
- **Code quality** — clean component structure, good use of Tailwind custom theme tokens, semantic HTML.

This is a well-crafted landing page. The improvements above are about going from good to great — not fixing fundamental problems.
