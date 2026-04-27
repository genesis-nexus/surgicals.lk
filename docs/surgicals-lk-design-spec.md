# Surgicals.lk — Design & Build Spec

A trilingual (English / Sinhala / Tamil) medical-supply catalog and quote-request site for Hettiarachchi Surgicals (Galle + Colombo) with an initial ~158-SKU catalog from MG Medicals across Hospital Furniture, Rehabilitation Aids, Medical Equipment, and Medical Consumables.

**v1 is catalog + multi-SKU quote cart + WhatsApp deep-link CTAs — no online payments.**

---

## 1. Project brief

Build surgicals.lk as a mobile-first, trilingual catalog with a quote-request commercial model. Four personas share one domain without tone compromise: hospital/clinic procurement, private practitioners, home-care families, and retail buyers. Prices are not shown in v1; every primary CTA is "Add to Quote" or "Request Quote," plus a product-aware WhatsApp fallback that pre-fills SKU + quantity + locale into wa.me.

**Stack.** Next.js 15 App Router · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix primitives) · React Hook Form + Zod · TanStack Query (client mutations only — RSC handles reads) · next-intl v3 (path-based locale prefix with localized pathnames + hreflang) · Payload v3 on Postgres (self-hosted, locale-aware fields) · Meilisearch (self-hosted, per-locale indices) · Bunny.net CDN for images (`next/image` custom loader) · Resend for transactional email · `wa.me` deep links for WhatsApp in v1, upgrade path to Meta Cloud API.

**Hosting.** Vercel SIN1 + Postgres on Neon `ap-southeast-1`. Meilisearch + Payload co-located on a Singapore VPS. Alternative: single DO Singapore droplet running Next + Payload + Meilisearch + Postgres via Coolify/Dokploy.

**Targets.** LCP <2.5s on throttled 4G from Colombo, CLS <0.1, INP <200ms. WCAG AA minimum, AAA on body text. PDPA-aware consent banner (Consent Mode v2, default denied).

---

## 2. Strategic positioning

**Value proposition.** "Sri Lanka's trilingual medical supply catalog — hospital beds to home-care kits, requested in minutes on WhatsApp."

**Persona pitches.**
- **Hospital / clinic procurement.** Trilingual, NMRA-compliant catalog; build multi-SKU quotes; receive stamped quotation PDF same day.
- **Private practitioner.** Fastest way to check a spec, confirm a code, and WhatsApp the sales team with the exact SKU.
- **Home-care family.** Clear guidance on beds, commodes, walkers — in Sinhala or Tamil — with islandwide delivery and overseas-family payment option.
- **Retail / first aid.** A named distributor with a real NMRA number, not a random Facebook seller.

**Five differentiators everything flows from.**
1. Trilingual by default — not a plugin.
2. Quote cart as the spine, not a downgraded checkout.
3. WhatsApp is product-aware — every CTA pre-fills SKU, quantity, locale.
4. Persona-aware IA — care-setting doors up front; no single-tone compromise.
5. Radical trust transparency — NMRA number, GMP status, MG partnership, Galle heritage shown per SKU and in footer.

---

## 3. Information architecture

### 3.1 Sitemap

```
/
├── /[locale]/ (en | si | ta — path-based, hreflang alternates, default en)
│   ├── / (Home)
│   ├── /for/hospitals (persona landing: B2B procurement)
│   ├── /for/clinics (persona landing: private practitioners)
│   ├── /for/home-care (persona landing: family buyers)
│   ├── /for/retail (persona landing: first aid, consumer)
│   ├── /products
│   │   ├── /products/hospital-furniture
│   │   │   ├── /beds (patient, electric, pediatric, delivery, examination)
│   │   │   ├── /trolleys (stretcher, recovery, dressing, emergency, anesthesia)
│   │   │   ├── /bedside-lockers
│   │   │   ├── /ot-furniture (instrument cabinet, mayo, kick-bucket, stools)
│   │   │   └── /ancillary (over-bed tables, saline stands, screens, oxygen carts)
│   │   ├── /products/rehabilitation-aids
│   │   │   ├── /wheelchairs (manual, commode, electric, pediatric)
│   │   │   ├── /walking-aids (walkers, rollators, canes, crutches)
│   │   │   ├── /mattresses (pressure-relief, ripple, foam)
│   │   │   ├── /daily-living (transfer, toileting, bathing)
│   │   │   └── /orthopaedic (belts, braces, splints, supports)
│   │   ├── /products/medical-equipment
│   │   │   ├── /diagnostic (BP, stethoscope, pulse oximeter, thermometer)
│   │   │   ├── /monitoring (patient monitors, ECG)
│   │   │   ├── /respiratory (oxygen, nebuliser, CPAP)
│   │   │   ├── /surgical-instruments
│   │   │   └── /autoclaves-sterilisation
│   │   └── /products/medical-consumables
│   │       ├── /wound-care (dressings, gauze, bandages, sutures)
│   │       ├── /infection-control (PPE, gloves, masks, disinfectants)
│   │       ├── /injection-infusion (syringes, cannulas, IV sets)
│   │       ├── /diabetic-care (strips, lancets, insulin accessories)
│   │       └── /first-aid (kits, plasters, antiseptics)
│   ├── /products/[slug] (product detail, 158→1000 SKUs)
│   ├── /solutions (condition/setup landing pages)
│   │   ├── /solutions/post-surgical-home-recovery
│   │   ├── /solutions/bedridden-elderly-care
│   │   ├── /solutions/diabetic-daily-care
│   │   ├── /solutions/wound-care-essentials
│   │   ├── /solutions/fall-prevention
│   │   ├── /solutions/clinic-starter-kit
│   │   └── /solutions/icu-hdu-furniture-set
│   ├── /guides (educational content hub)
│   │   └── /guides/[slug]
│   ├── /quote (dedicated quote-cart page)
│   ├── /quote/success/[reference]
│   ├── /account
│   │   ├── /account/quotes
│   │   ├── /account/saved-lists
│   │   ├── /account/addresses
│   │   ├── /account/company (B2B: BR, VAT, TIN, credit terms)
│   │   └── /account/profile
│   ├── /login
│   ├── /register
│   ├── /about (+ /about/galle, /about/colombo)
│   ├── /partners
│   ├── /contact
│   ├── /delivery
│   ├── /warranty-and-service
│   ├── /nmra-and-compliance
│   ├── /privacy
│   ├── /terms
│   └── /diaspora (overseas family payer flow)
├── /api/quote
├── /api/search
├── /api/auth/otp
├── /sitemap.xml
└── /robots.txt
```

