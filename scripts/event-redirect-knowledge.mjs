/**
 * Knowledge base for classifying a dead event URL into a country/category.
 *
 * Ported from the proven Python classifier (scripts/_classify404.mjs lineage)
 * so the committed generator reproduces the reviewed map exactly.
 *
 * MATCHING PRECEDENCE
 * -------------------
 *   1. new_slug       — the event exists in the DB under a different slug
 *   2. club           — a football club / named competition
 *   3. strong venue   — a specific named venue or landmark (unambiguous)
 *   4. GSC query      — the queries Google received for that URL
 *   5. Bahrain token  — a Bahrain-specific place or hotel name
 *   6. weak place     — a bare city or country name (weakest evidence)
 *
 * A strong venue outranks a weak place on purpose: a title like
 * "Ushuaia Dubai Harbour" contains both "ushuaia" (a country) and "dubai"
 * (a city), and the venue is the more specific signal.
 */

/** A specific named venue or landmark -> country. Unambiguous. */
export const STRONG_VENUE = {
  // UAE
  'the penthouse': 'uae', 'penthouse': 'uae', 'aura beach': 'uae', 'cavo rooftop': 'uae',
  'ozone club': 'uae', 'time out market': 'uae', 'alserkal avenue': 'uae', 'alserkal': 'uae',
  'al quoz': 'uae', 'meyana': 'uae', 'the fridge warehouse': 'uae', 'fridge': 'uae',
  'sheikh rashid auditorium': 'uae', 'dubai opera': 'uae', 'zabeel park': 'uae',
  'safa park': 'uae', 'jumeirah beach': 'uae', 'madinat jumeirah': 'uae',
  'jumeirah muscat bay': 'oman',
  'downtown dubai': 'uae', 'dubai hills': 'uae', 'dubai marina': 'uae', 'jvc': 'uae',
  'jumeirah': 'uae', 'emaar': 'uae', 'burj': 'uae', 'nasm': 'uae', 'drunch': 'uae',
  'tanatan': 'bahrain', 'noodle street': 'bahrain', 'golden tulip': 'uae',
  'jafza one': 'uae', 'space 42': 'uae', 'space42': 'uae', 'cavallo': 'uae',
  'premier hotel': 'uae', 'theatre of digital art': 'uae', 'meyana theatre': 'uae',
  'the agenda': 'uae', 'the junction': 'uae', 'bhajjam': 'uae', 'oud mehta theater': 'uae',
  'oud mehta': 'uae', 'rooftop': 'uae', 'skyline': 'uae', 'downtown': 'uae',
  'expo centre': 'bahrain', 'expo': 'uae', 'yas island': 'uae', 'yas': 'uae',
  'saadiyat': 'uae', 'al ain university': 'uae', 'toyota': 'uae',
  // Saudi Arabia
  'ewc': 'saudi-arabia', 'esports world cup': 'saudi-arabia',
  'king fahd': 'saudi-arabia', 'front city': 'saudi-arabia', 'boulevard riad': 'saudi-arabia',
  'al majaz': 'saudi-arabia', 'al batoul': 'saudi-arabia', 'season': 'saudi-arabia',
  'al abdullah': 'saudi-arabia', 'abha': 'saudi-arabia', 'taif': 'saudi-arabia',
  'taibah': 'saudi-arabia', 'nassim': 'saudi-arabia', 'diriyah': 'saudi-arabia',
  'red sea': 'saudi-arabia', 'al zalzalah': 'saudi-arabia',
  // Bahrain
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
  'al ahsa': 'saudi-arabia', 'al ain': 'uae',
  // Egypt
  'nile cruise': 'egypt', 'pyramid': 'egypt', 'the great pyramid': 'egypt',
  'dahab': 'egypt', 'sharm el sheikh': 'egypt', 'hurghada': 'egypt',
  // Türkiye
  'kadikoy': 'turkiye', 'beyoglu': 'turkiye', 'taksim': 'turkiye',
  // Europe
  'covent garden': 'uk', 'the junction dubai': 'uae', 'west end': 'uk',
  'lausanne': null, 'zürich': null,
  // Americas / others
  // NOTE: 'ushuaa' is deliberately NOT mapped. "Ushuaa Dubai Harbour" is a
  // Dubai venue; only the Argentine city "Ushuaia" is an Argentina signal.
  'ushuaia': 'argentina', 'el calafate': 'argentina',
  'ushuaia dubai harbour': 'uae',

  // Venues verified against the site's own live event table and against
  // Platinumlist's own country subdomain (manama./dubai./abu-dhabi.platinumlist.net).
  'teres jjs irish restaurant': 'bahrain', 'teres jjs': 'bahrain',
  'teres': 'bahrain',
  'housefanatics': 'bahrain',
  'the laughter factory': 'uae',
  'imran al aradi': 'bahrain',
  'cinemana': 'bahrain',
  'dana beach': 'bahrain', 'danabeach': 'bahrain',
  'be beach': 'uae', 'beach club dubai': 'uae',
  'qe2': 'uae', 'theatre by qe2': 'uae',
  'the container': 'saudi-arabia', 'container presents': 'saudi-arabia',
  'unvrs': 'spain',
  'oniza': 'uae',
  'cielo rooftop': 'bahrain', 'cielo': 'bahrain',
  'khainz': 'uae', 'ras al khaimah': 'uae', 'ras al hamra': 'oman',
  'vorontsov': 'uae',
  'nezlobin': 'uae',
  'move connect': 'uae', 'expo city': 'uae',
  'illusion show': 'uae',
  'space on stage': 'turkiye', 'cappadocia': 'turkiye',
  'shiraz house': 'turkiye',
  'rajakeeyam': 'uae',
  'pfl mena': 'saudi-arabia',
  'east seaboard': 'uae',
  'the red theater': 'uae', 'red theatre': 'uae',
  'palavra': 'bahrain', 'palavra resort': 'bahrain',
  'goth party': 'saudi-arabia', 'joi valley': 'saudi-arabia', 'joy valley': 'saudi-arabia',
  'jules': 'uae',
};

