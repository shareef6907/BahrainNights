# BahrainNights.com — SEO Audit Report

**Date:** June 28, 2025  
**Goal:** Rank #1 in Bahrain for "things to do in bahrain", "bahrain events", "bahrain nightlife", "bahrain restaurants", etc.

---

## Current State Summary

### ✅ What's Good (Already in Place)

1. **Root layout metadata** — Excellent. Title template, description, keywords, OG tags, robots directives, canonical URL, `metadataBase` all configured properly in `layout.tsx`.
2. **Organization + WebSite JSON-LD schema** — Present in layout with SearchAction, sameAs links, contact info.
3. **Sitemap (`src/app/sitemap.ts`)** — Dynamic, pulls events, venues, movies, blog articles from Supabase. Covers 80+ static pages + all dynamic content.
4. **robots.txt** — Present, allows crawling, blocks admin/API, includes sitemap reference.
5. **SEO components exist** — `src/components/SEO/` has VenueSchema, EventSchema, MovieListSchema, AttractionListSchema, BreadcrumbSchema, EventListSchema.
6. **Key pages have metadata** — Homepage, cinema, attractions, events, tours, family-kids all have `export const metadata` with title, description, OG, keywords.
7. **Canonical URLs** — Set on cinema, attractions, events, tours, family-kids, regional pages.
8. **Structured data on listing pages** — Cinema has MovieListSchema, attractions has AttractionListSchema, places page has inline ItemList JSON-LD.
9. **Extensive guide pages** — 60+ guide pages targeting long-tail keywords (nightlife, brunches, F1, Ramadan, cafes, shisha, etc.). Each has metadata.
10. **PWA configured** — manifest.json, apple-touch-icons, theme-color.
11. **Font optimization** — Inter with `display: swap` and preload.
12. **Preconnect/dns-prefetch** — For S3, TMDB, Platinumlist CDN.

### ❌ Issues Found

#### Critical (Hurting Rankings Now)

| # | Issue | Pages Affected |
|---|-------|---------------|
| 1 | **`/places` page is `'use client'` with NO server-side metadata export** | `/places` — one of the most important pages |
| 2 | **`/explore` page is `'use client'` with NO metadata** | `/explore` and `/explore/shopping` |
| 3 | **`/places` page sets meta via `<head>` tag inside client component** — Next.js ignores this for SEO; Google won't see it | `/places` |
| 4 | **No Google Analytics (GA4) or Google Tag Manager detected** | Entire site |
| 5 | **No Google Search Console verification tag found in code** | (May be set via DNS; verify) |
| 6 | **robots.txt sitemap URL uses `bahrainnights.com` (no www)** but canonical is `www.bahrainnights.com` | robots.txt |
| 7 | **Two robots.txt files** — `public/robots.txt` AND `src/app/robots.txt` (directory). Possible conflict | Site-wide |

#### High Priority

| # | Issue | Impact |
|---|-------|--------|
| 8 | **Missing canonical URLs** on most pages — only 6 pages have `alternates.canonical` | Duplicate content risk |
| 9 | **No `hreflang` tags** — site has TranslationProvider but no language alternates for Arabic | Missing Arabic search traffic |
| 10 | **Homepage metadata export is AFTER the default export** — Next.js still picks it up but it's unusual and could cause issues | `/` |
| 11 | **No FAQ schema** on guide pages — huge missed opportunity for rich snippets | 60+ guide pages |
| 12 | **No BreadcrumbSchema used on most pages** — component exists but isn't imported widely | Most pages |
| 13 | **No `<h1>` rendered server-side on places page** — it's all client-rendered, Google may not index content | `/places` |

#### Medium Priority

| # | Issue | Impact |
|---|-------|--------|
| 14 | **No blog/article schema** for regional content | `/regional/*` pages |
| 15 | **No LocalBusiness schema on individual restaurant/cafe/venue pages** — VenueSchema exists but verify it's used | `/places/[slug]`, `/restaurants/[slug]` |
| 16 | **No Review/Rating schema** on venue pages | Missing star ratings in SERPs |
| 17 | **Alt text on images is just titles** — not descriptive (e.g., "Movie poster for [title] showing in Bahrain cinemas") | Site-wide |
| 18 | **No internal linking component** (Related Content component exists but check usage) | Cross-page link equity |
| 19 | **Twitter/X card metadata removed** from layout ("no account yet") — still useful for sharing | Site-wide |

#### Low Priority

| # | Issue | Impact |
|---|-------|--------|
| 20 | Social `sameAs` links may be outdated (twitter.com/BahrainNights) | Schema accuracy |
| 21 | No `datePublished`/`dateModified` on guide pages | Content freshness signals |
| 22 | Missing `locale: "en_BH"` — currently `en_US` | Local relevance |

---

## Priority-Ranked Recommendations

### 🔴 Quick Wins (Implement Tonight)

#### 1. Fix `/places` page SEO (CRITICAL)
The places page is fully client-rendered with `'use client'`. The `<head>` tag inside the component does nothing for SEO.

**Fix:** Create a `layout.tsx` or wrapper server component for `/places` that exports metadata:
```typescript
// src/app/places/layout.tsx
export const metadata = {
  title: 'Best Restaurants, Bars, Cafes & Nightlife in Bahrain | BahrainNights',
  description: 'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs across Manama, Seef, Juffair, and more.',
  alternates: { canonical: 'https://www.bahrainnights.com/places' },
  openGraph: { /* ... */ },
};
```