### 3.2 Navigation

Two-tier hybrid:
- **Top utility bar** (40px): location toggle "Galle · Colombo", hotline + WhatsApp hotline, language switcher (EN / සිං / தமி), login/account link.
- **Main nav** (72px): surgicals.lk wordmark (left), five items (center) — *For Hospitals & Clinics / For Home Care / Products / Solutions / Guides*, search icon + quote cart with badge count (right).

The Products item opens a compact mega menu on desktop: four columns matching top-level categories, 5–7 sub-categories each, one featured-product tile per column. On mobile, collapses to accordion.

**Care-setting doors are first-class nav items, not hidden in dropdowns** — they carry the persona-aware tone switch.

### 3.3 Taxonomy notes

MG's 4 top categories map directly to `/products/*` branches. MG's SKU numbering convention (MG10xx beds, 20xx gyn/exam, 30xx lockers, 40xx trolleys, 50xx pediatric, 60xx procedure trolleys, 70xx carts/stands, 80xx OT furniture) seeds sub-categories. The taxonomy leaves room for non-MG suppliers.

Each product carries: a primary category path (breadcrumbs), up to three solution tags (e.g., "Post-surgical home recovery"), and a persona tag set (Hospital / Clinic / Home / Retail) for filtered merchandising.

### 3.4 URL structure

Path-based locale routing with **always-on locale prefix**. Slugs translatable via next-intl `defineRouting` localized pathnames. Example: `/en/products/hospital-furniture/beds/two-function-bed-mg-1010`, `/si/products/හස්පිටල්-ගෘහභාණ්ඩ/...`, `/ta/products/மருத்துவமனை-தளபாடம்/...`

Product slugs are human-readable + SKU-suffixed (`two-function-bed-mg-1010`) so procurement can grep by SKU. Canonical is always the current locale URL; hreflang alternates cover all three plus `x-default → /en`.

### 3.5 Breadcrumbs

Home › Products › Hospital Furniture › Beds › Two Function Bed MG 1010. JSON-LD `BreadcrumbList` emitted alongside. On mobile, collapses to parent-only ("← Beds") + current title.

---

## 4. User flows

**B2B procurement.** Land on `/` → "For Hospitals & Clinics" → category tiles + "ICU/HDU furniture set" solution → browse beds → PDP MG 1010 → Add to Quote qty 5 with note → persistent drawer → add MG 4010 qty 3 → Review quote → fill company form (BR, VAT/SVAT, delivery branch, required-by-date, PO ref) → submit → on-screen ref `SRG-2026-000142` + email PDF + WhatsApp → sales team follows up within 1 hour → quotation PDF with pricing → officer signs and emails PO. **Repeat-order path:** login → My Quotes → Reorder.

**Private practitioner.** Google "MG 3020" → PDP directly → scan spec table → "Ask on WhatsApp about this product" → wa.me opens with `Hi, I'm interested in MG 3020 Bedside Locker (SKU MG3020). Quantity: 1. [link]` pre-filled → sales reply within the hour.

**Home-care family.** Facebook ad → `/` → Sinhala elderly-care tile → "For Home Care" → three solutions → "Bedridden home care" → curated product group (bed + ripple mattress + commode + over-bed table) with "Add full kit to quote" → home-address form + "who is this for" field → submit → SMS + WhatsApp Sinhala confirmation → callback scheduled.

**Returning customer.** Cookie login hint → email OTP → dashboard shows last 3 quotes + 1 saved list → select "Monthly wound-care kit" → edit qty on one line → Submit as new quote → 20-second reorder.

---

## 5. Design system (Level 2)

### 5.1 Brand direction

**Recommended: "Modern medical."** Medical teal primary (`#0E7C7B`) + warm coral secondary (`#F06449`) for CTAs + clinical white + ink-black. Neutral sans-serif system pairing Inter (Latin) with Noto Sans Sinhala and Noto Sans Tamil.

Rationale: differentiates from red-hospital (Asiri, Nawaloka), navy-institutional (Lanka Hospitals, Hemas), and lime-retail (Healthguard) competitors. Warm enough for home-care, clean enough for B2B. Holds the entire persona range on one system.

### 5.2 Color palette

| Token | Hex | Role | Contrast on white |
|---|---|---|---|
| `--teal-50` | `#E6F4F4` | Surface tint | — |
| `--teal-100` | `#BFE1E0` | Hover surface | — |
| `--teal-500` | `#0E7C7B` | **Primary** (brand, links) | 5.38:1 AA |
| `--teal-600` | `#0B6260` | Primary hover/active | 7.01:1 AAA |
| `--teal-700` | `#084A48` | Primary pressed | 9.82:1 AAA |
| `--coral-500` | `#F06449` | **Secondary / CTA accent** | 3.48:1 AA-large only — use for backgrounds, not body text |
| `--coral-600` | `#D64A31` | CTA hover | 4.82:1 AA |
| `--ink-900` | `#0F172A` | Body text | 17.89:1 AAA |
| `--ink-700` | `#334155` | Secondary text | 10.47:1 AAA |
| `--ink-500` | `#64748B` | Tertiary / placeholder | 4.75:1 AA |
| `--ink-300` | `#CBD5E1` | Divider / border | — |
| `--ink-100` | `#F1F5F9` | Surface/background | — |
| `--white` | `#FFFFFF` | Canvas | — |
| `--success-500` | `#15803D` | In stock / quote submitted | 4.75:1 AA |
| `--warning-500` | `#B45309` | Low stock / freight alert | 4.66:1 AA |
| `--danger-500` | `#B91C1C` | Errors | 6.63:1 AAA |
| `--info-500` | `#1D4ED8` | Info banners | 7.74:1 AAA |
| `--whatsapp` | `#25D366` | FAB only (brand exception) | — |

