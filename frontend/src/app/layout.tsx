import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaxVat LawAid | Tax, VAT, Customs & Corporate Legal Solutions in Bangladesh',
  description:
    'TaxVat LawAid provides integrated legal, income tax, VAT, customs, RJSC company registration, intellectual property, and litigation support in Bangladesh.',
  keywords: [
    'TaxVat LawAid',
    'Law Firm in Bangladesh',
    'Income Tax Lawyer Bangladesh',
    'VAT Consultant Bangladesh',
    'Customs Lawyer Bangladesh',
    'RJSC Company Registration',
    'High Court Writ Petition Lawyer',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
