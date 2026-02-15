import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Coffee, MapPin, Star, Wifi, BookOpen, Camera, Clock,
  Laptop, Heart, Sparkles, Users, Sun, Music, Leaf
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Best Cafes in Bahrain 2026 — Coffee Shops & Study Spots | BahrainNights',
  description: 'Discover the best cafes in Bahrain for 2026! From specialty coffee and study-friendly spots to Instagram-worthy cafes. Complete guide with WiFi info, opening hours, and reviews.',
  keywords: [
    'best cafes Bahrain', 'coffee shops Bahrain', 'study cafes Bahrain',
    'specialty coffee Bahrain', 'cafes with wifi Bahrain', 'work cafes Bahrain',
    'Instagram cafes Bahrain', 'third wave coffee Bahrain', 'Manama cafes',
    'Adliya cafes', 'Seef cafes', 'cozy cafes Bahrain', 'brunch cafes Bahrain',
    'aesthetic cafes Bahrain', 'laptop friendly cafes Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/best-cafes-bahrain',
  },
  openGraph: {
    title: 'Best Cafes in Bahrain 2026 — Coffee Shops & Study Spots',
    description: 'Your ultimate guide to cafes in Bahrain. From specialty coffee to study-friendly spots and Instagram-worthy venues.',
    url: 'https://www.bahrainnights.com/best-cafes-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-cafes.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Cafes in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cafes in Bahrain 2026 — Coffee Shops & Study Spots',
    description: 'Complete cafe guide - specialty coffee, study spots & Instagram-worthy venues!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Schema
function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://www.bahrainnights.com/best-cafes-bahrain#article',
        headline: 'Best Cafes in Bahrain — Coffee Shops & Study Spots 2026',
        description: 'Discover the best cafes in Bahrain. From specialty coffee and study-friendly spots to Instagram-worthy venues.',
        author: {
          '@type': 'Organization',
          name: 'BahrainNights'
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
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Best Cafes Bahrain', item: 'https://www.bahrainnights.com/best-cafes-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the best specialty coffee shops in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best specialty coffee shops in Bahrain include 198 Cafe, Crust & Crema, Nine Yards Coffee, Flat White Specialty Coffee, and Brew Mood. These cafes serve third-wave coffee with beans roasted locally or imported from renowned roasters worldwide.'
            }
          },
          {
            '@type': 'Question',
            name: 'Which cafes in Bahrain are best for studying or working?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best study-friendly cafes in Bahrain are 198 Cafe, Crust & Crema in Adliya, Canvas Cafe, and The Daily Grind. These offer reliable WiFi, power outlets, quiet atmospheres, and comfortable seating for extended work sessions.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where are the most Instagram-worthy cafes in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most Instagram-worthy cafes include The Orangery (garden setting), Lilou Artisan Patisserie (French elegance), Canvas Cafe (artistic interiors), and Butter & Co (aesthetic brunch spots). All feature stunning decor perfect for photos.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do cafes in Bahrain have WiFi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most cafes in Bahrain offer free WiFi. Specialty coffee shops like 198 Cafe, Crust & Crema, and Canvas Cafe are particularly popular among remote workers and students due to their reliable internet and laptop-friendly environment.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the best brunch cafes in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best brunch cafes in Bahrain include The Orangery, Lilou, Crust & Crema, Furn Bistro, and Butter & Co. They serve all-day breakfast, healthy bowls, and artisanal coffee from early morning until late afternoon.'
            }
          }
        ]
      }
    ]
  };
}