**Rules.** Body text is `--ink-900` on `--white` or `--ink-100` (AAA). All CTAs use `--teal-500` or `--coral-600` with white text. `--coral-500` is never used for small text — block/button fill only with white foreground.

### 5.3 Typography

- **Latin display + body:** Inter (variable, subset `latin`).
- **Sinhala body:** Noto Sans Sinhala (variable, subset `sinhala`).
- **Tamil body:** Noto Sans Tamil (variable, subset `tamil`). Hind Madurai as optional upgrade for body-at-small-sizes in a later polish pass.
- **Mono (SKU/code):** JetBrains Mono (variable, subset `latin`).
- All loaded via `next/font/google` with **locale-gated imports** in `app/[locale]/layout.tsx` — do not ship Sinhala glyphs to `/en` pages.

**Scale.** Modular ratio **1.250 (major third)**, base 16px: 12 / 14 / 16 / 20 / 24 / 30 / 38 / 48 / 60.

**Line-height.** 1.5 body / 1.35 subheads / 1.25 display / 1.15 headline.

**Weights.** 400 body / 500 labels / 600 subheads / 700 display.

**Mixed-script fallback stack.** `font-family: var(--font-latin), var(--font-si), var(--font-ta), system-ui, sans-serif;` — browser picks per codepoint, so an English brand name inside Sinhala copy renders in Inter naturally.

### 5.4 Spacing

4px base unit. Tokens: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
Grid gutters: 24 on desktop, 16 on mobile.

### 5.5 Iconography

**Lucide React** as the base — consistent stroke, open-source, tree-shakeable. Medical-specific icons not in Lucide (stethoscope variant, wheelchair-with-commode, IV bag, PPE kit, oxygen cylinder, surgical mask, autoclave, ripple mattress) drawn in-house as 24×24 SVGs, 1.5px stroke, placed in `/src/components/icons/medical/`.

### 5.6 Component state matrix

| Component | Default | Hover | Active | Focus | Disabled | Loading |
|---|---|---|---|---|---|---|
| Button primary | teal-500 bg, white fg, 600 weight | teal-600 bg | teal-700 bg | teal-500 bg + 3px teal-200 ring offset 2px | ink-300 bg, ink-500 fg | spinner + aria-busy |
| Button secondary | white bg, teal-500 fg, 1.5px teal-500 border | teal-50 bg | teal-100 bg | ring spec above | ink-100 bg, ink-300 border | spinner |
| Button ghost | transparent, teal-500 fg | teal-50 bg | teal-100 bg | ring | ink-500 fg | spinner |
| Button destructive | danger-500 bg, white fg | danger-700 bg | danger-900 bg | danger ring | disabled spec | spinner |
| Button icon-only | 40/36/32 sizes square | as above | as above | ring | as above | spinner |
| Input/select/textarea | white bg, ink-300 border, ink-900 fg | ink-500 border | teal-500 border + teal-100 tint | teal-500 border + 3px ring | ink-100 bg, ink-300 fg | skeleton inside |
| Checkbox/radio | 18×18, ink-300 border | teal-50 fill | teal-500 fill + check | ring | ink-300 | — |
| Toggle | 36×20 pill, ink-300 off / teal-500 on | +1 brightness | depressed shadow | ring | 50% opacity | — |
| Product card grid | 1:1 image top, 16px pad, title 2-line clamp, SKU mono 12px, "Request quote" CTA | shadow sm→md, image 1.03 scale 200ms | shadow inner | 3px teal ring around card | reduced opacity | skeleton |
| Product card list | 160×160 image left, title, SKU, spec snippet, qty stepper + "Add to quote" inline right | subtle bg tint | — | card ring | opacity 50% | skeleton |
| Category card | square aspect, icon + label, teal-50 bg | teal-100 bg + teal-500 icon | teal-200 bg | ring | — | skeleton |
| Spec table | two-col, ink-100 row stripe, mono for values | — | — | — | — | skeleton rows |
| Quote cart drawer | right-slide 420px desktop / full-sheet mobile, sticky header, scrollable lines, sticky CTA | — | — | focus trap on open, first interactive element receives focus | — | shimmer rows while adding |
| Quantity stepper | 3-segment (−, input, +), 36px h, ink-300 border | segment bg ink-100 | bg ink-200 | ring on input | opacity 50% | disable during mutation |
| Language switcher | pill dropdown EN / සිං / தமி, flag-free | ink-50 bg | teal-50 bg | ring | — | — |
| Breadcrumb | ink-500 text, "›" separators, last item ink-900 | teal-500 hover | — | underline on focus | — | — |
| Pagination | compact numbers + prev/next, current in teal-500 | bg ink-50 | bg ink-100 | ring | ink-300 | — |
| Toast | 320px rounded card, success/warning/danger/info left stripe + icon, auto-dismiss 4s, dismissible | — | — | — | — | — |
| Modal/dialog | 560px max, ink-900/50 overlay, white card, close X top-right, focus trap, Esc closes | — | — | focus trap | — | — |
| Skeleton | ink-100 shimmer gradient 1.5s ease-in-out | — | — | — | — | — |

### 5.7 Breakpoints

Mobile-first. `sm 480 / md 768 / lg 1024 / xl 1280 / 2xl 1536`.
Product grid columns: 1 / 2 / 3 / 4 / 4.
Nav: hamburger below 1024, full nav from 1024.

### 5.8 Motion

**Durations.** 120ms micro / 200ms standard / 320ms emphasis.
**Easing.** `cubic-bezier(0.2, 0, 0, 1)` standard / `cubic-bezier(0.4, 0, 0.2, 1)` emphasized / `cubic-bezier(0.3, 0, 0.8, 0.15)` exit.
**Use for.** Drawer slide, toast in/out, accordion expand, image fade-in, hover elevation.
**Avoid on.** Page transitions (App Router handles), counters, category icons (they flicker).
**Always respect.** `prefers-reduced-motion: reduce`.

### 5.9 Accessibility

WCAG AA minimum, AAA on body text.

**Focus ring.** `0 0 0 3px rgba(14,124,123,0.45)` + 2px solid teal-500 border — **never removed**.

