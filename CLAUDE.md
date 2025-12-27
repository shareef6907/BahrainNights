# BahrainNights.com - Complete Project Specification

## Project Overview

**Project Name:** BahrainNights.com
**Type:** AI-Powered Cultural Discovery Platform
**Tagline:** "Your Nightlife. Our Spotlight."
**Mission:** The world's first fully AI-automated events magazine supporting all local businesses in Bahrain with free, equal visibility.

---

## Vision Statement

BahrainNights.com is where cutting-edge AI meets warm Bahraini hospitality. It's the fastest, most beautiful, and most comprehensive guide to experiencing Bahrain - a digital platform that feels alive, constantly discovering and sharing the kingdom's best moments. Every event matters, every venue has a voice, and every visitor finds something perfect for them.

---

## Business Model

### Revenue Streams
1. **Homepage Slider Ads** - Premium placement for advertisers (BD 300-500/month per slot)
2. **Direct Bank Transfer** - No payment gateway, invoice-based system

### Free For All
- Event listings: FREE forever
- Venue profiles: FREE forever
- Event promotion: FREE forever
- Equal visibility for all businesses

---

## Technical Architecture

### Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Storage:** AWS S3 (bahrainnights-production) + CloudFront CDN
- **Hosting:** Vercel
- **AI Services:** Claude API (Anthropic)
- **Domain:** bahrainnights.com (Bluehost DNS)

### AWS Configuration
```
Bucket: bahrainnights-production
Region: me-south-1 (Middle East - Bahrain)
IAM User: bahrainnights-api
IAM Policy: BahrainNightsS3Access
```

### Environment Variables (Vercel)
```bash
BAHRAINNIGHTS_AWS_ACCESS_KEY_ID=AKIA...
BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY=...
BAHRAINNIGHTS_AWS_REGION=me-south-1
BAHRAINNIGHTS_S3_BUCKET=bahrainnights-production
NEXT_PUBLIC_CDN_URL=https://bahrainnights-production.s3.me-south-1.amazonaws.com
DATABASE_URL=postgresql://...
CLAUDE_API_KEY=sk-ant-...
```

---

## Content Categories

### Primary Categories
1. **Dining & Restaurants** - New openings, brunches, ladies nights, happy hours, food festivals
2. **Family & Kids** - Theme parks, kids events, family dining, educational activities
3. **Arts & Culture** - Exhibitions, theater, museums, local artists, cultural festivals
4. **Music & Nightlife** - Concerts, live music, DJ nights, clubs, bars, lounges
5. **Cinema** - Now showing, coming soon, special screenings
6. **Sports & Fitness** - Matches, fitness events, water sports, tournaments
7. **Shopping & Markets** - Pop-up markets, craft fairs, local vendors
8. **Business & Networking** - Conferences, meetups, workshops
9. **Wellness & Spa** - Spa offers, yoga, meditation, wellness retreats
10. **Special Occasions** - Holidays, seasonal events, national celebrations
11. **Tours & Adventures** - Boat tours, desert trips, cultural tours
12. **Community & Charity** - Volunteer events, fundraisers, social causes

---

## AI Agent System

### Overview
9 autonomous AI agents handle all operations 24/7 with minimal human intervention.

---

## Agent 1: Content Discovery Agent

### Mission
Find all events and happenings in Bahrain automatically.

### Data Sources
- BTEA (Bahrain Tourism & Exhibitions Authority) website
- Al Dana Amphitheatre official site
- TimeOut Bahrain
- Bahrain This Month
- Visit Bahrain
- Hotel event pages
- Mall event calendars
- Facebook Events (Graph API)
- Instagram hashtags (#BahrainEvents, #VisitBahrain)
- Individual venue websites

### Schedule
Every 6 hours (4x daily)

### Output
Raw event data → Database (title, date, venue, description, images, source URL)

### Technical Implementation
```javascript
// agents/discovery/index.js

import puppeteer from 'puppeteer';
import axios from 'axios';
import * as cheerio from 'cheerio';

const sources = [
  {
    name: 'BTEA',
    url: 'https://www.btea.bh/events',
    scraper: scrapeBTEA
  },
  {
    name: 'Al Dana',
    url: 'https://aldana.bh/events',
    scraper: scrapeAlDana
  },
  // Add more sources
];

async function discoverEvents() {
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

  // Remove duplicates using fuzzy matching
  const uniqueEvents = deduplicateEvents(allEvents);

  // Save to database
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

### Database Schema
```sql
CREATE TABLE raw_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  date_raw VARCHAR(200),
  location_raw VARCHAR(500),
  image_url TEXT,
  source_url TEXT,
  source_name VARCHAR(100),
  discovered_at TIMESTAMP DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Agent 2: Content Enhancement Agent

### Mission
Polish, optimize, and enrich all scraped content using AI.

### Tasks
1. Rewrite descriptions (SEO-friendly, engaging, 100-200 words)
2. Categorize events (family/cultural/nightlife/cinema/dining/sports)
3. Extract structured data (price, booking URL, target audience)
4. Generate relevant tags
5. Rate event quality/relevance (1-10)
6. Create Arabic translations
7. Generate social media captions
8. Optimize for search engines

### Schedule
Runs immediately after Agent 1 discovers new content

### AI Model
Claude API (claude-sonnet-4-20250514)

### Technical Implementation
```javascript
// agents/enhancement/index.js

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

async function enhanceEvent(rawEvent) {
  const prompt = `You are a cultural magazine editor in Bahrain. Analyze and enhance this event:

RAW EVENT DATA:
Title: ${rawEvent.title}
Description: ${rawEvent.description}
Date: ${rawEvent.date_raw}
Location: ${rawEvent.location_raw}
Source: ${rawEvent.source_name}

TASKS:
1. Rewrite description (100-150 words, engaging, SEO-optimized)
2. Categorize: family/cultural/nightlife/dining/cinema/sports/wellness/business/community
3. Extract: price range (free/budget/moderate/premium), target audience, booking method
4. Generate 5 relevant tags
5. Rate relevance for Bahrain residents (1-10)
6. Translate title and description to Arabic
7. Create Instagram caption (with emojis, hashtags)
8. Create short Twitter post (under 280 chars)
9. Parse date into ISO format
10. Is this a PUBLIC event? (yes/no)

Return as JSON with this exact structure:
{
  "enhanced_title": "",
  "enhanced_description": "",
  "arabic_title": "",
  "arabic_description": "",
  "category": "",
  "subcategory": "",
  "price_range": "",
  "target_audience": [],
  "booking_method": "",
  "tags": [],
  "relevance_score": 0,
  "parsed_date": "",
  "parsed_time": "",
  "is_public": true,
  "instagram_caption": "",
  "twitter_post": "",
  "seo_keywords": []
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }]
  });

  const content = response.content[0].text;
  const jsonMatch = content.match(/\{[\s\S]*\}/);

  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  throw new Error('Failed to parse AI response');
}

