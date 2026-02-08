import { Metadata } from 'next';
import Link from 'next/link';
import { 
  PartyPopper, MapPin, Star, Clock, ArrowRight, Heart,
  Sparkles, Camera, Music, Utensils, Users, Gift,
  Cake, Building2, Phone, CheckCircle, Video
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Planning a Birthday Party in Bahrain? Here\'s Everything You Need | BahrainNights',
  description: 'Complete guide to planning the perfect birthday party in Bahrain. Venues, catering, entertainment, equipment rental, and professional videography services. All ages covered!',
  keywords: [
    'birthday party Bahrain', 'party venues Bahrain', 'kids birthday Bahrain',
    'party planning Bahrain', 'birthday party ideas Bahrain', 'event planning Bahrain',
    'party catering Bahrain', 'birthday venues Manama', 'children party Bahrain',
    'party entertainment Bahrain', 'event equipment rental Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/birthday-party-planning-bahrain',
  },
  openGraph: {
    title: 'Planning a Birthday Party in Bahrain? Here\'s Everything You Need',
    description: 'Your complete guide to planning memorable birthday celebrations in Bahrain. Venues, catering, entertainment & more!',
    url: 'https://www.bahrainnights.com/blog/birthday-party-planning-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-birthday-party.jpg',
        width: 1200,
        height: 630,
        alt: 'Birthday Party Planning in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planning a Birthday Party in Bahrain?',
    description: 'Complete guide to venues, catering, entertainment & more!',
  },
  authors: [{ name: 'BahrainNights Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Planning a Birthday Party in Bahrain? Here\'s Everything You Need',
    description: 'Complete guide to planning the perfect birthday party in Bahrain with venues, catering, and entertainment.',
    image: 'https://www.bahrainnights.com/og-birthday-party.jpg',
    author: {
      '@type': 'Organization',
      name: 'BahrainNights Team',
      url: 'https://www.bahrainnights.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BahrainNights',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bahrainnights.com/logo.png'
      }
    },
    datePublished: '2026-01-15',
    dateModified: '2026-02-08',
    mainEntityOfPage: 'https://www.bahrainnights.com/blog/birthday-party-planning-bahrain'
  };
}

const kidsVenues = [
  { name: 'Wahooo! Waterpark', location: 'City Centre Bahrain', capacity: '20-100', price: 'From BHD 15/child', features: ['Water slides', 'Private party area', 'Food packages'], best: 'Ages 4-12' },
  { name: 'Fun Zone', location: 'Multiple Malls', capacity: '10-30', price: 'From BHD 8/child', features: ['Soft play', 'Arcade games', 'Party hosts'], best: 'Ages 2-8' },
  { name: 'Gravity Indoor Skydiving', location: 'Bahrain Bay', capacity: '8-20', price: 'From BHD 25/child', features: ['Flying experience', 'Party room', 'Certificates'], best: 'Ages 4+' },
  { name: 'Lost Paradise of Dilmun', location: 'Sakhir', capacity: '20-200', price: 'From BHD 12/child', features: ['Water park access', 'Cabanas', 'BBQ option'], best: 'Ages 3-16' },
  { name: 'Kidzania', location: 'The Avenues', capacity: '15-50', price: 'From BHD 10/child', features: ['Role play city', 'Dedicated party rooms', 'Activities'], best: 'Ages 4-14' },
];

const adultVenues = [
  { name: 'Beach Clubs', examples: 'Coral Bay, Jumeirah', capacity: '30-150', price: 'From BHD 500', features: ['Pool access', 'Beach', 'Catering available'], vibe: 'Relaxed & fun' },
  { name: 'Rooftop Lounges', examples: 'Hazel, Azure', capacity: '20-80', price: 'From BHD 800', features: ['City views', 'Bar service', 'DJ available'], vibe: 'Chic & sophisticated' },
  { name: 'Private Dining Rooms', examples: 'Gulf Hotel, Ritz-Carlton', capacity: '10-40', price: 'From BHD 600', features: ['Fine dining', 'Customized menus', 'Privacy'], vibe: 'Elegant & intimate' },
  { name: 'Garden Venues', examples: 'The Orangery, Block 338', capacity: '40-120', price: 'From BHD 400', features: ['Outdoor setting', 'Fairy lights', 'Instagram-worthy'], vibe: 'Casual & pretty' },
  { name: 'Yacht Charter', examples: 'Various operators', capacity: '10-50', price: 'From BHD 300', features: ['Sunset cruise', 'Catering', 'Unique experience'], vibe: 'Luxurious & memorable' },
];

const cateringOptions = [
  { name: 'Furn Bistro', specialty: 'Mediterranean platters', minOrder: 'BHD 150', delivery: true },
  { name: 'Wooden Bakery', specialty: 'Manakeesh & Lebanese', minOrder: 'BHD 100', delivery: true },
  { name: 'Big Texas BBQ', specialty: 'American BBQ', minOrder: 'BHD 200', delivery: true },
  { name: 'Zafran', specialty: 'Indian cuisine', minOrder: 'BHD 180', delivery: true },
  { name: 'Five Star Catering', specialty: 'Full service events', minOrder: 'BHD 500', delivery: true },
];

