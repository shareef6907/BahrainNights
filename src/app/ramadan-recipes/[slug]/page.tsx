import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, Users, ChefHat, ArrowLeft, Share2, Printer, Check, ChevronRight } from 'lucide-react';
import { ramadanRecipes, getCountryFlag, RamadanRecipe } from '@/data/ramadan-recipes';

// Generate static params for all recipes
export async function generateStaticParams() {
  return ramadanRecipes.map((recipe) => ({
    slug: recipe.id,
  }));
}

// Generate metadata for each recipe
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const recipe = ramadanRecipes.find(r => r.id === params.slug);
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found | BahrainNights',
    };
  }
  
  return {
    title: `${recipe.name} Recipe (${recipe.nameArabic}) — Traditional ${recipe.origin} Ramadan Dish | BahrainNights`,
    description: `Learn how to make authentic ${recipe.name} (${recipe.nameArabic}), a traditional ${recipe.origin} recipe perfect for Ramadan iftar and suhoor. ${recipe.difficulty} difficulty, ${recipe.totalTime}, serves ${recipe.servings}.`,
    keywords: [
      `${recipe.name} recipe`,
      `${recipe.nameArabic} recipe`,
      `how to make ${recipe.name}`,
      `${recipe.origin} recipe`,
      'Ramadan recipe',
      'iftar recipe',
      `traditional ${recipe.name}`,
      'Arab recipes',
      'Muslim recipes'
    ],
    openGraph: {
      title: `${recipe.name} Recipe — Traditional ${recipe.origin} Dish`,
      description: recipe.description,
      images: [recipe.image],
      type: 'article',
    },
    alternates: {
      canonical: `https://www.bahrainnights.com/ramadan-recipes/${recipe.id}`,
    },
  };
}

// Difficulty badge colors
const difficultyColors = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

// Schema.org Recipe structured data
function RecipeSchema({ recipe }: { recipe: RamadanRecipe }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: recipe.image,
    author: {
      '@type': 'Organization',
      name: 'BahrainNights',
      url: 'https://www.bahrainnights.com'
    },
    prepTime: `PT${recipe.prepTime.replace(' mins', 'M').replace(' hour', 'H').replace('s', '')}`,
    cookTime: `PT${recipe.cookTime.replace(' mins', 'M').replace(' hour', 'H').replace('s', '')}`,
    totalTime: `PT${recipe.totalTime.replace(' mins', 'M').replace(' hour', 'H').replace('s', '')}`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.origin,
    keywords: `${recipe.name}, ${recipe.nameArabic}, Ramadan recipe, ${recipe.origin} food, iftar, suhoor`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step
    })),
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: '1 serving'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127'
    }
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = ramadanRecipes.find(r => r.id === params.slug);
  
  if (!recipe) {
    notFound();
  }
  
  // Get related recipes from same category
  const relatedRecipes = ramadanRecipes
    .filter(r => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <RecipeSchema recipe={recipe} />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <nav className="flex items-center text-sm text-gray-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/ramadan-recipes" className="hover:text-amber-400 transition-colors">Ramadan Recipes</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-amber-400">{recipe.name}</span>
        </nav>
      </div>
      
      {/* Recipe Header */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Recipe Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={`${recipe.name} - ${recipe.origin} Ramadan Recipe`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay badges */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`text-sm font-medium px-3 py-1.5 rounded-full border ${difficultyColors[recipe.difficulty]}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">{getCountryFlag(recipe.countryCode)}</span>
                  <span className="text-white font-medium">{recipe.origin}</span>
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-300 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-300 transition-colors">
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>
            
            {/* Recipe Info */}
            <div>
              {/* Category Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-4">
                <span>Traditional Recipe</span>
                <span>•</span>
                <span>{recipe.category}</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {recipe.name}
              </h1>
              <p className="text-3xl font-arabic text-amber-400 mb-6" dir="rtl">
                {recipe.nameArabic}
              </p>
              
              {/* Description */}
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {recipe.description}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                  <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Prep Time</div>
                  <div className="font-bold text-white">{recipe.prepTime}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                  <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Cook Time</div>
                  <div className="font-bold text-white">{recipe.cookTime}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                  <Users className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Servings</div>
                  <div className="font-bold text-white">{recipe.servings}</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-purple-500/20">
                  <ChefHat className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Difficulty</div>
                  <div className="font-bold text-white">{recipe.difficulty}</div>
                </div>
              </div>
              
              {/* Back to Recipes */}
              <Link 
                href="/ramadan-recipes" 
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Recipes</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recipe Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-slate-900/70 rounded-2xl border border-purple-500/20 p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">🥗</span>
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 text-gray-300 group cursor-pointer"
                    >
                      <div className="mt-1.5 w-5 h-5 rounded-full border-2 border-amber-500/50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <Check className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="group-hover:text-amber-400 transition-colors">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">👨‍🍳</span>
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center font-bold text-slate-900">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
              
              {/* Tips Section */}
              <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl border border-amber-500/30 p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  Chef's Tips
                </h3>
                <p className="text-gray-300 leading-relaxed">{recipe.tips}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="py-16 border-t border-purple-500/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">
              More {recipe.category}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedRecipes.map((related) => (
                <Link
                  key={related.id}
                  href={`/ramadan-recipes/${related.id}`}
                  className="group bg-slate-900/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-amber-500/40 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 text-sm">
                      {getCountryFlag(related.countryCode)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-purple-400 font-arabic text-sm" dir="rtl">{related.nameArabic}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                      <span>{related.totalTime}</span>
                      <span>•</span>
                      <span>{related.difficulty}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-purple-950/50 to-amber-950/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">Explore more traditional recipes from around the Muslim world</p>
          <Link
            href="/ramadan-recipes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold rounded-full hover:from-amber-400 hover:to-yellow-400 transition-all"
          >
            <span>View All Recipes</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