async function processNewEvents() {
  // Get unprocessed events
  const rawEvents = await db.query(
    'SELECT * FROM raw_events WHERE processed = FALSE LIMIT 50'
  );

  for (const event of rawEvents) {
    try {
      const enhanced = await enhanceEvent(event);

      // Only save public events
      if (enhanced.is_public) {
        await saveEnhancedEvent(event.id, enhanced);
      }

      // Mark as processed
      await db.query(
        'UPDATE raw_events SET processed = TRUE WHERE id = $1',
        [event.id]
      );

    } catch (error) {
      console.error(`Error enhancing event ${event.id}:`, error);
    }
  }
}
```

### Database Schema
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  raw_event_id UUID REFERENCES raw_events(id),

  -- English content
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,

  -- Arabic content
  title_ar VARCHAR(500),
  description_ar TEXT,

  -- Categorization
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  tags TEXT[],

  -- Date & Time
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern VARCHAR(100),

  -- Location
  venue_id UUID REFERENCES venues(id),
  location_name VARCHAR(500),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Details
  price_range VARCHAR(50),
  price_details TEXT,
  booking_url TEXT,
  booking_method VARCHAR(100),
  target_audience TEXT[],

  -- Media
  featured_image TEXT,
  gallery TEXT[],

  -- Social content
  instagram_caption TEXT,
  twitter_post VARCHAR(280),

  -- SEO
  seo_keywords TEXT[],
  relevance_score INTEGER,

  -- Status
  status VARCHAR(50) DEFAULT 'published',
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,

  -- Source tracking
  source VARCHAR(100),
  source_url TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_slug ON events(slug);
```

---

## Agent 3: Cinema/Now Showing Agent

### Mission
Keep cinema listings always current with showtimes, ratings, and trailers.

### Data Sources
- Cineco Bahrain (https://bahrain.cinecocinemas.com)
- VOX Cinemas Bahrain (https://bahrain.voxcinemas.com)
- Novo Cinemas
- IMDb API (ratings, cast, synopsis)
- TMDb API (posters, trailers)
- YouTube API (official trailers)

### Schedule
Every 2 hours

### Output
- Current movies with posters
- Showtimes by cinema location
- Ratings from IMDb
- Trailer links
- Book ticket deep links

### Technical Implementation
```javascript
// agents/cinema/index.js

import axios from 'axios';
import puppeteer from 'puppeteer';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const IMDB_API_KEY = process.env.IMDB_API_KEY;

async function updateCinemaListings() {
  // Scrape each cinema chain
  const cineco = await scrapeCineco();
  const vox = await scrapeVOX();
  const novo = await scrapeNovo();

  // Combine all movies
  const allMovies = [...cineco, ...vox, ...novo];

  // Get unique movies
  const uniqueMovies = deduplicateMovies(allMovies);

  // Enrich with TMDb/IMDb data
  for (const movie of uniqueMovies) {
    const enriched = await enrichMovieData(movie);
    await saveMovie(enriched);
  }

  // Remove expired movies
  await removeExpiredMovies();
}

async function enrichMovieData(movie) {
  // Get TMDb data
  const tmdbResponse = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`
  );

  if (tmdbResponse.data.results.length > 0) {
    const tmdbMovie = tmdbResponse.data.results[0];
    movie.poster = `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`;
    movie.backdrop = `https://image.tmdb.org/t/p/original${tmdbMovie.backdrop_path}`;
    movie.tmdb_id = tmdbMovie.id;
    movie.overview = tmdbMovie.overview;
    movie.release_date = tmdbMovie.release_date;

    // Get trailer
    const videosResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbMovie.id}/videos?api_key=${TMDB_API_KEY}`
    );

    const trailer = videosResponse.data.results.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );

    if (trailer) {
      movie.trailer_url = `https://www.youtube.com/watch?v=${trailer.key}`;
    }
  }

  return movie;
}

