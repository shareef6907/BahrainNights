/**
 * Country / category knowledge base for mapping dead event URLs to live pages.
 *
 * This is the evidence table behind the redirect map. Every entry is a venue,
 * city, country or club that appears in event titles, so the slug itself tells
 * us which country the event belonged to.
 *
 * STRONG_VENUE  a specific named venue or landmark — unambiguous on its own.
 * WEAK_PLACE    a bare city or country name — weaker, because it also appears
 *               inside titles that mention a different country.
 * CLUB_COUNTRY  football clubs and competitions.
 *
 * A value of null means "we know where this is, but the site has no page for
 * it", so the event must not be redirected to a country page that does not exist.
 */

// Named venues and landmarks. Longest match wins.
export const STRONG_VENUE = {
  // UAE
  'the penthouse': 'uae', 'penthouse': 'uae', 'aura beach': 'uae', 'cavo rooftop': 'uae',
  'ozone club': 'uae', 'time out market': 'uae', 'alserkal avenue': 'uae', 'alserkal': 'uae',
  'al quoz': 'uae', 'meyana': 'uae', 'the fridge warehouse': 'uae', 'fridge': 'uae',
  'sheikh rashid auditorium': 'uae', 'dubai opera': 'uae', 'zabeel park': 'uae',
  'safa park': 'uae', 'jumeirah beach': 'uae', 'madinat jumeirah': 'uae',
  'downtown dubai': 'uae', 'dubai hills': 'uae', 'dubai marina': 'uae', 'jvc': 'uae',
  'jumeirah': 'uae', 'emaar': 'uae', 'burj': 'uae', 'nasm': 'uae', 'drunch': 'uae',
  'jafza one': 'uae', 'space 42': 'uae', 'space42': 'uae', 'cavallo': 'uae',
  'premier hotel': 'uae', 'theatre of digital art': 'uae', 'meyana theatre': 'uae',
  'the agenda': 'uae', 'the junction dubai': 'uae', 'bhajjam': 'uae', 'oud mehta': 'uae',
  'oud mehta theater': 'uae', 'rooftop': 'uae', 'skyline': 'uae', 'downtown': 'uae',
  'expo': 'uae', 'yas island': 'uae', 'yas': 'uae', 'saadiyat': 'uae',
  'al ain university': 'uae', 'al ain': 'uae', 'dwtc': 'uae', 'the theatre of digital art': 'uae',
  // Saudi Arabia
  'ewc': 'saudi-arabia', 'esports world cup': 'saudi-arabia',
  'king fahd': 'saudi-arabia', 'front city': 'saudi-arabia', 'boulevard riad': 'saudi-arabia',
  'al majaz': 'saudi-arabia', 'al batoul': 'saudi-arabia', 'season': 'saudi-arabia',
  'al abdullah': 'saudi-arabia', 'abha': 'saudi-arabia', 'taif': 'saudi-arabia',
  'taibah': 'saudi-arabia', 'nassim': 'saudi-arabia', 'diriyah': 'saudi-arabia',
  'red sea': 'saudi-arabia', 'al zalzalah': 'saudi-arabia', 'al ahsa': 'saudi-arabia',
  // Bahrain
  'tanatan': 'bahrain', 'noodle street': 'bahrain', 'expo centre': 'bahrain',
  'nasser bin hamad': 'bahrain', 'aali': 'bahrain', 'al hidd': 'bahrain',
  'sitra': 'bahrain', 'east riffa': 'bahrain', 'al ittifaq': 'bahrain',
  'manama club': 'bahrain', 'bahrain sc': 'bahrain', 'al shabab': 'bahrain',
  'al muharraq': 'bahrain', 'bapco': 'bahrain', 'iwc': 'bahrain',
  // Qatar
  'lusail': 'qatar', 'al rayyan': 'qatar', 'al gharafa': 'qatar', 'al sailiya': 'qatar',
  'umm salal': 'qatar', 'al wakrah': 'qatar', 'al arabi': 'qatar', 'qatar sc': 'qatar',
  'al bidda': 'qatar', 'qsc': 'qatar', 'al dafra': 'qatar', 'doha festival': 'qatar',
  // Oman
  'salalah': 'oman', 'nizwa': 'oman', 'al jabal': 'oman', 'sohar': 'oman',
  'bowl': 'oman', 'muscat festival': 'oman',
  // Kuwait
  'al jahra': 'kuwait', 'al salmiya': 'kuwait', 'kuwait city': 'kuwait',
  // Jordan
  'royal cultural': 'jordan', 'french mansion': 'jordan', 'terra santa': 'jordan',
  // Egypt
  'nile cruise': 'egypt', 'pyramid': 'egypt', 'the great pyramid': 'egypt',
  'dahab': 'egypt', 'sharm el sheikh': 'egypt', 'hurghada': 'egypt',
  // Türkiye
  'kadikoy': 'turkiye', 'beyoglu': 'turkiye', 'taksim': 'turkiye',
  // Europe
  'covent garden': 'uk', 'west end': 'uk',
  // Americas / others
  'ushuaia': 'argentina', 'el calafate': 'argentina',
  // "Ushuaa Dubai Harbour" is a venue in Dubai, not Ushuaia in Argentina.
  'ushuaia dubai harbour': 'uae', 'ushuaa dubai harbour': 'uae',
  // Known places the site has no page for.
  'lausanne': null, 'zürich': null,
};

