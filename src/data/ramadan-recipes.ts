// Ramadan Recipes Data
// Traditional dishes from across the Muslim world

export interface RamadanRecipe {
  id: string;
  name: string;
  nameArabic: string;
  category: 'Soups & Starters' | 'Main Dishes' | 'Drinks & Refreshments' | 'Sweets & Desserts';
  origin: string;
  countryCode: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  description: string;
  ingredients: string[];
  steps: string[];
  tips: string;
  image: string;
}

export const ramadanRecipes: RamadanRecipe[] = [
  {
    id: "lentil-soup",
    name: "Lentil Soup",
    nameArabic: "شوربة عدس",
    category: "Soups & Starters",
    origin: "Middle East",
    countryCode: "SA",
    prepTime: "10 mins",
    cookTime: "30 mins",
    totalTime: "40 mins",
    servings: 6,
    difficulty: "Easy",
    description: "The quintessential Ramadan iftar starter. This creamy, warming lentil soup is served across the entire Arab world as the first dish to break the fast. Nourishing, comforting, and incredibly simple to make.",
    ingredients: [
      "2 cups red lentils, rinsed",
      "1 large onion, diced",
      "2 medium carrots, peeled and chopped",
      "3 cloves garlic, minced",
      "1 teaspoon ground cumin",
      "1/2 teaspoon ground turmeric",
      "6 cups vegetable or chicken broth",
      "2 tablespoons olive oil",
      "Juice of 1 lemon",
      "Salt and black pepper to taste",
      "Fresh parsley for garnish",
      "Lemon wedges for serving",
      "Pita bread or croutons (optional)"
    ],
    steps: [
      "Heat olive oil in a large pot over medium heat. Add the diced onion and sauté for 3-4 minutes until softened and translucent.",
      "Add the garlic, carrots, cumin, and turmeric. Stir and cook for 1-2 minutes until fragrant.",
      "Add the rinsed red lentils and broth. Bring to a boil, then reduce heat to low. Cover and simmer for 20-25 minutes until the lentils are completely soft and falling apart.",
      "Using an immersion blender (or transfer to a regular blender in batches), blend the soup until smooth and creamy.",
      "Stir in the lemon juice, season with salt and pepper to taste. If the soup is too thick, add more broth or water to reach desired consistency.",
      "Serve hot, garnished with fresh parsley, a drizzle of olive oil, lemon wedges on the side, and warm pita bread."
    ],
    tips: "Red lentils cook faster and blend smoother than green or brown lentils. For extra richness, add a tablespoon of butter before serving. This soup freezes beautifully for up to 3 months.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop"
  },
  {
    id: "harira",
    name: "Harira",
    nameArabic: "حريرة",
    category: "Soups & Starters",
    origin: "Morocco",
    countryCode: "MA",
    prepTime: "20 mins",
    cookTime: "1 hour",
    totalTime: "1 hour 20 mins",
    servings: 8,
    difficulty: "Medium",
    description: "Morocco's iconic Ramadan soup — a rich, hearty blend of tomatoes, lentils, chickpeas, and tender lamb perfumed with ginger, cinnamon, and fresh herbs. No Moroccan iftar table is complete without a steaming bowl of harira.",
    ingredients: [
      "250g lamb, cut into small cubes",
      "1 cup chickpeas, soaked overnight (or 1 can, drained)",
      "1/2 cup green lentils",
      "1 large onion, finely diced",
      "4 large tomatoes, grated or blended",
      "2 tablespoons tomato paste",
      "1/2 cup fresh cilantro, chopped",
      "1/2 cup fresh parsley, chopped",
      "1 teaspoon ground ginger",
      "1 teaspoon ground cinnamon",
      "1/2 teaspoon ground turmeric",
      "1/2 teaspoon black pepper",
      "1/2 cup vermicelli or angel hair pasta, broken",
      "2 tablespoons flour mixed with 1/2 cup water (tedouira)",
      "2 tablespoons butter",
      "8 cups water",
      "Juice of 1 lemon",
      "Salt to taste",
      "Dates and chebakia for serving (traditional)"
    ],
    steps: [
      "In a large pot, add the butter, diced onion, and lamb cubes. Cook over medium heat for 5 minutes until the meat is lightly browned on all sides.",
      "Add the ginger, cinnamon, turmeric, pepper, half the cilantro, and half the parsley. Stir for 2 minutes until fragrant.",
      "Add the grated tomatoes, tomato paste, and soaked chickpeas. Pour in 8 cups of water. Bring to a boil, then reduce heat and simmer covered for 40 minutes.",
      "Add the green lentils and cook for another 15 minutes until the lentils and chickpeas are tender.",
      "Slowly pour in the flour-water mixture (tedouira) while stirring constantly — this gives harira its signature silky texture. Stir continuously to prevent lumps.",
      "Add the broken vermicelli and cook for 5 more minutes. Stir in the remaining cilantro, parsley, and lemon juice.",
      "Season with salt to taste. Serve immediately in deep bowls, traditionally accompanied by dates and honey-dipped chebakia pastries."
    ],
    tips: "The tedouira (flour-water mixture) is what makes harira uniquely velvety — don't skip it. For a quicker version, use canned chickpeas and skip the lamb for a vegetarian version. Harira thickens as it sits, so add water when reheating.",
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=800&h=600&fit=crop"
  },
  {
    id: "samboosa",
    name: "Samboosa",
    nameArabic: "سمبوسة",
    category: "Soups & Starters",
    origin: "Bahrain / Gulf",
    countryCode: "BH",
    prepTime: "30 mins",
    cookTime: "20 mins",
    totalTime: "50 mins",
    servings: 30,
    difficulty: "Medium",
    description: "Crispy, golden triangles of joy — samboosa is the undisputed king of the Ramadan iftar table across the Gulf. Every family has their own recipe, but this Bahraini version with spiced meat filling is the classic.",
    ingredients: [
      "1 pack samboosa pastry sheets (spring roll wrappers work too)",
      "500g ground beef or lamb",
      "1 large onion, finely diced",
      "2 cloves garlic, minced",
      "1/2 cup fresh parsley, chopped",
      "1 teaspoon baharat (Gulf spice mix)",
      "1/2 teaspoon ground cumin",
      "1/2 teaspoon ground cinnamon",
      "1/4 teaspoon black pepper",
      "Salt to taste",
      "2 tablespoons vegetable oil",
      "Flour paste for sealing (2 tbsp flour + water)",
      "Oil for deep frying"
    ],
    steps: [
      "Heat oil in a pan over medium-high heat. Add onion and garlic, cook until softened, about 3 minutes.",
      "Add the ground meat and break it up with a spoon. Cook until browned and no longer pink, about 7-8 minutes.",
      "Add the baharat, cumin, cinnamon, pepper, and salt. Stir well and cook for 2 more minutes. Add the parsley, mix, and remove from heat. Let the filling cool completely.",
      "Cut samboosa pastry sheets into strips about 7-8cm wide. Place a tablespoon of filling at one end of the strip.",
      "Fold the corner up to create a triangle, then continue folding in a triangle pattern all the way to the end. Seal the edge with flour paste.",
      "Heat oil for deep frying to 175°C (350°F). Fry the samboosas in batches for 2-3 minutes per side until golden brown and crispy.",
      "Remove with a slotted spoon and drain on paper towels. Serve hot with tamarind sauce or green chutney."
    ],
    tips: "For a cheese version, fill with a mix of feta, mozzarella, and fresh mint. You can prepare and freeze samboosas before frying — fry straight from frozen, adding 1-2 extra minutes. The key to crispy samboosa is making sure the oil is hot enough before frying.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop"
  },
  {
    id: "fattoush",
    name: "Fattoush",
    nameArabic: "فتوش",
    category: "Soups & Starters",
    origin: "Lebanon / Levant",
    countryCode: "LB",
    prepTime: "15 mins",
    cookTime: "5 mins",
    totalTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    description: "A bright, crunchy Levantine salad loaded with fresh vegetables and crispy fried pita chips, all tossed in a tangy sumac and pomegranate molasses dressing. The perfect refreshing side dish for iftar.",
    ingredients: [
      "2 pita breads, torn into bite-sized pieces",
      "3 medium tomatoes, diced",
      "2 mini cucumbers, diced",
      "1 cup romaine lettuce, chopped",
      "5 radishes, thinly sliced",
      "3 green onions, sliced",
      "1/2 cup fresh mint leaves",
      "1/2 cup fresh parsley, chopped",
      "1/4 cup olive oil",
      "3 tablespoons lemon juice",
      "1 tablespoon pomegranate molasses",
      "1 tablespoon ground sumac",
      "1 clove garlic, minced",
      "Salt to taste",
      "Oil for frying pita"
    ],
    steps: [
      "Fry or bake the pita pieces until golden and crispy. If frying, use medium-hot oil for 1-2 minutes. If baking, toss with olive oil and bake at 200°C (400°F) for 8-10 minutes. Set aside.",
      "In a large bowl, combine the tomatoes, cucumbers, lettuce, radishes, green onions, mint, and parsley.",
      "Make the dressing: Whisk together the olive oil, lemon juice, pomegranate molasses, sumac, garlic, and salt.",
      "Pour the dressing over the vegetables and toss well to combine.",
      "Add the crispy pita chips just before serving and toss gently. Sprinkle extra sumac on top.",
      "Serve immediately — fattoush is best eaten right away while the pita is still crunchy."
    ],
    tips: "Sumac is the star of fattoush — its tart, lemony flavor is what makes this salad unique. Don't add the pita until serving or it will get soggy. For extra color, add a handful of pomegranate seeds on top.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
  },
  {
    id: "harees",
    name: "Harees",
    nameArabic: "هريس",
    category: "Main Dishes",
    origin: "Bahrain / Gulf",
    countryCode: "BH",
    prepTime: "15 mins",
    cookTime: "3 hours",
    totalTime: "3 hours 15 mins",
    servings: 8,
    difficulty: "Medium",
    description: "The soul of Ramadan in Bahrain and the Gulf. Harees is a slow-cooked porridge of wheat and tender meat, beaten to a silky smooth consistency and topped with golden clarified butter. Simple ingredients, extraordinary comfort.",
    ingredients: [
      "2 cups whole wheat (jareesh/cracked wheat)",
      "500g bone-in lamb or chicken",
      "1 large onion, quartered",
      "1 cinnamon stick",
      "2 cardamom pods",
      "1 teaspoon salt",
      "8 cups water",
      "4 tablespoons ghee (clarified butter)",
      "Ground cinnamon for garnish",
      "Extra ghee for serving"
    ],
    steps: [
      "Soak the wheat in water overnight or for at least 8 hours. Drain before using.",
      "In a large heavy-bottomed pot, add the meat, onion, cinnamon stick, cardamom pods, and 8 cups of water. Bring to a boil, skimming off any foam that rises to the surface.",
      "Add the soaked wheat to the pot. Reduce heat to the lowest setting, cover tightly, and cook for 2.5-3 hours, stirring occasionally to prevent sticking. Add more water if needed — the mixture should be porridge-like.",
      "Remove the meat and shred it off the bone. Discard the bones, cinnamon stick, and cardamom pods.",
      "Return the shredded meat to the pot. Using a large whisk or wooden spoon (traditionally a special wooden paddle called a 'madhrab'), beat the mixture vigorously until smooth and creamy.",
      "Season with salt to taste. Serve in bowls, make a well in the center, and pour generous amounts of hot ghee. Sprinkle with ground cinnamon.",
      "Serve hot, traditionally eaten with a spoon and accompanied by sugar on the side for those who prefer it sweet."
    ],
    tips: "The secret to great harees is patience — the longer you cook it and the more you beat it, the smoother and silkier it becomes. In Bahrain, harees is often prepared in large batches and shared among neighbors during Ramadan.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop"
  },
  {
    id: "machboos",
    name: "Machboos Dajaj",
    nameArabic: "مجبوس دجاج",
    category: "Main Dishes",
    origin: "Bahrain / Gulf",
    countryCode: "BH",
    prepTime: "20 mins",
    cookTime: "1 hour",
    totalTime: "1 hour 20 mins",
    servings: 6,
    difficulty: "Medium",
    description: "Bahrain's national dish — fragrant spiced rice with tender chicken, infused with loomi (dried limes), saffron, and a complex blend of Gulf spices called bezar. A centerpiece of every Ramadan gathering.",
    ingredients: [
      "1 whole chicken, cut into pieces",
      "3 cups basmati rice, washed and soaked for 30 mins",
      "2 large onions, finely diced",
      "4 tomatoes, diced",
      "2 tablespoons tomato paste",
      "4 cloves garlic, minced",
      "2 dried limes (loomi), pierced with a knife",
      "2 tablespoons bezar spice mix (Gulf spice blend)",
      "1 teaspoon ground turmeric",
      "1/2 teaspoon ground cinnamon",
      "4 cardamom pods",
      "2 bay leaves",
      "Pinch of saffron soaked in 2 tbsp rose water",
      "4 tablespoons ghee or vegetable oil",
      "Salt to taste",
      "5 cups water or chicken broth",
      "Fresh cilantro for garnish",
      "Fried onions for topping (optional)"
    ],
    steps: [
      "Heat ghee in a large pot. Add the onions and cook until golden brown, about 8-10 minutes.",
      "Add the garlic, chicken pieces, and all the spices (bezar, turmeric, cinnamon, cardamom, bay leaves). Stir and cook for 5 minutes until the chicken is sealed on all sides.",
      "Add the diced tomatoes, tomato paste, and dried limes. Cook for 5 minutes until the tomatoes soften.",
      "Pour in 5 cups of water or broth. Bring to a boil, then reduce heat and simmer covered for 25-30 minutes until the chicken is fully cooked. Remove the chicken pieces and set aside.",
      "Strain the broth and measure — you need 4.5 cups. Add more water if needed. Return broth to the pot.",
      "Drain the soaked rice and add it to the broth. Add the saffron-rose water mixture. Bring to a boil, then reduce to lowest heat, cover tightly, and cook for 18-20 minutes until the rice is fluffy and all liquid is absorbed.",
      "Place the chicken pieces on top of the rice, cover, and let steam for 10 minutes. Serve on a large platter with the rice mounded and chicken arranged on top. Garnish with cilantro and fried onions."
    ],
    tips: "Loomi (dried limes) are essential — they give machboos its signature tangy depth. Pierce them well so the flavor releases. If you can't find bezar, mix equal parts cumin, coriander, black pepper, cinnamon, and cardamom as a substitute.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop"
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    nameArabic: "برياني دجاج",
    category: "Main Dishes",
    origin: "South Asia",
    countryCode: "PK",
    prepTime: "30 mins",
    cookTime: "45 mins",
    totalTime: "3 hours 15 mins",
    servings: 6,
    difficulty: "Advanced",
    description: "The crown jewel of South Asian cuisine and a beloved Ramadan staple across the Muslim world. Layers of fragrant basmati rice and spiced chicken, slow-cooked together until every grain is infused with flavor.",
    ingredients: [
      "800g chicken (bone-in pieces)",
      "3 cups basmati rice, soaked for 30 mins",
      "1 cup yogurt",
      "3 large onions, thinly sliced",
      "4 tomatoes, sliced",
      "4 green chilies, slit",
      "2 tablespoons ginger-garlic paste",
      "1 tablespoon biryani masala",
      "1 teaspoon red chili powder",
      "1/2 teaspoon turmeric",
      "1 teaspoon garam masala",
      "Pinch of saffron soaked in 1/4 cup warm milk",
      "1/2 cup fresh mint leaves",
      "1/2 cup fresh cilantro, chopped",
      "4 tablespoons ghee",
      "2 tablespoons vegetable oil",
      "4 green cardamom pods, 4 cloves, 1 cinnamon stick, 2 bay leaves",
      "Salt to taste",
      "3 tablespoons lemon juice",
      "Fried onions for layering and garnish"
    ],
    steps: [
      "Marinate the chicken with yogurt, ginger-garlic paste, biryani masala, red chili powder, turmeric, half the mint, half the cilantro, lemon juice, and salt. Refrigerate for at least 2 hours (overnight is best).",
      "Fry the sliced onions in oil until deep golden brown and crispy. Remove and set aside — these are your birista (fried onions).",
      "In the same pot, add ghee and the whole spices (cardamom, cloves, cinnamon, bay leaves). Fry for 1 minute until fragrant.",
      "Add the marinated chicken and tomatoes. Cook on medium-high heat for 10-12 minutes until the chicken is 80% cooked and the masala has thickened.",
      "Meanwhile, boil the soaked rice in salted water with a few whole spices until 70% cooked (the rice should still have a slight bite). Drain immediately.",
      "Layer the biryani: Spread the chicken in an even layer. Top with half the rice, then sprinkle half the saffron milk, fried onions, mint, and cilantro. Add remaining rice and top with remaining saffron milk, fried onions, mint, and cilantro.",
      "Seal the pot tightly with foil and then the lid (dum method). Cook on high heat for 3 minutes, then reduce to the lowest heat and cook for 25 minutes. Turn off heat and let rest 5 minutes before opening.",
      "Gently mix the layers when serving. Serve with raita (yogurt sauce) and a simple salad."
    ],
    tips: "The secret to great biryani is in the dum (slow steaming) — don't open the lid during cooking. Par-boiling the rice to exactly 70% is critical; overcooked rice will turn mushy. Soak saffron in warm milk for at least 15 minutes for the best color and aroma.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop"
  },
  {
    id: "kabsa",
    name: "Kabsa",
    nameArabic: "كبسة",
    category: "Main Dishes",
    origin: "Saudi Arabia",
    countryCode: "SA",
    prepTime: "20 mins",
    cookTime: "1 hour 15 mins",
    totalTime: "1 hour 35 mins",
    servings: 6,
    difficulty: "Medium",
    description: "Saudi Arabia's beloved national dish — aromatic rice cooked with tomatoes, warm spices, and perfectly spiced chicken. Kabsa is the centerpiece of Saudi Ramadan gatherings and a dish that brings families together.",
    ingredients: [
      "1 whole chicken, cut into pieces",
      "3 cups basmati rice, washed and soaked",
      "2 large onions, diced",
      "4 tomatoes, grated",
      "2 tablespoons tomato paste",
      "4 cloves garlic, minced",
      "1 tablespoon kabsa spice mix",
      "1 teaspoon ground cumin",
      "1/2 teaspoon ground black pepper",
      "1 dried lime (loomi), pierced",
      "4 cardamom pods",
      "2 cloves",
      "1 cinnamon stick",
      "3 tablespoons vegetable oil",
      "4.5 cups chicken broth",
      "Salt to taste",
      "Toasted almonds and raisins for garnish",
      "Fresh parsley for garnish"
    ],
    steps: [
      "Heat oil in a large pot. Brown the chicken pieces on all sides for about 5 minutes. Remove and set aside.",
      "In the same pot, sauté the onions until golden. Add garlic and cook for 1 minute.",
      "Add the grated tomatoes, tomato paste, and all spices (kabsa spice, cumin, pepper, cardamom, cloves, cinnamon, dried lime). Cook for 5 minutes.",
      "Return the chicken to the pot. Add enough water to cover the chicken. Bring to a boil, then simmer covered for 30 minutes until chicken is fully cooked.",
      "Remove the chicken and strain the broth. Measure 4.5 cups of broth — add water if needed.",
      "In the same pot, add the drained soaked rice and 4.5 cups of broth. Bring to a boil, then cover tightly and reduce to lowest heat. Cook for 18-20 minutes until rice is fluffy.",
      "While rice cooks, broil or grill the chicken pieces for 5 minutes to get a slightly charred, smoky finish (optional but traditional).",
      "Mound the rice on a large serving platter, arrange the chicken on top. Garnish with toasted almonds, raisins, and parsley."
    ],
    tips: "Kabsa spice mix typically includes cumin, coriander, black pepper, cinnamon, cardamom, cloves, nutmeg, and dried lime powder. Toasting the almonds in ghee makes them extra special. In Saudi homes, kabsa is traditionally eaten communal-style from one large platter.",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&h=600&fit=crop"
  },
  {
    id: "thareed",
    name: "Thareed",
    nameArabic: "ثريد",
    category: "Main Dishes",
    origin: "UAE / Gulf",
    countryCode: "AE",
    prepTime: "20 mins",
    cookTime: "1 hour 30 mins",
    totalTime: "1 hour 50 mins",
    servings: 6,
    difficulty: "Medium",
    description: "A dish beloved by the Prophet Muhammad ﷺ — tender lamb and vegetables stewed in a fragrant broth, served over thin regag bread that soaks up every drop of flavor. Thareed is deeply meaningful during Ramadan.",
    ingredients: [
      "500g lamb, cut into chunks",
      "2 large potatoes, cubed",
      "2 zucchini, cubed",
      "1 large eggplant, cubed",
      "2 carrots, sliced",
      "2 tomatoes, diced",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 tablespoons tomato paste",
      "1 tablespoon bezar spice mix",
      "1 teaspoon ground turmeric",
      "1 dried lime (loomi), pierced",
      "2 tablespoons vegetable oil",
      "6 cups water",
      "Salt and pepper to taste",
      "4-6 sheets regag bread (or thin flatbread/lavash)"
    ],
    steps: [
      "Heat oil in a large pot. Brown the lamb pieces on all sides for about 5 minutes.",
      "Add the onion and garlic, cook until softened. Add the bezar, turmeric, and dried lime.",
      "Add the tomato paste and diced tomatoes. Stir for 2 minutes.",
      "Pour in 6 cups of water. Bring to a boil, then reduce heat and simmer covered for 45 minutes until the lamb is tender.",
      "Add the potatoes, carrots, zucchini, and eggplant. Season with salt and pepper. Cover and cook for another 25-30 minutes until all vegetables are tender.",
      "Line a deep serving dish with sheets of regag bread, slightly overlapping. The bread should cover the bottom and come up the sides.",
      "Ladle the stew over the bread, making sure the bread is well-soaked with the broth. Arrange the meat and vegetables on top. Serve immediately while the bread is soft and soaked through."
    ],
    tips: "Regag bread is a paper-thin Emirati bread — if you can't find it, use lavash or thin flatbread. The key is that the bread absorbs the flavorful broth and becomes soft and almost pasta-like. Thareed is even better the next day when the flavors have deepened.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop"
  },
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    nameArabic: "أرز جولوف",
    category: "Main Dishes",
    origin: "West Africa",
    countryCode: "NG",
    prepTime: "15 mins",
    cookTime: "50 mins",
    totalTime: "1 hour 5 mins",
    servings: 6,
    difficulty: "Medium",
    description: "The pride of West Africa — vibrant, smoky, tomato-infused rice that's a centerpiece at Muslim iftar gatherings across Nigeria, Ghana, Senegal, and beyond. Every West African family claims theirs is the best.",
    ingredients: [
      "3 cups long-grain parboiled rice, washed",
      "6 large tomatoes, blended",
      "3 red bell peppers, blended",
      "2 scotch bonnet peppers, blended (adjust to taste)",
      "2 large onions (1 blended, 1 sliced)",
      "1/3 cup vegetable oil",
      "3 tablespoons tomato paste",
      "2 teaspoons thyme",
      "2 teaspoons curry powder",
      "1 teaspoon smoked paprika",
      "3 bay leaves",
      "3 cups chicken stock",
      "Salt to taste",
      "1 tablespoon butter"
    ],
    steps: [
      "Blend the tomatoes, red bell peppers, scotch bonnet peppers, and 1 onion until smooth. Pour into a pot and cook on medium-high heat for 30-40 minutes, stirring occasionally, until reduced by half and the raw tomato smell is gone. This is your base sauce.",
      "In a heavy-bottomed pot, heat the vegetable oil. Fry the sliced onion until golden.",
      "Add the tomato paste and fry for 2-3 minutes. Add the reduced tomato-pepper base sauce and cook for 10 minutes, stirring frequently.",
      "Add the thyme, curry powder, smoked paprika, bay leaves, and salt. Stir well.",
      "Add the washed rice and stir to coat every grain with the sauce. Pour in the chicken stock. The liquid should just cover the rice.",
      "Bring to a boil, then reduce to the lowest heat. Cover the pot tightly with foil and then the lid. Cook for 30 minutes without opening the lid.",
      "After 30 minutes, add butter and gently fluff with a fork. If the rice needs more time, cover and cook for 5 more minutes. Serve with fried plantains and grilled chicken."
    ],
    tips: "The secret to great jollof is the 'party jollof' smoky bottom — some people let the bottom slightly toast for extra flavor. Reducing the tomato base properly is crucial; raw tomato taste will ruin the dish. Use parboiled rice (not basmati) for authentic texture.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=600&fit=crop"
  },
  {
    id: "nasi-lemak",
    name: "Nasi Lemak",
    nameArabic: "ناسي ليماك",
    category: "Main Dishes",
    origin: "Malaysia / Southeast Asia",
    countryCode: "MY",
    prepTime: "15 mins",
    cookTime: "30 mins",
    totalTime: "45 mins",
    servings: 4,
    difficulty: "Easy",
    description: "Malaysia's fragrant coconut rice, served with spicy sambal, crunchy anchovies, roasted peanuts, and boiled egg. During Ramadan in Southeast Asia, nasi lemak is a beloved suhoor and iftar staple.",
    ingredients: [
      "2 cups jasmine rice, washed",
      "1 cup coconut milk",
      "1 cup water",
      "2 pandan leaves, knotted (or 1/2 tsp pandan extract)",
      "1 small piece of ginger, sliced",
      "1/2 teaspoon salt",
      "For the sambal: 10 dried red chilies (soaked and blended), 3 shallots, 2 cloves garlic, 1 tbsp tamarind paste + 3 tbsp water, 2 tbsp sugar, salt to taste",
      "1/2 cup dried anchovies (ikan bilis), fried crispy",
      "1/2 cup roasted peanuts",
      "4 hard-boiled eggs, halved",
      "Cucumber slices"
    ],
    steps: [
      "Cook the rice with coconut milk, water, pandan leaves, ginger, and salt in a rice cooker or pot. The coconut milk makes the rice rich and fragrant.",
      "Make the sambal: Blend the soaked dried chilies with shallots and garlic. Fry the paste in 3 tablespoons of oil over medium heat for 10-15 minutes until the oil separates and the paste darkens.",
      "Add the tamarind water, sugar, and salt to the sambal. Cook for another 5 minutes until thick and glossy. Taste and adjust the sweet-spicy-sour balance.",
      "Fry the dried anchovies in oil until crispy and golden, about 3 minutes. Drain on paper towels.",
      "Serve the coconut rice on plates, with sambal, fried anchovies, roasted peanuts, sliced cucumber, and halved boiled eggs arranged alongside."
    ],
    tips: "Pandan leaves are key to authentic nasi lemak aroma — find them at Asian grocery stores. The sambal can be made in advance and stored in the fridge for a week. For a more elaborate version, add rendang beef or fried chicken.",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&h=600&fit=crop"
  },
  {
    id: "jallab",
    name: "Jallab",
    nameArabic: "جلاب",
    category: "Drinks & Refreshments",
    origin: "Lebanon / Levant",
    countryCode: "LB",
    prepTime: "5 mins",
    cookTime: "0 mins",
    totalTime: "5 mins",
    servings: 4,
    difficulty: "Easy",
    description: "A beloved Ramadan drink across the Levant — a sweet, smoky, fruity syrup made from dates, grape molasses, and rose water, served ice-cold with pine nuts and raisins. The quintessential iftar refresher.",
    ingredients: [
      "1/2 cup jallab syrup (available at Middle Eastern stores)",
      "4 cups cold water",
      "2 tablespoons rose water",
      "Pine nuts for garnish",
      "Golden raisins, soaked",
      "Crushed ice"
    ],
    steps: [
      "If using raisins, soak them in water for 30 minutes to plump them up. Drain.",
      "In a pitcher, mix the jallab syrup with cold water. Stir well until fully dissolved.",
      "Add the rose water and stir. Taste and adjust — add more syrup for a sweeter drink or more water to dilute.",
      "Fill tall glasses with crushed ice. Pour the jallab over the ice.",
      "Drop a few pine nuts and soaked raisins into each glass. Serve immediately with a straw."
    ],
    tips: "Jallab syrup is made from dates, grape molasses, and carob — you can find it at any Middle Eastern grocery store. The combination of pine nuts floating in the drink is what makes jallab special. Serve it very cold for the best experience after a long fast.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=600&fit=crop"
  },
  {
    id: "qamar-al-din",
    name: "Qamar al-Din",
    nameArabic: "قمر الدين",
    category: "Drinks & Refreshments",
    origin: "Syria / Egypt",
    countryCode: "SY",
    prepTime: "5 mins",
    cookTime: "0 mins",
    totalTime: "4 hours 5 mins",
    servings: 6,
    difficulty: "Easy",
    description: "The iconic Ramadan drink — made from dried apricot leather sheets dissolved in water to create a thick, sweet, golden juice. Qamar al-Din means 'Moon of the Faith' and no Ramadan table across the Arab world is complete without it.",
    ingredients: [
      "400g qamar al-din sheets (dried apricot leather)",
      "6 cups warm water",
      "3-4 tablespoons sugar (or to taste)",
      "1 tablespoon orange blossom water",
      "Crushed ice for serving",
      "Chopped pistachios for garnish (optional)"
    ],
    steps: [
      "Tear the qamar al-din sheets into small pieces and place in a large bowl.",
      "Pour warm water over the pieces. Cover and let soak for at least 4 hours or overnight in the refrigerator. The sheets will soften and dissolve.",
      "Transfer the mixture to a blender and blend until completely smooth with no lumps remaining.",
      "Add sugar to taste (the apricot leather is already quite sweet, so taste before adding sugar). Add the orange blossom water and blend briefly.",
      "Strain through a fine sieve if you want a smoother consistency (optional — many prefer it slightly thick).",
      "Serve very cold over crushed ice, garnished with chopped pistachios."
    ],
    tips: "Qamar al-Din sheets are widely available during Ramadan at Middle Eastern grocery stores. You can also make it thicker as a dessert pudding by using less water. Soaking overnight gives the smoothest result.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&h=600&fit=crop"
  },
  {
    id: "tamarind-juice",
    name: "Tamarind Juice",
    nameArabic: "عصير تمر هندي",
    category: "Drinks & Refreshments",
    origin: "Gulf / Middle East",
    countryCode: "BH",
    prepTime: "5 mins",
    cookTime: "0 mins",
    totalTime: "2 hours 5 mins",
    servings: 6,
    difficulty: "Easy",
    description: "A refreshing, tangy-sweet drink that's a Ramadan favorite across the Gulf and Middle East. Tamarind's natural tartness quenches thirst like nothing else after a long day of fasting.",
    ingredients: [
      "200g tamarind paste (seedless block)",
      "6 cups water",
      "1/2 cup sugar (adjust to taste)",
      "1 tablespoon rose water (optional)",
      "Crushed ice",
      "Fresh mint for garnish"
    ],
    steps: [
      "Break the tamarind paste into pieces and soak in 2 cups of warm water for at least 2 hours (or overnight).",
      "Using your hands, squeeze and massage the tamarind in the water to extract all the pulp and flavor. The water should turn dark brown and thick.",
      "Strain through a fine sieve, pressing all the liquid out and discarding the fibrous remains.",
      "Add the remaining 4 cups of cold water and sugar. Stir until the sugar is fully dissolved. Add rose water if using.",
      "Taste and adjust the sweet-sour balance — it should be refreshingly tart with enough sweetness to balance.",
      "Serve over crushed ice, garnished with fresh mint leaves."
    ],
    tips: "Start with less sugar and add more to taste — the tartness is what makes this drink so refreshing after fasting. In Bahrain, tamarind juice is served at practically every iftar gathering. Store in the fridge for up to 5 days.",
    image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=800&h=600&fit=crop"
  },
  {
    id: "vimto-rose-milk",
    name: "Vimto Rose Milk",
    nameArabic: "حليب فيمتو بالورد",
    category: "Drinks & Refreshments",
    origin: "Gulf States",
    countryCode: "BH",
    prepTime: "3 mins",
    cookTime: "0 mins",
    totalTime: "3 mins",
    servings: 4,
    difficulty: "Easy",
    description: "If there's one drink that defines Gulf Ramadan, it's Vimto. This creamy, rosy twist on the beloved purple drink has become a Ramadan phenomenon. Vimto sales in the Gulf spike 300% during Ramadan — it's that iconic.",
    ingredients: [
      "1/2 cup Vimto cordial (concentrated syrup)",
      "2 cups cold milk",
      "2 cups cold water",
      "2 tablespoons rose water",
      "Crushed ice",
      "Rose petals for garnish (optional)"
    ],
    steps: [
      "In a pitcher, combine the Vimto cordial with cold water and stir well.",
      "Add the cold milk and rose water. Stir gently to combine. The color should be a beautiful rose-purple.",
      "Taste and adjust — add more Vimto for a sweeter, more intense flavor, or more milk for a creamier drink.",
      "Fill glasses with crushed ice and pour the Vimto rose milk over.",
      "Garnish with rose petals if desired. Serve immediately."
    ],
    tips: "Vimto is a British drink that became a massive Ramadan tradition in the Gulf. The classic way is just Vimto and water, but the rose milk version is a popular modern twist. Some families also make Vimto mojito with fresh mint and lime.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&h=600&fit=crop"
  },
  {
    id: "luqaimat",
    name: "Luqaimat",
    nameArabic: "لقيمات",
    category: "Sweets & Desserts",
    origin: "Bahrain / Gulf",
    countryCode: "BH",
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTime: "1 hour 35 mins",
    servings: 6,
    difficulty: "Easy",
    description: "Golden, crispy-on-the-outside, fluffy-on-the-inside dough balls drizzled with date syrup or honey. Luqaimat is THE Ramadan sweet of the Gulf — no iftar is complete without these addictive little bites.",
    ingredients: [
      "2 cups all-purpose flour",
      "1/2 cup semolina (optional, for extra crunch)",
      "1 tablespoon sugar",
      "1 teaspoon instant yeast",
      "1/2 teaspoon ground cardamom",
      "Pinch of saffron dissolved in 2 tbsp warm water",
      "1 cup warm water (or as needed)",
      "1 tablespoon vegetable oil",
      "Pinch of salt",
      "Oil for deep frying",
      "Date syrup (dibs) or honey for drizzling",
      "Sesame seeds for garnish"
    ],
    steps: [
      "In a large bowl, mix the flour, semolina (if using), sugar, yeast, cardamom, and salt.",
      "Add the saffron water, oil, and warm water gradually. Mix until you get a sticky, thick batter (thicker than pancake batter but not a firm dough). It should be stretchy and slightly sticky.",
      "Cover the bowl with a damp cloth and let it rise in a warm place for 1-1.5 hours until doubled in size and bubbly.",
      "Heat oil for deep frying to 175°C (350°F). Dip a tablespoon in water, then scoop a small ball of batter. Use another wet spoon or your oiled fingers to drop it into the hot oil.",
      "Fry in batches, turning occasionally, for 3-4 minutes until golden brown and puffed. They should be crispy outside and airy inside.",
      "Drain on paper towels. Pile on a serving plate and drizzle generously with warm date syrup or honey. Sprinkle with sesame seeds.",
      "Serve warm immediately — luqaimat are best eaten fresh."
    ],
    tips: "The batter should be sticky — that's what creates the crispy exterior and fluffy interior. Wet your hands and tools with oil or water to handle the batter easily. In Bahrain, luqaimat stalls pop up everywhere during Ramadan and the smell of frying dough fills the streets.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&h=600&fit=crop"
  },
  {
    id: "kunafa",
    name: "Kunafa",
    nameArabic: "كنافة",
    category: "Sweets & Desserts",
    origin: "Palestine / Levant",
    countryCode: "PS",
    prepTime: "20 mins",
    cookTime: "35 mins",
    totalTime: "55 mins",
    servings: 10,
    difficulty: "Medium",
    description: "The queen of Arab desserts — crispy, golden shredded pastry encasing stretchy, melty cheese, soaked in sweet rose-scented syrup and topped with crushed pistachios. Kunafa is the ultimate Ramadan celebration dessert.",
    ingredients: [
      "500g kunafa dough (kataifi/shredded phyllo)",
      "250g akkawi cheese (or mozzarella), desalted and shredded",
      "250g ricotta cheese",
      "1 cup (2 sticks) unsalted butter, melted",
      "1 tablespoon orange blossom water",
      "For the sugar syrup: 2 cups sugar, 1 cup water, 1 tbsp lemon juice, 1 tbsp rose water, 1 tbsp orange blossom water",
      "Crushed pistachios for garnish",
      "Dried rose petals (optional)"
    ],
    steps: [
      "Make the sugar syrup first: Combine sugar, water, and lemon juice in a pot. Bring to a boil, then simmer for 8-10 minutes until slightly thickened. Add rose water and orange blossom water. Let cool completely — the syrup must be cold when the kunafa is hot.",
      "If using akkawi cheese, soak it in water for 3-4 hours (changing water every hour) to remove excess salt. Drain and shred.",
      "Shred the kunafa dough by hand or pulse briefly in a food processor. Place in a large bowl and pour the melted butter over it. Mix thoroughly with your hands until every strand is coated in butter.",
      "Mix the akkawi and ricotta cheeses together with the orange blossom water.",
      "Press 2/3 of the buttered kunafa dough into the bottom of a 30cm round baking pan or oven tray, pressing down firmly to create a compact, even base that goes up the sides slightly.",
      "Spread the cheese mixture evenly over the base. Top with the remaining 1/3 of kunafa dough, pressing down gently.",
      "Bake at 180°C (350°F) for 30-35 minutes until the top and bottom are deep golden and crispy.",
      "Remove from oven and immediately pour the cold sugar syrup evenly over the hot kunafa. Let it absorb for 2 minutes.",
      "Flip onto a serving platter (the crispy bottom becomes the top). Garnish generously with crushed pistachios and dried rose petals. Serve warm."
    ],
    tips: "The contrast of hot kunafa and cold syrup is essential. Desalting the akkawi cheese is crucial — taste it before using. If you can't find akkawi, use a mix of mozzarella and ricotta. The kunafa should be deeply golden, not pale — that's where the crunch comes from.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop"
  },
  {
    id: "qatayef",
    name: "Qatayef",
    nameArabic: "قطايف",
    category: "Sweets & Desserts",
    origin: "Palestine / Egypt",
    countryCode: "PS",
    prepTime: "20 mins",
    cookTime: "15 mins",
    totalTime: "1 hour 5 mins",
    servings: 20,
    difficulty: "Medium",
    description: "Stuffed Arab pancakes made exclusively during Ramadan — fluffy, spongy pancakes filled with sweet cheese or nuts, sealed into half-moons, fried until crispy, and drenched in syrup. A true Ramadan-only special.",
    ingredients: [
      "2 cups all-purpose flour",
      "1/2 cup semolina",
      "2 tablespoons sugar",
      "1 teaspoon instant yeast",
      "1/2 teaspoon baking powder",
      "2 cups warm water",
      "1 tablespoon rose water",
      "For cheese filling: 2 cups akkawi or ricotta cheese, 1 tbsp sugar, 1 tbsp rose water",
      "For nut filling: 1 cup walnuts (finely chopped), 1/2 cup sugar, 1 tsp cinnamon",
      "Oil for deep frying",
      "Sugar syrup for drenching"
    ],
    steps: [
      "Mix the flour, semolina, sugar, yeast, and baking powder in a bowl. Gradually add warm water while whisking until you get a smooth, pourable batter (like thick pancake batter). Add rose water. Cover and rest for 30 minutes until bubbly.",
      "Heat a non-stick pan on medium heat (no oil). Pour a small ladle of batter to form a round pancake about 8cm across. Cook only on ONE side — the top should be bubbly and set but not browned. Remove and place on a tray, cooked side up.",
      "Prepare fillings: For cheese — mix cheese with sugar and rose water. For nuts — mix chopped walnuts with sugar and cinnamon.",
      "Place a tablespoon of filling in the center of each pancake (on the cooked/bubbly side). Fold in half and pinch the edges firmly to seal into a half-moon shape.",
      "Heat oil for deep frying to 175°C (350°F). Fry the qatayef for 2-3 minutes until golden and crispy on all sides.",
      "Remove and immediately dip in cold sugar syrup, or drizzle generously with syrup. Garnish with crushed pistachios.",
      "Serve immediately while crispy and warm."
    ],
    tips: "Only cook qatayef on one side — the bubbly, uncooked side is what allows the edges to seal when pinched. These are traditionally only made and sold during Ramadan in the Arab world. For a lighter version, bake instead of frying at 200°C for 15 minutes.",
    image: "https://images.unsplash.com/photo-1590080874088-eec64895b423?w=800&h=600&fit=crop"
  },
  {
    id: "umm-ali",
    name: "Umm Ali",
    nameArabic: "أم علي",
    category: "Sweets & Desserts",
    origin: "Egypt",
    countryCode: "EG",
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTime: "30 mins",
    servings: 6,
    difficulty: "Easy",
    description: "Egypt's famous bread pudding — layers of flaky puff pastry baked in sweetened milk with nuts, raisins, and coconut. Often called the 'Mother of Ali', this warm, creamy dessert is pure Ramadan comfort.",
    ingredients: [
      "1 sheet puff pastry, baked and crumbled (or 4 croissants, torn)",
      "4 cups whole milk",
      "1 cup heavy cream",
      "1/2 cup sugar",
      "1 teaspoon vanilla extract",
      "1/2 cup mixed nuts (almonds, pistachios, pine nuts, cashews)",
      "1/4 cup raisins",
      "1/4 cup shredded coconut",
      "1 tablespoon rose water or orange blossom water",
      "Ground cinnamon for garnish"
    ],
    steps: [
      "Bake the puff pastry according to package instructions until golden and flaky. Let cool, then crumble into bite-sized pieces. (Alternatively, tear day-old croissants into pieces.)",
      "In a pot, heat the milk and sugar until the sugar dissolves and the milk is hot (not boiling). Stir in the vanilla and rose water.",
      "Spread the crumbled pastry in a baking dish. Scatter the raisins, nuts, and coconut over the pastry.",
      "Pour the hot sweetened milk over everything, making sure all the pastry pieces are soaked.",
      "Pour the heavy cream over the top. Sprinkle extra nuts on top.",
      "Broil on high for 3-5 minutes until the top is golden and bubbly. Watch carefully — it can burn quickly.",
      "Serve hot in individual bowls, dusted with cinnamon."
    ],
    tips: "Umm Ali is like a Middle Eastern bread pudding crossed with crème brûlée. Using puff pastry gives the best flaky texture, but croissants work in a pinch. The dessert should be creamy, not dry — use plenty of milk. It's best served immediately from the oven.",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&h=600&fit=crop"
  },
  {
    id: "basbousa",
    name: "Basbousa",
    nameArabic: "بسبوسة",
    category: "Sweets & Desserts",
    origin: "Egypt / Middle East",
    countryCode: "EG",
    prepTime: "10 mins",
    cookTime: "25 mins",
    totalTime: "35 mins",
    servings: 12,
    difficulty: "Easy",
    description: "A beloved semolina cake soaked in fragrant sugar syrup, topped with almonds. Basbousa is simple to make but utterly irresistible — moist, sweet, and lightly perfumed with rose and coconut. A staple across the Arab world during Ramadan.",
    ingredients: [
      "2 cups fine semolina",
      "1 cup desiccated coconut",
      "1 cup sugar",
      "1 cup yogurt",
      "1/2 cup melted butter",
      "1 teaspoon baking powder",
      "1 teaspoon vanilla extract",
      "Blanched almonds for topping (1 per piece)",
      "For the sugar syrup: 1.5 cups sugar, 1 cup water, 1 tbsp lemon juice, 1 tbsp rose water"
    ],
    steps: [
      "Make the sugar syrup: Boil sugar, water, and lemon juice for 8 minutes. Add rose water and let cool completely.",
      "Mix the semolina, coconut, sugar, yogurt, melted butter, baking powder, and vanilla in a bowl until well combined.",
      "Pour the batter into a greased 9x13 inch baking pan. Smooth the top with a wet spatula.",
      "Let the batter rest for 15 minutes — this allows the semolina to absorb the moisture.",
      "Score the batter into diamond or square shapes with a knife. Place a blanched almond in the center of each piece.",
      "Bake at 180°C (350°F) for 25-30 minutes until the top is golden brown.",
      "Remove from oven and immediately pour the cold sugar syrup evenly over the hot basbousa. Let it absorb for at least 20 minutes before serving.",
      "Serve at room temperature. Each piece should be moist and soaked through."
    ],
    tips: "The golden rule of syrup-soaked desserts: hot dessert + cold syrup (or cold dessert + hot syrup). This ensures maximum absorption. Don't skip the resting time before baking — it makes the texture much better. Basbousa keeps well at room temperature for 3-4 days.",
    image: "https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=800&h=600&fit=crop"
  }
];

export const recipeCategories = [
  'Soups & Starters',
  'Main Dishes',
  'Drinks & Refreshments',
  'Sweets & Desserts'
] as const;

// Helper to get country flag emoji
export function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'SA': '🇸🇦',
    'MA': '🇲🇦',
    'BH': '🇧🇭',
    'LB': '🇱🇧',
    'PK': '🇵🇰',
    'AE': '🇦🇪',
    'NG': '🇳🇬',
    'MY': '🇲🇾',
    'SY': '🇸🇾',
    'PS': '🇵🇸',
    'EG': '🇪🇬',
  };
  return flags[countryCode] || '🌍';
}

// Helper to get Ramadan day
export function getRamadanDay(): number {
  // Ramadan 2026 starts approximately on February 17, 2026
  const ramadanStart = new Date('2026-02-17');
  const today = new Date();
  const diffTime = today.getTime() - ramadanStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return 0; // Before Ramadan
  if (diffDays > 30) return 30; // After Ramadan
  return diffDays;
}