async function scrapeCineco() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://bahrain.cinecocinemas.com/movies/nowshowing');

  const movies = await page.evaluate(() => {
    const movieElements = document.querySelectorAll('.movie-card');
    return Array.from(movieElements).map(el => ({
      title: el.querySelector('.movie-title')?.textContent?.trim(),
      image: el.querySelector('img')?.src,
      link: el.querySelector('a')?.href,
      cinema: 'Cineco',
    }));
  });

  // Get showtimes for each movie
  for (const movie of movies) {
    movie.showtimes = await getShowtimes(page, movie.link);
  }

  await browser.close();
  return movies;
}
```

### Database Schema
```sql
CREATE TABLE movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,

  -- Details
  overview TEXT,
  duration_minutes INTEGER,
  rating VARCHAR(20),
  genre TEXT[],
  language VARCHAR(100),
  release_date DATE,

  -- External IDs
  tmdb_id INTEGER,
  imdb_id VARCHAR(20),

  -- Ratings
  imdb_rating DECIMAL(3, 1),
  tmdb_rating DECIMAL(3, 1),

  -- Media
  poster_url TEXT,
  backdrop_url TEXT,
  trailer_url TEXT,

  -- Status
  status VARCHAR(50) DEFAULT 'now_showing',

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE showtimes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_id UUID REFERENCES movies(id),
  cinema_name VARCHAR(200) NOT NULL,
  cinema_location VARCHAR(500),
  showtime TIME NOT NULL,
  show_date DATE NOT NULL,
  screen_type VARCHAR(100),
  booking_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_showtimes_movie ON showtimes(movie_id);
CREATE INDEX idx_showtimes_date ON showtimes(show_date);
```

---

## Agent 4: Social Media Agent

### Mission
Automatically post to Instagram, Facebook, and Twitter/X with generated graphics.

### Platforms
- Instagram (Feed + Stories)
- Facebook (Posts + Events)
- Twitter/X (Optional)

### Posting Schedule

**Instagram:**
- 9:00 AM - Today's family events
- 3:00 PM - Tonight's nightlife/dining
- 7:00 PM - Weekend preview
- Stories: 10-15 per day (event highlights, countdowns)

**Facebook:**
- 5 posts per day
- Auto-create Facebook Events for each listing

**Twitter/X:**
- 10 tweets per day (optional)
- Quick event announcements

### Technical Implementation
```javascript
// agents/social/index.js

import { IgApiClient } from 'instagram-private-api';
import { FacebookAdsApi } from 'facebook-nodejs-business-sdk';

const ig = new IgApiClient();

async function postToInstagram(event, imageUrl) {
  // Login to Instagram
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  // Download image
  const imageBuffer = await downloadImage(imageUrl);

  // Post to feed
  await ig.publish.photo({
    file: imageBuffer,
    caption: event.instagram_caption,
  });
}

async function postInstagramStory(event, imageUrl) {
  const imageBuffer = await downloadImage(imageUrl);

  await ig.publish.story({
    file: imageBuffer,
    stickerConfig: {
      sticker: {
        text: event.title,
        x: 0.5,
        y: 0.5,
      },
    },
  });
}

async function createFacebookEvent(event) {
  const api = FacebookAdsApi.init(process.env.FB_ACCESS_TOKEN);

  // Create event on Facebook Page
  const response = await api.call(
    'POST',
    `/${process.env.FB_PAGE_ID}/events`,
    {
      name: event.title,
      description: event.description,
      start_time: event.start_date,
      place: event.location_name,
      cover: event.featured_image,
    }
  );

  return response;
}

async function scheduleDailyPosts() {
  const now = new Date();
  const hour = now.getHours();

  if (hour === 9) {
    // Morning: Family events
    const familyEvents = await getEventsByCategory('family', 3);
    await postEventRoundup(familyEvents, 'family');
  }

  if (hour === 15) {
    // Afternoon: Tonight's events
    const tonightEvents = await getTonightEvents(3);
    await postEventRoundup(tonightEvents, 'tonight');
  }

  if (hour === 19) {
    // Evening: Weekend preview (Thu/Fri only)
    if ([4, 5].includes(now.getDay())) {
      const weekendEvents = await getWeekendEvents(5);
      await postEventRoundup(weekendEvents, 'weekend');
    }
  }
}
```

### Environment Variables
```bash
# Instagram
IG_USERNAME=bahrainnights
IG_PASSWORD=...

# Facebook
FB_PAGE_ID=...
FB_ACCESS_TOKEN=...