// Bare city / country names — weaker evidence.
export const WEAK_PLACE = {
  'dubai': 'uae', 'dxb': 'uae', 'abu dhabi': 'uae', 'abudhabi': 'uae',
  'sharjah': 'uae', 'ajman': 'uae', 'umm al quwain': 'uae', 'ras al khaima': 'uae',
  'uae': 'uae', 'emirates': 'uae', 'khorfakkan': 'uae', 'kalba': 'uae',
  'riyadh': 'saudi-arabia', 'jeddah': 'saudi-arabia', 'dammam': 'saudi-arabia',
  'khobar': 'saudi-arabia', 'saudi': 'saudi-arabia', 'saudi arabia': 'saudi-arabia',
  'ksa': 'saudi-arabia', 'makkah': 'saudi-arabia', 'mecca': 'saudi-arabia',
  'madinah': 'saudi-arabia', 'medina': 'saudi-arabia',
  'doha': 'qatar', 'qatar': 'qatar',
  'muscat': 'oman', 'oman': 'oman',
  'kuwait': 'kuwait',
  'cairo': 'egypt', 'egypt': 'egypt', 'giza': 'egypt', 'alexandria': 'egypt',
  'amman': 'jordan', 'aqaba': 'jordan', 'jordan': 'jordan',
  'beirut': 'lebanon', 'lebanon': 'lebanon',
  'istanbul': 'turkiye', 'turkey': 'turkiye', 'turkiye': 'turkiye',
  'london': 'uk', 'manchester': 'uk', 'birmingham': 'uk', 'glasgow': 'uk',
  'edinburgh': 'uk', 'united kingdom': 'uk', 'britain': 'uk',
  'berlin': 'germany', 'munich': 'germany', 'hamburg': 'germany', 'germany': 'germany',
  'paris': 'france', 'france': 'france',
  'madrid': 'spain', 'barcelona': 'spain', 'valencia': 'spain', 'spain': 'spain',
  'ibiza': 'spain',
  'rome': 'italy', 'milan': 'italy', 'naples': 'italy', 'italy': 'italy',
  'athens': 'greece', 'mykonos': 'greece', 'thessaloniki': 'greece', 'greece': 'greece',
  'greece crete': 'greece',
  'nicosia': 'cyprus', 'limassol': 'cyprus', 'cyprus': 'cyprus',
  'karachi': 'pakistan', 'lahore': 'pakistan', 'islamabad': 'pakistan',
  'pakistan': 'pakistan', 'mumbai': 'india', 'delhi': 'india', 'bangalore': 'india',
  'goa': 'india', 'chennai': 'india', 'india': 'india',
  'kuala lumpur': 'malaysia', 'malaysia': 'malaysia', 'sepang': 'malaysia',
  'singapore': 'singapore', 'bangkok': 'thailand', 'phuket': 'thailand',
  'thailand': 'thailand', 'jakarta': 'indonesia', 'bali': 'indonesia',
  'indonesia': 'indonesia', 'manila': 'philippines', 'philippines': 'philippines',
  'johannesburg': 'south-africa', 'cape town': 'south-africa', 'durban': 'south-africa',
  'south africa': 'south-africa', 'lagos': 'nigeria', 'abuja': 'nigeria',
  'nigeria': 'nigeria', 'casablanca': 'morocco', 'marrakech': 'morocco',
  'morocco': 'morocco', 'new york': 'usa', 'miami': 'usa', 'vegas': 'usa',
  'los angeles': 'usa', 'san francisco': 'usa', 'chicago': 'usa', 'houston': 'usa',
  'seattle': 'usa', 'boston': 'usa', 'dallas': 'usa', 'denver': 'usa',
  'atlanta': 'usa', 'orlando': 'usa', 'tampa': 'usa', 'phoenix': 'usa',
  'portland': 'usa', 'austin': 'usa', 'usa': 'usa', 'united states': 'usa',
  'argentina': 'argentina', 'italia': 'italy', 'ditalia': 'italy',
  // Countries the site has no page for.
  'malta': null, 'switzerland': null, 'sweden': null, 'norway': null,
  'denmark': null, 'finland': null, 'poland': null, 'czech': null,
  'australia': null, 'new zealand': null, 'brazil': null,
  'chile': null, 'peru': null, 'colombia': null, 'cuba': null, 'jamaica': null,
  'nepal': null, 'sri lanka': null, 'bangladesh': null, 'vietnam': null,
  'cambodia': null, 'myanmar': null, 'taiwan': null, 'macau': null,
  'hong kong': null, 'kazakhstan': null, 'uzbekistan': null, 'azerbaijan': null,
  'georgia': null, 'armenia': null, 'serbia': null, 'croatia': null,
  'hungary': null, 'romania': null, 'bulgaria': null,
  'algeria': null, 'tunisia': null, 'senegal': null, 'kenya': null,
  'tanzania': null, 'uganda': null, 'ethiopia': null, 'zambia': null,
  'zimbabwe': null, 'botswana': null, 'namibia': null, 'mauritius': null,
  'seychelles': null, 'madagascar': null, 'ghana': null, 'ivory coast': null,
  'guinea': null, 'sudan': null, 'libya': null, 'iraq': null, 'tehran': null,
};

