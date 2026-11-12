import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www-taxvatlawaid-com.vercel.app'),
  title: {
    default: 'TaxVat LawAid | Strategic Legal Counsel, Tax, VAT, Customs & Corporate Law',
    template: '%s | TaxVat LawAid',
  },
  description:
    'Integrated legal, income tax, VAT, customs, RJSC company compliance, intellectual property, and litigation counsel in Bangladesh. Chamber in Ramna, Dhaka.',
  keywords: [
    'TaxVat LawAid',
    'Tax Aid Law Firm',
    'Hossain Ahmed Khan Advocate',
    'Law Firm in Bangladesh',
    'Income Tax Lawyer Dhaka',
    'VAT & Supplementary Duty Consultant Bangladesh',
    'Customs Lawyer Bangladesh',
    'RJSC Company Registration Bangladesh',
    'High Court Writ Petition Advocate',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www-taxvatlawaid-com.vercel.app',
    siteName: 'TaxVat LawAid',
    title: 'TaxVat LawAid | Strategic Legal Counsel & Trusted Business Protection',
    description:
      'Integrated legal, taxation, VAT, customs, RJSC corporate compliance, and High Court writ representation in Bangladesh.',
    images: [
      {
        url: '/images/hero-chamber.jpg',
        width: 1600,
        height: 900,
        alt: 'TaxVat LawAid Executive Legal Chamber',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxVat LawAid | Strategic Legal Counsel & Trusted Business Protection',
    description:
      'Integrated legal, taxation, VAT, customs, RJSC corporate compliance, and litigation counsel in Bangladesh.',
    images: ['/images/hero-chamber.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'TaxVat LawAid',
    alternateName: 'Tax Aid Law Firm',
    url: 'https://www-taxvatlawaid-com.vercel.app',
    logo: 'https://www-taxvatlawaid-com.vercel.app/images/taxvat-logo.svg',
    description:
      'Integrated legal, income tax, VAT, customs, RJSC company law, intellectual property, and litigation services in Bangladesh.',
    telephone: '+8801614446444',
    email: 'taxvatlawaid@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '14/7, Eastern Mansion, Lift-14, 67/9, Pioneer Road, Ramna',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '15:00',
        closes: '20:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Hossain Ahmed (Khan)',
      jobTitle: 'Advocate & Tax Consultant',
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-white text-charcoal-800 selection:bg-champagne-200 selection:text-midnight-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