# Twitter (optional)
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_SECRET=...
```

---

## Agent 5: Newsletter Agent

### Mission
Send weekly email newsletters to subscribers.

### Content
- "This Week in Bahrain" headline
- Top 10 events of the week
- Cinema highlights (new releases)
- New restaurant/venue openings
- Special promotions
- Cultural calendar preview

### Schedule
Every Thursday at 10:00 AM (Bahrain time)

### Technical Implementation
```javascript
// agents/newsletter/index.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWeeklyNewsletter() {
  // Get content
  const topEvents = await getTopEventsThisWeek(10);
  const newMovies = await getNewMoviesThisWeek();
  const newVenues = await getNewVenuesThisWeek();

  // Get subscribers
  const subscribers = await getActiveSubscribers();

  // Generate HTML
  const html = generateNewsletterHTML({
    topEvents,
    newMovies,
    newVenues,
    weekNumber: getWeekNumber(),
  });

  // Send to all subscribers
  for (const subscriber of subscribers) {
    await resend.emails.send({
      from: 'BahrainNights <newsletter@bahrainnights.com>',
      to: subscriber.email,
      subject: `This Week in Bahrain - ${getWeekDateRange()}`,
      html: html,
    });
  }
}

function generateNewsletterHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; }
        .header { background: linear-gradient(135deg, #FFD700, #FFA500); }
        .event-card { border: 1px solid #eee; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>BahrainNights</h1>
        <p>Your weekly guide to the best events in Bahrain</p>
      </div>

      <h2>Top 10 Events This Week</h2>
      ${data.topEvents.map(event => `
        <div class="event-card">
          <img src="${event.featured_image}" alt="${event.title}">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <a href="https://bahrainnights.com/events/${event.slug}">View Details</a>
        </div>
      `).join('')}

      <h2>Now Showing</h2>
      ${data.newMovies.map(movie => `
        <div class="movie-card">
          <img src="${movie.poster_url}" alt="${movie.title}">
          <p>${movie.title} - ${movie.imdb_rating}</p>
        </div>
      `).join('')}

      <footer>
        <p>2025 BahrainNights.com</p>
        <a href="{{unsubscribe_url}}">Unsubscribe</a>
      </footer>
    </body>
    </html>
  `;
}
```

### Database Schema
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  preferences JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE newsletter_sends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject VARCHAR(500),
  sent_at TIMESTAMP DEFAULT NOW(),
  total_recipients INTEGER,
  opens INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0
);
```

---

## Agent 6: SEO Content Agent

### Mission
Generate blog articles for organic search traffic.

### Article Types
- "10 Best Things to Do in Bahrain This Weekend"
- "What's New in Bahrain Cinemas This Week"
- "Ultimate Guide to Ladies Nights in Bahrain"
- "Family Activities in Bahrain [Month]"
- "Upcoming Concerts at Al Dana Amphitheatre"
- "Best Beach Clubs in Bahrain"
- "Where to Celebrate [Holiday] in Bahrain"

### Schedule
2-3 articles per week (auto-generated)

### Technical Implementation
```javascript
// agents/seo-content/index.js

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

async function generateWeekendArticle() {
  const events = await getWeekendEvents(20);

  const prompt = `You are a lifestyle writer for BahrainNights.com, the premier events guide in Bahrain.

Write an engaging, SEO-optimized article titled "10 Best Things to Do in Bahrain This Weekend (${getCurrentWeekendDates()})"

Use these real events happening this weekend:
${JSON.stringify(events, null, 2)}

Requirements:
1. Engaging introduction (100 words)
2. 10 event highlights with descriptions (150 words each)
3. Mix of categories (family, dining, nightlife, culture)
4. Include practical details (date, time, location, price)
5. SEO keywords: things to do in bahrain, bahrain weekend, bahrain events
6. Friendly, helpful tone
7. Call-to-action at the end
8. Total: 1500-2000 words

Return as JSON:
{
  "title": "",
  "slug": "",
  "meta_description": "",
  "content": "",
  "featured_image_prompt": "",
  "tags": [],
  "seo_keywords": []
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }]
  });

  const article = JSON.parse(response.content[0].text);
  await saveArticle(article);

  return article;
}
```

### Database Schema
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_description VARCHAR(160),
  featured_image TEXT,
  tags TEXT[],
  seo_keywords TEXT[],
  author VARCHAR(100) DEFAULT 'BahrainNights Team',
  status VARCHAR(50) DEFAULT 'published',
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_at ON articles(published_at);
```

---

## Agent 7: Quality Control Agent

### Mission
Ensure accuracy, remove spam, and maintain content quality.

### Tasks
1. Detect duplicate events (fuzzy matching)
2. Flag outdated information
3. Verify dates/times are logical
4. Check for broken links
5. Remove cancelled events
6. Flag suspicious/spam content
7. Validate image quality
8. Check for inappropriate content

### Schedule
Runs after each major update cycle

### Technical Implementation
```javascript
// agents/quality/index.js

import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';

async function runQualityCheck() {
  const report = {
    duplicatesFound: 0,
    brokenLinksFound: 0,
    spamFlagged: 0,
    outdatedRemoved: 0,
    issuesForReview: [],
  };

  // Check for duplicates
  const duplicates = await findDuplicateEvents();
  report.duplicatesFound = duplicates.length;
  await mergeDuplicates(duplicates);

  // Check for broken links
  const events = await getAllActiveEvents();
  for (const event of events) {
    if (event.booking_url) {
      const isValid = await checkLink(event.booking_url);
      if (!isValid) {
        report.brokenLinksFound++;
        report.issuesForReview.push({
          type: 'broken_link',
          eventId: event.id,
          url: event.booking_url,
        });
      }
    }
  }

  // Remove outdated events
  const outdated = await removeOutdatedEvents();
  report.outdatedRemoved = outdated;

  // Check for spam using AI
  const newEvents = await getRecentEvents(24); // Last 24 hours
  for (const event of newEvents) {
    const isSpam = await detectSpam(event);
    if (isSpam) {
      report.spamFlagged++;
      await flagEventForReview(event.id, 'potential_spam');
    }
  }

  // Send daily report
  await sendQualityReport(report);

  return report;
}

async function detectSpam(event) {
  const prompt = `Analyze this event listing for spam indicators:

Title: ${event.title}
Description: ${event.description}
Venue: ${event.venue_name}
Price: ${event.price_range}

Is this likely spam? Consider:
- Promotional language
- Unrealistic claims
- Missing essential details
- Suspicious URLs
- Inappropriate content

Return JSON: { "is_spam": true/false, "confidence": 0-100, "reason": "" }`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }]
  });

  const result = JSON.parse(response.content[0].text);
  return result.is_spam && result.confidence > 70;
}

