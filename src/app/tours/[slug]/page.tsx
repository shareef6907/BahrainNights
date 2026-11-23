import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Clock,
  Compass,
  Globe2,
  Users,
  Wallet,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { getTourBySlug, Tour } from '@/lib/db/tours';

const BASE_URL = 'https://www.bahrainnights.com';

// The listing page (/tours) links to /tours/<slug> for every tour it shows.
// Until this route existed those links were dead ends -- every one of them
// answered 404 -- so a tour could be browsed but never opened.
//
// The page reads the tour row and renders it. The prose below is written for
// the tour that is live today; anything else falls back to the facts the
// listing publishes, so a new tour gets a working page without anyone having
// to write it first.
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface TourEditorial {
  lead: string[];
  involves: string[];
  suits: string[];
  fits: string[];
  faqs: { q: string; a: string }[];
}

const TOUR_EDITORIAL: Record<string, TourEditorial> = {
  'pearl-snorkelling-diving-experience': {
    lead: [
      'Bahrain\'s diving heritage is not something you only read about in a museum display. The Pearl Snorkelling & Diving Experience puts you in the water with a local guide who teaches the technique the kingdom is known for, and then lets you try it yourself rather than only watching from the boat.',
    ],
    involves: [
      'The trip is listed as an adventure in the water sports category, running for 3-4 hours as a small group with the session delivered in English. It is graded as an easy difficulty level, which tells you where it sits before you commit to a date.',
      'Four things are listed as the core of the experience: pearl diving, snorkelling, keeping your pearls, and the traditional side of it. The pearl diving is the reason the trip exists — the guide teaches the harvest method rather than simply pointing out what is underneath you. The snorkelling covers the same water from above, at a pace that suits people who are not going to spend the whole session below the surface. And keeping your own pearl is what turns it from a boat trip into the kind of outing people talk about afterwards.',
      'The listing publishes a duration, a group format, a language, a difficulty level and a starting price. It does not publish a meeting point, a written itinerary or a named operator. Those are the details to confirm directly when you book, because they change with the season and the weather.',
    ],
    suits: [
      'The listing describes the experience as suitable for both beginners and experienced divers. If you have never snorkelled before, say so when you book: the listing does not publish a minimum age, a swimming requirement or a medical condition, so the operator is the right place to ask.',
      'It also works for people who have dived before. The traditional side of it is the part that stays with you — the technique and the way the work was done are explained as part of the outing, not bolted on afterwards.',
      'The session runs in English, and the small group format keeps the teaching personal. Prices start from the figure listed on the tour page, per person.',
    ],
    fits: [
      'A 3-4 hour experience on the water is a half-day commitment, so it pairs well with a longer plan rather than a quick addition to one. If you are in Bahrain for a weekend, the weekend guide is a good place to build the rest of the day around it.',
      'Bahrain\'s attractions listings cover the other side of the water — boat trips to the islands, mangroves and reef stops — if you want to see what the alternatives look like before you commit to a pearl trip.',
      'For the rest of the day, the things-to-do guide collects the indoor and shaded options, and the weekend guide lays out a full two-day plan if you are around for longer.',
    ],
    faqs: [
      {
        q: 'How long does the Pearl Snorkelling & Diving Experience take?',
        a: 'It is listed as a 3-4 hour experience, so plan roughly half a day around it rather than treating it as an hour in the water.',
      },
      {
        q: 'How much does it cost?',
        a: 'Prices start from the amount published on the tour listing, per person — the figure shown in the details above. The listing shows a starting price rather than a fixed one, so ask the operator for the full range on the date you want.',
      },
      {
        q: 'How many people are in the group?',
        a: 'It runs as a small group. The listing does not publish a maximum number of participants, so confirm the group size for your date when you book.',
      },
      {
        q: 'What language is the tour run in?',
        a: 'The session is delivered in English.',
      },
      {
        q: 'Is it suitable for beginners?',
        a: 'Yes. The listing describes the experience as suitable for both beginners and experienced divers, and the difficulty level is marked as easy. The listing does not publish a minimum age or a medical requirement, so raise any of those questions with the operator before you book.',
      },
    ],
  },
};

/**
 * Fallback copy for a tour that has no written profile yet: everything below
 * is taken straight from the listing, and nothing is asserted that the
 * listing does not already say.
 */
