# AGENTS.md — Alby.sm Music Academy Website

This file is instructions for the AI coding agent (Antigravity AI) building this project. Follow it exactly unless the user says otherwise. When something here is ambiguous, prefer the simplest solution that meets the performance, SEO and accessibility bars below.

## 1. Project Summary

Marketing website for **Alby.sm Music Academy** (Piano, Guitar, Keyboard classes), based in Coimbatore, Tamil Nadu. Goal: fast, animated, mobile-first site that ranks well in Google **and** shows up correctly when AI assistants (ChatGPT, Gemini, Perplexity, Claude) answer questions about the academy.

Design reference: "Golden Hour Recital" concept — deep plum + amber spotlight + piano-key motif. Approved mockups (7 pages: Home, About, Classes overview, Piano, Guitar, Keyboard, Contact, Gallery) exist as static HTML references — rebuild them as real Next.js components, don't just iframe the HTML.

## 2. Tech Stack

- **Next.js** — latest stable version, **App Router** (`app/` directory). No `pages/` directory.
- **TypeScript** for all files.
- **Tailwind CSS v4** — use the new CSS-first config (`@theme` in globals.css), not a `tailwind.config.js` v3-style file, unless the installed version requires it.
- **Framer Motion** (`motion` package) for animation.
- **next/font** for font loading (Instrument Serif + Inter via `next/font/google`) — never load fonts via a `<link>` tag.
- **next/image** for every image — no raw `<img>` tags.
- Deployment target: **Vercel**.
- Package manager: npm (unless the user's existing repos use another one — check for a lockfile first).

## 3. Design Tokens

Define these as CSS variables in `app/globals.css` under `@theme`, and reference them everywhere — no hardcoded hex values in components.

```css
--color-ink: #211126;       /* primary dark bg */
--color-ink-2: #2c1732;     /* secondary dark bg */
--color-ivory: #F8F3E7;     /* light section bg */
--color-amber: #E8A33D;     /* primary accent / CTA */
--color-teal: #17514E;      /* secondary accent */
--color-rose: #C97B84;      /* sparing tertiary accent */
--color-charcoal: #2B2420;  /* body text on light bg */

--font-serif: "Instrument Serif", serif;  /* headings */
--font-sans: "Inter", sans-serif;         /* body/UI */
```

Signature motif: a **piano-key strip divider** (alternating ivory/plum blocks, ~14px tall) used between major sections instead of a plain `<hr>`. Build it as a small reusable `<PianoKeyDivider variant="dark" | "light" />` component.

## 4. Folder Structure (App Router)

```
app/
  layout.tsx                 → root layout, fonts, metadata defaults, JSON-LD org schema
  globals.css
  page.tsx                   → Home
  about/
    page.tsx
  classes/
    page.tsx                 → Classes overview (all 3 instruments)
    piano/
      page.tsx
    guitar/
      page.tsx
    keyboard/
      page.tsx
  gallery/
    page.tsx
  contact/
    page.tsx
  sitemap.ts                 → dynamic sitemap
  robots.ts                  → dynamic robots.txt
  opengraph-image.tsx        → default OG image (per-route override where relevant)
components/
  layout/
    Header.tsx
    Footer.tsx
    MobileNav.tsx
  ui/
    PianoKeyDivider.tsx
    Button.tsx
    SectionHeading.tsx
  sections/
    Hero.tsx
    ClassCard.tsx
    Testimonial.tsx
    FAQAccordion.tsx
    GalleryGrid.tsx
    ContactForm.tsx
lib/
  seo.ts                     → shared metadata helpers, JSON-LD builders
  constants.ts                → NAP (name/address/phone), class data, social links
public/
  llms.txt                   → see Section 7
  og/                        → static OG fallback images
  favicon, apple-touch-icon, manifest.json
```

Each class page (`piano`, `guitar`, `keyboard`) reuses one shared `<ClassPageTemplate>` component and passes instrument-specific content as props/data — don't triplicate the JSX.

## 5. Animation Guidelines

- Use Framer Motion for: hero entrance (fade+slight rise), scroll-triggered reveals on section content, hover states on cards, and the mobile menu open/close.
- Keep every animation to **transform and opacity only** — never animate `width`, `height`, `top/left`, or box-shadow directly (causes layout thrashing / jank on mobile).
- Scroll reveals: use `whileInView` with `viewport={{ once: true, margin: "-80px" }}` so things animate in once, not on every scroll pass.
- Respect `prefers-reduced-motion`: wrap the app in a check (Framer Motion's `useReducedMotion()` hook) and skip/shorten animations when true.
- Keep hero and above-the-fold animations short (200–450ms) — don't make the user wait to read the headline.
- No animation should block interactivity or delay Largest Contentful Paint. If a choice must be made, LCP wins over animation polish.

## 6. Performance Targets

Build for these Core Web Vitals (mobile, real-world 4G, not just desktop Lighthouse):

- **LCP** < 2.0s
- **INP** < 200ms
- **CLS** < 0.05
- Lighthouse Performance score ≥ 90 on mobile.

How:
- All images through `next/image` with explicit `width`/`height` (or `fill` with a sized parent) — this alone prevents most CLS.
- Hero image: `priority` prop, served as AVIF/WebP.
- Lazy-load below-the-fold images and the gallery grid (`loading="lazy"` is default with `next/image` for non-priority images — don't override it).
- Fonts: `next/font` with `display: swap` and only the weights actually used (Inter 400/500/600/700; Instrument Serif 400 + italic).
- No client-heavy libraries unless needed. Framer Motion is fine; avoid adding a second animation library, a heavy carousel library, or jQuery-era dependencies.
- Static-generate every page (`generate.js`-free, plain SSG) — nothing here needs server-side data fetching at request time.
- Split the contact form into a client component; keep everything else a server component by default.

## 7. SEO, GEO & LLM-Visibility Kit

This project needs to rank in classic search **and** be quotable/citable by AI answer engines. Do all of the following — this is not optional polish, it's the deliverable.

### 7.1 Standard technical SEO
- Use the **Metadata API** (`export const metadata` / `generateMetadata`) on every route — unique `title`, `description`, `alternates.canonical` per page. No duplicate titles/descriptions across pages.
- `app/sitemap.ts` — dynamically list every route.
- `app/robots.ts` — allow all standard crawlers; explicitly allow known AI crawlers too (GPTBot, Google-Extended, PerplexityBot, ClaudeBot, CCBot) unless the client later asks to block them.
- Semantic HTML: one `<h1>` per page, logical `<h2>`/`<h3>` nesting, `<nav>`, `<main>`, `<footer>` landmarks, descriptive `alt` text on every image (not "image1.jpg" — describe what's actually in the photo).
- Every internal link uses descriptive anchor text (not "click here").
- 404 page with helpful navigation back into the site.

### 7.2 Structured data (JSON-LD)
Add via a shared `lib/seo.ts` builder, rendered with `<script type="application/ld+json">` in each route's layout/page:
- **Root layout**: `EducationalOrganization` (or `MusicSchool` if supported) schema with name, address, phone, `sameAs` (social links), `openingHours`.
- **Each class page**: `Course` schema — name, description, provider (link back to the org), `coursePrerequisites` (age/level), `hasCourseInstance` with schedule if you have real batch data by launch.
- **Contact page**: `LocalBusiness` schema with full NAP (name/address/phone), geo coordinates, opening hours.
- **FAQ sections** (Contact page, and optionally each class page): `FAQPage` schema mirroring the visible accordion content exactly — never put facts in schema that aren't also visible on the page.
- **Gallery**: `ImageObject` entries where practical.

### 7.3 GEO / LLM-answer optimization
AI answer engines favor pages that state facts plainly and can be quoted in isolation. For every page:
- Put a **direct, self-contained 2–3 sentence answer** near the top of the content (e.g. Piano page opens with "Alby.sm's Piano Class in Coimbatore teaches beginner to advanced students ages 6+, in small batches, using an ear-first method." rather than only a marketing headline). Headlines can stay stylistic; the *body copy right below* should be plain and factual.
- Keep the **FAQ sections real and specific** (already in the design: Contact page + can extend to each class page) — FAQs are the single highest-value format for LLM citation. Answer each question completely in 1–3 sentences, no fluff.
- Make sure key facts — address, phone, class ages, batch days, pricing if published — exist as **plain text in the HTML**, not only inside an image, a form placeholder, or client-side-rendered JS that a crawler might skip. Since we're using SSG, this is mostly automatic — just don't move factual content into client-only components.
- Use consistent entity naming everywhere: always "Alby.sm Music Academy" (not "Alby SM", "Alby.sm Academy", "Alby Music" interchangeably) — LLMs and search engines both reward consistency when tying mentions to one entity.
- Add `public/llms.txt` — a plain-text summary of the site for AI crawlers: what the academy is, what pages exist and what each covers, and the core facts (location, classes offered, contact). Keep it under ~1 page of text, in plain prose/bullets, no marketing tone.
- Prefer clear declarative sentences over vague ones in body copy ("Guitar Class is open to ages 8 and up" beats "Guitar for all ages and levels!").

### 7.4 Social / sharing
- `opengraph-image.tsx` for a default OG image; consider per-page OG images for Home/Classes at minimum.
- Twitter card metadata (`summary_large_image`) via the Metadata API.
- `manifest.json` for PWA basics (name, icons, theme color = `--color-ink`, background color = `--color-ivory`).

## 8. Mobile-First Responsive Rules

Majority of traffic will be mobile — design and build mobile-first, not "desktop then squeeze."

- Write base (unprefixed) Tailwind classes for mobile layout; add `md:`/`lg:` for larger breakpoints, never the reverse.
- Tap targets ≥ 44×44px (nav links, buttons, accordion headers, filter pills).
- Mobile nav: full-width slide-down or overlay menu (already prototyped in the HTML mockups) — must be reachable and closeable with one thumb.
- No horizontal scroll at any breakpoint — test at 360px width minimum.
- Forms (contact form): stack fields full-width on mobile, large touch-friendly inputs, correct `inputmode`/`type` (e.g. `type="tel"` for phone).
- Test the piano-key divider and gallery grid specifically at small widths — they're the most layout-sensitive elements in the design.

## 9. Accessibility

- Color contrast: verify amber-on-ink and ivory-on-plum text combinations meet WCAG AA (4.5:1 for body text) — some amber/ivory combos in the mockup are decorative-only (badges, dividers) and don't need to pass text contrast, but any actual copy does.
- All interactive elements reachable and operable by keyboard (nav, mobile menu toggle, FAQ accordion, gallery filters/lightbox).
- Respect `prefers-reduced-motion` (see Section 5).
- Form inputs have associated `<label>`s (visually hidden is fine if the design uses placeholder-only fields).

## 10. Content & Data

- Centralize class data (name, age range, level, curriculum bullets, batch schedule) in `lib/constants.ts` as typed objects — the three class pages and the classes overview page should all read from this single source, not duplicate copy.
- All current photos/testimonials/faculty names in the mockups are **placeholders** — mark them clearly (e.g. a `// TODO: replace with real content` comment near each) so they're easy to find and swap before launch.
- NAP (name, address, phone) must be identical everywhere it appears (footer, Contact page, JSON-LD) — copy-paste from `lib/constants.ts`, don't retype it.

## 11. Definition of Done

A page/feature is done when:
1. It matches the approved design (colors, type, piano-key divider motif, spacing).
2. It's fully responsive from 360px to desktop with no horizontal scroll.
3. It has unique metadata + relevant JSON-LD.
4. Images use `next/image`, animations use Framer Motion with transform/opacity only and respect reduced-motion.
5. Lighthouse mobile Performance/SEO/Accessibility scores are all ≥ 90.
6. No console errors/warnings in dev or build.