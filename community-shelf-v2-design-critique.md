# Community Shelf v2 — Design & UX Critique

**URL:** library.costico.eu
**Date:** March 5, 2026
**Viewports:** Desktop 1440px, Mobile 375px, Dark mode

---

## Executive Summary

Community Shelf has a distinctive, warm visual identity that stands apart from typical SaaS landing pages. The Instrument Serif + DM Sans type pairing, cream-teal palette, and well-crafted card system create a design with genuine character. The updated UX copy ("Create Your Library", "Built for Community Librarians", "Lending & Returns") is a clear improvement.

There are three categories of issues to address: **critical** (accessibility failures that affect usability), **structural** (layout and content gaps that reduce conversion), and **polish** (refinements that elevate the experience).

---

## Part 1: Critical Issues

### 1.1 Body text fails WCAG contrast — hard

This is the single biggest issue on the page. The body text color `sand-400` (#b5a48f) on the `cream` background (#f8f4ed) has a **2.21:1 contrast ratio** — less than half of the 4.5:1 required for WCAG AA compliance.

**Every piece of body copy on the page fails:**

| Element | Foreground | Background | Ratio | Required | Status |
|---|---|---|---|---|---|
| Hero subtitle | sand-400 | cream | 2.21:1 | 4.5:1 | **FAIL** |
| Feature card descriptions | sand-400 | warm | 2.08:1 | 4.5:1 | **FAIL** |
| Features section subtitle | sand-400 | cream | 2.21:1 | 4.5:1 | **FAIL** |
| "See It in Action" button | sand-400 | sand-100 | 1.95:1 | 4.5:1 | **FAIL** |
| Library subdomain text | sand-300 | cream | 1.64:1 | 4.5:1 | **FAIL** |

Meanwhile, the headings (teal-900 on cream: 8.63:1) and CTA button (white on teal-700: 5.62:1) pass easily.

**Fix:** Replace `sand-400` (#b5a48f) with a darker value for all body text. Recommended options:

- **Option A (minimal change):** Use #8a7a66 — gets you to ~3.5:1 (AA Large) while keeping the warm tone
- **Option B (AA compliant):** Use #6b5d4d — achieves 5.2:1 (full AA pass) while staying in the sand family
- **Option C (design system approach):** Create a new `sand-500` token at #6b5d4d and use it for all body text, keeping `sand-400` for decorative/non-essential text only

The "See It in Action" secondary button needs a separate fix — change its text to `teal-800` (#0a5c5f) which already passes at 7.75:1 on cream backgrounds.

### 1.2 Dark mode: subdomain text borderline

`night-500` (#78706a) on `night-950` (#0f0e0d) gives 3.97:1 — fails AA normal text. Bump to `night-400` (#968d85) which achieves 5.92:1.

---

## Part 2: Structural Issues

### 2.1 The hero is a beautiful empty room

The hero section consumes the entire 900px viewport on desktop without showing any hint of the next section. There's roughly 180px of dead space between the CTAs and the fold. On a first visit, some users may not realize the page scrolls.

**What's missing:** A visual element that shows the product. Right now the page is 100% text until you scroll past the fold. Every other successful library/community tool (LibraryThing, Libib, Little Free Library) shows their product in the hero.

**Proposals (pick one):**

- **A. Product screenshot:** A browser-frame mockup showing the Synopsis Library catalog. This is the highest-impact option — it answers "what will my library look like?" instantly
- **B. Illustrated book spines:** A decorative row of colorful book spines at the bottom of the hero, acting as a visual divider. Keeps the editorial feel while adding warmth
- **C. Reduce padding + peek:** Cut `pb-24` to `pb-12` on desktop so the "Built for Community Librarians" heading peeks above the fold, signaling more content below

### 2.2 Libraries section feels sparse with one entry

With only Synopsis Library listed, the "Libraries Already Using Community Shelf" section occupies massive vertical space for minimal content. One small card in a 3-column grid leaves two empty columns and a lot of whitespace — it looks like the page is broken.

**Proposals:**

- **A. Conditional layout:** When there are fewer than 3 libraries, switch from grid to a centered single-column layout with richer detail (description, member count, item count) so the one library feels intentional rather than lonely
- **B. Add placeholder/invitation cards:** Fill empty grid slots with a styled "Your library could be here" card linking to /register — turns emptiness into a CTA
- **C. Embed a preview:** Instead of (or in addition to) a link, show a live screenshot thumbnail of Synopsis Library to give visitors a taste of what a running library looks like

### 2.3 No social proof anywhere on the page

The page asks visitors to create an account without a single piece of evidence that real people use or like the product. This is the #1 conversion blocker for a new SaaS.

**Proposals (in order of effort):**

- **A. Stat bar below hero CTAs:** "1 library · 50+ items cataloged · 100% free" — even small numbers are more trustworthy than no numbers
- **B. Testimonial:** A single quote from someone running Synopsis Library. One real voice is worth more than polished marketing copy
- **C. "As seen in" or partner logos:** If Community Shelf has been featured or partnered with local organizations, display their logos

### 2.4 Footer is too minimal for a product page

The footer contains only a logo and copyright — no links to Terms, Privacy, Contact, About, or social media. For a product asking for user accounts, this raises trust concerns and may violate privacy regulations (GDPR requires a privacy policy link).

**Proposal:** Add a simple footer grid with at minimum:
- Contact email or form link
- Privacy Policy
- Terms of Service
- A GitHub/social link if applicable

---

## Part 3: UX Copy Review (v2)

The UX copy has improved significantly. Here's what the updated version looks like and what could still be refined:

### What's working now
- "Create Your Library" — specific, action-oriented CTA
- "Built for Community Librarians" — speaks to the user's identity
- "Lending & Returns" / "Availability Tracking" — clear, jargon-free feature names
- "Ready to Share?" — emotional, conversational bottom CTA
- "no tech skills required" — directly addresses the target audience's main anxiety

### Remaining copy issues

**A. Nav CTA says "Get Started" while page CTA says "Create Your Library"**
Three labels for /register: "Get Started" (nav), "Create Your Library" (hero), "Create Your Free Library" (bottom). While nav buttons are often shorter, "Get Started" is vague compared to the excellent "Create Your Library."

*Fix:* Change the nav button to "Create Library" — still short enough for the navbar, but consistent with the page language.

**B. "See It in Action" overpromises**
This scrolls to a directory with one library link. A user expecting a demo or video will be disappointed.

*Fix:* Rename to "Browse Libraries" or, better, link directly to `synopsis.library.costico.eu` so the user actually sees a working library.

**C. Section subheads could be more specific**

| Current | Proposed |
|---|---|
| "Catalog your collection, manage lending, and make your library feel like home." | "Seven features that make running a lending library effortless." |
| "See what other communities have built." | "Real libraries, run by real communities." |

---

## Part 4: Visual Design Details

### 4.1 Feature card icon colors lack intentional meaning

The icons use five similar teal shades (#074e52, #0a5c5f, #0d7377, #0d9488) plus one amber (#f5a623). The color differences between the teals are so subtle they appear identical. The amber on "Lending & Returns" stands out but doesn't communicate why that feature is special.

**Proposal:** Two options:

- **Simplify:** Use one color for all icons (teal-700). Clean, consistent, no confusion.
- **Categorize:** Group by purpose: teal for collection management (Catalog, ISBN, Availability), amber for operations (Lending, Lists), sage/green for setup (Branding, Space). This gives the color coding meaning.

### 4.2 The 7-card grid leaves an orphan

Seven feature cards in a 3-column grid creates a 3-3-1 layout. The lone "Your Own Space" card in the last row looks orphaned and breaks visual balance.

**Proposals:**

- **A. Add an 8th or 9th feature** to complete the grid (e.g., "Member Management" or "Activity Feed")
- **B. Make the last card span 2 or 3 columns** so it feels intentional rather than leftover
- **C. Use a 2-column layout for 6 features** and promote the 7th ("Your Own Space") into a standalone banner-style callout, since it's more about architecture than a feature

### 4.3 Dark mode is well-executed with one issue

Dark mode colors are thoughtfully implemented with dedicated `night-*` tokens rather than just inverting. The teal accents pop nicely against the dark background. One issue: the secondary "See It in Action" button is barely visible — its ring border and text almost disappear into the dark card background.

**Fix:** Give the dark mode secondary button a more visible ring: `dark:ring-night-600` → `dark:ring-night-500` and text `dark:text-night-300`.

### 4.4 Mobile layout is clean but could optimize space

Mobile works well — no horizontal overflow, good stacking. Two refinements:

- The hero has excessive top padding on mobile (`pt-16`). On a 375px screen, the badge doesn't appear until ~100px down. Reduce to `pt-8` on mobile.
- Feature cards could benefit from a horizontal icon + text layout on mobile to reduce vertical scrolling (icon left, title + description right), similar to how the library cards work.

---

## Part 5: Proposals Summary (prioritized)

### Must fix (accessibility / trust)

| # | Issue | Effort | Impact |
|---|---|---|---|
| 1 | **Darken body text to meet WCAG AA** | Low (CSS token change) | High — affects every paragraph on the page |
| 2 | **Add footer links** (Privacy, Terms, Contact) | Low | High — trust + legal compliance |
| 3 | **Fix "See It in Action" button contrast** | Low | Medium — currently nearly invisible |

### Should fix (conversion / structure)

| # | Issue | Effort | Impact |
|---|---|---|---|
| 4 | **Add a product visual to the hero** | Medium | High — shows vs. tells |
| 5 | **Add social proof** (stats or testimonial) | Low–Medium | High — reduces signup friction |
| 6 | **Fix libraries section for 1 entry** | Low | Medium — looks broken with one card in a 3-col grid |
| 7 | **Unify CTA labels** | Low | Low–Medium — reduces cognitive friction |

### Nice to have (polish)

| # | Issue | Effort | Impact |
|---|---|---|---|
| 8 | **Fix 7-card orphan** in features grid | Low | Low — visual balance |
| 9 | **Simplify or categorize icon colors** | Low | Low — visual clarity |
| 10 | **Improve dark mode secondary button** | Low | Low — dark mode polish |
| 11 | **Reduce mobile hero top padding** | Low | Low — space efficiency |
| 12 | **Add scroll-to-content animation** | Low | Low — engagement signal |

---

## Contrast Fix — Ready-to-Use CSS

Here's the minimal CSS token change to fix the body text contrast issue:

```css
/* In your Tailwind theme config, replace sand-400 or add sand-500 */
--color-sand-500: #6b5d4d;  /* 5.2:1 on cream, 4.8:1 on warm — passes AA */

/* Alternatively, if you want to keep sand-400 for decorative use: */
--color-sand-400: #8a7a66;  /* 3.4:1 — AA Large only */
--color-sand-500: #6b5d4d;  /* 5.2:1 — AA all text */
```

Then replace `text-sand-400` with `text-sand-500` on all body text elements throughout the landing page.