/**
 * Bahrain-only markers. Only consulted when no strong venue and no GSC query
 * evidence has already decided the country.
 */
export const BAHRAIN_TOKENS = new RegExp(
  '\\bmanama\\b|\\bbahrain\\b|\\bsakhir\\b|\\bmuharraq\\b|\\bjuffair\\b|\\bamwaj\\b|\\bmarsa\\b|' +
  '\\barabian mall\\b|\\bcity centre\\b|\\bbahrain cinemas\\b|\\bexhibition world\\b|' +
  '\\bal dana\\b|\\bdana amphitheatre\\b|\\bseef\\b|\\bkarbabad\\b|\\bfaris\\b|\\bnuaim\\b|' +
  '\\badliya\\b|\\btubli\\b|\\bdiplomat\\b|\\bradisson\\b|\\bhilton\\b|\\bmarriott\\b|' +
  '\\bsheraton\\b|\\bcrowne plaza\\b|\\bintercontinental\\b|\\bsofitel\\b|\\bfoura\\b|' +
  '\\britz\\b|\\bgulf hotel\\b|\\bpalmyard\\b|\\bpearling\\b|\\bvenetian\\b|' +
  '\\bfour seasons\\b|\\bwyndham\\b|\\bibis\\b|\\bnovotel\\b|\\bgolden tulip\\b|' +
  '\\btemple gang\\b|\\bwafi\\b|\\bsalty beach\\b|\\blido\\b|\\bhayat\\b|\\bsimply red\\b|' +
  '\\borangery\\b|\\bmasso\\b|\\bcirca\\b|\\bdalmeny\\b|\\blareena\\b|' +
  '\\broyal elephant\\b|\\btaj\\b|\\b25i50\\b|\\bminders\\b|\\bwestcore\\b|\\bbluestone\\b|' +
  '\\bal jazeera\\b|\\bbahrain harbour\\b|\\bahramark\\b|\\bansar\\b|\\bnorthbrook\\b|' +
  '\\boman mall\\b|\\bhanging gardens\\b|\\bmuharraq sports\\b|\\bbahrain fort\\b|' +
  '\\bexpo centre bahrain\\b|\\bcalifornia tower\\b|\\bdar al jafal\\b', 'i');