**Keyboard map.** Tab cycles; Enter submits/activates; Esc closes drawers/modals; Arrow navigates in mega menu and quantity stepper; `/` focuses search.

**ARIA patterns.**
- Quote drawer: `role="dialog" aria-modal="false" aria-labelledby`
- Faceted filter: `role="group"` per facet with `aria-expanded` on collapsible sections
- Toasts: `role="status"` (non-urgent) or `role="alert"` (urgent)
- Language switcher: `aria-haspopup="listbox"`

**Colour is never the sole signal** — stock status pairs icon + text.

### 5.10 Imagery

- **Product grid:** 1:1 square at 480×480.
- **Product hero:** 4:3 (1600×1200 primary, 1200×900 xl, 800×600 lg, 640×480 md, 480×360 sm).
- **Category header:** 16:9.
- All served via Bunny.net Optimizer with WebP + responsive srcset.

**AI-generated product imagery** (ties into the MG catalog build already done): plain white `#FFFFFF` or `--ink-100` background, product centered, soft shadow at base, no text overlay, metric scale bar bottom-right on large equipment.

**Watermark.** `surgicals.lk` in 12px `--ink-500` bottom-left at 50% opacity on the primary hero image only — protects against scraping without dominating the image.

Store originals at 2400px long edge; Bunny resizes on demand.

---

## 6. Page-by-page specs (Level 3)

### 6.1 Homepage

**Desktop layout (1280px canvas, top to bottom).**

1. **Utility bar** (40px h, `--ink-900` bg, `--white` fg). Left: location toggle "Galle · Colombo". Middle: hotline + WhatsApp hotline. Right: language switcher, login/account link.
2. **Main nav** (72px h, `--white` bg, shadow on scroll). Left: wordmark. Center: 5 nav items. Right: search icon, quote cart icon with badge count.
3. **Hero** (520px desktop / 420px mobile). Split layout: left 60% message block on `--teal-50` tint, right 40% image. Locale-aware headline. Subhead references Galle heritage + Colombo expansion + MG partnership in one sentence. Two CTAs: primary "Browse Products" → `/products`; secondary "Request a Quote" → `/quote`. **Not persona-segmented on first visit** — broadcasts positioning. Returning visitors with a persona cookie see a tuned hero.
4. **Persona doors strip** (four cards, full-bleed row): Hospitals & Clinics / Home Care / Clinics & Practitioners / Retail & First Aid. Each: icon + label + 1-line description + "Explore →". Routes to `/for/*`.
5. **Shop by category** (4-card grid): four top categories, each with icon + SKU count + top 3 sub-categories inline.
6. **Solutions / "Shop by Need" rail** (horizontal scroll on mobile, 3-col desktop): Post-surgical recovery / Bedridden home care / Diabetic daily care / Clinic starter kit / ICU-HDU set. Links to `/solutions/[slug]`.
7. **Trust bar.** Dual-line strip: "N hospital projects · M institutional clients · NMRA-registered products · ISO-certified partner (MG Medicals) · X+ years (Galle)". Partner/supplier logos below. *Verify numbers before launch; if unverifiable, remove.*
8. **Featured products / bestsellers** (4-card grid). Pulled from a "featured" flag in CMS. On returning B2B visits, this slot swaps to **"Quick reorder from your recent quotes"** pulled from the account.
9. **Content block** (3 latest guides): title + hero image + read-time + locale badge. Links to `/guides/[slug]`.
10. **Diaspora callout strip.** One-row banner: overseas family buying for SL recipient → `/diaspora`.
11. **Footer** (6-col desktop, stacked mobile). Col 1: wordmark + 1-line positioning + language switcher. Col 2: Products (4 top cats). Col 3: Solutions + Guides. Col 4: Company. Col 5: Help (Delivery, Warranty, NMRA & Compliance, Privacy, Terms). Col 6: Connect (WhatsApp + phone per location, email, Facebook). Below: © + NMRA-compliance strap.
12. **WhatsApp FAB.** Fixed bottom-right 56×56, `--whatsapp` bg, icon only, localized `aria-label`. Opens wa.me with a locale-aware "Hi, I need help on surgicals.lk" prefill.

**Mobile (375px).** Hero stacked (image below text, 280px h). Persona doors horizontal snap-scroll. Category cards 2-col grid. Solutions rail horizontal snap. Footer accordion.

### 6.2 Category / listing

Breadcrumb bar → category hero (title + 1-sentence description + SKU count). Two-column body: **left rail 280px filters**, right main grid.

**Filters** (stacked, collapsible):
- Sub-category tree (current branch expanded)
- Brand / Supplier
- Price range (only for retail-price SKUs; hide for quote-only)
- Availability (In stock / Available to quote / Made-to-order)
- Features (Electric / Manual / Pediatric / Bariatric / Sterile / Latex-free — per category)
- NMRA-registered toggle
- Persona tag (Hospital / Clinic / Home / Retail) — mostly implicit

**Toolbar** above grid: result count, sort (Featured / Newest / Name A–Z / Price asc-desc where applicable), grid/list toggle, page-size chooser (24 / 48 / 96). Grid default: 4 columns at xl, 3 at lg, 2 at md, 1 at sm.

**Product card (grid variant).** 1:1 image with placeholder fallback; hover reveals quick-view + "+ Quote" icon button. Below image: brand (ink-500 12px), title (ink-900 16px, 2-line clamp), SKU mono 12px, spec snippet one-liner (ink-700 14px, e.g., "Steel frame, 3-section, electric"), trust row (NMRA badge if applicable + freight icon if oversized), stock pill (In stock / Available to quote / Lead time 4–6 wk), primary CTA **"Add to Quote"** + secondary "View" icon. **Never "Buy now"** — CTA consistency trains the user on the quote model.

**Decision: classic pagination** (numbered), not infinite scroll. B2B procurement officers need "page 3" as a citation; pagination keeps memory low on 4G. Infinite scroll only inside the quote cart drawer.

**Empty state.** Illustrated ink-300 stethoscope icon + "No products match these filters in this category yet" + "Clear filters" + "Browse parent category" + "Request what you need via WhatsApp" CTA.

