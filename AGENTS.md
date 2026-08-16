# AGENTS.md — Alby School of Music Website

This document is the master specification and operational guide for AI coding assistants (Antigravity AI, Claude, Copilot, etc.) and human engineers working on the **Alby School of Music** codebase. Follow all architectural patterns, design guidelines, SEO standards, and performance rules defined here.

---

## 1. Project Overview & Mission

- **Client**: Alby School of Music (Founder: Master Alby)
- **Location**: 123 Harmony Lane, College Road, Coimbatore, Tamil Nadu 641030, India
- **Core Offerings**: Structured, ear-first music lessons for **Piano**, **Guitar**, and **Electronic Keyboard** for all ages (6+ to adults) and skill levels (Beginner to Advanced / Trinity College London grade exam prep).
- **Core Goal**: A blazing-fast, mobile-first, animated marketing website that achieves top search rankings in Google, provides frictionless trial enrollment, and is highly optimized for AI answer engines (ChatGPT, Gemini, Perplexity, Claude) through structured JSON-LD and clean factual citation formatting.
- **Design Theme**: _"Golden Hour Recital"_ — deep plum/ink backgrounds, warm ivory contrasts, luminous amber accents, subtle teal sections, and the signature piano-key divider motif.

---

## 2. Tech Stack & Dependencies

| Layer               | Technology                                 | Specification / Notes                                                                                      |
| ------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Framework**       | Next.js 16 (App Router)                    | All routes inside `app/` directory (no `pages/` directory). Static generation (SSG) preferred.             |
| **Language**        | TypeScript 5                               | Strict type checking on all components, data objects, and helpers.                                         |
| **Styling**         | Tailwind CSS v4                            | CSS-first configuration via `@theme` in `app/globals.css`. PostCSS integration via `@tailwindcss/postcss`. |
| **Animations**      | Framer Motion (`framer-motion`)            | GPU-accelerated (transform & opacity only) with `useReducedMotion()` accessibility fallback.               |
| **Icons**           | Lucide React (`lucide-react`) + Custom SVG | `PianoIcon.tsx`, standard Lucide icons, custom vector social SVGs.                                         |
| **Typography**      | `next/font/google`                         | `Instrument Serif` (headings) and `Inter` (body / UI) loaded via CSS variables with `display: swap`.       |
| **Images**          | `next/image`                               | Mandatory for every image. Explicit dimensions or `fill` with relative parent.                             |
| **Deployment**      | Vercel                                     | Production build target with Edge / Node.js runtime OG image support.                                      |
| **Package Manager** | npm                                        | `package-lock.json` lockfile.                                                                              |

---

## 3. Design System & Design Tokens

Define tokens as CSS variables in `app/globals.css` under `@theme`. **Never use raw, arbitrary hex colors inside components** — use the semantic palette classes or CSS variables.

### 3.1 Color Palette

```css
@theme {
  --color-ink: #211126; /* Primary dark background */
  --color-ink-2: #2c1732; /* Secondary dark background / Card fill */
  --color-ivory: #f8f3e7; /* Light background / Light high-contrast text */
  --color-amber: #e8a33d; /* Primary accent / CTA buttons / Highlights */
  --color-amber-dark: #c9852a; /* Hover & active states for amber CTA */
  --color-teal: #17514e; /* Secondary dark accent / Teal feature panels */
  --color-rose: #c97b84; /* Tertiary soft accent */
  --color-charcoal: #2b2420; /* Body copy text on light ivory backgrounds */

  --font-serif: var(--font-instrument-serif), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
}
```

### 3.2 Signature Design Elements

1. **Piano-Key Divider (`<PianoKeyDivider />`)**:
   - Reusable alternating ivory/plum/teal blocks (`14px` tall) rendered between major page sections instead of plain horizontal rules.
   - Variants: `"dark"`, `"light"`, `"teal"`, `"teal-ink"`.
2. **Floating Quick Contact Bar (`<FloatingContactBar />`)**:
   - Fixed on the middle-right viewport with quick links to WhatsApp, Email, Instagram, and Call.
   - Equipped with desktop hover tooltip pills and accessible ARIA attributes.
