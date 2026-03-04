'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, AlertTriangle, Shield, Building2, Globe, Car } from 'lucide-react';

interface ContactItem {
  name: string;
  numbers: string[];
  icon?: React.ReactNode;
}

interface ContactSection {
  title: string;
  icon: React.ReactNode;
  contacts: ContactItem[];
}

const criticalNumbers: ContactItem[] = [
  { name: 'Bahrain Emergency Services (Ambulance, Police, Civil Defense)', numbers: ['999'] },
  { name: 'Traffic Accident', numbers: ['199'] },
  { name: 'Bahrain International Airport', numbers: ['8000 7777'] },
  { name: 'Ministry of Health', numbers: ['8000 8100'] },
  { name: 'Ministry of Interior', numbers: ['17390900'] },
  { name: 'Bahrain Police Hotline', numbers: ['8000 8008'] },
  { name: 'eGovernment', numbers: ['8000 8001'] },
  { name: 'Municipality Emergency', numbers: ['3960 9331'] },
  { name: 'Electricity & Water Emergency', numbers: ['1751 5555'] },
  { name: 'Coast Guard', numbers: ['1770 0000'] },
];

const governoratePolice: ContactItem[] = [
  { name: 'Capital Governorate Police', numbers: ['17291555'] },
  { name: 'Muharraq Governorate Police', numbers: ['17390185'] },
  { name: 'Northern Governorate Police', numbers: ['17403111'] },
  { name: 'Southern Governorate Police', numbers: ['17664606'] },
  { name: 'BIA Police', numbers: ['17330515'] },
  { name: 'King Fahd Causeway Security', numbers: ['17796555'] },
];

const embassies: ContactItem[] = [
  { name: '🇧🇩 Bangladesh', numbers: ['17233925'] },
  { name: '🇩🇪 Germany', numbers: ['17745277', '39458537'] },
  { name: '🇮🇳 India', numbers: ['38400433', '39418071'] },
  { name: '🇯🇵 Japan', numbers: ['17716565'] },
  { name: '🇰🇼 Kuwait', numbers: ['17534040'] },
  { name: '🇳🇵 Nepal', numbers: ['17725583'] },
  { name: '🇴🇲 Oman', numbers: ['17293663'] },
  { name: '🇵🇰 Pakistan', numbers: ['17244113', '39826823'] },
  { name: '🇵🇭 Philippines', numbers: ['39953235'] },
  { name: '🇶🇦 Qatar', numbers: ['17722922'] },
  { name: '🇸🇦 Saudi Arabia', numbers: ['17537722', '33500012'] },
  { name: '🇱🇰 Sri Lanka', numbers: ['33530290'] },
  { name: '🇹🇭 Thailand', numbers: ['33622445', '39417067'] },
  { name: '🇦🇪 UAE', numbers: ['17748333'] },
  { name: '🇬🇧 United Kingdom', numbers: ['17574100'] },
  { name: '🇺🇸 United States', numbers: ['17242700'] },
];

const sections: ContactSection[] = [
  {
    title: 'Critical Emergency Numbers',
    icon: <AlertTriangle className="w-6 h-6" />,
    contacts: criticalNumbers,
  },
  {
    title: 'Governorate Police Stations',
    icon: <Shield className="w-6 h-6" />,
    contacts: governoratePolice,
  },
  {
    title: 'Embassy Contact Numbers',
    icon: <Globe className="w-6 h-6" />,
    contacts: embassies,
  },
];

function ContactCard({ contact, index }: { contact: ContactItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  const formatPhoneForTel = (phone: string) => {
    // Remove spaces and add Bahrain country code if not present
    const cleaned = phone.replace(/\s/g, '');
    if (cleaned.startsWith('8000') || cleaned.length <= 4) {
      return cleaned; // Short codes
    }
    return `+973${cleaned}`;
  };

  return (
    <div
      className={`
        bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50
        hover:border-red-500/50 hover:bg-slate-800/80 hover:scale-[1.02]
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <h3 className="text-white font-medium mb-3 text-sm sm:text-base">{contact.name}</h3>
      <div className="flex flex-wrap gap-2">
        {contact.numbers.map((number, i) => (
          <a
            key={i}
            href={`tel:${formatPhoneForTel(number)}`}
            className="
              inline-flex items-center gap-2 px-4 py-2 
              bg-red-600 hover:bg-red-500 
              text-white font-semibold rounded-lg
              transition-all duration-200 hover:scale-105
              shadow-lg shadow-red-900/30
            "
          >
            <Phone className="w-4 h-4" />
            <span>{number}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Section({ section, sectionIndex }: { section: ContactSection; sectionIndex: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), sectionIndex * 200);
    return () => clearTimeout(timer);
  }, [sectionIndex]);

  return (
    <div
      className={`
        mb-12 transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-600/20 rounded-lg text-red-500 border-l-4 border-red-600">
          {section.icon}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{section.title}</h2>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.contacts.map((contact, index) => (
          <ContactCard key={contact.name} contact={contact} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function EmergencyPageClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 px-4 py-2
            bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700
            text-white rounded-full border border-slate-700
            transition-all duration-200 hover:scale-105
          "
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent" />
        
        <div className="relative pt-20 pb-12 px-4 text-center">
          <div
            className={`
              transition-all duration-700
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Bahrain Emergency Contacts
              </h1>
              <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Essential emergency numbers for residents and visitors in Bahrain
            </p>
          </div>
        </div>
      </div>

      {/* Important Notice Banner */}
      <div className="px-4 mb-12">
        <div
          className={`
            max-w-4xl mx-auto p-6 rounded-2xl
            bg-gradient-to-r from-green-900/40 via-green-800/40 to-green-900/40
            border border-green-500/30
            transition-all duration-700 delay-300
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-600/20 rounded-xl">
              <Car className="w-8 h-8 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-400 mb-2">
                🚗 King Fahd Causeway is OPEN
              </h3>
              <p className="text-slate-300 mb-4">
                Those wishing to travel to Saudi Arabia may do so via the causeway.
              </p>
              <a
                href="tel:+97317796555"
                className="
                  inline-flex items-center gap-2 px-5 py-2.5
                  bg-green-600 hover:bg-green-500
                  text-white font-semibold rounded-lg
                  transition-all duration-200 hover:scale-105
                  shadow-lg shadow-green-900/30
                "
              >
                <Phone className="w-4 h-4" />
                <span>King Fahd Causeway Security: 17796555</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20 max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <Section key={section.title} section={section} sectionIndex={index} />
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center pb-12 px-4">
        <p className="text-slate-500 text-sm">
          In case of emergency, always dial <strong className="text-red-400">999</strong> first.
          <br />
          Numbers are for Bahrain. Add +973 country code when calling from abroad.
        </p>
      </div>
    </div>
  );
}