// Football clubs and competitions.
export const CLUB_COUNTRY = {
  'adib cup': 'uae', 'nasser bin hamad': 'bahrain',
  'al wasl': 'uae', 'baniyas': 'uae', 'eastern flames': 'uae', 'al jazira': 'uae',
  'al wahda': 'uae', 'al dhafra': 'uae', 'al taraji': 'uae', 'alula': 'uae',
  'sharjah fc': 'uae', 'emirates club': 'uae', 'ajman club': 'uae', 'al faiha': 'uae',
  'al ain fc': 'uae',
  'al hilal': 'saudi-arabia', 'al nassr': 'saudi-arabia', 'al ittihad': 'saudi-arabia',
  'al ahli': 'saudi-arabia', 'al ettifaq': 'saudi-arabia', 'al qadisiyah': 'saudi-arabia',
  'al taawoun': 'saudi-arabia', 'al wehda': 'saudi-arabia', 'al raed': 'saudi-arabia',
  'al okhdood': 'saudi-arabia', 'damac': 'saudi-arabia', 'al fateh': 'saudi-arabia',
  'al shabab': 'saudi-arabia', 'aali': 'bahrain', 'al hidd': 'bahrain',
  'sitra': 'bahrain', 'east riffa': 'bahrain', 'al ittifaq': 'bahrain',
  'manama club': 'bahrain', 'al muharraq': 'bahrain',
};

/**
 * Category inference, mirroring detectCategory() in the Platinumlist sync route
 * and this site's taxonomy.
 */
export const CATEGORY_RULES = [
  [/\bconcert\b|\bmusic\b|\blive band\b|\borchestra\b|\bsymphony\b|\bkaraoke\b|\bsoulfest\b|\bsoundtrack\b|\bpiano\b|\bviolin\b|\bguitar\b|\bsinger\b|\bstrings orchestra\b|\bchoir\b|\bmasterclass\b/, 'concerts'],
  [/\bcomedy\b|\bstand up\b|\bstandup\b|\bimprov\b|\bcomic\b|\bcomedian\b|\bcomedy night\b/, 'concerts'],
  [/\bclub\b|\bparty\b|\bdj\b|\bnightlife\b|\brave\b|\bfestival\b|\bsound system\b|\bpool party\b|\brooftop\b|\bskyline\b|\bfriday\b|\bsaturday\b/, 'nightlife'],
  [/\bsport\b|\bfootball\b|\bracing\b|\bformula 1\b|\bf1\b|\bmatch\b|\bmarathon\b|\byoga\b|\bfitness\b|\bgp\b|\bgrand prix\b|\bvs\b|\bpremier league\b|\bcup\b|\bchampionship\b|\bpaddles?\b|\byoga flow\b/, 'sports'],
  [/\btheatre\b|\btheater\b|\bmusical\b|\bopera\b|\bplay\b|\bdrama\b|\bballet\b|\billusion\b|\bmagic\b|\bstandup show\b|\bstand up show\b/, 'cultural'],
  [/\bfamily\b|\bkids\b|\bchildren\b|\bchild\b|\bteen\b|\bpancake party\b/, 'family'],
  [/\bdinner\b|\brestaurant\b|\bbuffet\b|\bfood\b|\bdining\b|\bcafe\b|\bcoffee\b|\btasting\b|\bpizza\b|\bcooking class\b|\bkitchen\b|\bchef\b|\bfood festival\b/, 'dining'],
  [/\bexhibition\b|\bexhibit\b|\bgallery\b|\bmuseum\b|\bart\b|\barts\b|\bpainting\b|\banime\b|\bmanga\b|\bcosplay\b|\bheritage\b|\bcultural foundation\b/, 'arts'],
  [/\bmarket\b|\bbazaar\b|\bshopping\b|\bfashion\b|\bmerchandise\b|\bmall\b/, 'shopping'],
  [/\bconference\b|\bworkshop\b|\bsummit\b|\bnetworking\b|\bbusiness\b|\bwebinar\b|\bexpo\b|\bawards\b|\bclinic\b/, 'business'],
  [/\bwellness\b|\bspa\b|\bmassage\b|\bretreat\b|\bhealth\b/, 'wellness'],
  [/\bcommunity\b|\bcharity\b|\bvolunteer\b|\bhalloween\b|\bchristmas\b|\beid\b|\bnew year\b|\bnational day\b|\bindependence day\b|\banniversary\b/, 'community'],
];

