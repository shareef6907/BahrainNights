# CLAUDE.md - BahrainNights.com Complete Project Specification

> **Last Updated:** December 27, 2025
> **Version:** 1.0.0
> **Status:** Production Ready

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Content Categories](#content-categories)
4. [AI Agent System](#ai-agent-system)
5. [Database Schema](#database-schema)
6. [Security Best Practices](#security-best-practices)
7. [File Structure](#file-structure)
8. [API Endpoints](#api-endpoints)
9. [Deployment](#deployment)
10. [Costs & Timeline](#costs--timeline)

---

## Project Overview

### Vision Statement
BahrainNights.com is the world's first fully AI-automated events magazine supporting all local businesses in Bahrain with free, equal visibility. Every event matters, every venue has a voice, and every visitor finds something perfect for them.

### Core Details
```yaml
Project Name: BahrainNights.com
Tagline: "Your Nightlife. Our Spotlight."
Domain: bahrainnights.com
Type: AI-Powered Cultural Discovery Platform

Mission:
  - For Users: Discover amazing experiences effortlessly
  - For Venues: Free, equal platform to promote events
  - For Bahrain: Amplify local voices and support community
```

### Business Model
```yaml
Revenue Streams:
  - Homepage Slider Ads: BD 300-500/month per slot (5 slots)
  - Payment Method: Direct bank transfer (invoice-based)

Free Forever:
  - Event listings
  - Venue profiles
  - Event promotion
  - Equal visibility for all businesses
```

---

## Technical Architecture

### Stack
```yaml
Frontend:
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion

Backend:
  - Next.js API Routes
  - PostgreSQL (Supabase)

Infrastructure:
  - Hosting: Vercel
  - Storage: AWS S3 (bahrainnights-production)
  - CDN: CloudFront (optional)
  - AI: Claude API (Anthropic)

Domain:
  - Registrar: Bluehost
  - DNS: Configured for Vercel
```

### AWS Configuration
```yaml
S3 Bucket: bahrainnights-production
Region: me-south-1 (Middle East - Bahrain)
IAM User: bahrainnights-api
IAM Policy: BahrainNightsS3Access
Access: Public read for images
```

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...

# AWS S3
BAHRAINNIGHTS_AWS_ACCESS_KEY_ID=AKIA...
BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY=...
BAHRAINNIGHTS_AWS_REGION=me-south-1
BAHRAINNIGHTS_S3_BUCKET=bahrainnights-production

# Public (safe for frontend)
NEXT_PUBLIC_CDN_URL=https://bahrainnights-production.s3.me-south-1.amazonaws.com
NEXT_PUBLIC_SITE_URL=https://bahrainnights.com

# Authentication
JWT_SECRET=min-32-character-secret-key
CSRF_SECRET=another-secret-key

# AI Services
CLAUDE_API_KEY=sk-ant-...

# Email
RESEND_API_KEY=re_...
```

---

## Content Categories

### Primary Categories (12)
```yaml
1. Dining & Restaurants:
   - New openings, brunches, ladies nights, happy hours, food festivals

2. Family & Kids:
   - Theme parks, kids events, family dining, educational activities

3. Arts & Culture:
   - Exhibitions, theater, museums, local artists, cultural festivals

4. Music & Nightlife:
   - Concerts, live music, DJ nights, clubs, bars, lounges

5. Cinema:
   - Now showing, coming soon, special screenings

6. Sports & Fitness:
   - Matches, fitness events, water sports, tournaments

7. Shopping & Markets:
   - Pop-up markets, craft fairs, local vendors

8. Business & Networking:
   - Conferences, meetups, workshops

9. Wellness & Spa:
   - Spa offers, yoga, meditation, wellness retreats

10. Special Occasions:
    - Holidays, seasonal events, national celebrations

11. Tours & Adventures:
    - Boat tours, desert trips, cultural tours

12. Community & Charity:
    - Volunteer events, fundraisers, social causes
```

---

## AI Agent System

### Overview
9 autonomous AI agents handle all operations 24/7 with minimal human intervention.

### Agent Schedule Summary
```yaml
Agent 1 - Content Discovery:    Every 6 hours
Agent 2 - Content Enhancement:  After Agent 1
Agent 3 - Cinema Updates:       Every 2 hours
Agent 4 - Social Media:         9 AM, 3 PM, 7 PM daily
Agent 5 - Newsletter:           Thursday 10 AM
Agent 6 - SEO Content:          Mon, Wed, Fri
Agent 7 - Quality Control:      Daily midnight
Agent 8 - Venue Outreach:       Daily 9 AM
Agent 9 - Visual Content:       With Agent 4
```

---

### Agent 1: Content Discovery

**Mission:** Find all events and happenings in Bahrain automatically.

**Data Sources:**
- BTEA website
- Al Dana Amphitheatre
- TimeOut Bahrain
- Bahrain This Month
- Visit Bahrain
- Hotel event pages
- Facebook Events
- Instagram hashtags

**Schedule:** Every 6 hours

**Code:**
```javascript
// agents/discovery/index.js
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import axios from 'axios';

const sources = [
  { name: 'BTEA', url: 'https://www.btea.bh/events', scraper: scrapeBTEA },
  { name: 'Al Dana', url: 'https://aldana.bh/events', scraper: scrapeAlDana },
];

export async function discoverEvents() {
  const allEvents = [];

  for (const source of sources) {
    try {
      const events = await source.scraper(source.url);
      allEvents.push(...events.map(e => ({
        ...e,
        source: source.name,
        discoveredAt: new Date().toISOString()
      })));
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
    }
  }

  const uniqueEvents = deduplicateEvents(allEvents);
  await saveToDatabase(uniqueEvents);
  return uniqueEvents;
}

async function scrapeBTEA(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const events = [];
  $('.event-card').each((i, elem) => {
    events.push({
      title: $(elem).find('.event-title').text().trim(),
      date: $(elem).find('.event-date').text().trim(),
      location: $(elem).find('.event-location').text().trim(),
      description: $(elem).find('.event-desc').text().trim(),
      image: $(elem).find('img').attr('src'),
      link: $(elem).find('a').attr('href'),
    });
  });

  return events;
}
```

---

### Agent 2: Content Enhancement

**Mission:** Polish, optimize, and enrich all scraped content using AI.

**Tasks:**
- Rewrite descriptions (SEO-friendly)
- Categorize events
- Extract structured data
- Generate tags
- Create Arabic translations
- Generate social media captions

**Code:**
```javascript
// agents/enhancement/index.js
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

export async function enhanceEvent(rawEvent) {
  const prompt = `You are a cultural magazine editor in Bahrain.

RAW EVENT:
Title: ${rawEvent.title}
Description: ${rawEvent.description}
Date: ${rawEvent.date_raw}
Location: ${rawEvent.location_raw}

TASKS:
1. Rewrite description (100-150 words, engaging, SEO-optimized)
2. Categorize: family/cultural/nightlife/dining/cinema/sports
3. Extract: price range, target audience, booking method
4. Generate 5 relevant tags
5. Rate relevance (1-10)
6. Translate to Arabic
7. Create Instagram caption
8. Is this PUBLIC? (yes/no)

Return JSON:
{
  "enhanced_title": "",
  "enhanced_description": "",
  "arabic_title": "",
  "arabic_description": "",
  "category": "",
  "tags": [],
  "relevance_score": 0,
  "is_public": true,
  "instagram_caption": ""
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }]
  });

  return JSON.parse(response.content[0].text);
}
```

---

### Agent 3: Cinema Updates

**Mission:** Keep cinema listings always current.

**Sources:**
- Cineco Bahrain
- VOX Cinemas
- Novo Cinemas
- TMDb API (posters, trailers)
- IMDb (ratings)

**Schedule:** Every 2 hours

**Code:**
```javascript
// agents/cinema/index.js
import puppeteer from 'puppeteer';
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function updateCinemaListings() {
  const cineco = await scrapeCineco();
  const vox = await scrapeVOX();

  const allMovies = [...cineco, ...vox];
  const uniqueMovies = deduplicateMovies(allMovies);

  for (const movie of uniqueMovies) {
    const enriched = await enrichWithTMDb(movie);
    await saveMovie(enriched);
  }

  await removeExpiredMovies();
}

async function enrichWithTMDb(movie) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`
  );

  if (response.data.results.length > 0) {
    const tmdb = response.data.results[0];
    movie.poster = `https://image.tmdb.org/t/p/w500${tmdb.poster_path}`;
    movie.overview = tmdb.overview;
    movie.tmdb_id = tmdb.id;
  }

  return movie;
}
```

---

### Agent 4: Social Media

**Mission:** Auto-post to Instagram, Facebook, Twitter.

**Schedule:**
- Instagram: 3 posts/day + 10-15 stories
- Facebook: 5 posts/day
- Twitter: 10 tweets/day (optional)

**Code:**
```javascript
// agents/social/index.js
import { IgApiClient } from 'instagram-private-api';

const ig = new IgApiClient();

export async function postToInstagram(event, imageUrl) {
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  const imageBuffer = await downloadImage(imageUrl);

  await ig.publish.photo({
    file: imageBuffer,
    caption: event.instagram_caption,
  });
}

export async function scheduleDailyPosts() {
  const hour = new Date().getHours();

  if (hour === 9) {
    const familyEvents = await getEventsByCategory('family', 3);
    await postEventRoundup(familyEvents, 'family');
  }

  if (hour === 15) {
    const tonightEvents = await getTonightEvents(3);
    await postEventRoundup(tonightEvents, 'tonight');
  }

  if (hour === 19) {
    const weekendEvents = await getWeekendEvents(5);
    await postEventRoundup(weekendEvents, 'weekend');
  }
}
```

---

### Agent 5: Newsletter

**Mission:** Send weekly email newsletters.

**Schedule:** Thursday 10 AM

**Code:**
```javascript
// agents/newsletter/index.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWeeklyNewsletter() {
  const topEvents = await getTopEventsThisWeek(10);
  const newMovies = await getNewMoviesThisWeek();
  const subscribers = await getActiveSubscribers();

  const html = generateNewsletterHTML({ topEvents, newMovies });

  for (const subscriber of subscribers) {
    await resend.emails.send({
      from: 'BahrainNights <newsletter@bahrainnights.com>',
      to: subscriber.email,
      subject: `This Week in Bahrain`,
      html: html,
    });
  }
}
```

---

### Agent 6: SEO Content

**Mission:** Generate blog articles for organic traffic.

**Schedule:** Monday, Wednesday, Friday

**Article Types:**
- "10 Best Things to Do in Bahrain This Weekend"
- "Ultimate Guide to Ladies Nights in Bahrain"
- "Family Activities in Bahrain"

**Code:**
```javascript
// agents/seo-content/index.js
import Anthropic from '@anthropic-ai/sdk';

export async function generateWeekendArticle() {
  const events = await getWeekendEvents(20);

  const prompt = `Write an SEO article: "10 Best Things to Do in Bahrain This Weekend"

Use these events: ${JSON.stringify(events)}

Requirements:
- 1500-2000 words
- Engaging introduction
- Mix of categories
- Practical details
- SEO keywords: things to do in bahrain, bahrain events

Return JSON: { "title": "", "slug": "", "content": "", "meta_description": "" }`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }]
  });

  return JSON.parse(response.content[0].text);
}
```

---

### Agent 7: Quality Control

**Mission:** Ensure accuracy, remove spam, maintain quality.

**Tasks:**
- Detect duplicate events
- Flag outdated information
- Check broken links
- Remove cancelled events
- Flag spam

**Schedule:** Daily midnight

**Code:**
```javascript
// agents/quality/index.js
export async function runQualityCheck() {
  const report = {
    duplicatesFound: 0,
    brokenLinksFound: 0,
    spamFlagged: 0,
    outdatedRemoved: 0,
  };

  // Check duplicates
  const duplicates = await findDuplicateEvents();
  report.duplicatesFound = duplicates.length;
  await mergeDuplicates(duplicates);

  // Check broken links
  const events = await getAllActiveEvents();
  for (const event of events) {
    if (event.booking_url) {
      const isValid = await checkLink(event.booking_url);
      if (!isValid) report.brokenLinksFound++;
    }
  }

  // Remove outdated
  report.outdatedRemoved = await removeOutdatedEvents();

  await sendQualityReport(report);
  return report;
}
```

---

### Agent 8: Venue Outreach

**Mission:** Discover new venues and invite them to register.

**Process:**
1. Discover venues (Google Maps, Instagram)
2. Enrich data (contact info, social handles)
3. AI qualification (hosts events? priority?)
4. Generate personalized emails
5. Send email sequence (3 emails max)

**Code:**
```javascript
// agents/outreach/index.js
export async function discoverVenues() {
  const categories = ['restaurant', 'cafe', 'night_club', 'bar', 'hotel'];
  const locations = ['Manama', 'Seef', 'Juffair', 'Amwaj'];

  const venues = [];
  for (const category of categories) {
    for (const location of locations) {
      const results = await searchGooglePlaces(category, location);
      venues.push(...results);
    }
  }

  return await filterExistingVenues(venues);
}

export async function generateOutreachEmail(venue) {
  const prompt = `Write outreach email for BahrainNights.com:

Venue: ${venue.name}
Category: ${venue.category}

Requirements:
- Warm, friendly tone
- Explain it's FREE
- Clear CTA: Register link
- 150-200 words

Return JSON: { "subject": "", "body": "" }`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }]
  });

  return JSON.parse(response.content[0].text);
}
```

---

### Agent 9: Visual Content Creator

**Mission:** Generate social media graphics automatically.

**Output Formats:**
- Instagram posts (1080x1080)
- Instagram stories (1080x1920)
- Facebook posts (1200x630)

**Code:**
```javascript
// agents/visual/index.js
import Bannerbear from 'bannerbear';