**Loading state.** 12 skeleton cards in the grid.

**Mobile filter drawer.** "Filters" button in toolbar shows badge of applied count. Opens bottom-sheet drawer (full height on small screens) with full left-rail inside. Sticky footer: "Clear all" (ghost) + "Apply (N results)" (primary). Filter chips render at top of grid, individually removable.

### 6.3 Product detail

**Above fold.** Breadcrumb. Two-col: left 55% gallery, right 45% info panel.

**Image gallery.** 4:3 main image with zoom on hover (desktop) + pinch-zoom (mobile); thumbnails below (up to 6 including lifestyle/in-use shot, scale-bar shot, detail shot). Lightbox on click. Video embedded as 2nd or 3rd thumb where available.

**Info panel** (sticky on desktop ≥lg). H1 title, brand/MG line "From MG Medicals · SKU **MG1010**" (monospace SKU), short tagline, NMRA badge pill ("NMRA-registered · R/xxxx/yyyy") when applicable, 2-line summary.

**Price visibility.** Default is **"Request Quote" — no price shown**. Retail-suitable SKUs (first-aid kits, BP monitors, thermometers, basic consumables) carry an **"Indicative retail price" band** ("Approx. LKR 8,500–10,500 per unit — final confirmed in quotation") with a "?" tooltip explaining the variance.

**CTAs.** Quantity stepper + primary **"Add to Quote"** (full-width). Secondary **"Ask on WhatsApp about this product"** opens wa.me with:
```
Hi, I'd like info on [Product title] (SKU [MG-CODE]). Qty: [N]. [URL]
```
in the active locale. Tertiary ghost button **"Download datasheet (PDF)"** when available.

**Below-fold sections** (tabbed on mobile, stacked on desktop):

- **Specifications.** Two-col spec table, mono values. Material, dimensions (mm + imperial optional), weight capacity, power, certifications.
- **Features.** Bullet list capped at 8 items.
- **Compatibility / works with.** Linked product tiles (for a bed: recommended mattress, locker, over-bed table). Enables "often bought with" cross-sell.
- **Clinical notes / usage guidance.** Where relevant, a 2–4 sentence clinician-reviewed note with source attribution.
- **Warranty & after-sale.** Warranty duration, service centres (Galle + Colombo), spares availability, expected service lead time.
- **Downloads.** Datasheet PDF, user manual PDF, NMRA certificate link.
- **Related products.** 4-card rail.

**Reviews: skipped in v1.** B2B buyers don't rely on public reviews and a sparse section looks worse than none. Re-evaluate once retail volume passes a threshold.

**Mobile sticky "Request Quote" bar.** Below 768px, a fixed bottom bar appears after scrolling past the fold: condensed title + quantity stepper + "Add to Quote" primary button.

**Structured data.** Per-PDP JSON-LD combining `["Product", "MedicalDevice"]` with `purpose`, `indication`, `relevantSpecialty`, `manufacturer`, `sku`, `gtin` when available, and an `Offer` containing `priceCurrency`, `availability`, `businessFunction: Sell`. **Omit `price` field on quote-only SKUs** — honest > wrong. Also emit `BreadcrumbList` + `Organization` references.

### 6.4 Quote cart / enquiry flow

**Quote cart drawer** (persistent site-wide). Right-slide 420px desktop, bottom-sheet mobile.

- **Header:** "Your Quote" + count + close.
- **Body:** scrollable line list — each line shows thumbnail, title (1-line clamp), SKU, quantity stepper, "remove" icon, "Add note" toggle that expands a per-line textarea ("For ward 3B").
- **Footer:** "Items: N · Continue to quote request →" primary CTA.
- **Empty state:** icon + "Your quote is empty" + link back to products.

**Dedicated `/quote` page.** Two-col on desktop (left 60% line items, right 40% sticky form); single-column stacked on mobile.

**Line-items column.** Table of lines with editable quantity, per-line note, remove, bulk actions ("Clear all", "Save as list"), subtotal counter. **No price sums in v1** — the subtotal is "N products, M units".

**Customer details form** (sticky-right desktop, scrollable-below mobile). Fields:

- **Persona radio:** Institution (hospital/clinic) · Private practitioner · Home care / individual · Retail. Branches the form: institution adds BR number, VAT/SVAT number, procurement contact role, PO reference; others simpler.
- Full name, company (institution only), role, email, phone (country code default +94), WhatsApp-same-as-phone toggle.
- Delivery area (district dropdown + address textarea).
- Required-by date (date picker, default +7 days).
- Preferred response channel (Email / WhatsApp / Phone).
- Additional notes (textarea).
- **PDPA consent checkbox** ("I agree surgicals.lk may contact me about this quote" — separate from any marketing opt-in).
- Optional **"Paying from overseas?"** checkbox expanding a diaspora sub-form (payer name, payer country, recipient contact in SL).

**Validation.** React Hook Form + Zod. Inline errors on blur, summary on submit. `aria-invalid` + `aria-describedby` linked to error messages.

**Submission.** POST `/api/quote` with signed payload. Success path:
1. On-screen reference `SRG-2026-NNNNNN`
2. Transactional email to customer with quote-summary PDF attached (`@react-pdf/renderer`)
3. WhatsApp auto-message via Meta Cloud API in selected locale if that was preferred channel — **v1 fallback is a wa.me deep link on the success page** until Cloud API is provisioned
4. Slack/email alert to sales team

**Success page `/quote/success/[reference]`.** Reference ID + "What happens next" timeline (Received → Sales review → Quotation sent → You confirm → Delivery) + "Download your submitted quote (PDF)" + "Continue browsing" + share-on-WhatsApp deep link. Data persists for unauthenticated users via reference ID + email challenge for retrieval.

### 6.5 Account / dashboard

**Login/register.** Recommended: **email + OTP** primary, **phone + OTP** secondary. Email wins because B2B procurement inboxes are the system of record; phone OTP lower-friction for home-care/retail. **Skip passwords in v1** — passwordless OTP removes credential-stuffing risk and reduces support load. Session: signed HTTP-only cookie, 30-day sliding expiry.

**Registration** collects minimum: email, name, locale. Persona deferred to first quote submission.