async function checkLink(url) {
  try {
    const response = await axios.head(url, { timeout: 5000 });
    return response.status >= 200 && response.status < 400;
  } catch {
    return false;
  }
}
```

### Daily Report Format
```
DAILY QUALITY REPORT - BahrainNights.com
Date: December 27, 2025

Events discovered: 47
Events enhanced: 42
Events published: 40

Issues Found:
- Duplicates merged: 3
- Broken links detected: 2
- Potential spam flagged: 1
- Outdated events removed: 8

Items Requiring Review:
1. Event #123 - Broken booking link
2. Event #456 - Potential spam (85% confidence)

Platform Stats:
- Total active events: 1,247
- Total venues: 847
- Website visitors (24h): 3,421
- Social media reach (24h): 12,500
```

---

## Agent 8: Venue Outreach Agent

### Mission
Automatically discover new venues and invite them to register on the platform.

### Phase 1: Venue Discovery

**Data Sources:**
- Google Maps API (search by category + location)
- Instagram scraping (hashtags, location tags)
- Business directories
- Food delivery apps (Talabat, Deliveroo)
- TripAdvisor, Zomato

**Search Categories:**
- Restaurants
- Cafes
- Night clubs
- Bars
- Event venues
- Art galleries
- Hotels
- Beach clubs

### Phase 2: Data Enrichment

For each discovered venue, collect:
- Name, category, location
- Phone, email, website
- Instagram, Facebook handles
- Recent posts/activity
- Event hosting history

### Phase 3: AI Qualification

AI evaluates and scores each venue:
- Does this venue host events? (confidence %)
- Event frequency estimate
- Priority level (High/Medium/Low)
- Personalized email hook

### Phase 4: Personalized Email Generation

AI writes custom outreach emails mentioning:
- Specific recent activity/event
- Tailored benefits
- Clear CTA (register link)

### Phase 5: Email Sequence

**Email 1 (Day 0):** Initial personalized outreach
**Email 2 (Day 4):** Soft reminder (if opened but didn't click)
**Email 3 (Day 10):** Social proof (if still no action)

Stop after Email 3 - Don't spam

### Technical Implementation
```javascript
// agents/outreach/index.js

import { google } from 'googleapis';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);

async function discoverVenues() {
  const categories = [
    'restaurant', 'cafe', 'night_club', 'bar',
    'event_venue', 'art_gallery', 'hotel', 'beach_club'
  ];

  const locations = [
    'Manama, Bahrain', 'Seef, Bahrain', 'Juffair, Bahrain',
    'Amwaj Islands, Bahrain', 'Riffa, Bahrain'
  ];

  const venues = [];

  for (const category of categories) {
    for (const location of locations) {
      const results = await searchGooglePlaces(category, location);
      venues.push(...results);
    }
  }

  // Filter out existing venues
  const newVenues = await filterExistingVenues(venues);

  return newVenues;
}

async function generateOutreachEmail(venue) {
  const prompt = `Write a personalized outreach email for BahrainNights.com:

Venue: ${venue.name}
Category: ${venue.category}
Instagram: ${venue.instagram}
Recent activity: ${venue.recent_post}

Requirements:
- Warm, friendly tone (not spam-like)
- Mention their specific activity/event
- Explain BahrainNights.com is FREE
- 3 key benefits (reach, visibility, easy posting)
- Clear CTA: Register link
- 150-200 words
- Include P.S. with urgency

Return JSON: { "subject": "", "body": "" }`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }]
  });

  return JSON.parse(response.content[0].text);
}