const bb = new Bannerbear(process.env.BANNERBEAR_API_KEY);

export async function generateEventGraphic(event, format = 'instagram_post') {
  const templateId = getTemplateForCategory(event.category, format);

  const image = await bb.create_image(templateId, {
    modifications: [
      { name: 'event_title', text: event.title.toUpperCase() },
      { name: 'venue_name', text: event.venue_name },
      { name: 'date', text: formatDate(event.start_date) },
      { name: 'time', text: event.start_time },
      { name: 'background_image', image_url: event.featured_image },
    ],
  });

  const s3Url = await uploadToS3(image.image_url, `social/${event.id}/${format}.jpg`);
  return s3Url;
}
```

---

### Agent Orchestration

**GitHub Actions:**
```yaml
# .github/workflows/ai-agents.yml
name: AI Agents

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  run-agents:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: node agents/orchestrator.js
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          CLAUDE_API_KEY: ${{ secrets.CLAUDE_API_KEY }}
          BAHRAINNIGHTS_AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

## Database Schema

### Core Tables
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'venue_owner',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Venues
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id),
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  category VARCHAR(100) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  website TEXT,
  instagram VARCHAR(100),
  logo_url TEXT,
  cover_image_url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES venues(id),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  category VARCHAR(100) NOT NULL,
  tags TEXT[],
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  price_range VARCHAR(50),
  booking_url TEXT,
  featured_image TEXT,
  instagram_caption TEXT,
  status VARCHAR(50) DEFAULT 'published',
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Movies
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  overview TEXT,
  duration_minutes INTEGER,
  genre TEXT[],
  imdb_rating DECIMAL(3, 1),
  poster_url TEXT,
  trailer_url TEXT,
  status VARCHAR(50) DEFAULT 'now_showing',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Showtimes
