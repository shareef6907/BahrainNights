-- Create parks table for Parks & Gardens feature
CREATE TABLE IF NOT EXISTS parks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_arabic TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT NOT NULL,
  governorate TEXT NOT NULL CHECK (governorate IN ('capital', 'muharraq', 'northern', 'southern')),
  rating DECIMAL(2, 1),
  total_reviews INTEGER DEFAULT 0,
  opening_hours TEXT,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  google_maps_url TEXT,
  description TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_parks_governorate ON parks(governorate);
CREATE INDEX IF NOT EXISTS idx_parks_is_active ON parks(is_active);
CREATE INDEX IF NOT EXISTS idx_parks_is_verified ON parks(is_verified);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_parks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS parks_updated_at ON parks;
CREATE TRIGGER parks_updated_at
  BEFORE UPDATE ON parks
  FOR EACH ROW
  EXECUTE FUNCTION update_parks_updated_at();

-- Seed with initial parks data
INSERT INTO parks (name, name_arabic, latitude, longitude, address, governorate, rating, total_reviews, opening_hours, features, description, is_verified, is_active) VALUES
-- Capital Governorate
('Andalus Garden', 'حديقة الأندلس', 26.2167, 50.5833, 'Gudaibiya, Bahrain', 'capital', 4.3, 850, '7:00 AM - 10:00 PM', ARRAY['Walking Paths', 'Fountains', 'Shaded Areas', 'Benches'], 'Beautiful traditional Andalusian-style garden in the heart of Gudaibiya with fountains and shaded walkways.', true, true),
('Um Al Hassam Garden', 'حديقة أم الحصم', 26.2089, 50.5756, 'Um Al Hassam, Bahrain', 'capital', 4.1, 320, '6:00 AM - 11:00 PM', ARRAY['Playground', 'Walking Track', 'Parking Available'], 'Family-friendly park with playground equipment and open green spaces.', true, true),
('Salmaniya Garden', 'حديقة السلمانية', 26.2256, 50.5678, 'Salmaniya, Bahrain', 'capital', 4.0, 180, '6:00 AM - 10:00 PM', ARRAY['Playground', 'Walking Paths', 'Lit at Night'], 'Neighborhood park with children play area and walking paths.', true, true),
('Juffair Park', 'حديقة الجفير', 26.2128, 50.6053, 'Juffair, Bahrain', 'capital', 4.2, 450, '6:00 AM - 11:00 PM', ARRAY['Playground', 'Exercise Equipment', 'Walking Track', 'Restrooms'], 'Popular park in Juffair with playground and exercise equipment.', true, true),
('Water Garden', 'الحديقة المائية', 26.2389, 50.5456, 'Bahrain Bay, Bahrain', 'capital', 4.5, 620, '24 Hours', ARRAY['Waterfront', 'Walking Track', 'Shaded Areas', 'Restaurants Nearby'], 'Scenic waterfront garden along Bahrain Bay with stunning views.', true, true),
('Al Fateh Corniche', 'كورنيش الفاتح', 26.2189, 50.5967, 'Juffair, Bahrain', 'capital', 4.5, 890, '24 Hours', ARRAY['Waterfront', 'Walking Track', 'Mosque Nearby', 'Photography Spot'], 'Popular waterfront promenade near Al Fateh Grand Mosque with walking paths.', true, true),

-- Muharraq Governorate
('Prince Khalifa Bin Salman Park', 'حديقة الأمير خليفة بن سلمان', 26.2478, 50.6567, 'Hidd, Bahrain', 'muharraq', 4.6, 2100, '6:00 AM - 12:00 AM', ARRAY['Playground', 'Walking Track', 'Picnic Area', 'Parking Available', 'Restrooms', 'Lit at Night'], 'The largest park in Bahrain featuring vast green spaces, playgrounds, walking tracks, and family picnic areas.', true, true),
('Arad Fort Park', 'حديقة قلعة عراد', 26.2544, 50.6156, 'Arad, Bahrain', 'muharraq', 4.4, 980, '7:00 AM - 10:00 PM', ARRAY['Historic Site', 'Waterfront', 'Walking Paths', 'Photography Spot'], 'Historic park surrounding Arad Fort with beautiful gardens and sea views.', true, true),
('Dohat Arad Park', 'حديقة دوحة عراد', 26.2489, 50.6089, 'Arad, Bahrain', 'muharraq', 4.3, 540, '5:00 AM - 11:00 PM', ARRAY['Waterfront', 'Walking Track', 'Exercise Equipment', 'Parking Available'], 'Waterfront park along Arad Bay with jogging track and exercise stations.', true, true),
('Muharraq Corniche Park', 'حديقة كورنيش المحرق', 26.2567, 50.6234, 'Muharraq, Bahrain', 'muharraq', 4.2, 380, '24 Hours', ARRAY['Waterfront', 'Walking Track', 'Benches', 'Lit at Night'], 'Scenic corniche park with walking path along the waterfront.', true, true),
('Busaiteen Park', 'حديقة البسيتين', 26.2378, 50.6123, 'Busaiteen, Bahrain', 'muharraq', 4.0, 210, '6:00 AM - 10:00 PM', ARRAY['Playground', 'Shaded Areas', 'Parking Available'], 'Family park with playground and shaded seating areas.', true, true),