#### 2. Fix `/explore` and `/explore/shopping` metadata
Both are `'use client'` with no metadata. Add `layout.tsx` files or convert to server component wrappers.

#### 3. Fix robots.txt sitemap URL
Change `Sitemap: https://bahrainnights.com/sitemap.xml` to `Sitemap: https://www.bahrainnights.com/sitemap.xml`

#### 4. Add canonical URLs to all major pages
Pages missing canonicals: `/places`, `/explore`, `/explore/*`, `/guides/*`, `/offers`, `/calendar`, `/venues`, all guide pages.

#### 5. Re-enable Twitter card metadata
Even without an account, Twitter cards improve sharing on X, Slack, Discord, WhatsApp, etc.
```typescript
twitter: {
  card: 'summary_large_image',
  title: "BahrainNights - Events, Nightlife & Things to Do in Bahrain",
  description: "Your complete guide to events, dining, nightlife and things to do in Bahrain",
  images: ['/og-image.png'],
},
```

#### 6. Fix OG locale
Change `locale: "en_US"` to `locale: "en_BH"` in layout.tsx.

### 🟡 Medium-Term Improvements (This Week)

#### 7. Add Google Analytics 4
```html
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" strategy="afterInteractive" />
```

#### 8. Verify Google Search Console
Add verification meta tag or verify via DNS. Submit sitemap. Monitor indexing.

#### 9. Add FAQ Schema to Guide Pages
Each guide page is a perfect candidate for FAQ rich snippets. Create a reusable `FAQSchema` component:
```typescript
// src/components/SEO/FAQSchema.tsx
export default function FAQSchema({ faqs }: { faqs: {q: string, a: string}[] }) { ... }
```

#### 10. Add BreadcrumbSchema to All Pages
The component exists but needs to be used on every page. Example:
- Home > Places > Restaurants
- Home > Cinema > [Movie Name]
- Home > Guides > Things to Do in Bahrain

#### 11. Add `hreflang` for Arabic
```html
<link rel="alternate" hreflang="en" href="https://www.bahrainnights.com" />
<link rel="alternate" hreflang="ar" href="https://www.bahrainnights.com?lang=ar" />
```

#### 12. Improve Image Alt Text
Change from `alt={movie.title}` to `alt={`${movie.title} - now showing at cinemas in Bahrain`}`.

#### 13. Verify VenueSchema is Used on Slug Pages
Check that `/places/[slug]`, `/restaurants/[slug]`, `/cafes/[slug]` all render VenueSchema with full LocalBusiness data.

### 🟢 Long-Term Strategy (This Month+)

#### 14. Content Strategy
- **Weekly blog posts** targeting "things to do in Bahrain this week/weekend"
- **Seasonal content** refreshed for Ramadan, Eid, F1, National Day, Summer
- **"Best of" listicles** — "10 Best Restaurants in Bahrain 2025", "Best Brunches in Bahrain"
- **User-generated reviews** with Review schema markup

#### 15. Technical SEO
- Implement **ISR (Incremental Static Regeneration)** for guide pages instead of client-side rendering
- Add **structured data testing** to CI pipeline
- Implement **Core Web Vitals monitoring** (LCP, CLS, INP)
- Add **`next/image`** everywhere (some places use raw `<img>` tags)

#### 16. Link Building
- Submit to Bahrain tourism directories
- Partner with hotels, restaurants for backlinks
- Get listed on TripAdvisor, Google Business Profile
- PR coverage in local media (Gulf Daily News, TradeArabia, etc.)

#### 17. Local SEO
- Create/claim **Google Business Profile** for BahrainNights
- Ensure NAP (Name, Address, Phone) consistency across all listings
- Add **GeoTargeting** in Google Search Console for Bahrain

#### 18. Arabic Content
- Create Arabic versions of top guide pages
- Target "اشياء حلوه في البحرين", "مطاعم البحرين", "فعاليات البحرين"
- This is a massive untapped opportunity in a bilingual market

---

## Analytics & Tools Status

| Tool | Status |
|------|--------|
| Google Analytics (GA4) | ❌ Not detected |
| Google Search Console | ❓ Unknown — no meta tag in code (may be DNS verified) |
| Google Tag Manager | ❌ Not detected |
| Internal PageTracker | ✅ Custom analytics tracking page views to Supabase |
| Sitemap | ✅ Dynamic, comprehensive |
| robots.txt | ⚠️ Exists but has minor issues (www mismatch, duplicate files) |
| Structured Data | ✅ Good foundation, needs expansion |
| PWA | ✅ Configured |

---

## Summary

**The site has a solid SEO foundation** — good metadata on key pages, structured data components, comprehensive sitemap, and extensive guide content targeting long-tail keywords.

**The biggest gap is the `/places` page** — arguably the most important page for restaurant/nightlife searches — being entirely client-rendered with no server-side metadata. This is likely invisible to Google.

**Top 3 actions for maximum impact:**
1. Fix `/places` and `/explore` pages to have server-rendered metadata
2. Set up Google Search Console + GA4 to measure progress
3. Add FAQ schema to guide pages for rich snippets

The guide pages strategy is excellent and will compound over time. Focus on making the technical foundation bulletproof first, then double down on content.