/** Bare city / country names. Weak evidence — loses to a strong venue. */
export const WEAK_PLACE = {
  'dubai': 'uae', 'dxb': 'uae', 'abu dhabi': 'uae', 'abudhabi': 'uae',
  'sharjah': 'uae', 'ajman': 'uae', 'umm al quwain': 'uae', 'ras al khaima': 'uae',
  'uae': 'uae', 'emirates': 'uae', 'khorfakkan': 'uae', 'kalba': 'uae',
  'riyadh': 'saudi-arabia', 'jeddah': 'saudi-arabia', 'dammam': 'saudi-arabia',
  'khobar': 'saudi-arabia', 'saudi': 'saudi-arabia', 'saudi arabia': 'saudi-arabia',
  'ksa': 'saudi-arabia', 'makkah': 'saudi-arabia', 'mecca': 'saudi-arabia',
  'madinah': 'saudi-arabia', 'medina': 'saudi-arabia',
  'doha': 'qatar', 'qatar': 'qatar', 'al rayyan': 'qatar',
  'muscat': 'oman', 'oman': 'oman', 'nizwa': 'oman',
  'kuwait': 'kuwait', 'kuwait city': 'kuwait',
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
  'malta': null, 'switzerland': null, 'sweden': null, 'norway': null,
  'denmark': null, 'finland': null, 'poland': null, 'czech': null,
  'australia': null, 'new zealand': null, 'brazil': null, 'argentina': 'argentina',
  'chile': null, 'peru': null, 'colombia': null, 'cuba': null, 'jamaica': null,
  'nepal': null, 'sri lanka': null, 'bangladesh': null, 'vietnam': null,
  'cambodia': null, 'myanmar': null, 'taiwan': null, 'macau': null,
  'hong kong': null, 'kazakhstan': null, 'uzbekistan': null, 'azerbaijan': null,
  'georgia': null, 'armenia': null, 'serbia': null, 'croatia': null,
  'hungary': null, 'romania': null, 'bulgaria': null, 'greece crete': 'greece',
  'algeria': null, 'tunisia': null, 'senegal': null, 'kenya': null,
  'tanzania': null, 'uganda': null, 'ethiopia': null, 'zambia': null,
  'zimbabwe': null, 'botswana': null, 'namibia': null, 'mauritius': null,
  'seychelles': null, 'madagascar': null, 'ghana': null, 'ivory coast': null,
  'senegal dakar': null, 'guinea': null, 'sudan': null, 'libya': null,
  'tunis': null, 'algeria algiers': null, 'iraq': null, 'tehran': null,
  'kuwait kuwait city': 'kuwait', 'oman muscat': 'oman', 'qatar doha': 'qatar',
  'saudi riyadh': 'saudi-arabia', 'uae dubai': 'uae',
};