function genericEditorial(tour: Tour): TourEditorial {
  const highlights = tour.highlights.length ? tour.highlights.join(', ') : '';
  const priceText = tour.priceFrom
    ? `Prices start from ${tour.currency} ${tour.priceFrom} per ${tour.pricePer}.`
    : '';

  return {
    lead: [
      `${tour.name} is listed on the Bahrain Nights tours page as a ${tour.duration} ${tour.tourType.toLowerCase()} experience in Bahrain, run as a ${tour.groupSize.toLowerCase()} in the ${tour.category.toLowerCase()} category.`,
    ],
    involves: [
      highlights
        ? `The listing sets out what the experience is built around: ${highlights}.`
        : 'The listing sets out the duration, the group format and the languages, and everything else is confirmed with the operator at booking.',
      `Every fact on this page comes from the tour listing, so nothing here is guesswork. What the listing publishes: the duration, the group format, the languages, the difficulty level and the starting price. What it does not publish yet: a meeting point, a written itinerary or a named operator. We would rather leave those blank than fill them in.`,
    ],
    suits: [
      tour.suitableFor.length
        ? `The listing marks this experience as suitable for ${tour.suitableFor.join(', ')}.`
        : `The listing does not publish a suitability list for this tour, so ask the operator directly if you have a specific requirement.`,
      `The difficulty level is marked as ${tour.difficultyLevel}. ${priceText}`,
    ],
    fits: [
      'The tours page collects the experiences running across Bahrain in one place, and the explore listings group them by the kind of day you are planning.',
      'If you are building a full itinerary, the weekend guide and the things-to-do guide cover the rest of the day around any single experience.',
    ],
    faqs: [
      {
        q: `How long does ${tour.name} take?`,
        a: `It is listed as a ${tour.duration} experience.`,
      },
      {
        q: 'How much does it cost?',
        a: tour.priceFrom
          ? `Prices start from ${tour.currency} ${tour.priceFrom} per ${tour.pricePer}. The listing shows a starting price rather than a fixed one, so ask the operator for the full range on your date.`
          : 'The listing does not publish a price. Ask the operator directly.',
      },
      {
        q: 'How many people are in the group?',
        a: `It runs as a ${tour.groupSize.toLowerCase()}. The listing does not publish a maximum number of participants, so confirm the group size when you book.`,
      },
      {
        q: 'What language is the tour run in?',
        a: `The session is delivered in ${tour.languages.join(', ')}.`,
      },
      {
        q: 'Where do I book it?',
        a: 'It is listed on the Bahrain Nights tours page. For availability and booking, contact the Bahrain Nights team through the contact page.',
      },
    ],
  };
}

function priceLabel(tour: Tour): string | null {
  if (!tour.priceFrom) return null;
  return `From ${tour.currency} ${tour.priceFrom} per ${tour.pricePer}`;
}