3. **Glassmorphic Sticky Header (`<Header />`)**:
   - Backdrop blur (`bg-[#211126]/95 backdrop-blur-md`), interactive animated dropdown for Classes, and slide-in off-canvas drawer on mobile (`<MobileNav />`).

---

## 4. Complete Codebase Directory Map

```
alby-sm/
├── app/
│   ├── layout.tsx                 → Root layout: fonts, global SEO, JSON-LD Org schema, Header, FloatingBar, Footer
│   ├── globals.css                → Tailwind v4 @theme, custom CSS properties, .keys piano strip, reduced-motion
│   ├── page.tsx                   → Homepage: Hero, About snapshot, 3 Class cards, Testimonials, Quick contact
│   ├── api/
│   │   └── contact/
│   │       └── route.ts           → POST API route: Server-side validation, MongoDB persistence via Mongoose
│   ├── about/
│   │   └── page.tsx               → About Us: Story, Philosophy pillars, Academy timeline, Faculty profiles, CTA
│   ├── classes/
│   │   ├── page.tsx               → Classes Overview: Comparison matrix, sticky jumpnav, full course details
│   │   ├── piano/
│   │   │   └── page.tsx           → Piano Class: Uses <ClassPageTemplate>, syllabus levels, schedule, FAQ/schema
│   │   ├── guitar/
│   │   │   └── page.tsx           → Guitar Class: Uses <ClassPageTemplate>, syllabus levels, schedule, FAQ/schema
│   │   └── keyboard/
│   │       └── page.tsx           → Electronic Keyboard: Uses <ClassPageTemplate>, arranger styles, schedule
│   ├── gallery/
│   │   └── page.tsx               → Gallery: Filterable photo grid (Piano, Keyboard, Faculty, Events) + Lightbox modal
│   ├── contact/
│   │   └── page.tsx               → Contact & Booking: Validated trial form with country code selector & DB submit
│   ├── privacy-policy/
│   │   └── page.tsx               → Privacy Policy: Legal data compliance, student privacy rights & contact info
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx           → Admin Login: Password authentication portal
│   │   ├── leads/
│   │   │   └── page.tsx           → Admin Leads: Contact enquiries, enrolment metrics & 1-click WhatsApp
│   │   └── testimonials/
│   │       └── page.tsx           → Admin Testimonials: Dynamic review CRUD & status management
│   ├── sitemap.ts                 → Dynamic Next.js sitemap listing all routes with priorities
│   ├── robots.ts                  → Dynamic robots.txt explicitly allowing search engines and AI crawlers
│   ├── manifest.ts                → Web App Manifest for PWA metadata & theme styling
│   ├── opengraph-image.tsx        → Dynamic branded OpenGraph preview image generated via ImageResponse
│   └── not-found.tsx              → Custom branded 404 error page with quick navigation back home
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx             → Sticky header with dropdown submenu and mobile trigger
│   │   ├── Footer.tsx             → Multi-column academy footer with quick nav, program links & social icons
│   │   ├── MobileNav.tsx          → Off-canvas sliding mobile menu with accordion submenu & body scroll-lock
│   │   └── AdminNav.tsx           → Unified admin portal top header tab bar (Leads & Testimonials)
│   ├── ui/
│   │   ├── PianoKeyDivider.tsx    → Signature alternating piano key divider strip (dark, light, teal variants)
│   │   ├── FloatingContactBar.tsx → Fixed floating quick-contact icons (WhatsApp, Email, IG)
│   │   ├── ScrollReveal.tsx       → Framer motion wrapper with viewport trigger and reduced-motion fallback
│   │   ├── Button.tsx             → Reusable styled button supporting variants (primary, secondary, outline)
│   │   └── SectionHeading.tsx     → Standardized section heading with eyebrow badge, title, and subtitle
│   ├── sections/
│   │   ├── Hero.tsx               → Alternative hero component with metrics and direct GEO answer
│   │   ├── ClassCard.tsx          → Course preview card with badge, age limits, schedule, and curriculum points
│   │   ├── Testimonial.tsx        → Responsive parent & student testimonial grid with 5-star ratings
│   │   ├── ExamsSection.tsx       → Music Grade Exams showcase featuring Trinity, Rockschool RSL & LCM logos
│   │   ├── FAQAccordion.tsx       → Accessible FAQ accordion with Framer Motion height animations
│   │   ├── GalleryGrid.tsx        → Filterable gallery showcase with photo lightbox modal
│   │   └── ContactForm.tsx        → Controlled interactive trial class booking form with feedback states
│   ├── templates/
│   │   └── ClassPageTemplate.tsx  → Shared reusable template for instrument pages (Hero, Levels, Why, Schedule, Schema)
│   └── icons/
│       └── PianoIcon.tsx          → Custom scalable vector Grand Piano SVG icon
│
├── lib/
│   ├── constants.ts               → SINGLE SOURCE OF TRUTH: NAP, class definitions, testimonials, FAQs, social links
│   ├── countries.ts               → Supported country codes, dial prefixes, and phone digit length constraints
│   ├── db.ts                      → Cached MongoDB connection utility via Mongoose
│   ├── models/
│   │   └── ContactSubmission.ts   → Mongoose schema & model for trial class bookings
│   └── seo.ts                     → SEO metadata helper (`constructMetadata`) and JSON-LD schema generators
│
├── public/
│   ├── llms.txt                   → Clean plain-text knowledge summary for AI crawlers & answer engines
│   ├── logo.jpeg                  → Official Alby.sm academy logo
│   ├── favicon.ico                → Favicon icon
│   ├── university_logos/          → High-res exam board logos (Trinity, Rockschool RSL, London College of Music)
│   └── images/                    → Curated high-res local image assets (founder, studio, student practice)
│
├── package.json                   → Dependencies and build scripts
├── postcss.config.mjs             → Tailwind CSS PostCSS plugin config
├── tsconfig.json                  → TypeScript path aliases (@/*) and compiler options
└── AGENTS.md                      → Master instructions and architectural documentation (this file)
```

