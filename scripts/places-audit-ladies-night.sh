#!/bin/bash
# Places API audit — /ladues-night-bahrain venues
# Uses GOOGLE_PLACES_API_KEY from .env.local
# Field mask: id, displayName, businessStatus, formattedAddress, regularOpeningHours, rating, userRatingCount

export $(grep -v '^#' /Users/shareefali/clawd/bahrainnights/.env.local | grep -v '^$' | xargs 2>/dev/null)
KEY="${GOOGLE_PLACES_API_KEY}"
FIELDS="places.id,places.displayName,places.businessStatus,places.formattedAddress,places.regularOpeningHours,places.rating,places.userRatingCount"

 venues=(
   "Coda Jazz Lounge Bahrain"
   "re/Asian Bahrain"
   "Mezzanine Le Meridien City Centre Bahrain"
   "Piano Piano Bahrain Gulf Hotel"
   "Trader Vic's Ritz-Carlton Bahrain"
   "Typhoon Bar Bahrain Gulf Hotel"
   "Sheraton Bahrain Lobby Lounge"
   "Calexico restaurant Bahrain"
   "CUT Lounge Four Seasons Bahrain"
   "Club Wahoo Bahrain"
   "The Meat Company restaurant Bahrain Adliya"
   "Gaucho restaurant Bahrain"
   "Bushido Ritz-Carlton Bahrain"
   "JJs Irish Pub Bahrain"
   "La Med Ritz-Carlton Bahrain"
   "Block 338 Bahrain"
   "Diggers bar Bahrain Juffair"
   "Palmyard Hotel Bahrain"
 )

for v in "${venues[@]}"; do
  echo "=== $v ==="
  curl -s -X POST "https://places.googleapis.com/v1/places:searchText" \
    -H "X-Goog-Api-Key: ${KEY}" \
    -H "X-Goog-FieldMask: ${FIELDS}" \
    -H "Content-Type: application/json" \
    -d "{\"textQuery\":\"${v}\"}"
  echo ""
  sleep 0.5
done