**Dashboard landing (`/account`).** Greeting + "Your recent activity" panel: last 3 quotes with status chips (Pending review / Quoted / Approved / Completed / Cancelled), last saved list, profile completeness nudge. Left rail (desktop) / accordion (mobile): Quotes / Saved Lists / Addresses / Company / Profile / Logout.

**My Quotes (`/account/quotes`).** Filter chips by status + date range. Row: reference, date, item count, status, actions (View, Reorder, Download PDF). Click opens quote detail with full line history and sales comms log.

**Saved Lists (`/account/saved-lists`).** Named lists with item count and last-used date. "Load into quote" copies all lines into the active quote cart.

**Addresses (`/account/addresses`).** Multiple delivery locations — label, contact person, phone, address, district. One marked default.

**Company (`/account/company`, B2B).** Company name, BR number, VAT/SVAT number, TIN, primary procurement contact, optional credit-terms note ("Our standard is 30 days PO"), logo upload. Prefills future quotes.

**Profile (`/account/profile`).** Name, email, phone, locale preference, notification preferences (email/WhatsApp for quote status changes), **delete-account link (PDPA right)**.

---

## 7. Technical architecture details

### 7.1 Search

**Meilisearch self-hosted on the same VPS.** Sinhala and Tamil fall through Charabia's Unicode whitespace pipeline (no dedicated stemmers — neither Meilisearch nor Typesense have one for SI/TA, but both scripts use whitespace between words so tokenization works). Typo tolerance + prefix search at grapheme-cluster level. **One index per locale** for cleaner ranking, shared filter attributes (category, brand, persona-tags, availability). Maintain a hand-edited **synonyms file** for trilingual medical terms:
```
රෝද පුටුව <-> wheelchair <-> சக்கர நாற்காலி
```

**Alternatives considered.** Typesense (near-identical, RAM-hungry) or Postgres FTS with `pg_trgm` + `unaccent` (viable at <1k SKUs, weaker prefix UX). **Avoid Algolia** — cost balloons and SL latency is no better.

### 7.2 i18n

**next-intl v3+** with `localePrefix: 'always'`, localized pathnames per segment, auto hreflang Link response headers. ICU MessageFormat for plurals/currency. Localized slugs on marketing landing pages; product slugs stay SKU-suffixed Latin for grep.

### 7.3 Image pipeline

**Bunny.net CDN + Bunny Optimizer (~$10–15/mo).** Colombo PoP (best SL latency). `next/image` with `loader: 'custom'` pointing at Bunny's URL transform syntax. Store 2400px WebP originals in Bunny Storage; serve 480/640/800/1200/1600 widths via srcset.

**Alternatives.** ImageKit (free 20GB tier, good if you want a DAM UI). **Avoid Cloudinary** ($99/mo Plus) and **Vercel's built-in image optimization** (edge not in Colombo, per-transform billing).

### 7.4 Hosting

**Vercel SIN1 for Next.js** (free or $20/mo Pro) + **Neon/Supabase Postgres in Singapore `ap-southeast-1`** (free tier → $19/mo). RTT Colombo→Singapore typically 30–60ms — acceptable for ISR-heavy catalog traffic. Configure dynamic API routes with `export const preferredRegion = 'sin1'`.

**Alternative: single DO Singapore droplet** ($12–24/mo) running Next + Payload + Meilisearch + Postgres via Coolify/Dokploy — lowest TCO, full ownership.

**Avoid** local SL hosts (weak peering, load-shedding, no PaaS).

### 7.5 Forms, email, WhatsApp

React Hook Form + Zod everywhere. **Resend** for transactional email (3k/mo free, then $20/mo) with React-authored templates. **WhatsApp: wa.me deep links in v1** with URL-encoded prefills `https://wa.me/94XXXXXXXXX?text=<prefill>`. Upgrade path: **Meta Cloud API direct** (no BSP markup) when automated quote-status messages justify it. Meta switched to per-message pricing 1 July 2025; utility templates within the 24h service window are free. Skip Twilio and 360dialog until volume demands a BSP.

### 7.6 Analytics + consent

**GA4 + Microsoft Clarity**, both free. Clarity is essential trilingually — it shows whether SI/TA users actually reach the filter. PDPA (Act No. 9 of 2022, amended Act No. 22 of 2025) is GDPR-modelled. Ship a trilingual consent banner with granular accept/reject, **Consent Mode v2 defaults to `denied`**, analytics fires only on opt-in. Strictly-necessary cookies (`NEXT_LOCALE`, session, CSRF) don't need consent.

### 7.7 SEO + schema

- Per-PDP JSON-LD `["Product", "MedicalDevice"]` with `purpose`, `relevantSpecialty`, `manufacturer`, `sku`, and an `Offer` (omit `price` for quote-only SKUs).
- `BreadcrumbList`, `Organization` (referenced by @id), `WebSite` with `SearchAction`.
- `hreflang` via `generateMetadata` `alternates.languages` for all three locales + `x-default → /en/...`.
- Sitemap via `app/sitemap.ts` with per-URL `alternates.languages`.
- `<html lang={locale} dir="ltr">` — all three scripts are LTR.
- `FAQPage` schema on guide pages; `HowTo` on setup guides; `LocalBusiness` for Galle and Colombo separately (each with `openingHoursSpecification`, `geo`, distinct `sameAs`).

### 7.8 Performance budget

- LCP <2.5s on throttled 4G from Colombo
- CLS <0.1
- INP <200ms
- Route-scoped font loading (no Sinhala glyphs on `/en`)
- Product grid served via ISR, 1-hour revalidate
- Product PDP served via ISR with on-demand revalidation when CMS updates
- Images in WebP with explicit width/height (prevent layout shift)
- Third-party scripts (GA4, Clarity) deferred and gated behind consent

---

## 8. Design tokens (`src/design/tokens.ts`)