-- Northern Governorate
('Budaiya Botanical Garden', 'حديقة البديع النباتية', 26.2189, 50.4456, 'Budaiya, Bahrain', 'northern', 4.4, 720, '7:00 AM - 6:00 PM', ARRAY['Botanical Garden', 'Walking Paths', 'Educational', 'Photography Spot'], 'Beautiful botanical garden featuring diverse plant species and peaceful walking paths.', true, true),
('Janabiya Park', 'حديقة الجنبية', 26.1989, 50.5012, 'Janabiya, Bahrain', 'northern', 4.3, 410, '6:00 AM - 11:00 PM', ARRAY['Playground', 'Walking Track', 'Exercise Equipment', 'Parking Available'], 'Modern park with excellent playground facilities and walking tracks.', true, true),
('Saar Park', 'حديقة سار', 26.1856, 50.5089, 'Saar, Bahrain', 'northern', 4.1, 290, '6:00 AM - 10:00 PM', ARRAY['Playground', 'Walking Paths', 'Shaded Areas'], 'Popular neighborhood park with play areas and green spaces.', true, true),
('Barbar Park', 'حديقة باربار', 26.2234, 50.4789, 'Barbar, Bahrain', 'northern', 4.0, 180, '6:00 AM - 10:00 PM', ARRAY['Playground', 'Historic Nearby', 'Parking Available'], 'Community park near the historic Barbar Temple site.', true, true),

-- Southern Governorate
('Adhari Park', 'حديقة عذاري', 26.1867, 50.5234, 'Adhari, Bahrain', 'southern', 4.2, 1850, '4:00 PM - 11:00 PM (Weekdays), 10:00 AM - 11:00 PM (Weekends)', ARRAY['Amusement Rides', 'Playground', 'Natural Spring', 'Restaurants', 'Parking Available'], 'Large amusement and recreation park with rides, playground, and natural spring pools.', true, true),
('Al Areen Wildlife Park', 'محمية العرين', 25.9678, 50.5012, 'Zallaq, Bahrain', 'southern', 4.5, 1420, '8:00 AM - 5:00 PM', ARRAY['Wildlife', 'Nature Reserve', 'Educational', 'Parking Available', 'Guided Tours'], 'Nature reserve and wildlife park home to Arabian oryx, gazelles, and diverse bird species.', true, true),
('Hunainiyah Park', 'حديقة الحنينية', 26.1234, 50.5567, 'Riffa, Bahrain', 'southern', 4.1, 340, '6:00 AM - 11:00 PM', ARRAY['Playground', 'Walking Track', 'Parking Available', 'Lit at Night'], 'Green park in Riffa with playground and jogging track.', true, true),
('Khalifa Al Kabeer Park', 'حديقة خليفة الكبير', 26.1156, 50.5489, 'Riffa, Bahrain', 'southern', 4.3, 560, '6:00 AM - 11:00 PM', ARRAY['Playground', 'Sports Facilities', 'Walking Track', 'Parking Available'], 'Spacious park with excellent facilities for families and sports enthusiasts.', true, true),
('Isa Town Park', 'حديقة مدينة عيسى', 26.1689, 50.5478, 'Isa Town, Bahrain', 'southern', 4.0, 270, '6:00 AM - 10:00 PM', ARRAY['Playground', 'Community Space', 'Walking Paths'], 'Central park in Isa Town with playground and community gathering spaces.', true, true),
('Hamad Town Park', 'حديقة مدينة حمد', 26.1145, 50.4856, 'Hamad Town, Bahrain', 'southern', 4.2, 380, '6:00 AM - 11:00 PM', ARRAY['Playground', 'Walking Track', 'Sports Courts', 'Parking Available'], 'Large park in Hamad Town with diverse recreational facilities.', true, true),
('Quran Garden', 'حديقة القرآن الكريم', 26.1089, 50.4923, 'Hamad Town, Bahrain', 'southern', 4.4, 650, '7:00 AM - 6:00 PM', ARRAY['Educational', 'Botanical Garden', 'Walking Paths', 'Peaceful'], 'Unique garden featuring plants mentioned in the Holy Quran with educational displays.', true, true),
('Prince Abdulla Al Faisal Park', 'حديقة الأمير عبدالله الفيصل', 26.1345, 50.5678, 'Riffa, Bahrain', 'southern', 4.1, 320, '6:00 AM - 10:00 PM', ARRAY['Playground', 'Walking Track', 'Parking Available'], 'Well-maintained park with playground and community facilities.', true, true)
ON CONFLICT DO NOTHING;