CREATE TABLE showtimes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID REFERENCES movies(id),
  cinema_name VARCHAR(200) NOT NULL,
  showtime TIME NOT NULL,
  show_date DATE NOT NULL,
  booking_url TEXT
);

-- Homepage Ads
CREATE TABLE homepage_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertiser_name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  slot_position INTEGER,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price_bd DECIMAL(10, 2),
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending'
);

-- Subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_venues_category ON venues(category);
CREATE INDEX idx_showtimes_date ON showtimes(show_date);
```

---

## Security Best Practices

### 1. Environment Variables

```
CRITICAL RULES:

DO:
- Store ALL secrets in Vercel environment variables
- Use NEXT_PUBLIC_ prefix ONLY for public values
- Rotate keys every 90 days

NEVER:
- Commit .env files to Git
- Hardcode secrets in code
- Expose secrets in frontend
- Log secrets to console
```

### 2. Input Validation

```javascript
// lib/validation.js
import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3).max(500),
  description: z.string().min(10).max(5000),
  start_date: z.string().datetime(),
  category: z.enum(['dining', 'family', 'cultural', 'nightlife', 'cinema']),
  booking_url: z.string().url().optional(),
});

export const venueSchema = z.object({
  name: z.string().min(2).max(500),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/),
  category: z.string(),
});
```

### 3. SQL Injection Prevention

```javascript
// WRONG
const query = `SELECT * FROM events WHERE title = '${userInput}'`;