const cafeCategories = [
  {
    title: 'Specialty Coffee Shops',
    icon: Coffee,
    color: 'from-amber-600 to-orange-700',
    description: 'Third-wave coffee with expertly roasted beans and skilled baristas',
    cafes: [
      { 
        name: '198 Cafe', 
        location: 'Manama', 
        style: 'Industrial Minimalist',
        rating: 4.8, 
        price: '$$',
        features: ['Pour Over', 'V60', 'WiFi', 'Laptop Friendly'],
        desc: 'One of Bahrain\'s pioneering specialty coffee shops, 198 Cafe has set the standard for third-wave coffee in the Kingdom. Their baristas are trained to perfection, offering pour-over, V60, and various brewing methods. The minimalist industrial interior creates the perfect atmosphere for coffee appreciation. The avocado toast and healthy bowls complement the coffee menu beautifully. This is where serious coffee lovers come to experience the craft.',
        specialty: 'Single-origin pour-over coffee',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Crust & Crema', 
        location: 'Adliya', 
        style: 'Artisan Bakery',
        rating: 4.7, 
        price: '$$',
        features: ['Fresh Pastries', 'Artisan Bread', 'WiFi', 'Outdoor Seating'],
        desc: 'This artisanal bakery-cafe combination has become an Adliya institution. The aroma of freshly baked bread and pastries greets you at the door, while the coffee bar serves perfectly crafted espresso drinks. Their croissants rival any Parisian bakery, and the sourdough bread is baked fresh daily. The rustic-chic interior with exposed brick walls creates a warm, inviting atmosphere. Perfect for a leisurely breakfast or afternoon coffee with something sweet.',
        specialty: 'Butter croissants and artisan sourdough',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Nine Yards Coffee', 
        location: 'Budaiya', 
        style: 'Modern Roastery',
        rating: 4.6, 
        price: '$$',
        features: ['House Roasted', 'Cold Brew', 'Specialty Beans', 'Takeaway'],
        desc: 'A local roastery that takes coffee seriously. Nine Yards sources green beans from around the world and roasts them in-house to bring out unique flavor profiles. Watch the roasting process while enjoying your cup. Their cold brew is legendary, and you can purchase bags of freshly roasted beans to enjoy at home. The knowledgeable staff can guide you through their rotating selection of single-origin coffees from Ethiopia, Colombia, and beyond.',
        specialty: 'House-roasted single-origin beans',
        wifi: true,
        studyFriendly: false
      },
      { 
        name: 'Flat White Specialty Coffee', 
        location: 'Seef', 
        style: 'Contemporary',
        rating: 4.5, 
        price: '$$',
        features: ['Latte Art', 'Australian Style', 'Brunch Menu', 'Parking'],
        desc: 'Bringing Australian coffee culture to Bahrain, Flat White lives up to its namesake with perfectly textured milk and espresso harmony. The cafe offers a Melbourne-inspired brunch menu alongside expertly crafted coffee drinks. Their baristas are champions of latte art, making each cup a visual treat. The spacious setting in Seef makes it a great spot for weekend brunch with friends or a quiet weekday coffee.',
        specialty: 'Australian-style flat white',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Brew Mood', 
        location: 'Juffair', 
        style: 'Cozy Corner',
        rating: 4.4, 
        price: '$',
        features: ['Budget Friendly', 'Quick Service', 'Quality Beans', 'Grab & Go'],
        desc: 'Proof that great specialty coffee doesn\'t have to break the bank. Brew Mood offers quality third-wave coffee at accessible prices. The small but welcoming space attracts a mix of students, professionals, and coffee enthusiasts. Their espresso-based drinks are consistent and flavorful, and the friendly staff make everyone feel like a regular. A great option for those who want specialty coffee without the specialty price tag.',
        specialty: 'Affordable specialty coffee',
        wifi: true,
        studyFriendly: true
      },
    ]
  },
  {
    title: 'Study & Work Cafes',
    icon: Laptop,
    color: 'from-blue-600 to-indigo-700',
    description: 'Quiet spots with WiFi, power outlets, and the perfect work atmosphere',
    cafes: [
      { 
        name: 'Canvas Cafe', 
        location: 'Seef', 
        style: 'Artistic Modern',
        rating: 4.6, 
        price: '$$',
        features: ['Fast WiFi', 'Power Outlets', 'Quiet Zones', 'Long Hours'],
        desc: 'Canvas Cafe was designed with remote workers and students in mind. The spacious layout includes dedicated quiet zones, abundant power outlets, and some of the fastest WiFi in Bahrain. The artistic interiors featuring local artwork create an inspiring environment for creativity and productivity. The extensive menu means you can stay all day without running out of food options. Noise levels are kept low, making it ideal for focused work.',
        specialty: 'Dedicated workspace with fast WiFi',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'The Daily Grind', 
        location: 'Multiple Locations', 
        style: 'Chain Cafe',
        rating: 4.3, 
        price: '$',
        features: ['Multiple Branches', 'Consistent Quality', 'WiFi', 'Extended Hours'],
        desc: 'This popular local chain has earned its reputation as a reliable study spot across Bahrain. With multiple locations, you\'re never far from a Daily Grind. Each branch offers consistent coffee quality, reliable WiFi, and comfortable seating. The background noise level is just right — not too quiet, not too loud. Their affordability makes them perfect for students who need a caffeine-fueled study session without overspending.',
        specialty: 'Reliable chain with consistent standards',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Dose Cafe', 
        location: 'Riffa', 
        style: 'Cozy Modern',
        rating: 4.4, 
        price: '$$',
        features: ['Quiet Atmosphere', 'Study Tables', 'Good Lighting', 'WiFi'],
        desc: 'A hidden gem in Riffa that\'s become the go-to study spot for South Bahrain residents. The cafe was thoughtfully designed with students and remote workers in mind — plenty of natural light, comfortable chairs for long sessions, and a consciously quiet atmosphere. The menu offers brain-fuel options from healthy bowls to caffeine-rich drinks. The staff understand the study cafe culture and won\'t rush you out.',
        specialty: 'Quiet study atmosphere in Riffa',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Costa Coffee (Moda Mall)', 
        location: 'Bahrain WTC', 
        style: 'International Chain',
        rating: 4.2, 
        price: '$$',
        features: ['Central Location', 'Reliable WiFi', 'Long Hours', 'Comfortable Seating'],
        desc: 'While it\'s an international chain, the Moda Mall Costa Coffee location has become a productivity hub due to its central location and reliable amenities. Business professionals often meet here between appointments, and the spacious layout accommodates laptop users comfortably. The familiar menu means no surprises, and the coffee is consistently good. The mall location also means easy access to food court options when you need a meal break.',
        specialty: 'Prime business district location',
        wifi: true,
        studyFriendly: true
      },
    ]
  },
  {
    title: 'Instagram-Worthy Cafes',
    icon: Camera,
    color: 'from-pink-500 to-rose-600',
    description: 'Aesthetically stunning venues perfect for photos and content creation',
    cafes: [
      { 
        name: 'The Orangery', 
        location: 'Adliya', 
        style: 'Garden Oasis',
        rating: 4.7, 
        price: '$$$',
        features: ['Garden Setting', 'Natural Light', 'Photogenic Food', 'Brunch Famous'],
        desc: 'Step into a secret garden in the heart of Adliya. The Orangery has become Bahrain\'s most photographed cafe, and it\'s easy to see why. Lush greenery, fairy lights, and rustic wooden furniture create a magical atmosphere that looks stunning from every angle. The food is as beautiful as the setting — colorful smoothie bowls, perfectly plated avocado toast, and edible flower-topped dishes. Weekend brunch here feels like a mini escape from the city. Reservations recommended for weekends.',
        specialty: 'Garden-themed photo paradise',
        wifi: true,
        studyFriendly: false
      },
      { 
        name: 'Lilou Artisan Patisserie', 
        location: 'Adliya', 
        style: 'French Elegance',
        rating: 4.6, 
        price: '$$$',
        features: ['French Pastries', 'Elegant Interior', 'Brunch', 'All-Day Dining'],
        desc: 'French elegance meets Bahraini hospitality at this beloved patisserie. The interior is pure Parisian sophistication — marble counters, crystal chandeliers, and display cases filled with colorful macarons and delicate pastries. Every dish arrives looking like edible art, from their famous French toast to the towering desserts. The outdoor terrace is perfect for golden hour photos. Lilou has become the go-to spot for special occasion breakfasts and ladies\' brunches.',
        specialty: 'French patisserie elegance',
        wifi: true,
        studyFriendly: false
      },
      { 
        name: 'Butter & Co', 
        location: 'Seef', 
        style: 'Modern Chic',
        rating: 4.5, 
        price: '$$',
        features: ['Aesthetic Interior', 'Brunch Menu', 'Good Lighting', 'Trendy Vibe'],
        desc: 'This modern cafe has mastered the art of the aesthetic dining experience. The clean, contemporary design with carefully curated decor elements makes every corner photo-worthy. Natural light floods in through large windows, creating the perfect lighting for food photography. The menu is equally Instagram-ready — fluffy pancakes, colorful smoothie bowls, and artistically presented eggs benedicts. Popular among Bahrain\'s social media influencers and content creators.',
        specialty: 'Modern aesthetic with perfect lighting',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Meisei', 
        location: 'Seef', 
        style: 'Japanese Minimal',
        rating: 4.5, 
        price: '$$',
        features: ['Japanese Aesthetic', 'Matcha Specialty', 'Unique Desserts', 'Zen Atmosphere'],
        desc: 'Japanese minimalism creates a zen-like atmosphere at this unique cafe. The matcha-focused menu offers vibrant green drinks and desserts that pop beautifully in photos. From matcha lattes with intricate latte art to Japanese cheesecakes and mochi, every item is a visual treat. The clean lines and neutral palette of the interior provide the perfect backdrop for content creation. This is where you come for that perfect matcha aesthetic.',
        specialty: 'Japanese minimalism and matcha drinks',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Wild Coffee', 
        location: 'Riffa', 
        style: 'Bohemian Tropical',
        rating: 4.4, 
        price: '$$',
        features: ['Tropical Vibes', 'Plants Everywhere', 'Unique Decor', 'Colorful Drinks'],
        desc: 'Tropical bohemian vibes make Wild Coffee a standout in Riffa. Indoor plants cascade from every surface, macrame hangs from the ceiling, and colorful accents brighten the space. The menu matches the aesthetic with rainbow lattes, tropical smoothies, and photogenic breakfast plates. It\'s become a destination cafe for those seeking a unique photo backdrop outside the typical Manama spots.',
        specialty: 'Bohemian tropical atmosphere',
        wifi: true,
        studyFriendly: true
      },
    ]
  },
  {
    title: 'Brunch & All-Day Cafes',
    icon: Sun,
    color: 'from-yellow-500 to-orange-500',
    description: 'All-day breakfast, healthy bowls, and leisurely weekend meals',
    cafes: [
      { 
        name: 'Furn Bistro & Bakery', 
        location: 'Adliya', 
        style: 'Mediterranean Bistro',
        rating: 4.6, 
        price: '$$',
        features: ['All-Day Breakfast', 'Fresh Bread', 'Mediterranean Menu', 'Outdoor Seating'],
        desc: 'This beloved bistro has been an Adliya staple for years, known for its fresh-baked bread and Mediterranean-inspired menu. The all-day breakfast options are exceptional — from classic eggs to more creative dishes like shakshuka with house-made bread. The smell of fresh bread from the bakery is irresistible, and many locals pick up loaves to take home. The shaded outdoor terrace is perfect for a lazy weekend brunch. The menu transitions seamlessly from breakfast to lunch and dinner.',
        specialty: 'Fresh-baked bread and Mediterranean brunch',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Piatto', 
        location: 'Seef', 
        style: 'Modern European',
        rating: 4.5, 
        price: '$$',
        features: ['European Cuisine', 'Healthy Options', 'Coffee & Cocktails', 'Evening Atmosphere'],
        desc: 'Piatto transitions beautifully from a morning cafe to an evening bistro. The breakfast and brunch menu features European favorites done exceptionally well — from eggs Florentine to healthy grain bowls. The coffee program is taken seriously, with well-trained baristas crafting your morning cup. As the day progresses, the menu shifts to lunch and dinner options, and cocktails become available. Great for a brunch that turns into an all-day affair.',
        specialty: 'European brunch transitioning to bistro',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Paul Bakery', 
        location: 'Multiple Locations', 
        style: 'French Boulangerie',
        rating: 4.4, 
        price: '$$',
        features: ['French Bakery', 'All-Day Menu', 'Quality Consistent', 'Central Locations'],
        desc: 'The famous French bakery chain delivers consistent quality across its Bahrain locations. The viennoiserie (pastries) are baked fresh throughout the day, and the all-day breakfast menu satisfies both sweet and savory cravings. Their croque madame and French toast are perennial favorites. The cafe areas provide comfortable seating for leisurely meals, and the bakery counter offers treats to take away. A reliable choice when you want French cafe experience.',
        specialty: 'Authentic French bakery experience',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'The Hive', 
        location: 'Manama', 
        style: 'Health-Forward',
        rating: 4.5, 
        price: '$$',
        features: ['Healthy Menu', 'Smoothie Bowls', 'Vegan Options', 'Fresh Juices'],
        desc: 'Health-conscious diners flock to The Hive for its wholesome menu focused on nutrition without sacrificing taste. The acai and smoothie bowls are Instagram-worthy and genuinely delicious. Vegan and vegetarian options abound, alongside fresh-pressed juices and protein-packed dishes. The bright, clean interior matches the fresh food philosophy. A perfect choice for those seeking a nourishing brunch or healthy lunch option.',
        specialty: 'Healthy bowls and wellness-focused menu',
        wifi: true,
        studyFriendly: true
      },
    ]
  },
  {
    title: 'Cozy & Hidden Gems',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    description: 'Charming neighborhood cafes loved by locals',
    cafes: [
      { 
        name: 'Naseef', 
        location: 'Muharraq', 
        style: 'Heritage',
        rating: 4.7, 
        price: '$$',
        features: ['Heritage Building', 'Traditional Touch', 'Local Favorite', 'Cultural Experience'],
        desc: 'Located in a beautifully restored heritage building in Muharraq, Naseef offers a unique cafe experience steeped in Bahraini history. The traditional architecture creates an atmosphere you won\'t find elsewhere — exposed coral walls, wooden balconies, and antique furnishings. The menu blends modern cafe offerings with local touches. Come for the coffee, stay for the cultural immersion. This is a must-visit for anyone wanting to experience the old town\'s charm.',
        specialty: 'Heritage atmosphere in Muharraq',
        wifi: true,
        studyFriendly: false
      },
      { 
        name: 'Milk & Honey', 
        location: 'Saar', 
        style: 'Neighborhood Gem',
        rating: 4.4, 
        price: '$$',
        features: ['Family Friendly', 'Residential Area', 'Cozy Interior', 'Regular Locals'],
        desc: 'This neighborhood cafe in Saar has earned a devoted following among local residents. The cozy interior feels like an extension of home, and the staff remember their regulars by name. The menu offers comfort food done well — hearty breakfasts, good sandwiches, and reliably tasty coffee. It\'s the kind of place where you can bring the kids, linger over a book, or catch up with neighbors. Authentic neighborhood cafe vibes.',
        specialty: 'True neighborhood cafe atmosphere',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Wooden Bakery Cafe', 
        location: 'Multiple', 
        style: 'Rustic Lebanese',
        rating: 4.3, 
        price: '$',
        features: ['Lebanese Bakery', 'Fresh Manakish', 'Affordable', 'Quick Bites'],
        desc: 'Part of the beloved Lebanese bakery chain, the cafe sections offer a casual spot for excellent coffee alongside fresh-from-the-oven manakish. The rustic setting is unpretentious and welcoming. Perfect for a quick breakfast or afternoon pick-me-up. The zaatar and cheese manakish with Arabic coffee is a classic combination. Budget-friendly and consistently good.',
        specialty: 'Fresh manakish with great coffee',
        wifi: true,
        studyFriendly: true
      },
      { 
        name: 'Grey Cafe', 
        location: 'Juffair', 
        style: 'Minimalist Cozy',
        rating: 4.5, 
        price: '$$',
        features: ['Minimalist Design', 'Quality Coffee', 'Small Menu', 'Peaceful'],
        desc: 'A small, understated cafe that lets quality speak for itself. The minimalist design creates a calm, focused atmosphere. The menu is intentionally limited — they do a few things exceptionally well rather than many things adequately. The coffee is excellent, the food is carefully prepared, and the vibe is refreshingly unpretentious. A favorite among those who appreciate simplicity and quality over Instagram-worthy excess.',
        specialty: 'Minimalist quality focus',
        wifi: true,
        studyFriendly: true
      },
    ]
  },
  {
    title: 'Shisha & Chill Cafes',
    icon: Music,
    color: 'from-purple-500 to-violet-600',
    description: 'Relaxed atmosphere with shisha and great coffee',
    cafes: [
      { 
        name: 'Karaki Lounge', 
        location: 'Juffair', 
        style: 'Modern Arabic',
        rating: 4.4, 
        price: '$$',
        features: ['Shisha', 'Karaki Tea', 'Evening Vibes', 'Outdoor Seating'],
        desc: 'Named after the beloved South Asian sweet tea, Karaki Lounge perfectly blends cafe culture with shisha lounge atmosphere. The evenings come alive with friends gathering over shisha and karaki. The menu offers both traditional teas and modern coffee drinks. The outdoor seating area is particularly pleasant in cooler months. Popular among young professionals looking for a relaxed evening hangout.',
        specialty: 'Karaki tea and evening shisha',
        wifi: true,
        studyFriendly: false
      },
      { 
        name: 'Mirage Cafe', 
        location: 'Adliya', 
        style: 'Traditional with Modern Touch',
        rating: 4.3, 
        price: '$$',
        features: ['Shisha', 'Traditional Coffee', 'Open Late', 'Social Atmosphere'],
        desc: 'A beloved Adliya spot that\'s been serving the community for years. The cafe strikes a balance between traditional Arabic cafe culture and modern sensibilities. Excellent Arabic coffee, premium shisha, and good conversation — that\'s what Mirage is about. The late hours make it a go-to for night owls. The social atmosphere is welcoming to everyone.',
        specialty: 'Traditional Arabic cafe culture',
        wifi: true,
        studyFriendly: false
      },
      { 
        name: 'Saffron', 
        location: 'Budaiya', 
        style: 'Relaxed Evening',
        rating: 4.3, 
        price: '$$',
        features: ['Shisha', 'Coffee & Tea', 'Chill Atmosphere', 'Good Music'],
        desc: 'Located along the scenic Budaiya road, Saffron offers a relaxed evening cafe experience. The laid-back atmosphere makes it popular for casual gatherings. Shisha quality is good, and the drinks menu covers everything from specialty coffee to traditional teas. The music selection sets the right mood without being overpowering. A solid choice for those in the Budaiya area.',
        specialty: 'Relaxed Budaiya evening spot',
        wifi: true,
        studyFriendly: false
      },
    ]
  },
];