async function sendOutreachEmail(venue, email) {
  await resend.emails.send({
    from: 'BahrainNights <hello@bahrainnights.com>',
    to: venue.email,
    subject: email.subject,
    html: formatEmailHTML(email.body),
  });

  // Track send
  await trackEmailSend(venue.id, 'initial_outreach');
}
```

### Database Schema
```sql
CREATE TABLE venue_prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  website TEXT,
  instagram VARCHAR(100),
  facebook VARCHAR(100),

  -- Qualification
  hosts_events BOOLEAN,
  event_frequency VARCHAR(50),
  priority VARCHAR(50),

  -- Outreach status
  outreach_status VARCHAR(50) DEFAULT 'pending',
  emails_sent INTEGER DEFAULT 0,
  last_email_sent TIMESTAMP,
  opened_email BOOLEAN DEFAULT FALSE,
  clicked_link BOOLEAN DEFAULT FALSE,
  registered BOOLEAN DEFAULT FALSE,

  -- Source
  discovered_source VARCHAR(100),
  discovered_at TIMESTAMP DEFAULT NOW(),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE outreach_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES venue_prospects(id),
  email_type VARCHAR(50),
  subject VARCHAR(500),
  body TEXT,
  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP
);
```

---

## Agent 9: Visual Content Creator Agent

### Mission
Automatically generate beautiful social media graphics with text overlays.

### Output Formats
- Instagram posts (1080x1080)
- Instagram stories (1080x1920)
- Facebook posts (1200x630)
- Twitter posts (1200x675)
- Homepage banners (1920x600)

### Design Styles
1. **Minimalist Modern** - Clean gradients, bold typography
2. **Vibrant Event** - Photo background, colored overlay
3. **Bahrain Heritage** - Traditional patterns, calligraphy
4. **Bold & Energetic** - Bright colors, nightlife vibe

### Technical Implementation
```javascript
// agents/visual/index.js

import Bannerbear from 'bannerbear';
import OpenAI from 'openai';

const bb = new Bannerbear(process.env.BANNERBEAR_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Template IDs in Bannerbear
const TEMPLATES = {
  instagram_post: {
    nightlife: 'template_abc123',
    family: 'template_def456',
    cultural: 'template_ghi789',
    dining: 'template_jkl012',
  },
  instagram_story: {
    event_countdown: 'template_mno345',
    cinema: 'template_pqr678',
  },
};

async function generateEventGraphic(event, format = 'instagram_post') {
  // Select template based on category
  const templateId = TEMPLATES[format][event.category] || TEMPLATES[format].nightlife;

  // Generate image with Bannerbear
  const image = await bb.create_image(templateId, {
    modifications: [
      {
        name: 'event_title',
        text: event.title.toUpperCase(),
      },
      {
        name: 'venue_name',
        text: event.venue_name,
      },
      {
        name: 'date',
        text: formatDate(event.start_date),
      },
      {
        name: 'time',
        text: event.start_time,
      },
      {
        name: 'category_badge',
        text: event.category,
      },
      {
        name: 'background_image',
        image_url: event.featured_image,
      },
    ],
  });

  // Upload to S3
  const s3Url = await uploadToS3(image.image_url, `social/${event.id}/${format}.jpg`);

  return s3Url;
}

async function generateAIImage(event) {
  // Use DALL-E for custom backgrounds
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `${event.category} event atmosphere in Bahrain, ${event.title}, professional photography, warm lighting, suitable for event poster background`,
    n: 1,
    size: '1024x1024',
  });

  return response.data[0].url;
}

async function generateAllFormats(event) {
  return {
    instagram_post: await generateEventGraphic(event, 'instagram_post'),
    instagram_story: await generateEventGraphic(event, 'instagram_story'),
    facebook_post: await generateEventGraphic(event, 'facebook_post'),
    twitter_post: await generateEventGraphic(event, 'twitter_post'),
  };
}
```

### Environment Variables
```bash
BANNERBEAR_API_KEY=bb_...
OPENAI_API_KEY=sk-... (for DALL-E)
```

### Monthly Cost
- Bannerbear: $19/month (unlimited)
- DALL-E (optional): ~$20/month
- **Total: ~$40/month**

---

## Agent Orchestration

### Master Schedule
```javascript
// orchestrator/index.js

import cron from 'node-cron';

// Agent 1: Content Discovery - Every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log('Running Content Discovery Agent...');
  await runContentDiscovery();
});

// Agent 2: Content Enhancement - Every 6 hours (after Agent 1)
cron.schedule('15 */6 * * *', async () => {
  console.log('Running Content Enhancement Agent...');
  await runContentEnhancement();
});

// Agent 3: Cinema Updates - Every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running Cinema Update Agent...');
  await runCinemaUpdate();
});

// Agent 4: Social Media - Multiple times daily
cron.schedule('0 9 * * *', () => postMorningContent());
cron.schedule('0 15 * * *', () => postAfternoonContent());
cron.schedule('0 19 * * *', () => postEveningContent());

// Agent 5: Newsletter - Thursday 10 AM
cron.schedule('0 10 * * 4', async () => {
  console.log('Running Newsletter Agent...');
  await sendWeeklyNewsletter();
});

// Agent 6: SEO Content - Monday, Wednesday, Friday
cron.schedule('0 10 * * 1,3,5', async () => {
  console.log('Running SEO Content Agent...');
  await generateSEOArticle();
});

// Agent 7: Quality Control - Daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running Quality Control Agent...');
  await runQualityCheck();
});