/** The international country pages the site actually serves. */
export const VALID_COUNTRIES = new Set([
  'cyprus', 'egypt', 'france', 'germany', 'greece', 'india', 'indonesia', 'italy',
  'jordan', 'kuwait', 'lebanon', 'malaysia', 'morocco', 'nigeria', 'oman', 'pakistan',
  'philippines', 'qatar', 'saudi-arabia', 'singapore', 'south-africa', 'spain',
  'thailand', 'turkiye', 'uae', 'uk', 'usa',
]);

/** The event category pages the site actually serves. */
export const VALID_CATEGORIES = new Set([
  'music', 'sports', 'arts', 'dining', 'community', 'shopping', 'nightlife',
  'special', 'family', 'wellness', 'business', 'cultural', 'concerts',
]);

/** Query terms that reveal which country a page was about. */
export const QUERY_PLACES = {
  'dubai': 'uae', 'abu dhabi': 'uae', 'sharjah': 'uae', 'ajman': 'uae',
  'riyadh': 'saudi-arabia', 'jeddah': 'saudi-arabia', 'dammam': 'saudi-arabia',
  'saudi': 'saudi-arabia', 'doha': 'qatar', 'qatar': 'qatar', 'muscat': 'oman',
  'oman': 'oman', 'kuwait': 'kuwait', 'cairo': 'egypt', 'egypt': 'egypt',
  'dahab': 'egypt', 'amman': 'jordan', 'aqaba': 'jordan', 'jordan': 'jordan',
  'london': 'uk', 'manama': 'bahrain', 'bahrain': 'bahrain', 'sakhir': 'bahrain',
  'berlin': 'germany', 'paris': 'france', 'madrid': 'spain', 'barcelona': 'spain',
  'rome': 'italy', 'milan': 'italy', 'athens': 'greece', 'mykonos': 'greece',
  'nicosia': 'cyprus', 'karachi': 'pakistan', 'mumbai': 'india',
  'kuala lumpur': 'malaysia', 'singapore': 'singapore', 'bangkok': 'thailand',
  'jakarta': 'indonesia', 'manila': 'philippines', 'johannesburg': 'south-africa',
  'lagos': 'nigeria', 'casablanca': 'morocco', 'ibiza': 'spain',
  'alserkal': 'uae', 'ushuaia': 'argentina', 'nizwa': 'oman',
  'terra santa': 'jordan', 'jebel': 'uae',
};

export const norm = (slug) => slug.toLowerCase().replace(/-/g, ' ');

/** Longest matching key in `dict` whose text appears in `text`. */
function longestMatch(dict, text) {
  let best = null;
  for (const [name, value] of Object.entries(dict)) {
    if (text.includes(name) && (best === null || name.length > best[0].length)) {
      best = [name, value];
    }
  }
  return best;
}

export const strongVenue = (slug) => {
  const m = longestMatch(STRONG_VENUE, norm(slug));
  return m ? { country: m[1], name: m[0] } : { country: null, name: null };
};

export const weakPlace = (slug) => {
  const m = longestMatch(WEAK_PLACE, norm(slug));
  return m ? { country: m[1], name: m[0] } : { country: null, name: null };
};

export const clubCountry = (slug) => {
  const m = longestMatch(CLUB_COUNTRY, norm(slug));
  return m ? { country: m[1], name: m[0] } : { country: null, name: null };
};

export const isBahrain = (slug) => BAHRAIN_TOKENS.test(norm(slug));

export function categoryOf(slug) {
  const text = norm(slug);
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(text)) return category;
  }
  return null;
}