const cafeAreas = [
  { name: 'Adliya', count: 15, vibe: 'Artistic & trendy hub', popular: ['Lilou', 'Crust & Crema', 'The Orangery'] },
  { name: 'Seef', count: 12, vibe: 'Modern & commercial', popular: ['Flat White', 'Canvas Cafe', 'Butter & Co'] },
  { name: 'Manama', count: 10, vibe: 'Downtown variety', popular: ['198 Cafe', 'The Hive', 'Costa WTC'] },
  { name: 'Juffair', count: 8, vibe: 'Expat friendly', popular: ['Brew Mood', 'Grey Cafe', 'Karaki Lounge'] },
  { name: 'Muharraq', count: 5, vibe: 'Heritage charm', popular: ['Naseef', 'Traditional spots'] },
  { name: 'Riffa', count: 6, vibe: 'Residential calm', popular: ['Wild Coffee', 'Dose Cafe'] },
];

export default function CafesBahrainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-orange-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Best Cafes Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full text-amber-300 text-sm mb-4">
                ☕ Updated for 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-orange-200 bg-clip-text text-transparent">
                Best Cafes in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From specialty coffee shops and study-friendly spots to Instagram-worthy venues, 
                discover Bahrain's best cafes for every mood and occasion.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">40+</div>
                  <div className="text-sm text-gray-400">Cafes Reviewed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">6</div>
                  <div className="text-sm text-gray-400">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">All</div>
                  <div className="text-sm text-gray-400">Areas Covered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Category Nav */}
        <section className="py-8 px-4 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {cafeCategories.map((cat) => (
                <a
                  key={cat.title}
                  href={`#${cat.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-2`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Bahrain's Coffee Culture</h2>
            <p className="text-gray-300 leading-relaxed">
              Bahrain's cafe scene has exploded in recent years, evolving from traditional Arabic coffee houses 
              to a sophisticated landscape of specialty coffee shops, artisanal bakeries, and Instagram-worthy 
              brunch spots. The Kingdom's coffee culture now rivals any major city in the region.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you're a specialty coffee enthusiast seeking the perfect pour-over, a student needing 
              reliable WiFi and a quiet corner, or an influencer hunting for the next photogenic backdrop, 
              Bahrain has a cafe for you. The island's compact size means you're never far from a great cup of coffee.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>Adliya</strong> remains the heart of cafe culture with its pedestrian-friendly streets lined 
              with trendy spots. <strong>Seef</strong> offers modern, spacious cafes perfect for work. 
              <strong>Muharraq's</strong> heritage buildings house charming cafes with historical character. 
              This guide covers them all, organized by what you're looking for in your ideal cafe experience.
            </p>
          </div>
        </section>

        {/* Areas Overview */}
        <section className="py-12 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Cafes by Area</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {cafeAreas.map((area) => (
                <div key={area.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{area.name}</h3>
                    <span className="text-amber-400 font-semibold">{area.count}+</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{area.vibe}</p>
                  <div className="flex flex-wrap gap-1">
                    {area.popular.map((cafe) => (
                      <span key={cafe} className="px-2 py-0.5 bg-gray-700/50 rounded text-xs text-gray-300">
                        {cafe}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cafe Categories */}
        {cafeCategories.map((category) => (
          <section 
            key={category.title} 
            id={category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {category.cafes.map((cafe) => (
                  <div 
                    key={cafe.name} 
                    className="p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {cafe.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {cafe.location}
                          </span>
                          <span>•</span>
                          <span>{cafe.style}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-semibold">{cafe.rating}</span>
                        </div>
                        <div className="text-orange-400 font-semibold">{cafe.price}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">{cafe.desc}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      {cafe.wifi && (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <Wifi className="w-4 h-4" /> Free WiFi
                        </span>
                      )}
                      {cafe.studyFriendly && (
                        <span className="flex items-center gap-1 text-blue-400 text-sm">
                          <BookOpen className="w-4 h-4" /> Study Friendly
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {cafe.features.map((feature) => (
                        <span key={feature} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400">
                        <span className="text-amber-400 font-medium">Known for:</span> {cafe.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Cafe Tips */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Cafe Culture Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">☕ For Specialty Coffee</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Ask baristas about single-origin options</li>
                  <li>• Try pour-over for the best flavor experience</li>
                  <li>• Morning is best for fresh roasts</li>
                  <li>• Many shops sell beans to take home</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">💻 For Studying/Working</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Weekday mornings are quietest</li>
                  <li>• Bring a portable charger as backup</li>
                  <li>• Order regularly if staying long</li>
                  <li>• Check WiFi speed before settling in</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-pink-400 mb-3">📸 For Photos</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Visit during golden hour (4-6pm)</li>
                  <li>• Weekday mornings have fewer crowds</li>
                  <li>• Window seats have best natural light</li>
                  <li>• Ask before photographing other guests</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-green-400 mb-3">🌿 General Etiquette</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Reserve tables for busy weekend brunches</li>
                  <li>• Tip 10% for good service</li>
                  <li>• Most cafes don't mind laptop users</li>
                  <li>• Smoking areas are usually separate</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What are the best specialty coffee shops in Bahrain?</h3>
                <p className="text-gray-300">
                  The best specialty coffee shops in Bahrain include 198 Cafe, Crust & Crema, Nine Yards Coffee, 
                  Flat White Specialty Coffee, and Brew Mood. These cafes serve third-wave coffee with beans roasted 
                  locally or imported from renowned roasters worldwide.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Which cafes in Bahrain are best for studying or working?</h3>
                <p className="text-gray-300">
                  The best study-friendly cafes are 198 Cafe, Crust & Crema in Adliya, Canvas Cafe in Seef, 
                  and The Daily Grind locations. These offer reliable WiFi, power outlets, quiet atmospheres, 
                  and comfortable seating for extended work sessions.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Where are the most Instagram-worthy cafes in Bahrain?</h3>
                <p className="text-gray-300">
                  The most Instagram-worthy cafes include The Orangery (garden setting), Lilou Artisan Patisserie 
                  (French elegance), Canvas Cafe (artistic interiors), Meisei (Japanese minimal), and Butter & Co 
                  (aesthetic brunch spots). All feature stunning decor perfect for photos.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Do cafes in Bahrain have WiFi?</h3>
                <p className="text-gray-300">
                  Most cafes in Bahrain offer free WiFi. Specialty coffee shops like 198 Cafe, Crust & Crema, 
                  and Canvas Cafe are particularly popular among remote workers and students due to their reliable 
                  internet and laptop-friendly environment.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What are the best brunch cafes in Bahrain?</h3>
                <p className="text-gray-300">
                  The best brunch cafes in Bahrain include The Orangery, Lilou, Crust & Crema, Furn Bistro, 
                  and Butter & Co. They serve all-day breakfast, healthy bowls, and artisanal coffee from 
                  early morning until late afternoon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Explore More</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/best-restaurants-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🍽️</span>
                <h3 className="font-semibold text-white group-hover:text-orange-300">Restaurants</h3>
                <p className="text-sm text-gray-400 mt-2">Full dining guide</p>
              </Link>
              
              <Link href="/guides/brunch" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🥞</span>
                <h3 className="font-semibold text-white group-hover:text-orange-300">Brunch</h3>
                <p className="text-sm text-gray-400 mt-2">Friday brunch guide</p>
              </Link>
              
              <Link href="/things-to-do-in-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🎯</span>
                <h3 className="font-semibold text-white group-hover:text-orange-300">Things To Do</h3>
                <p className="text-sm text-gray-400 mt-2">Activities guide</p>
              </Link>
              
              <Link href="/bahrain-nightlife-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🌙</span>
                <h3 className="font-semibold text-white group-hover:text-orange-300">Nightlife</h3>
                <p className="text-sm text-gray-400 mt-2">Bars & clubs</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">
              Powered by <Link href="/" className="text-amber-400 hover:underline">BahrainNights.com</Link> — Bahrain's #1 Events & Lifestyle Platform
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