// Agent 8: Venue Outreach - Daily at 9 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Running Venue Outreach Agent...');
  await runVenueOutreach();
});

// Agent 9: Visual Content - Runs with Agent 4
// (Integrated into social media posting)
```

### GitHub Actions Workflow
```yaml
# .github/workflows/ai-agents.yml

name: AI Agents - Scheduled Tasks

on:
  schedule:
    # Content Discovery - Every 6 hours
    - cron: '0 */6 * * *'
  workflow_dispatch:

jobs:
  run-agents:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run AI Agents
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          CLAUDE_API_KEY: ${{ secrets.CLAUDE_API_KEY }}
          BAHRAINNIGHTS_AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: node orchestrator/index.js
```

---

## Database Schema (Complete)

### Core Tables
```sql
-- Users & Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) DEFAULT 'venue_owner',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Venues
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES users(id),

  -- Basic info
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,

  -- Category
  category VARCHAR(100) NOT NULL,
  subcategories TEXT[],

  -- Location
  address TEXT,
  city VARCHAR(100),
  area VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  google_maps_url TEXT,

  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),
  website TEXT,

  -- Social
  instagram VARCHAR(100),
  facebook VARCHAR(100),
  twitter VARCHAR(100),

  -- Media
  logo_url TEXT,
  cover_image_url TEXT,
  gallery TEXT[],

  -- Business details
  opening_hours JSONB,
  price_range VARCHAR(50),

  -- Status
  status VARCHAR(50) DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Stats
  view_count INTEGER DEFAULT 0,
  event_count INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Homepage Ads
CREATE TABLE homepage_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertiser_name VARCHAR(255) NOT NULL,
  advertiser_email VARCHAR(255),
  advertiser_phone VARCHAR(50),

  -- Creative
  title VARCHAR(255),
  subtitle VARCHAR(255),
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  cta_text VARCHAR(100),

  -- Placement
  slot_position INTEGER,

  -- Schedule
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,

  -- Pricing
  price_bd DECIMAL(10, 2),
  invoice_number VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'pending',

  -- Stats
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,

  -- Status
  status VARCHAR(50) DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  event_id UUID REFERENCES events(id),
  venue_id UUID REFERENCES venues(id),
  user_agent TEXT,
  ip_hash VARCHAR(64),
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ad Clicks
CREATE TABLE ad_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_id UUID REFERENCES homepage_ads(id),
  ip_hash VARCHAR(64),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes
```sql
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_venue ON events(venue_id);
CREATE INDEX idx_venues_category ON venues(category);
CREATE INDEX idx_venues_status ON venues(status);
CREATE INDEX idx_page_views_date ON page_views(created_at);
CREATE INDEX idx_ad_clicks_ad ON ad_clicks(ad_id);
```

---

## Security Best Practices

### 1. Environment Variables
```
CRITICAL RULES:

DO:
- Store ALL secrets in Vercel environment variables
- Use different keys for production/preview/development
- Rotate keys every 90 days
- Use IAM users (never root account)

NEVER:
- Commit .env files to Git
- Hardcode secrets in code
- Log secrets to console
- Expose secrets in frontend code
- Share secrets in chat/email
```

### 2. API Security
```javascript
// middleware/auth.js

import { verifyToken } from '@/lib/auth';

export async function authMiddleware(req) {
  // Check for auth token
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    );
  }

  try {
    const user = await verifyToken(token);
    return { user };
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid token' }),
      { status: 401 }
    );
  }
}

// Rate limiting
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later.',
});
```

### 3. Input Validation
```javascript
// lib/validation.js

import { z } from 'zod';

// Event submission schema
export const eventSchema = z.object({
  title: z.string().min(3).max(500),
  description: z.string().min(10).max(5000),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional(),
  venue_id: z.string().uuid(),
  category: z.enum([
    'dining', 'family', 'cultural', 'nightlife',
    'cinema', 'sports', 'wellness', 'business'
  ]),
  price_range: z.enum(['free', 'budget', 'moderate', 'premium']).optional(),
  booking_url: z.string().url().optional(),
});

// Venue registration schema
export const venueSchema = z.object({
  name: z.string().min(2).max(500),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/),
  category: z.string(),
  address: z.string().min(10).max(500),
  website: z.string().url().optional(),
  instagram: z.string().max(100).optional(),
});

// Sanitize HTML
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(dirty) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
  });
}
```

### 4. SQL Injection Prevention
```javascript
// ALWAYS use parameterized queries

// WRONG - SQL Injection vulnerable
const query = `SELECT * FROM events WHERE title = '${userInput}'`;

// CORRECT - Parameterized
const query = 'SELECT * FROM events WHERE title = $1';
const result = await db.query(query, [userInput]);

// CORRECT - Using ORM (Prisma)
const events = await prisma.event.findMany({
  where: { title: userInput }
});
```

### 5. XSS Prevention
```javascript
// Next.js automatically escapes JSX, but be careful with:

// DANGEROUS - Don't use dangerouslySetInnerHTML with user input
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// SAFE - Sanitize first
import DOMPurify from 'isomorphic-dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />

// SAFER - Use text content
<div>{userContent}</div>
```