/** Football clubs and named competitions -> country. */
export const CLUB_COUNTRY = {
  'adib cup': 'uae', 'nasser bin hamad': 'bahrain',
  'al wasl': 'uae', 'baniyas': 'uae', 'eastern flames': 'uae', 'al jazira': 'uae',
  'al wahda': 'uae', 'al dhafra': 'uae', 'al taraji': 'uae', 'alula': 'uae',
  'khorfakkan': 'uae', 'kalba': 'uae', 'al dhaid': 'uae', 'sharjah fc': 'uae',
  'emirates club': 'uae', 'ajman club': 'uae', 'al faiha': 'uae', 'al ain fc': 'uae',
  'al hilal': 'saudi-arabia', 'al nassr': 'saudi-arabia', 'al ittihad': 'saudi-arabia',
  'al ahli': 'saudi-arabia', 'al ettifaq': 'saudi-arabia', 'al qadisiyah': 'saudi-arabia',
  'al taawoun': 'saudi-arabia', 'al wehda': 'saudi-arabia', 'al raed': 'saudi-arabia',
  'al okhdood': 'saudi-arabia', 'damac': 'saudi-arabia', 'al fateh': 'saudi-arabia',
  'al shabab': 'saudi-arabia', 'aali': 'bahrain', 'al hidd': 'bahrain',
  'sitra': 'bahrain', 'east riffa': 'bahrain', 'al ittifaq': 'bahrain',
  'manama club': 'bahrain', 'al muharraq': 'bahrain',
};

/** Bahrain-only markers, consulted only when nothing stronger matched. */
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
  '\\bexpo centre bahrain\\b|\\bcalifornia tower\\b|\\bdar al jafal\\b',
  'i');

/**
 * Category inference. Mirrors detectCategory() in the sync route, plus this
 * site's category taxonomy.
 */
export const CATEGORY_RULES = [
  [/\bconcert\b|\bmusic\b|\blive band\b|\borchestra\b|\bsymphony\b|\bkaraoke\b|\bsoulfest\b|\bsoundtrack\b|\bpiano\b|\bviolin\b|\bguitar\b|\bsinger\b|\bstrings orchestra\b|\bchoir\b|\bmasterclass\b/, 'concerts'],
  [/\bcomedy\b|\bstand up\b|\bstandup\b|\bimprov\b|\bcomic\b|\bcomedian\b|\bcomedy night\b/, 'concerts'],
  [/\bclub\b|\bparty\b|\bdj\b|\bnightlife\b|\brave\b|\bfestival\b|\bsound system\b|\bpool party\b|\brooftop\b|\bskyline\b|\bfriday\b|\bsaturday\b|\bbrunch\b/, 'nightlife'],
  [/\bsport\b|\bfootball\b|\bracing\b|\bformula 1\b|\bf1\b|\bmatch\b|\bmarathon\b|\byoga\b|\bfitness\b|\bgp\b|\bgrand prix\b|\bvs\b|\bpremier league\b|\bcup\b|\bchampionship\b|\bpaddles?\b|\byoga flow\b|\bopen\b/, 'sports'],
  [/\btheatre\b|\btheater\b|\bmusical\b|\bopera\b|\bplay\b|\bdrama\b|\bballet\b|\billusion\b|\bmagic\b|\bstandup show\b|\bstand up show\b/, 'cultural'],
  [/\bfamily\b|\bkids\b|\bchildren\b|\bchild\b|\bteen\b|\bpancake party\b/, 'family'],
  [/\bdinner\b|\brestaurant\b|\bbuffet\b|\bfood\b|\bdining\b|\bcafe\b|\bcoffee\b|\btasting\b|\bpizza\b|\bcooking class\b|\bkitchen\b|\bchef\b|\bfood festival\b|\bbrunch\b/, 'dining'],
  [/\bexhibition\b|\bexhibit\b|\bgallery\b|\bmuseum\b|\bart\b|\barts\b|\bpainting\b|\banime\b|\bmanga\b|\bcosplay\b|\bheritage\b|\bcultural foundation\b/, 'arts'],
  [/\bmarket\b|\bbazaar\b|\bshopping\b|\bfashion\b|\bmerchandise\b|\bmall\b/, 'shopping'],
  [/\bconference\b|\bworkshop\b|\bsummit\b|\bnetworking\b|\bbusiness\b|\bwebinar\b|\bexpo\b|\bawards\b|\bclinic\b/, 'business'],
  [/\bwellness\b|\bspa\b|\bmassage\b|\bretreat\b|\bhealth\b/, 'wellness'],
  [/\bcommunity\b|\bcharity\b|\bvolunteer\b|\bhalloween\b|\bchristmas\b|\beid\b|\bnew year\b|\bnational day\b|\bindependence day\b|\banniversary\b/, 'community'],
];