---

## 5. Centralized Data Architecture (`lib/constants.ts`)

All business data, addresses, course syllabi, testimonials, and FAQs **must remain centralized in `lib/constants.ts`**. Never hardcode addresses, phone numbers, or course data directly in page JSX.

### Core Data Models in `lib/constants.ts`:

1. `ACADEMY_INFO`:
   - `name`: `"Alby School of Music"`
   - `legalName`: `"Alby School of Music Coimbatore"`
   - `formattedAddress`: `"123 Harmony Lane, College Road, Coimbatore, Tamil Nadu 641030, India"`
   - `phone`: `"+91 90435 61694 "`
   - `email`: `"albertebini455@gmail.com"`
   - `whatsappUrl`: Direct WhatsApp API link with prefilled enquiry text.
   - `openingHours`: `"Mon-Fri: 3AM - 10PM, Sun: 4AM - 6AM and 1PM - 8PM"`
   - `geo`: Latitude `11.0168`, Longitude `76.9558` (Coimbatore coordinates).
   - `socials`: Instagram (`@alby_school_of_music`), YouTube (`@albyschoolofmusic`).
2. `CLASSES_DATA`:
   - Typed dictionary for `piano`, `guitar`, and `keyboard` containing `name`, `slug`, `shortDescription`, `geoAnswer`, `ageRange`, `levels`, `schedule`, `highlights`, `curriculum`, `instructorName`, `heroImage`, and `badge`.
3. `TESTIMONIALS`:
   - Verified parent and student reviews with author names, roles, quotes, and star ratings.
4. `FAQS`:
   - Factual Q&A pairs covering age criteria, location, ear-first methodology, equipment, and Trinity exam guidance.

### 5.2 Contact Form Validation & Database Persistence Architecture

The contact booking pipeline in `app/contact/page.tsx` and `app/api/contact/route.ts` implements strict double-layer (client + server) validation:

1. **Full Name**: Mandatory, letters and spaces only (`/^[a-zA-Z\s]+$/`), min 2, max 100 characters. Rejects numbers and special characters.
2. **Country Code & Phone**: Small dropdown of international country codes with flags (`lib/countries.ts`). Dynamically validates and enforces exact digit counts (e.g., India `+91` requires exactly 10 digits; UAE `+971` requires 9 digits; Singapore `+65` requires 8 digits). Input restricted strictly to numeric digits.
3. **Email**: Mandatory, strict email format regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
4. **Interested in (Instrument)**: Mandatory select (`Piano`, `Guitar`, `Keyboard`, `Not sure yet`).
5. **Preferred Time**: Mandatory, restricted exclusively to letters, numbers, hyphens (`-`), periods (`.`), commas (`,`), and spaces (`/^[a-zA-Z0-9\s\-.,]+$/`).
6. **Message**: Optional, restricted exclusively to letters, numbers, hyphens (`-`), periods (`.`), commas (`,`), newlines, and spaces (`/^[a-zA-Z0-9\s\-.,\n\r]*$/`).
7. **Database Storage (`lib/db.ts` & `lib/models/ContactSubmission.ts`)**:
   - Persisted in MongoDB database (`MONGO_URL` / `MONGODB_URI` environment variable) using a global cached Mongoose connection.
   - Saves document with `name`, `countryCode`, `phone`, `fullPhone`, `email`, `instrument`, `preferredTime`, `message`, `ipAddress`, `userAgent`, and `status: "new"`.
8. **UI & UX Animations**:
   - Submitting button with Framer Motion spinner.
   - Animated success receipt banner with personalized greeting and option to submit another request.
   - Inline field error messaging and fallback to WhatsApp if network error occurs.

---

## 6. SEO, GEO & AI Answer Engine Optimization (AIO)

This site is engineered to rank in standard search engines and be directly cited by LLMs (ChatGPT, Gemini, Perplexity, Claude).

### 6.1 Technical SEO Standards

- **Metadata API**: Every route exports unique `metadata` using `constructMetadata()` from `lib/seo.ts`. No duplicate titles or descriptions.
- **Canonical URLs**: Automatically populated per route via `SITE_URL` and route path.
- **Dynamic Sitemap**: `app/sitemap.ts` generates clean XML sitemaps with route priority weighting.
- **Crawler Directives**: `app/robots.ts` allows general crawlers and explicitly permits AI agents: `GPTBot`, `Google-Extended`, `PerplexityBot`, `ClaudeBot`, `CCBot`, `ChatGPT-User`.
- **OpenGraph & Twitter**: Configured in `app/layout.tsx` and dynamically rendered by `app/opengraph-image.tsx`.

### 6.2 Structured Data (JSON-LD)

All schemas are generated through helper builders in `lib/seo.ts` and injected via `<script type="application/ld+json">`:

- **Root Layout (`app/layout.tsx`)**: `MusicSchool` / `EducationalOrganization` schema with NAP, geo coordinates, opening hours, and official social URLs.
- **Class Routes (`app/classes/[slug]/page.tsx`)**: `Course` schema detailing provider, course prerequisites, age range, location, and syllabus timing.
- **Contact Route (`app/contact/page.tsx`)**: `LocalBusiness` and `FAQPage` schemas matching visible page content exactly.

### 6.3 GEO & LLM-Quotable Answer Guidelines

- **Factual Declarative Statements**: Near the top of each page/template, include a 2–3 sentence direct answer summarizing the core offering (e.g. `geoAnswer` in `CLASSES_DATA`).
- **Entity Consistency**: Always use the exact string **"Alby School of Music"** (not variations like "Alby SM" or "Alby Academy").
- **LLM Summary File (`public/llms.txt`)**: A clean, concise markdown reference summarizing the academy's location, offerings, hours, contact info, and route directory. Keep this updated whenever academy details change.

---

## 7. Animation & Performance Rules

### 7.1 Framer Motion Rules

- **GPU-Only Properties**: Animate **only `transform` (e.g. `x`, `y`, `scale`) and `opacity`**. Never animate `width`, `height`, `top/left`, or direct `box-shadow` properties to prevent layout recalculation and mobile jank.
- **Scroll Triggers**: Use `whileInView` with `viewport={{ once: true, margin: "-60px" }}` so animations trigger smoothly once on scroll.
- **Reduced Motion Support**: Always check `useReducedMotion()`. The shared `<ScrollReveal>` component automatically disables motion and falls back to instant opacity for users with `prefers-reduced-motion: reduce`.
- **Above-The-Fold Speed**: Keep hero and initial header animations quick (200ms – 400ms) so text is immediately legible without delay.

