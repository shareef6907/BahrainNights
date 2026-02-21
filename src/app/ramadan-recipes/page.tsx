import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ChefHat, Star, ArrowRight } from 'lucide-react';
import { ramadanRecipes, recipeCategories, getCountryFlag, getRamadanDay } from '@/data/ramadan-recipes';

export const metadata: Metadata = {
  title: 'Ramadan Recipes 2026 — Traditional Iftar & Suhoor Dishes from Around the World | BahrainNights',
  description: 'Discover 20+ authentic Ramadan recipes from across the Muslim world. Traditional iftar and suhoor dishes including harees, harira, biryani, luqaimat, kunafa, and more. Easy-to-follow recipes for a blessed Ramadan.',
  keywords: [
    'Ramadan recipes',
    'iftar recipes',
    'suhoor recipes',
    'Ramadan food Bahrain',
    'traditional Ramadan dishes',
    'harees recipe',
    'luqaimat recipe',
    'harira recipe',
    'kunafa recipe',
    'machboos recipe',
    'biryani recipe',
    'Arab recipes',
    'Muslim recipes',
    'Ramadan 2026'
  ],
  openGraph: {
    title: 'Ramadan Recipes 2026 — Traditional Iftar & Suhoor Dishes',
    description: 'Discover authentic Ramadan recipes from across the Muslim world. 20+ traditional dishes for iftar and suhoor.',
    images: ['/images/ramadan-recipes-og.jpg'],
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/ramadan-recipes',
  },
};

// Difficulty badge colors
const difficultyColors = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

// Category colors for cards
const categoryColors = {
  'Soups & Starters': 'from-amber-600/20 to-orange-600/20',
  'Main Dishes': 'from-purple-600/20 to-indigo-600/20',
  'Drinks & Refreshments': 'from-cyan-600/20 to-blue-600/20',
  'Sweets & Desserts': 'from-pink-600/20 to-rose-600/20',
};

export default function RamadanRecipesPage() {
  const ramadanDay = getRamadanDay();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Islamic geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🌙</div>
        <div className="absolute top-40 right-20 text-4xl opacity-20 animate-pulse delay-500">✨</div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-15 animate-pulse delay-700">🏮</div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Ramadan Day Counter */}
          {ramadanDay > 0 && ramadanDay <= 30 && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-full px-6 py-2">
                <span className="text-2xl">🌙</span>
                <span className="text-amber-400 font-semibold">Day {ramadanDay} of Ramadan</span>
              </div>
            </div>
          )}
          
          {/* Main Heading */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                Ramadan Kareem
              </span>
            </h1>
            <p className="text-3xl md:text-4xl font-arabic text-purple-300 mb-8" dir="rtl">
              رمضان كريم
            </p>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Celebrating the flavors of Ramadan from around the Muslim world. 
              Traditional recipes for <span className="text-amber-400 font-semibold">Iftar</span>, <span className="text-purple-400 font-semibold">Suhoor</span>, and everything in between.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400">{ramadanRecipes.length}</div>
              <div className="text-gray-400">Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">{recipeCategories.length}</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">11</div>
              <div className="text-gray-400">Countries</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Category Links */}
      <section className="py-8 border-y border-purple-500/20 bg-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {recipeCategories.map((category) => {
              const count = ramadanRecipes.filter(r => r.category === category).length;
              const icons: Record<string, string> = {
                'Soups & Starters': '🥣',
                'Main Dishes': '🍛',
                'Drinks & Refreshments': '🥤',
                'Sweets & Desserts': '🍮',
              };
              return (
                <a
                  key={category}
                  href={`#${category.toLowerCase().replace(/ & /g, '-')}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-800/50 border border-purple-500/30 hover:border-amber-500/50 hover:bg-purple-900/30 transition-all group"
                >
                  <span className="text-xl">{icons[category]}</span>
                  <span className="text-gray-200 group-hover:text-amber-400 transition-colors">{category}</span>
                  <span className="text-xs text-gray-500 bg-slate-700/50 px-2 py-0.5 rounded-full">{count}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Recipe Sections by Category */}
      {recipeCategories.map((category) => {
        const categoryRecipes = ramadanRecipes.filter(r => r.category === category);
        const categoryId = category.toLowerCase().replace(/ & /g, '-');
        const icons: Record<string, string> = {
          'Soups & Starters': '🥣',
          'Main Dishes': '🍛',
          'Drinks & Refreshments': '🥤',
          'Sweets & Desserts': '🍮',
        };
        
        return (
          <section key={category} id={categoryId} className="py-16">
            <div className="container mx-auto px-4">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-10">
                <span className="text-4xl">{icons[category]}</span>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{category}</h2>
                  <p className="text-gray-400">{categoryRecipes.length} traditional recipes</p>
                </div>
              </div>
              
              {/* Recipe Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryRecipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/ramadan-recipes/${recipe.id}`}
                    className="group relative bg-slate-900/50 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                  >
                    {/* Recipe Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-b ${categoryColors[category]} z-10`} />
                      <Image
                        src={recipe.image}
                        alt={`${recipe.name} - ${recipe.origin}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Country Flag */}
                      <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                        <span className="text-lg">{getCountryFlag(recipe.countryCode)}</span>
                        <span className="text-xs text-gray-200">{recipe.origin}</span>
                      </div>
                      {/* Difficulty Badge */}
                      <div className={`absolute top-3 left-3 z-20 text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyColors[recipe.difficulty]}`}>
                        {recipe.difficulty}
                      </div>
                    </div>
                    
                    {/* Recipe Info */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                        {recipe.name}
                      </h3>
                      <p className="text-purple-400 font-arabic text-lg mb-3" dir="rtl">
                        {recipe.nameArabic}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{recipe.totalTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                      
                      {/* Description Preview */}
                      <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                        {recipe.description}
                      </p>
                      
                      {/* View Recipe Link */}
                      <div className="mt-4 flex items-center text-amber-400 text-sm font-medium group-hover:text-amber-300">
                        <span>View Recipe</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      
      {/* Ramadan Tips Section */}
      <section className="py-16 bg-gradient-to-r from-purple-950/50 to-amber-950/30 border-y border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              <span className="text-amber-400">🌙</span> Ramadan Kitchen Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <div className="text-3xl mb-3">🍲</div>
                <h3 className="font-bold text-amber-400 mb-2">Start with Soup</h3>
                <p className="text-gray-400 text-sm">Begin iftar with dates and water, then a warm soup to gently rehydrate and prepare your stomach for the meal.</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <div className="text-3xl mb-3">💧</div>
                <h3 className="font-bold text-amber-400 mb-2">Stay Hydrated</h3>
                <p className="text-gray-400 text-sm">Drink plenty of water between iftar and suhoor. Traditional drinks like jallab and tamarind help replenish minerals.</p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <div className="text-3xl mb-3">🍳</div>
                <h3 className="font-bold text-amber-400 mb-2">Prep Ahead</h3>
                <p className="text-gray-400 text-sm">Many recipes can be partially prepared the night before, making iftar preparation easier during the fasting day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Looking for Ramadan Events in Bahrain?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Discover iftar tents, ghabga gatherings, and special Ramadan events happening across Bahrain.
          </p>
          <Link
            href="/guides/ramadan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold rounded-full hover:from-amber-400 hover:to-yellow-400 transition-all"
          >
            <span>Explore Ramadan Guide</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
