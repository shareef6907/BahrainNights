import type { Metadata } from 'next';
import EmergencyPageClient from './EmergencyPageClient';

export const metadata: Metadata = {
  title: 'Bahrain Emergency Contacts | Police, Ambulance, Embassies',
  description: 'Essential emergency contact numbers for Bahrain including police, ambulance, fire, embassies, and government services. King Fahd Causeway status and travel information.',
  keywords: ['Bahrain emergency', 'Bahrain police', 'Bahrain ambulance', 'embassy Bahrain', 'King Fahd Causeway', 'emergency numbers Bahrain'],
  openGraph: {
    title: 'Bahrain Emergency Contacts',
    description: 'Essential emergency contact numbers for Bahrain - Police, Ambulance, Embassies, and more.',
    type: 'website',
  },
};

export default function EmergencyPage() {
  return <EmergencyPageClient />;
}