### 7.2 Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.0s (Hero images use `priority` and modern WebP/AVIF formats).
- **INP (Interaction to Next Paint)**: < 200ms.
- **CLS (Cumulative Layout Shift)**: < 0.05 (All images have explicit `width`/`height` or aspect-ratio locked parent containers).
- **Server Components**: Pages and layout are React Server Components by default; only interactive components (`Header`, `MobileNav`, `ContactForm`, `FAQAccordion`, `GalleryGrid`, `FloatingContactBar`, `ScrollReveal`) declare `"use client"`.

---

## 8. Mobile-First & Accessibility (a11y) Rules

- **Mobile-First Tailwind**: Write base classes for mobile (360px minimum width), then layer `sm:`, `md:`, `lg:` modifiers for desktop. Never build desktop layouts and shrink them down with negative margins.
- **Tap Targets**: All buttons, links, accordion headers, dropdown toggles, and filter pills must have a minimum interactive target size of **44×44px**.
- **Keyboard Navigation & ARIA**:
  - Accordion triggers must have `aria-expanded`, `aria-controls`, and unique IDs.
  - Lightbox modal supports backdrop click, escape, and close button with clear focus outlines.
  - Mobile menu locks body scrolling on open (`document.body.style.overflow = 'hidden'`) and restores it on unmount.
- **Forms**: All `<input>`, `<select>`, and `<textarea>` elements must have associated `<label>` elements with proper `htmlFor` bindings and appropriate `inputMode` attributes (`inputMode="tel"`, `inputMode="email"`).
- **Color Contrast**: Body copy must satisfy WCAG AA contrast (≥ 4.5:1). Dark backgrounds (`--color-ink`, `--color-ink-2`, `--color-teal`) use ivory (`#F8F3E7`) or amber (`#E8A33D`) text. Light backgrounds use charcoal (`#2B2420`).

---

## 9. Developer Recipes for Future Changes

### Recipe 1: Updating Academy Details (Phone, Hours, Address)

1. Open `lib/constants.ts`.
2. Update the values in `ACADEMY_INFO`.
3. Open `public/llms.txt` and ensure the summary matches the new information.
4. _Result_: The Header, Footer, Floating Contact Bar, Contact Page, JSON-LD schemas, and LLM text will update automatically from this single source.

### Recipe 2: Adding or Modifying a Class Program

1. Open `lib/constants.ts` and add or edit the entry in `CLASSES_DATA`.
2. If adding a new instrument (e.g. `drums`):
   - Add the slug to `id: "piano" | "guitar" | "keyboard" | "drums"`.
   - Create `app/classes/drums/page.tsx` importing `<ClassPageTemplate>` and passing `CLASSES_DATA.drums`.
   - Add the route to `NAV_LINKS` in `lib/constants.ts` and `app/sitemap.ts`.
   - Update `app/classes/page.tsx` with a jumpnav anchor and overview card.

### Recipe 3: Adding Images to the Gallery

1. Place new optimized WebP or JPG files into `public/images/`.
2. Open `components/sections/GalleryGrid.tsx` and `app/gallery/page.tsx`.
3. Add a new item to `GALLERY_ITEMS` with `title`, `category`, `instrument`, `image`, and `caption`.

### Recipe 4: Adding Testimonials or FAQs

1. Open `lib/constants.ts`.
2. Append new items to `TESTIMONIALS` or `FAQS`.
3. _Result_: Visible UI cards on the Homepage and Contact page, as well as the structured `FAQPage` JSON-LD schema, will automatically include the new items.

---

## 10. Definition of Done (DoD) Checklist

Before submitting or deploying any changes, verify:

- [ ] **Type Check & Build**: `npm run build` completes with zero TypeScript or build errors.
- [ ] **Lint**: `npm run lint` passes with zero warnings or errors.
- [ ] **Mobile Responsiveness**: Verified from 360px up to 1440px with no horizontal overflow.
- [ ] **Design Tokens**: All styles adhere to the _Golden Hour Recital_ tokens without hardcoded arbitrary colors.
- [ ] **Accessibility**: Tap targets ≥ 44px, keyboard navigable, labels bound to inputs, reduced-motion respected.
- [ ] **SEO & JSON-LD**: Metadata defined, valid JSON-LD schema generated with no missing fields.
- [ ] **Performance**: Images load via `next/image`, no layout thrashing, animations restricted to transform/opacity.