```ts
export const tokens = {
  color: {
    teal: { 50:'#E6F4F4', 100:'#BFE1E0', 500:'#0E7C7B', 600:'#0B6260', 700:'#084A48' },
    coral: { 500:'#F06449', 600:'#D64A31' },
    ink: { 100:'#F1F5F9', 300:'#CBD5E1', 500:'#64748B', 700:'#334155', 900:'#0F172A' },
    white: '#FFFFFF',
    success: '#15803D', warning: '#B45309', danger: '#B91C1C', info: '#1D4ED8',
    whatsapp: '#25D366',
  },
  font: {
    latin: 'var(--font-latin)',
    si: 'var(--font-si)',
    ta: 'var(--font-ta)',
    mono: 'var(--font-mono)',
    stack: "var(--font-latin), var(--font-si), var(--font-ta), system-ui, sans-serif",
  },
  scale: [12,14,16,20,24,30,38,48,60], // px, ratio 1.25
  lineHeight: { body: 1.5, sub: 1.35, head: 1.25, display: 1.15 },
  weight: { body: 400, label: 500, sub: 600, head: 700 },
  space: [0,4,8,12,16,20,24,32,40,48,64,80,96,128],
  radius: { sm: 6, md: 10, lg: 14, xl: 20, pill: 999 },
  shadow: {
    sm: '0 1px 2px rgba(15,23,42,0.06)',
    md: '0 4px 12px rgba(15,23,42,0.08)',
    lg: '0 12px 32px rgba(15,23,42,0.12)',
    focus: '0 0 0 3px rgba(14,124,123,0.45)',
  },
  motion: { fast:120, base:200, slow:320, ease:'cubic-bezier(0.2,0,0,1)' },
  breakpoint: { sm:480, md:768, lg:1024, xl:1280, '2xl':1536 },
} as const;
```

## 9. Tailwind config (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss';
import { tokens } from './src/design/tokens';