const entertainmentOptions = [
  { type: 'Magicians', price: 'From BHD 80', duration: '45 min', best: 'Kids parties' },
  { type: 'Face Painters', price: 'From BHD 50', duration: '2 hours', best: 'Kids parties' },
  { type: 'Balloon Artists', price: 'From BHD 60', duration: '2 hours', best: 'All ages' },
  { type: 'DJ Services', price: 'From BHD 150', duration: '4 hours', best: 'Adult parties' },
  { type: 'Live Band', price: 'From BHD 400', duration: '3 hours', best: 'Adult parties' },
  { type: 'Character Appearances', price: 'From BHD 100', duration: '1 hour', best: 'Kids parties' },
  { type: 'Photo Booth', price: 'From BHD 120', duration: '3 hours', best: 'All ages' },
  { type: 'Henna Artist', price: 'From BHD 60', duration: '2 hours', best: 'All ages' },
];

const cakeShops = [
  { name: 'Sugar & Spice', specialty: 'Custom themed cakes', price: 'From BHD 40', lead: '3-5 days' },
  { name: 'Chez Nicole', specialty: 'French patisserie', price: 'From BHD 45', lead: '2-3 days' },
  { name: 'Cake Boutique', specialty: 'Elaborate designs', price: 'From BHD 60', lead: '5-7 days' },
  { name: 'Hummingbird Bakery', specialty: 'British-style cakes', price: 'From BHD 35', lead: '2-3 days' },
];

const partyChecklist = [
  { task: 'Book venue', when: '4-6 weeks before' },
  { task: 'Send invitations', when: '3-4 weeks before' },
  { task: 'Order cake', when: '1-2 weeks before' },
  { task: 'Book entertainment', when: '2-3 weeks before' },
  { task: 'Confirm catering', when: '1 week before' },
  { task: 'Prepare party favors', when: '1 week before' },
  { task: 'Confirm RSVPs', when: '3 days before' },
  { task: 'Final venue walkthrough', when: '1 day before' },
];