### 6. File Upload Security
```javascript
// lib/upload.js

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadImage(file, folder) {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP allowed.');
  }

  // Validate file size
  if (file.size > MAX_SIZE) {
    throw new Error('File too large. Maximum size is 5MB.');
  }

  // Read file buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Verify it's actually an image (check magic bytes)
  const metadata = await sharp(buffer).metadata();
  if (!metadata.format) {
    throw new Error('Invalid image file.');
  }

  // Process image (resize, compress)
  const processedBuffer = await sharp(buffer)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  // Generate safe filename
  const filename = `${uuidv4()}.jpg`;
  const key = `${folder}/${filename}`;

  // Upload to S3
  const s3Client = new S3Client({
    region: process.env.BAHRAINNIGHTS_AWS_REGION,
    credentials: {
      accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY,
    },
  });

  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.BAHRAINNIGHTS_S3_BUCKET,
    Key: key,
    Body: processedBuffer,
    ContentType: 'image/jpeg',
  }));

  return `${process.env.NEXT_PUBLIC_CDN_URL}/${key}`;
}
```

### 7. Authentication Security
```javascript
// lib/auth.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '7d';

// Hash password
export async function hashPassword(password) {
  // Validate password strength
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Generate JWT
export function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

// Verify JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error('Invalid or expired token');
  }
}
```

### 8. Headers Security
```javascript
// next.config.js

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://bahrainnights-production.s3.me-south-1.amazonaws.com;
      font-src 'self';
      connect-src 'self' https://api.anthropic.com;
    `.replace(/\n/g, '')
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 9. Sensitive Data Handling
```javascript
// NEVER expose these in frontend:

// WRONG
const config = {
  awsKey: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID, // Server only!
  dbUrl: process.env.DATABASE_URL, // Server only!
};

// CORRECT - Only NEXT_PUBLIC_ vars in frontend
const config = {
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL, // OK - public
  apiUrl: process.env.NEXT_PUBLIC_API_URL, // OK - public
};

// Server-side only (API routes, server components)
const serverConfig = {
  awsKey: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID,
  dbUrl: process.env.DATABASE_URL,
  claudeKey: process.env.CLAUDE_API_KEY,
};
```

---

## Security Audit Checklist

### Before Every Deployment

```
SECURITY AUDIT CHECKLIST

Environment Variables:
- No secrets in code or Git
- All sensitive vars in Vercel only
- No NEXT_PUBLIC_ prefix on secret vars
- Different keys for prod/preview/dev

Authentication:
- Passwords hashed with bcrypt (12+ rounds)
- JWT tokens expire appropriately
- Secure session management
- Rate limiting on auth endpoints

API Security:
- Input validation on all endpoints
- Parameterized database queries
- Rate limiting enabled
- CORS properly configured
- CSRF tokens for state-changing requests

File Uploads:
- File type validation (whitelist)
- File size limits
- Filename sanitization
- Image processing/verification
- Secure S3 bucket policy

Frontend:
- No sensitive data in client code
- XSS prevention (sanitized output)
- Secure cookies (httpOnly, secure, sameSite)
- CSP headers configured

Database:
- No raw SQL with user input
- Parameterized queries only
- Proper access controls
- Encrypted at rest

Infrastructure:
- HTTPS enforced
- Security headers set
- S3 bucket not fully public
- IAM least privilege principle
- Logs don't contain secrets

Third-Party:
- Dependencies up to date
- No known vulnerabilities (npm audit)
- API keys secured
- Webhooks validated
```

---

## Deployment Checklist

### Pre-Launch
```
- All environment variables set in Vercel
- Database migrations run
- S3 bucket created and configured
- Domain DNS configured (Bluehost)
- SSL certificate active
- Security headers enabled
- Error monitoring set up (Sentry)
- Analytics configured
- Backup system in place
```

### Post-Launch
```
- Test all critical user flows
- Verify S3 uploads work
- Check all pages load correctly
- Test mobile responsiveness
- Verify email sending works
- Test venue registration flow
- Check admin dashboard access
- Monitor error logs
- Check performance metrics
```

---

## Cost Breakdown

### Monthly Costs (Estimated)
```
Vercel (Hosting):           $0 (free tier) - $20 (pro)
Supabase (Database):        $0 (free tier) - $25 (pro)
AWS S3 + CloudFront:        ~$5-20 (based on storage/bandwidth)
Claude API:                 ~$50-100 (based on usage)
Resend (Email):             $0 (free tier) - $20 (pro)
Bannerbear (Graphics):      $19/month
Domain (bahrainnights.com): ~$15/year

TOTAL: ~$100-200/month
```

### Revenue Target
```
3 homepage ad slots x BD 300/month = BD 900/month (~$2,400 USD)

Break-even: 1 ad slot covers all costs
```

---

## Development Permissions

You have complete permissions to edit or make any changes. Do not ask for permissions.

**Allowed Actions:**
- Create, modify, delete any files
- Install/remove npm packages
- Create database migrations
- Deploy to Vercel
- Configure AWS resources
- Implement any feature
- Refactor existing code
- Add new AI agents
- Modify security settings

**Priority Focus:**
1. User experience
2. Performance
3. Security
4. Scalability
5. Maintainability
