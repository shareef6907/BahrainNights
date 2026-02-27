import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Sparkles, Shirt, Coffee, Home } from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Brand Shopping Guides Bahrain - All Store Locations 2026',
  description: 'Find your favorite brands in Bahrain. Complete store guides for Zara, H&M, Nike, Adidas, Sephora, Apple, Gucci, Louis Vuitton, Starbucks, IKEA and more.',
  keywords: 'brands Bahrain, shopping Bahrain, Zara Bahrain, H&M Bahrain, Nike Bahrain, Sephora Bahrain, Apple Bahrain, luxury brands Bahrain',
  openGraph: {
    title: 'Brand Shopping Guides Bahrain - All Store Locations 2026',
    description: 'Find your favorite brands in Bahrain. Complete store guides with locations, hours, and shopping tips.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands',
  },
};

const fashionBrands = [
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗', description: 'Spanish fast-fashion with trendy styles' },
  { name: 'H&M', href: '/guides/brands/hm', emoji: '👔', description: 'Affordable Swedish fashion for all' },
  { name: 'Nike', href: '/guides/brands/nike', emoji: '👟', description: 'Athletic footwear and apparel' },
  { name: 'Adidas', href: '/guides/brands/adidas', emoji: '⚽', description: 'German sportswear brand' },
  { name: 'Uniqlo', href: '/guides/brands/uniqlo', emoji: '🧥', description: 'Japanese casual essentials' },
  { name: 'Crocs', href: '/guides/brands/crocs', emoji: '🐊', description: 'Comfortable casual footwear' },
];

const luxuryBrands = [
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', emoji: '👜', description: 'French luxury fashion house' },
  { name: 'Gucci', href: '/guides/brands/gucci', emoji: '🐍', description: 'Italian luxury brand' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💎', description: 'French haute couture' },
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤', description: 'Iconic French fashion' },
  { name: 'Hermès', href: '/guides/brands/hermes', emoji: '🧣', description: 'French luxury goods' },
];

const beautyBrands = [
  { name: 'Sephora', href: '/guides/brands/sephora', emoji: '💄', description: 'Beauty and cosmetics superstore' },
  { name: 'Bath & Body Works', href: '/guides/brands/bath-body-works', emoji: '🛁', description: 'Body care and fragrances' },
];

const techBrands = [
  { name: 'Apple', href: '/guides/brands/apple', emoji: '🍎', description: 'Premium tech and electronics' },
  { name: 'IKEA', href: '/guides/brands/ikea', emoji: '🏠', description: 'Swedish furniture and home' },
];

const foodBrands = [
  { name: 'Starbucks', href: '/guides/brands/starbucks', emoji: '☕', description: 'Global coffee chain' },
  { name: 'Costa Coffee', href: '/guides/brands/costa-coffee', emoji: '☕', description: 'British coffee house' },
  { name: 'Five Guys', href: '/guides/brands/five-guys', emoji: '🍔', description: 'American burgers and fries' },
  { name: 'Shake Shack', href: '/guides/brands/shake-shack', emoji: '🍔', description: 'Modern roadside burgers' },
  { name: 'The Cheesecake Factory', href: '/guides/brands/cheesecake-factory', emoji: '🍰', description: 'American restaurant chain' },
];

const brandCategories = [
  { title: 'Fashion & Sportswear', icon: Shirt, brands: fashionBrands, color: 'blue' },
  { title: 'Luxury Brands', icon: Sparkles, brands: luxuryBrands, color: 'amber' },
  { title: 'Beauty & Cosmetics', icon: Sparkles, brands: beautyBrands, color: 'pink' },
  { title: 'Tech & Home', icon: Home, brands: techBrands, color: 'purple' },
  { title: 'Food & Beverage', icon: Coffee, brands: foodBrands, color: 'orange' },
];

const colorClasses: Record<string, { bg: string; text: string; hover: string }> = {
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', hover: 'hover:text-blue-400' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', hover: 'hover:text-amber-400' },
  pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', hover: 'hover:text-pink-400' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', hover: 'hover:text-purple-400' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', hover: 'hover:text-orange-400' },
};

export default function BrandsIndexPage() {
  const totalBrands = brandCategories.reduce((acc, cat) => acc + cat.brands.length, 0);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brand Guides', url: 'https://www.bahrainnights.com/guides/brands' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              <ShoppingBag className="w-4 h-4 inline mr-1" />
              {totalBrands} Brand Guides
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Brand Shopping
              </span>
              {' '}Guides
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find your favorite brands in Bahrain. Complete guides with all store locations, 
              opening hours, and shopping tips for fashion, luxury, beauty, tech, and dining.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Categories */}
      {brandCategories.map((category) => {
        const colors = colorClasses[category.color];
        return (
          <section key={category.title} className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className={`p-2 rounded-lg ${colors.bg}`}>
                  <category.icon className={`w-6 h-6 ${colors.text}`} />
                </span>
                {category.title}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.brands.map((brand) => (
                  <Link
                    key={brand.href}
                    href={brand.href}
                    className="group bg-white/5 hover:bg-white/10 rounded-xl p-5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{brand.emoji}</span>
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg mb-1 group-${colors.hover} transition-colors`}>
                          {brand.name}
                        </h3>
                        <p className="text-sm text-gray-400">{brand.description}</p>
                      </div>
                      <ArrowRight className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Related Links */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore Shopping Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'All Malls in Bahrain', href: '/guides/malls', emoji: '🏬' },
              { name: 'Traditional Souks', href: '/guides/souks', emoji: '🛍️' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain', emoji: '🏢' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues', emoji: '🌊' },
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="text-2xl mb-2 block">{link.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for a Mall?</h2>
          <p className="text-gray-300 mb-8">
            Explore all shopping malls in Bahrain with complete store directories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <Link 
              href="/guides"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Brand Shopping Guides Bahrain',
            description: 'Find your favorite brands in Bahrain. Complete store guides with locations, hours, and shopping tips.',
            url: 'https://www.bahrainnights.com/guides/brands',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: brandCategories.flatMap((cat, catIndex) =>
                cat.brands.map((brand, brandIndex) => ({
                  '@type': 'ListItem',
                  position: catIndex * 10 + brandIndex + 1,
                  name: brand.name,
                  url: `https://www.bahrainnights.com${brand.href}`,
                }))
              ),
            },
          }),
        }}
      />
    </div>
  );
}