export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    screens: Object.fromEntries(
      Object.entries(tokens.breakpoint).map(([k,v])=>[k,`${v}px`])
    ),
    extend: {
      colors: {
        brand: tokens.color.teal,
        accent: tokens.color.coral,
        ink: tokens.color.ink,
        success: tokens.color.success,
        warning: tokens.color.warning,
        danger: tokens.color.danger,
        info: tokens.color.info,
      },
      fontFamily: {
        sans: tokens.font.stack.split(','),
        mono: [tokens.font.mono, 'monospace'],
      },
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
      transitionDuration: { fast:'120ms', base:'200ms', slow:'320ms' },
      transitionTimingFunction: { brand: tokens.motion.ease },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config;
```

## 10. File structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              // locale-gated fonts + next-intl provider
│   │   ├── page.tsx                // Home
│   │   ├── for/
│   │   │   ├── hospitals/page.tsx
│   │   │   ├── home-care/page.tsx
│   │   │   └── retail/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx            // all products
│   │   │   ├── [...category]/page.tsx  // catch-all category listing
│   │   │   └── [slug]/page.tsx     // PDP
│   │   ├── solutions/[slug]/page.tsx
│   │   ├── guides/[slug]/page.tsx
│   │   ├── quote/
│   │   │   ├── page.tsx
│   │   │   └── success/[reference]/page.tsx
│   │   ├── account/
│   │   │   ├── layout.tsx          // auth guard
│   │   │   ├── page.tsx
│   │   │   ├── quotes/page.tsx
│   │   │   ├── saved-lists/page.tsx
│   │   │   ├── addresses/page.tsx
│   │   │   ├── company/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── diaspora/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── (policy)/{privacy,terms,nmra-and-compliance,delivery,warranty-and-service}/page.tsx
│   ├── (payload)/                  // Payload admin mount
│   ├── api/
│   │   ├── quote/route.ts
│   │   ├── auth/otp/route.ts
│   │   └── search/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                         // shadcn primitives
│   ├── product/{ProductCard,ProductGallery,SpecTable,QuantityStepper,RelatedProducts,QuoteCtaBar}.tsx
│   ├── quote/{QuoteDrawer,QuoteLineItem,QuoteForm,QuoteSuccess}.tsx
│   ├── nav/{TopBar,MainNav,MegaMenu,MobileMenu,LanguageSwitcher,Footer}.tsx
│   ├── filters/{FilterRail,FilterDrawer,FilterChip,SortSelect}.tsx
│   ├── home/{Hero,PersonaDoors,CategoryGrid,SolutionsRail,TrustBar,FeaturedProducts,GuidesBlock,DiasporaStrip}.tsx
│   ├── account/{DashboardCard,QuoteStatusChip,SavedListRow}.tsx
│   ├── floating/{WhatsAppFab,ConsentBanner,Toaster}.tsx
│   └── icons/{lucide-re-exports.ts,medical/*.tsx}
├── design/tokens.ts
├── i18n/
│   ├── routing.ts                  // defineRouting with localized pathnames
│   ├── request.ts                  // getRequestConfig
│   └── messages/{en,si,ta}.json
├── lib/
│   ├── payload.ts                  // Local API client
│   ├── meilisearch.ts              // search client
│   ├── whatsapp.ts                 // wa.me prefill builder
│   ├── pdf.ts                      // quote PDF generator (@react-pdf/renderer)
│   ├── email.ts                    // Resend client + templates
│   ├── auth.ts                     // OTP issue + verify
│   ├── analytics.ts                // consent-aware GA4/Clarity loaders
│   └── seo.ts                      // JSON-LD builders, hreflang helpers
├── payload/
│   ├── config.ts
│   ├── collections/{Products,Categories,Brands,Guides,Solutions,Media,Users,Quotes,SavedLists,Companies}.ts
│   └── globals/{HomeContent,Footer,TrustBar}.ts
└── styles/globals.css
```

---

## 11. First-sprint build order (2 weeks)

1. Repo + Next 15 + TS + Tailwind + shadcn init; `tokens.ts`; `tailwind.config.ts`; global CSS; Inter + Noto Sans Sinhala + Noto Sans Tamil via `next/font` with locale-gated loading.
2. next-intl routing (`/en` `/si` `/ta` with localized pathnames); middleware; `[locale]/layout.tsx`; message files with English copy + SI/TA stubs; hreflang `generateMetadata` helper.
3. Payload v3 mounted at `(payload)`; collections: `Products`, `Categories`, `Media`, `Brands`; seed 10 sample products across 4 categories with locale-aware title/description/specs.
4. Design system components: `Button`, `Input`, `Select`, `Checkbox`, `QuantityStepper`, `LanguageSwitcher`, `Breadcrumb`, `Toast`, `Dialog`, `Sheet`.
5. Layout shell: `TopBar`, `MainNav`, `MegaMenu`, `Footer`, `WhatsAppFab`, `ConsentBanner`.
6. Homepage per §6.1: `Hero`, `PersonaDoors`, `CategoryGrid`, `SolutionsRail`, `TrustBar`, `FeaturedProducts`, `GuidesBlock`.
7. Category listing: `[...category]/page.tsx` with `FilterRail` + `FilterDrawer` + `SortSelect` + `Pagination` + `ProductCard`.
8. Product detail: `[slug]/page.tsx` with `ProductGallery`, `SpecTable`, `RelatedProducts`, `QuoteCtaBar` (mobile sticky), JSON-LD `Product+MedicalDevice`.
9. Quote cart: Zustand store + `QuoteDrawer` + `/quote` page + `QuoteForm` with Zod + `/api/quote` POST + Resend email + wa.me deep link on success.
10. Meilisearch self-host, index seed, `/api/search` route, search bar in nav.
11. SEO pass: `sitemap.ts`, `robots.ts`, per-page metadata, `Organization` and `WebSite` JSON-LD.
12. Analytics + consent: GA4 + Clarity gated behind `ConsentBanner`.
13. Deploy to Vercel SIN1 + Neon Singapore + Bunny.net; smoke test; Lighthouse on mobile 4G.

---

## 12. Component stubs (build order within §11.4 and ongoing)

`Button` → `Input` → `Select` → `Checkbox` → `RadioGroup` → `Toggle` → `QuantityStepper` → `Toast`/`Toaster` → `Dialog` → `Sheet` (drawer) → `LanguageSwitcher` → `TopBar` → `MainNav` → `MegaMenu` → `MobileMenu` → `Footer` → `Breadcrumb` → `Hero` → `PersonaDoors` → `CategoryGrid` → `ProductCard (grid)` → `ProductCard (list)` → `FilterRail` → `FilterDrawer` → `SortSelect` → `Pagination` → `ProductGallery` → `SpecTable` → `QuoteCtaBar` → `QuoteDrawer` → `QuoteLineItem` → `QuoteForm` → `QuoteSuccess` → `WhatsAppFab` → `ConsentBanner` → `AuthOtpForm` → `DashboardCard` → `QuoteStatusChip` → `SavedListRow`.

---

## 13. Phase roadmap beyond v1

**Phase 2 — accounts & retention (weeks 10–18).** Email-OTP login, account dashboard, saved lists, quote history, PDF downloads, company profile, reorder flow. B2B onboarding microsite. Expand SI/TA to 100% of products. Target: 25%+ of monthly quotes from returning logged-in users.

**Phase 3 — online payments & logistics (weeks 18–30).** PayHere integration for retail SKUs only (B2B stays quote-based); LKR card + LankaQR + Koko BNPL. Delivery tracking via Pronto Lanka or Aramex. "Paid by overseas family" flow with card-payer/delivery-recipient split. Target: 15% of retail-suitable orders convert to card within 2 months.

**Phase 4 — content & SEO push (weeks 30–52).** 20+ guides across EN/SI/TA, clinician-bylined. Backlink outreach via MG and partner hospitals. Blog cadence 2/month. Google Merchant Center feed for retail-priced SKUs. Target: organic traffic doubles q/q; top-3 rank on "hospital bed Sri Lanka," "wheelchair Colombo," "first aid kit Sri Lanka" in all three locales.

---

## 14. Differentiator features (ranked effort-vs-impact)

1. **Care-setting bundles with one-click quote.** "Clinic starter kit (60 essentials)", "ICU/HDU 4-bed ward furniture set", "Post-stroke home-care bundle" — single quote line group. *Low effort, high impact. Phase 1.*
2. **Trilingual product search that actually works.** Meilisearch with SI/TA tokenization + hand-maintained synonyms file. *Medium effort, very high differentiation. Phase 1.*
3. **WhatsApp-first quote submission with product-aware pre-fill.** Submit button opens WhatsApp with full quote serialized (SKU, qty, notes, customer ref), also writes to DB. *Low effort, high impact. Phase 1.*
4. **Diaspora-payer flow.** `/diaspora` landing + checkbox on quote form. Captures segment Kapruka currently owns by default. *Low effort, medium-high impact. Phase 2.*
5. **Home-care assessment quiz.** 6-question flow ("Bedridden / partially mobile / post-surgical? Bathroom-accessible? Caregiver trained?") recommends a product set and loads it into the quote cart. *Medium effort, high retail conversion. Phase 2.*
6. **Procurement officer dashboard with spending analytics.** Logged-in institutions: quote history, top SKUs, MoM volume, CSV export. *Medium effort, high B2B retention. Phase 3.*
7. **"Compatibility & works-with" graph on PDPs.** Matched mattress, locker, over-bed table for a bed; right gauze for a wound-care kit. CMS relation field. *Low effort once data is entered, high AOV. Phase 2.*
8. **Downloadable NMRA + compliance dossier per SKU.** One-click PDF bundling NMRA cert + manufacturer cert + datasheet. Saves procurement officers hours on tender submissions. *Low-medium effort, very high trust. Phase 2.*
9. **Live-stock visibility per SKU.** Integration with MG's inventory (nightly CSV import is enough) to show In stock / Low stock / 4–6 week lead time on each card and PDP. *Medium effort (depends on MG's systems), high trust. Phase 3.*

---

## 15. Assumptions to validate before build

- Exact SKU count across MG's non-furniture categories (~120 furniture SKUs directly observable; rest need confirmation).
- Whether MG can provide a nightly inventory CSV for live-stock visibility.
- Whether NMRA registration numbers for each SKU can be surfaced by MG.
- Pricing for the trilingual medical translator pool (rough budget: 1,500 LKR/page for SI + TA review).
- Whether Hettiarachchi Surgicals' Galle operation has a retail-facing showroom to anchor the heritage story.

Each of these shifts phase priorities but none changes the architecture.