// CORRECT
const query = 'SELECT * FROM events WHERE title = $1';
await db.query(query, [userInput]);
```

### 4. XSS Prevention

```javascript
// DANGEROUS
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// SAFE
import DOMPurify from 'isomorphic-dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

### 5. File Upload Security

```javascript
// lib/upload.js
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadImage(file, folder) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }

  if (file.size > MAX_SIZE) {
    throw new Error('File too large');
  }

  // Process and upload...
}
```

### 6. Authentication

```javascript
// lib/auth.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function generateToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}
```

### 7. Security Headers (next.config.js)

```javascript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
];

module.exports = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};
```

### Security Audit Checklist

```
Before Every Deployment:

[ ] No secrets in code or Git
[ ] All sensitive vars in Vercel only
[ ] Input validation on all endpoints
[ ] Parameterized database queries
[ ] Rate limiting enabled
[ ] File uploads validated
[ ] Security headers configured
[ ] Dependencies up to date (npm audit)
[ ] No console.log with sensitive data
[ ] Error messages don't leak info
```

---

## File Structure

```
bahrainnights/
├── app/
│   ├── (main)/
│   │   ├── page.tsx              # Homepage
│   │   ├── events/
│   │   │   ├── page.tsx          # Event listings
│   │   │   └── [slug]/page.tsx   # Event detail
│   │   ├── venues/
│   │   │   └── [slug]/page.tsx   # Venue detail
│   │   ├── cinema/page.tsx       # Now showing
│   │   └── calendar/page.tsx     # Calendar view
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/                # Venue dashboard
│   ├── admin/                    # Admin panel
│   └── api/
│       ├── events/route.ts
│       ├── venues/route.ts
│       ├── upload/image/route.ts
│       └── auth/route.ts
├── components/
│   ├── ui/
│   ├── layout/
│   └── forms/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── s3.ts
│   └── validation.ts
├── agents/
│   ├── discovery/
│   ├── enhancement/
│   ├── cinema/
│   ├── social/
│   ├── newsletter/
│   ├── seo-content/
│   ├── quality/
│   ├── outreach/
│   ├── visual/
│   └── orchestrator.ts
├── prisma/schema.prisma
├── .env.example
├── next.config.js
└── package.json
```