/** Countries the site actually has a page for. */
export const VALID_COUNTRIES = new Set([
  'cyprus', 'egypt', 'france', 'germany', 'greece', 'india', 'indonesia', 'italy',
  'jordan', 'kuwait', 'lebanon', 'malaysia', 'morocco', 'nigeria', 'oman', 'pakistan',
  'philippines', 'qatar', 'saudi-arabia', 'singapore', 'south-africa', 'spain',
  'thailand', 'turkiye', 'uae', 'uk', 'usa',
]);

/** Categories the site actually has a page for. */
export const VALID_CATEGORIES = new Set([
  'music', 'sports', 'arts', 'dining', 'community', 'shopping', 'nightlife',
  'special', 'family', 'wellness', 'business', 'cultural', 'concerts',
]);

/** Query terms that reveal the country a page was about. */
export const QUERY_COUNTRY = {
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

/**
 * Explicit location signals inside a slug.
 *
 * A slug that literally names its city or country ("... in Dubai", "... Muscat")
 * is stating where the event happened. That beats a venue name, because many
 * venue names are shared across countries — "Time Out Market" exists in Dubai
 * AND in Bahrain, "Cavallo" exists in Dubai AND in Bahrain, "New Covent
 * Garden" is a Dubai venue despite the name.
 *
 * These are matched as "in <place>" / "at <place>" / a trailing "<place>",
 * not as bare substrings, so an artist or a band whose name happens to contain
 * a place name does not hijack the match.
 */
export const EXPLICIT_PLACE = {
  'dubai': 'uae', 'dxb': 'uae', 'abu dhabi': 'uae', 'abudhabi': 'uae',
  'sharjah': 'uae', 'ajman': 'uae', 'umm al quwain': 'uae', 'ras al khaima': 'uae',
  'rak': 'uae', 'al ain': 'uae', 'uae': 'uae',
  'riyadh': 'saudi-arabia', 'jeddah': 'saudi-arabia', 'dammam': 'saudi-arabia',
  'khobar': 'saudi-arabia', 'saudi': 'saudi-arabia', 'saudi arabia': 'saudi-arabia',
  'ksa': 'saudi-arabia', 'makkah': 'saudi-arabia', 'mecca': 'saudi-arabia',
  'madinah': 'saudi-arabia', 'medina': 'saudi-arabia', 'abha': 'saudi-arabia',
  'taif': 'saudi-arabia', 'taibah': 'saudi-arabia', 'diriyah': 'saudi-arabia',
  'doha': 'qatar', 'qatar': 'qatar', 'lusail': 'qatar', 'al rayyan': 'qatar',
  'al wakrah': 'qatar', 'umm salal': 'qatar',
  'muscat': 'oman', 'oman': 'oman', 'nizwa': 'oman', 'salalah': 'oman', 'sohar': 'oman',
  'muscat bay': 'oman',
  'kuwait': 'kuwait', 'kuwait city': 'kuwait', 'al jahra': 'kuwait',
  'cairo': 'egypt', 'egypt': 'egypt', 'giza': 'egypt', 'alexandria': 'egypt',
  'dahab': 'egypt', 'sharm el sheikh': 'egypt', 'hurghada': 'egypt',
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
  'italia': 'italy', 'ditalia': 'italy',
  'athens': 'greece', 'mykonos': 'greece', 'thessaloniki': 'greece', 'greece': 'greece',
  'nicosia': 'cyprus', 'limassol': 'cyprus', 'cyprus': 'cyprus',
  'karachi': 'pakistan', 'lahore': 'pakistan', 'islamabad': 'pakistan',
  'pakistan': 'pakistan',
  'mumbai': 'india', 'delhi': 'india', 'bangalore': 'india', 'goa': 'india',
  'chennai': 'india', 'india': 'india',
  'kuala lumpur': 'malaysia', 'malaysia': 'malaysia', 'sepang': 'malaysia',
  'singapore': 'singapore',
  'bangkok': 'thailand', 'phuket': 'thailand', 'thailand': 'thailand',
  'jakarta': 'indonesia', 'bali': 'indonesia', 'indonesia': 'indonesia',
  'manila': 'philippines', 'philippines': 'philippines',
  'johannesburg': 'south-africa', 'cape town': 'south-africa', 'durban': 'south-africa',
  'south africa': 'south-africa',
  'lagos': 'nigeria', 'abuja': 'nigeria', 'nigeria': 'nigeria',
  'casablanca': 'morocco', 'marrakech': 'morocco', 'morocco': 'morocco',
  'new york': 'usa', 'miami': 'usa', 'vegas': 'usa', 'los angeles': 'usa',
  'san francisco': 'usa', 'chicago': 'usa', 'houston': 'usa', 'seattle': 'usa',
  'boston': 'usa', 'dallas': 'usa', 'denver': 'usa', 'atlanta': 'usa',
  'orlando': 'usa', 'tampa': 'usa', 'phoenix': 'usa', 'portland': 'usa',
  'austin': 'usa', 'usa': 'usa', 'united states': 'usa',
  'manama': 'bahrain', 'bahrain': 'bahrain', 'sakhir': 'bahrain',
  'muharraq': 'bahrain', 'juffair': 'bahrain', 'amwaj': 'bahrain',
};

/**
 * Country from a Platinumlist venue subdomain (dubai.platinumlist.net) or
 * timezone (Asia/Dubai). Both come straight from Platinumlist, so they are
 * ground truth rather than inference.
 */
export const FEED_HOST_COUNTRY = {
  dubai: 'uae', sharjah: 'uae', 'abu-dhabi': 'uae', rak: 'uae', 'al-ain': 'uae',
  'ajman': 'uae', umm: 'uae', ushuaiadubai: 'uae',
  riyadh: 'saudi-arabia', jeddah: 'saudi-arabia', dammam: 'saudi-arabia',
  khobar: 'saudi-arabia', abha: 'saudi-arabia', taif: 'saudi-arabia',
  doha: 'qatar', lusail: 'qatar',
  muscat: 'oman', salalah: 'oman',
  kuwait: 'kuwait',
  cairo: 'egypt', giza: 'egypt', alexandria: 'egypt',
  amman: 'jordan',
  beirut: 'lebanon',
  istanbul: 'turkiye',
  london: 'uk', manchester: 'uk',
  berlin: 'germany', munich: 'germany',
  paris: 'france',
  madrid: 'spain', barcelona: 'spain', ibiza: 'spain',
  rome: 'italy', milan: 'italy',
  athens: 'greece', mykonos: 'greece',
  nicosia: 'cyprus',
  karachi: 'pakistan', lahore: 'pakistan',
  mumbai: 'india', delhi: 'india', bangalore: 'india',
  'kuala-lumpur': 'malaysia',
  singapore: 'singapore',
  bangkok: 'thailand', phuket: 'thailand',
  jakarta: 'indonesia', bali: 'indonesia',
  manila: 'philippines',
  johannesburg: 'south-africa', 'cape-town': 'south-africa',
  lagos: 'nigeria', abuja: 'nigeria',
  casablanca: 'morocco', marrakech: 'morocco',
  'new-york': 'usa', miami: 'usa', vegas: 'usa',
  manama: 'bahrain',
  jordan: 'jordan',
  sharjah: 'uae',
  'al-rayyan': 'qatar', 'al-gharafa': 'qatar', 'al-sailiya': 'qatar',
  'umm-salal': 'qatar', 'al-wakrah': 'qatar',
  nizwa: 'oman', sohar: 'oman', sur: 'oman',
  'al-jahra': 'kuwait', 'al-salmiya': 'kuwait',
  sharm: 'egypt', 'sharm-el-sheikh': 'egypt', hurghada: 'egypt', dahab: 'egypt',
  madinah: 'saudi-arabia', makkah: 'saudi-arabia', jizan: 'saudi-arabia',
  'al-kharj': 'saudi-arabia', 'al-zalzalah': 'saudi-arabia',
};

export const FEED_TZ_COUNTRY = {
  'Asia/Dubai': 'uae', 'Asia/Riyadh': 'saudi-arabia', 'Asia/Qatar': 'qatar',
  'Asia/Bahrain': 'bahrain', 'Asia/Kuwait': 'kuwait', 'Asia/Muscat': 'oman',
  'Asia/Cairo': 'egypt', 'Asia/Amman': 'jordan', 'Asia/Beirut': 'lebanon',
  'Asia/Istanbul': 'turkiye', 'Europe/London': 'uk', 'Europe/Berlin': 'germany',
  'Europe/Paris': 'france', 'Europe/Madrid': 'spain', 'Europe/Rome': 'italy',
  'Europe/Athens': 'greece', 'Asia/Nicosia': 'cyprus', 'Asia/Karachi': 'pakistan',
  'Asia/Kolkata': 'india', 'Asia/Calcutta': 'india', 'Asia/Kuala_Lumpur': 'malaysia',
  'Asia/Singapore': 'singapore', 'Asia/Bangkok': 'thailand', 'Asia/Jakarta': 'indonesia',
  'Asia/Manila': 'philippines', 'Africa/Johannesburg': 'south-africa',
  'Africa/Lagos': 'nigeria', 'Africa/Casablanca': 'morocco',
  'America/New_York': 'usa', 'America/Chicago': 'usa', 'America/Los_Angeles': 'usa',
};

/** Lowercase and turn hyphens into spaces, so 'al-hidd' matches 'al hidd'. */
export function norm(slug) {
  return slug.toLowerCase().replace(/-/g, ' ');
}

/**
 * Drop the trailing event id and any trailing year from a slug.
 *
 * Platinumlist slugs end in the event id ("…-105778"), and many also carry a
 * year ("… ditalia 2026"). Both sit between the place name and the end of the
 * string, so the trailing-token check never sees the place unless they are
 * removed first.
 */
export function stripId(slug) {
  return norm(slug).replace(/\s\d{4,7}$/, '').replace(/\s(19|20)\d{2}$/, '');
}

/** Longest matching key in the dictionary whose text appears in the slug. */
function match(dict, text) {
  let best = null;
  for (const [name, country] of Object.entries(dict)) {
    if (text.includes(name) && (best === null || name.length > best[0].length)) {
      best = [name, country];
    }
  }
  return best;
}

export function strongVenue(slug) {
  const r = match(STRONG_VENUE, stripId(slug));
  return r ? { country: r[1], name: r[0] } : { country: null, name: null };
}

export function weakPlace(slug) {
  const r = match(WEAK_PLACE, stripId(slug));
  return r ? { country: r[1], name: r[0] } : { country: null, name: null };
}

export function clubCountry(slug) {
  const r = match(CLUB_COUNTRY, stripId(slug));
  return r ? { country: r[1], name: r[0] } : { country: null, name: null };
}

export function categoryOf(slug) {
  const s = norm(slug);
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(s)) return category;
  }
  return null;
}

