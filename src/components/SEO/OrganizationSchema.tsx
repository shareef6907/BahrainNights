export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BahrainNights',
    url: 'https://bahrainnights.com',
    logo: 'https://bahrainnights.com/logo.png',
    description: "Bahrain's premier guide to events, dining, nightlife, and entertainment. Discover the best things to do in Bahrain and the region.",
    sameAs: [
      'https://instagram.com/BahrainNights',
      'https://twitter.com/BahrainNights',
      'https://facebook.com/BahrainNights',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+973-3900-7750',
      contactType: 'customer service',
      email: 'ceo@bahrainnights.com',
      areaServed: ['BH', 'AE', 'SA', 'QA', 'EG', 'TR', 'GB'],
      availableLanguage: ['English', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Bahrain',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