---

## API Endpoints

### Public
```
GET  /api/events              # List events
GET  /api/events/[slug]       # Event detail
GET  /api/venues              # List venues
GET  /api/cinema/movies       # Now showing
GET  /api/search?q=           # Search
POST /api/newsletter/subscribe
```

### Authenticated (Venue)
```
POST /api/auth/login
POST /api/auth/register
GET  /api/dashboard/events    # My events
POST /api/dashboard/events    # Create event
POST /api/upload/image        # Upload to S3
```

### Admin
```
GET  /api/admin/events/pending
POST /api/admin/events/[id]/approve
GET  /api/admin/ads
POST /api/admin/ads
```

---

## Deployment

### Commands
```bash
# Development
npm run dev

# Build
npm run build

# Deploy to Vercel
vercel --prod

# Database
npx prisma migrate dev
npx prisma studio

# Security check
npm audit
```

### Checklist
```
Pre-Launch:
[ ] All env vars in Vercel
[ ] Database migrations run
[ ] S3 bucket configured
[ ] Domain DNS configured
[ ] SSL active

Post-Launch:
[ ] Test all user flows
[ ] Verify S3 uploads
[ ] Check mobile responsive
[ ] Monitor errors
```

---

## Costs & Timeline

### Monthly Costs
```
Service                 Free      Scaled
---------------------------------------
Vercel                  $0        $20
Supabase                $0        $25
AWS S3                  $5        $25
Claude API              -         $75
Email (Resend)          $0        $15
Bannerbear              -         $19
---------------------------------------
TOTAL                   ~$5       ~$180
```

### Timeline (12 Weeks)
```
Weeks 1-2:   Foundation (homepage, setup)
Weeks 3-4:   Core features (events, venues, cinema)
Week 5:      User system (auth, dashboard)
Week 6:      Admin panel
Weeks 7-8:   AI Agents
Weeks 9-10:  Growth features
Weeks 11-12: Launch
```

### Revenue Targets
```
Month 1-3:   BD 500-1,500/month
Month 4-6:   BD 2,000-3,000/month
Month 7-12:  BD 4,000-6,000/month
Year 2:      BD 8,000-10,000/month
```

---

## Contact

**Project:** BahrainNights.com
**Email:** admin@bahrainnights.com
**Domain:** https://bahrainnights.com

---

*© 2025 BahrainNights.com. All rights reserved.*