export default function BirthdayPartyGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 to-purple-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Birthday Party Planning</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full text-pink-300 text-sm mb-4">
                <PartyPopper className="w-4 h-4" /> Complete Planning Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                Planning a Birthday Party in Bahrain? Here's Everything You Need
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From venue selection to entertainment, catering to decorations — your complete guide to 
                throwing an unforgettable birthday celebration in the Kingdom.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 12 min read
                </span>
                <span>•</span>
                <span>By BahrainNights Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Planning a birthday party in Bahrain can be both exciting and overwhelming. Whether you're organizing 
              a magical princess party for your little one, an adventure-filled celebration for teenagers, or an 
              elegant soirée for adults, the Kingdom offers incredible options for every style and budget.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              In this comprehensive guide, we've gathered everything you need to plan the perfect birthday party. 
              From tried-and-tested venues and reliable caterers to entertainment options and pro tips, consider 
              this your party planning bible.
            </p>
          </div>
        </section>

        {/* Kids Venues Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🎈 Kids Party Venues</h2>
                <p className="text-gray-400">Where the magic happens</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Bahrain has fantastic venues designed specifically for children's parties. These spots handle 
              everything from decorations to food, making your job as the parent much easier.
            </p>
            
            <div className="space-y-4">
              {kidsVenues.map((venue) => (
                <div key={venue.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{venue.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4" /> {venue.location}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {venue.features.map((feature) => (
                          <span key={feature} className="px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-1">
                      <div className="text-cyan-400 font-semibold">{venue.price}</div>
                      <div className="text-gray-400 text-sm">Capacity: {venue.capacity}</div>
                      <div className="text-gray-500 text-xs">Best for: {venue.best}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Adult Venues Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🍾 Adult Party Venues</h2>
                <p className="text-gray-400">Sophisticated celebrations</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Whether you're planning a milestone birthday or just want to celebrate in style, Bahrain 
              offers stunning venues for grown-up gatherings.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {adultVenues.map((venue) => (
                <div key={venue.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition">
                  <h3 className="text-xl font-semibold text-white mb-1">{venue.name}</h3>
                  <p className="text-purple-400 text-sm mb-3">{venue.examples}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Capacity: {venue.capacity}</span>
                    <span className="text-purple-400 font-semibold">{venue.price}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">Vibe: {venue.vibe}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Rental Section - Cross-sell EventsBahrain */}
        <section className="py-16 px-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🎪 Event Equipment Rental</h2>
                <p className="text-gray-400">Level up your party setup</p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl border border-amber-500/30 p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-amber-300 mb-4">Partner Spotlight: EventsBahrain</h3>
                  <p className="text-gray-300 mb-6">
                    Planning a party at home or an outdoor venue? <strong>EventsBahrain</strong> is Bahrain's leading 
                    event equipment rental company, offering everything you need to transform any space into a 
                    party paradise.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span>Tables & Chairs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span>Tents & Canopies</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span>Lighting & Sound</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span>Stage & Dance Floors</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span>Photo Booths</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span>Kids Play Equipment</span>
                    </div>
                  </div>
                  <Link 
                    href="https://eventsbahrain.com" 
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-semibold hover:opacity-90 transition"
                  >
                    Visit EventsBahrain <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-shrink-0 md:w-64 text-center">
                  <div className="p-4 bg-amber-500/10 rounded-xl">
                    <Gift className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <p className="text-amber-300 font-semibold mb-2">BahrainNights Exclusive</p>
                    <p className="text-gray-400 text-sm">Mention "BahrainNights" for 10% off your first rental!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Videography Section - Cross-sell FilmProductionBahrain */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🎬 Capture the Memories</h2>
                <p className="text-gray-400">Professional videography services</p>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl border border-red-500/30 p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-red-300 mb-4">Partner Spotlight: FilmProductionBahrain</h3>
                  <p className="text-gray-300 mb-6">
                    Don't let precious moments slip away! <strong>FilmProductionBahrain</strong> specializes in event 
                    videography, creating cinematic keepsakes you'll treasure forever. From kids' parties to milestone 
                    birthdays, their team captures every laugh, hug, and cake-smash in stunning quality.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      <span>4K Video Quality</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      <span>Drone Footage</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      <span>Same-Day Highlights</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      <span>Photo & Video Packages</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 text-sm">
                    Packages start from BHD 200 for 2-hour coverage including edited highlight reel.
                  </p>
                  <Link 
                    href="https://filmproductionbahrain.com" 
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
                  >
                    Visit FilmProductionBahrain <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-shrink-0 md:w-64 text-center">
                  <div className="p-4 bg-red-500/10 rounded-xl">
                    <Camera className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="text-red-300 font-semibold mb-2">Special Offer</p>
                    <p className="text-gray-400 text-sm">Book video + photo package and get 15% off!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catering Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🍕 Catering Options</h2>
                <p className="text-gray-400">Feed your guests right</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cateringOptions.map((caterer) => (
                <div key={caterer.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-green-500/50 transition">
                  <h3 className="text-lg font-semibold text-white mb-2">{caterer.name}</h3>
                  <p className="text-green-400 text-sm mb-3">{caterer.specialty}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Min order: {caterer.minOrder}</span>
                    {caterer.delivery && (
                      <span className="text-green-400 text-xs">✓ Delivers</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Entertainment Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🎭 Entertainment</h2>
                <p className="text-gray-400">Keep guests entertained</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {entertainmentOptions.map((ent) => (
                <div key={ent.type} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-violet-500/50 transition text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">{ent.type}</h3>
                  <p className="text-violet-400 font-semibold mb-1">{ent.price}</p>
                  <p className="text-gray-400 text-sm">{ent.duration}</p>
                  <p className="text-gray-500 text-xs mt-2">Best for: {ent.best}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cake Shops Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                <Cake className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🎂 Birthday Cakes</h2>
                <p className="text-gray-400">The centerpiece of every party</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {cakeShops.map((shop) => (
                <div key={shop.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-pink-500/50 transition">
                  <h3 className="text-xl font-semibold text-white mb-2">{shop.name}</h3>
                  <p className="text-pink-400 text-sm mb-3">{shop.specialty}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-pink-400 font-semibold">{shop.price}</span>
                    <span className="text-gray-400">Lead time: {shop.lead}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Party Checklist */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              Party Planning Checklist
            </h2>
            
            <div className="space-y-3">
              {partyChecklist.map((item, index) => (
                <div key={item.task} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-white font-medium">{item.task}</span>
                  </div>
                  <span className="text-green-400 text-sm">{item.when}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Pro Tips for Party Success</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/30">
                <h3 className="text-xl font-semibold text-pink-300 mb-2">🌡️ Consider the Weather</h3>
                <p className="text-gray-300">
                  If planning an outdoor party between May-September, have a backup indoor option. 
                  Bahrain summers are hot! October-April is perfect for outdoor celebrations.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30">
                <h3 className="text-xl font-semibold text-blue-300 mb-2">📸 Document Everything</h3>
                <p className="text-gray-300">
                  Even if you hire a photographer, designate a friend to capture candid moments. 
                  Set up a photo corner with props — guests love them and they make for great memories.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/30">
                <h3 className="text-xl font-semibold text-green-300 mb-2">🎁 Party Favors</h3>
                <p className="text-gray-300">
                  Keep it simple but thoughtful. For kids, small toys or candy bags work great. 
                  For adults, consider local treats like dates or Bahraini sweets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Planning?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore our venue directory or discover more events and activities in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/places"
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse Venues
              </Link>
              <Link 
                href="/events"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                View Events
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/valentines-day-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Heart className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-red-300 transition">Valentine's Day Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Romantic restaurants & events</p>
              </Link>
              <Link href="/family-kids" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Users className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">Family Activities</h3>
                <p className="text-sm text-gray-400 mt-2">Things to do with kids</p>
              </Link>
              <Link href="/events" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <PartyPopper className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">Upcoming Events</h3>
                <p className="text-sm text-gray-400 mt-2">What's happening in Bahrain</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