export function isBahrain(slug) {
  return BAHRAIN_TOKENS.test(norm(slug));
}

/**
 * Find the location a slug names.
 *
 * Platinumlist titles follow "Event Name at Venue, City" / "Event Name in
 * City", so the city is almost always at the END of the title. The tiers
 * below mirror that:
 *
 *   1. trailing place   — "… at Crowne Plaza Ocec Hotel Muscat"  (strongest)
 *   2. prepositional    — "… in Dubai", "… live in Qatar"
 *   3. leading place    — "Dubai Basketball vs FC Barcelona" (host city)
 *
 * A bare substring match is not enough anywhere: "Dimitri Vegas" and
 * "FC Barcelona" contain a place name but say nothing about where the event
 * happened. Requiring a position keeps artist and team names out.
 */
export function explicitPlace(slug) {
  // Drop the trailing numeric id and year so they do not sit in the way of the
  // trailing-token check.
  const text = stripId(slug);
  const words = text.split(' ').filter(Boolean);

  // (1) Trailing place.
  for (const n of [3, 2, 1]) {
    if (words.length < n) continue;
    const cand = words.slice(words.length - n).join(' ');
    if (!EXPLICIT_PLACE[cand]) continue;
    const before = words.slice(0, words.length - n).join(' ');
    // "X vs Y" slugs name two teams; the host city is the FIRST place, not
    // the trailing one ("Dubai Basketball vs FC Barcelona").
    if (/\bvs\b|\bfc\b/.test(before)) continue;
    return { country: EXPLICIT_PLACE[cand], name: cand };
  }

  // (2) A place attached to a preposition.
  let best = null;
  for (const [name, country] of Object.entries(EXPLICIT_PLACE)) {
    const re = new RegExp(`\\b(?:in|at|from)\\s${escapeRe(name)}\\b`);
    if (re.test(text) && (!best || name.length > best[0].length)) {
      best = [name, country];
    }
  }
  if (best) return { country: best[1], name: best[0] };

  // (3) The leading place, for "X vs Y" slugs and titles that name the host
  // city first ("Beat the Heat DXB … at DWTC").
  for (const [name, country] of Object.entries(EXPLICIT_PLACE)) {
    const re = new RegExp(`^${escapeRe(name)}\\b`);
    if (re.test(text)) return { country, name };
  }

  return { country: null, name: null };
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Resolve a dead event slug to a destination.
 *
 * @param slug          the dead slug
 * @param newSlug       the slug the event currently lives under, if any
 * @param queryCountry  country inferred from the GSC queries for that URL
 * @param feedCountry   country from the Platinumlist feed itself (host/timezone)
 * @returns {{destination: string|null, reason: string, country: string|null, category: string|null}}
 */
export function resolveDestination(slug, newSlug, queryCountry, feedCountry = null) {
  const cat = categoryOf(slug);
  const category = cat && VALID_CATEGORIES.has(cat) ? cat : null;

  if (newSlug) {
    return {
      destination: `/events/${newSlug}`,
      reason: 'exact-new-slug',
      country: null,
      category,
    };
  }

  const club = clubCountry(slug);
  const venue = strongVenue(slug);
  const bahrain = isBahrain(slug);
  const place = weakPlace(slug);
  const explicit = explicitPlace(slug);

  let country = null;
  let reason = '';
  if (club.country) {
    country = club.country;
    reason = `club:${club.name}`;
  } else if (feedCountry) {
    // Platinumlist's own host/timezone for this event — ground truth.
    country = feedCountry;
    reason = 'platinumlist-feed';
  } else if (explicit.country) {
    // The slug names its city ("... in Dubai", "... Hotel Muscat"). This beats
    // a venue name, because many venue names are shared across countries
    // (Time Out Market, Cavallo and New Covent Garden all exist in more
    // than one).
    country = explicit.country;
    reason = `explicit:${explicit.name}`;
  } else if (venue.country) {
    country = venue.country;
    reason = `venue:${venue.name}`;
  } else if (queryCountry) {
    country = queryCountry;
    reason = 'gsc-query';
  } else if (bahrain) {
    country = 'bahrain';
    reason = 'bahrain-token';
  } else if (place.country) {
    country = place.country;
    reason = `place:${place.name}`;
  }

  if (country === 'bahrain') {
    return {
      destination: category ? `/events/category/${category}` : '/events',
      reason,
      country,
      category,
    };
  }
  if (country && VALID_COUNTRIES.has(country)) {
    return { destination: `/international/${country}`, reason, country, category };
  }
  if (bahrain && category) {
    return {
      destination: `/events/category/${category}`,
      reason: `${reason};category-fallback`,
      country,
      category,
    };
  }

  // No honest live replacement for this URL.
  return { destination: null, reason: reason || 'unknown', country, category };
}