function descriptionFor(tour: Tour): string {
  const parts: string[] = [`${tour.name} in Bahrain`];
  if (tour.duration) parts.push(tour.duration);
  if (tour.groupSize) parts.push(tour.groupSize.toLowerCase());
  if (tour.priceFrom) {
    parts.push(`from ${tour.currency} ${tour.priceFrom} per ${tour.pricePer}`);
  }
  let description = `${parts.join(', ')}.`;

  if (tour.highlights.length && description.length + 40 < 155) {
    const highlights = tour.highlights
      .slice(0, 2)
      .map((highlight, index) =>
        index === 0 ? highlight : highlight.charAt(0).toLowerCase() + highlight.slice(1)
      )
      .join(' and ');
    description += ` ${highlights}.`;
  }

  return description.slice(0, 155);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return { title: 'Tour Not Found' };
  }

  const description = descriptionFor(tour);

  return {
    title: tour.name,
    description,
    keywords: [
      `${tour.name.toLowerCase()} Bahrain`,
      `${tour.category.toLowerCase()} Bahrain`,
      'tours in Bahrain',
      'things to do in Bahrain',
      'Bahrain experiences',
    ].join(', '),
    alternates: {
      canonical: `${BASE_URL}/tours/${tour.slug}`,
    },
    openGraph: {
      title: `${tour.name} in Bahrain`,
      description,
      type: 'article',
      locale: 'en_BH',
      url: `${BASE_URL}/tours/${tour.slug}`,
      images: [tour.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tour.name} in Bahrain`,
      description,
      images: [tour.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const editorial = TOUR_EDITORIAL[tour.slug] || genericEditorial(tour);
  const price = priceLabel(tour);
  const url = `${BASE_URL}/tours/${tour.slug}`;

  const details: { label: string; value: string; icon: typeof Clock }[] = [
    { label: 'Duration', value: tour.duration, icon: Clock },
    { label: 'Group size', value: tour.groupSize, icon: Users },
    { label: 'Type', value: tour.tourType, icon: Compass },
    { label: 'Category', value: tour.category, icon: Compass },
    { label: 'Languages', value: tour.languages.join(', '), icon: Globe2 },
    { label: 'Difficulty', value: tour.difficultyLevel, icon: Compass },
  ];

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.description || tour.shortDescription,
    image: tour.image,
    url,
    touristType: tour.tourType,
    ...(tour.duration
      ? {
          tourSchedule: {
            '@type': 'Schedule',
            duration: tour.duration,
          },
        }
      : {}),
    ...(tour.priceFrom
      ? {
          offers: {
            '@type': 'Offer',
            price: tour.priceFrom,
            priceCurrency: tour.currency,
            url,
          },
        }
      : {}),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: BASE_URL },
          { name: 'Tours & Experiences', url: `${BASE_URL}/tours` },
          { name: tour.name, url },
        ]}
      />
      <FAQSchema faqs={editorial.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />

      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-amber-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              {tour.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              {tour.name} <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              {tour.duration} · {tour.groupSize} · {tour.languages.join(', ')}
              {price ? ` · ${price}` : ''}
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10">
            <div className="relative h-64 md:h-96">
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          {editorial.lead.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {tour.description && <p>{tour.description}</p>}
        </div>
      </section>

      {/* What the experience involves */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What the experience involves</h2>
          <div className="prose prose-invert prose-lg mb-8">
            {editorial.involves.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {tour.highlights.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {tour.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 bg-slate-900/60 border border-white/10 rounded-xl p-4"
                >
                  <Check className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-200">{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* The details */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Tour details at a glance</h2>
          <dl className="grid sm:grid-cols-2 gap-4">
            {details
              .filter((detail) => detail.value)
              .map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={detail.label}
                    className="flex items-center gap-4 bg-slate-900/60 border border-white/10 rounded-xl p-4"
                  >
                    <Icon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <dt className="text-sm text-gray-400">{detail.label}</dt>
                      <dd className="text-gray-100 font-medium">{detail.value}</dd>
                    </div>
                  </div>
                );
              })}
            {price && (
              <div className="flex items-center gap-4 bg-slate-900/60 border border-white/10 rounded-xl p-4">
                <Wallet className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <dt className="text-sm text-gray-400">Price</dt>
                  <dd className="text-gray-100 font-medium">{price}</dd>
                </div>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Who it suits */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Who this experience suits</h2>
          <div className="prose prose-invert prose-lg">
            {editorial.suits.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* How it fits into a day in Bahrain */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How it fits into a day in Bahrain</h2>
          <div className="prose prose-invert prose-lg mb-8">
            {editorial.fits.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tours"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              All tours in Bahrain →
            </Link>
            <Link
              href="/explore/tours"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              More experiences →
            </Link>
            <Link
              href="/attractions"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              Attractions →
            </Link>
            <Link
              href="/weekend-in-bahrain"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              Weekend in Bahrain →
            </Link>
            <Link
              href="/things-to-do-in-bahrain"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              Things to do in Bahrain →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {editorial.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-900/60 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book in Bahrain?</h2>
          <p className="text-gray-400 mb-8">
            Send the Bahrain Nights team a note and we will confirm availability and
            the details the listing does not publish.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            >
              Contact Bahrain Nights
            </Link>
            <Link
              href="/tours"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all inline-flex items-center gap-2"
            >
              Back to all tours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <InternalLinks
        title="Explore Bahrain"
        links={[
          { title: 'All Tours & Experiences', href: '/tours' },
          { title: 'Tours & Adventures', href: '/explore/tours' },
          { title: 'Things to Do in Bahrain', href: '/things-to-do-in-bahrain' },
          { title: 'Attractions in Bahrain', href: '/attractions' },
          { title: 'Weekend in Bahrain', href: '/weekend-in-bahrain' },
          { title: 'Family & Kids', href: '/family-kids' },
        ]}
      />
    </div>
  );
}
