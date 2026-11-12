import { PublicSettings, ServiceItem, WebsiteContentData } from '@/types';

export const FALLBACK_SETTINGS: PublicSettings = {
  announcementEnabled: true,
  announcementText:
    'ON PROGRESS – Our website is currently being updated. Thank you for your patience.',
  bookingSlotDurationMinutes: 30,
  bookingStartTime: '15:00',
  bookingEndTime: '20:00',
  availableDays: [0, 1, 2, 3, 4],
  timezone: 'Asia/Dhaka',
  maxAdvanceBookingDays: 60,
  officeHoursText: 'Sunday – Thursday: 3:00 PM – 8:00 PM (Closed Friday & Saturday)',
  siteTitle: 'TaxVat LawAid | Tax, VAT, Customs & Corporate Legal Solutions in Bangladesh',
  seoDescription:
    'TaxVat LawAid provides integrated legal, income tax, VAT, customs, RJSC company registration, intellectual property, and litigation support in Bangladesh.',
  whatsappDispatchEnabled: true,
};

export const FALLBACK_CONTENT: WebsiteContentData = {
  brandName: 'TaxVat LawAid',
  brandTagline: 'Your Trusted Partner in Tax, VAT, Customs & Corporate Legal Solutions',
  associatedPractice: 'Tax Aid Law Firm',
  heroBadge: 'Bangladesh • 2026 Edition Legal & Compliance Practice',
  heroHeading:
    'Integrated Legal, Taxation, Regulatory & Business Compliance Services in Bangladesh',
  heroDescription:
    'Clear advice, careful preparation, professional representation, and dependable legal support across Income Tax, VAT, Customs, RJSC Company Law, Intellectual Property, and Litigation.',
  heroPrimaryCta: 'Book an Appointment',
  heroSecondaryCta: 'Explore Practice Areas',
  leadCounselName: 'Hossain Ahmed (Khan)',
  leadCounselCredentials: "B.A, (Hon's) M.A, LL.B, LL.M.",
  leadCounselTitle: 'Advocate & Tax Consultant',
  leadCounselPracticeLine:
    'TAX-VAT, RJSC-Company Legal Compliance • Appeal, Tribunal, High Court & Writ Petition',
  aboutBadge: 'ABOUT TAXVAT LAWAID',
  aboutHeading: 'A Complete Legal Partner for Every Stage of Business',
  aboutDescription:
    'We recognise that legal and regulatory matters are interconnected. A company may need incorporation, trade licensing, tax & VAT registration, import/export approvals, annual statutory filings, and dispute resolution. Our integrated model helps clients manage these obligations in an organised manner.',
  aboutVision:
    'To be a trusted and respected legal and corporate compliance partner in Bangladesh, known for professional integrity, practical legal solutions and client-focused service.',
  aboutMission: [
    'Make complex legal and regulatory requirements easier to understand and manage.',
    'Provide reliable, evidence-based and practical professional assistance.',
    'Support lawful business growth through proper registration and compliance.',
    "Protect clients' legitimate rights and interests through appropriate legal remedies.",
    'Build lasting relationships through transparency, confidentiality and accountability.',
  ],
  coreValues: [
    'Integrity',
    'Professional Competence',
    'Confidentiality',
    'Transparency',
    'Accountability',
    'Rule of Law',
  ],
  sixStepProcess: [
    {
      step: 'STEP 01',
      title: 'Initial Consultation',
      description: 'Understand your objectives and immediate legal or compliance issue.',
      accent: 'red',
    },
    {
      step: 'STEP 02',
      title: 'Document Review',
      description: 'Examine legal, financial, tax, and regulatory records carefully.',
      accent: 'green',
    },
    {
      step: 'STEP 03',
      title: 'Legal Assessment',
      description: 'Identify applicable laws, deadlines, risks, and available remedies.',
      accent: 'navy',
    },
    {
      step: 'STEP 04',
      title: 'Engagement & Action Plan',
      description: 'Agree clear scope, fees, responsibilities, and deliverables.',
      accent: 'red',
    },
    {
      step: 'STEP 05',
      title: 'Preparation & Filing',
      description: 'Prepare filings/pleadings, obtain approval, and submit properly.',
      accent: 'green',
    },
    {
      step: 'STEP 06',
      title: 'Follow-up & Closure',
      description: 'Preserve official proof, report outcomes, and diarise future dates.',
      accent: 'navy',
    },
  ],
  whyChooseUs: [
    {
      title: 'Integrated Multi-Disciplinary Support',
      description:
        'Coordinated legal, income tax, VAT, customs, RJSC company law, licensing, and litigation assistance under one practice.',
    },
    {
      title: 'Fact- & Evidence-Based Advisory',
      description:
        'Clear, realistic guidance grounded in current Bangladesh statutes, SROs, rules, and verified client documentation.',
    },
    {
      title: 'Structured Deadline & Limitation Control',
      description:
        'Disciplined tracking of statutory return filings, notice response windows, appeal limitations, and annual compliance calendars.',
    },
    {
      title: 'Transparent Scope & Confidentiality',
      description:
        'Plain-language explanation of legal routes, required documents, risks, and deliverables with strict client confidentiality.',
    },
  ],
  industries: [
    'Manufacturing & Industrial Enterprises',
    'Importers, Exporters & Trading Houses',
    'Real Estate, Construction & Housing Companies',
    'Technology, Software & Digital Businesses',
    'E-Commerce & Retail Businesses',
    'Healthcare, Pharmaceutical & Medical Businesses',
    'Education & Training Institutions',
    'NGOs, Societies, Foundations, Clubs & Trade Associations',
    'Startups, Entrepreneurs & Foreign Investors',
    'Individual Taxpayers & Professionals',
  ],
  faqs: [
    {
      question: 'What services does TaxVat LawAid provide?',
      answer:
        'We provide integrated services in income tax, VAT, customs, RJSC company law, business entity registration (partnership, society, foundation, trust, club, trade association), IRC/ERC, BIDA, intellectual property, corporate compliance, civil and criminal litigation, statutory appeals, tribunal proceedings, and High Court writ matters.',
    },
    {
      question: 'Do you serve clients outside Dhaka?',
      answer:
        'Yes. We assist clients across Bangladesh and abroad via online video or phone consultations as well as in-person chamber appointments in Ramna, Dhaka, subject to the nature of the matter, applicable forum, and procedural requirements.',
    },
    {
      question: 'Can you handle tax, VAT or customs notices and tribunal appeals?',
      answer:
        'Yes. We review the impugned notice or assessment order, service proof, applicable statutory provisions, evidence, and limitation deadline, then prepare appropriate responses, statutory appeals, tribunal submissions, or High Court remedies where maintainable.',
    },
    {
      question: 'Can you register a new company and manage annual compliance?',
      answer:
        'We assist with legal structuring, name clearance, MOA/AOA drafting, and RJSC incorporation procedures for Private/Public Limited Companies and OPCs, as well as ongoing annual returns, AGM/EGM documentation, tax, VAT, and trade licence compliance.',
    },
    {
      question: 'How do I begin an engagement?',
      answer:
        'Book an appointment online using our instant booking desk (Sunday to Thursday, 3:00 PM – 8:00 PM) or reach our chamber directly via phone or WhatsApp with a brief summary of your matter. Our chamber desk will confirm your slot and advise on documents to bring or share.',
    },
  ],
  contactPhone: '01614446444',
  contactWhatsapp: '01715149666',
  contactEmail: 'taxvatlawaid@gmail.com',
  officeAddress: '14/7, Eastern Mansion, Lift-14, 67/9, Pioneer Road, Ramna, Dhaka',
  websiteUrl: 'www.taxvatlawaid.com',
  footerDescription:
    'Advocate & Tax Consultant — TAX-VAT, RJSC-Company Legal Compliance, Appeal, Tribunal, High Court & Writ Petition.',
  footerDisclaimer:
    'Disclaimer: General statutory information only; verify current Finance Act, SROs & rules prior to filing.',
  copyrightText: '© 2026 TaxVat LawAid. All rights reserved. Dhaka, Bangladesh.',
  socialLinks: {
    facebook: '',
    linkedin: '',
    youtube: '',
    whatsapp: 'https://wa.me/8801715149666',
  },
};

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    _id: 'fallback-1',
    title: 'Income Tax & Corporate Tax',
    slug: 'income-tax-corporate-tax',
    categoryTag: 'Tax & Revenue',
    divisionBadge: 'Income Tax Act, 2023',
    shortDescription:
      'Individual and corporate tax returns, TDS reconciliation, tax audits, assessment hearings, and appellate remedies.',
    detailedServices: [
      'Individual income tax profile review and return preparation',
      'Corporate income tax return preparation and filing support',
      'Tax computation and reconciliation with audited financial statements',
      'Tax Deduction at Source (TDS) review, withholding reconciliation & certificate support',
      'Tax audit, assessment, investigation, and notice response assistance',
    ],
    documentChecklist: [
      'TIN and taxpayer profile information',
      'Previous tax returns and assessment orders',
      'Bank statements and interest certificates',
      'TDS certificates and tax payment challans',
    ],
    legalFramework:
      'Income Tax Act, 2023; Finance Act 2026; Income Tax Rules, 2023; current circulars & SROs.',
    iconName: 'FileText',
    accentColor: 'red',
    displayOrder: 1,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'fallback-2',
    title: 'VAT & Supplementary Duty',
    slug: 'vat-supplementary-duty',
    categoryTag: 'VAT & Mushak',
    divisionBadge: 'VAT & SD Act, 2012',
    shortDescription:
      '13-digit BIN registration, monthly VAT returns, Mushak documentation, Input Tax Credit, VDS, and VAT audits.',
    detailedServices: [
      'VAT registration, 13-digit BIN profile review & amendment',
      'Monthly VAT return preparation and filing assistance',
      'Mushak invoice, credit note, debit note, and VDS reconciliation',
      'VAT audit, inspection, investigation, and tribunal appeals',
    ],
    documentChecklist: [
      'BIN certificate and registration history',
      'Sales and purchase registers & Mushak invoices',
      'VDS certificates and treasury deposit challans',
    ],
    legalFramework:
      'Value Added Tax and Supplementary Duty Act, 2012; VAT Rules, 2016; Finance Act 2026.',
    iconName: 'Receipt',
    accentColor: 'green',
    displayOrder: 2,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'fallback-3',
    title: 'Customs & International Trade',
    slug: 'customs-international-trade',
    categoryTag: 'Import & Export',
    divisionBadge: 'Customs Act, 2023',
    shortDescription:
      'Import/export compliance, HS code classification, customs valuation, IRC/ERC registration, and show-cause notices.',
    detailedServices: [
      'HS code & tariff classification and customs valuation review',
      'Import duty, VAT, SD, and advance tax assessment support',
      'Customs audit, show-cause notice replies, and tribunal appeals',
    ],
    documentChecklist: [
      'IRC / ERC and importer-exporter profile',
      'Proforma invoice, L/C, commercial invoice, packing list & Bill of Entry',
    ],
    legalFramework:
      'Customs Act, 2023; current tariff schedules, Import/Export Policy Orders & customs SROs.',
    iconName: 'Ship',
    accentColor: 'navy',
    displayOrder: 3,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'fallback-4',
    title: 'RJSC Company Law & Business Entities',
    slug: 'rjsc-company-law-business-entities',
    categoryTag: 'Corporate & Entities',
    divisionBadge: 'Companies Act, 1994',
    shortDescription:
      'Private/Public Ltd & OPC incorporation, annual returns, share transfers, Partnership, Society, Foundation & Trust.',
    detailedServices: [
      'Name clearance, Private/Public Limited Company & OPC incorporation',
      'MOA/AOA drafting, share transfers, and annual RJSC statutory filings',
      'Partnership, Society, Foundation, Trust, Club & Trade Association formation',
    ],
    documentChecklist: [
      'Proposed entity name and business objectives',
      'Shareholder/director/partner NID or passport details',
      'Registered office address evidence & MOA/AOA or deed',
    ],
    legalFramework:
      'Companies Act, 1994; Partnership Act, 1932; Societies Registration Act, 1860; Trade Organisations Act, 2022.',
    iconName: 'Building2',
    accentColor: 'green',
    displayOrder: 4,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'fallback-5',
    title: 'Investment, Licensing & Intellectual Property',
    slug: 'investment-licensing-intellectual-property',
    categoryTag: 'BIDA, Permits & IP',
    divisionBadge: 'BIDA & DPDT',
    shortDescription:
      'BIDA investment registration, work permits, Trade Licences, Trademarks, Patents, Industrial Designs & Copyright.',
    detailedServices: [
      'BIDA investment registration, branch/liaison office & work permits',
      'IRC, ERC, and Trade Licence registration & renewals',
      'Trademark, Industrial Design, Patent, Copyright & GI filings at DPDT',
    ],
    documentChecklist: [
      'Entity documents, TIN, BIN & Trade Licence',
      'Brand mark, logo, design representation or invention disclosure',
    ],
    legalFramework:
      'BIDA Act, 2016; Trademarks Act, 2009; Patent Act, 2023; Industrial Design Act, 2023; Copyright Act, 2023.',
    iconName: 'Award',
    accentColor: 'navy',
    displayOrder: 5,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'fallback-6',
    title: 'Litigation, Appeals & Writ Petitions',
    slug: 'litigation-appeals-writ-petitions',
    categoryTag: 'Tribunals & Courts',
    divisionBadge: 'Courts & Tribunals',
    shortDescription:
      'Tax, VAT & Customs Appeals, Appellate Tribunals, High Court Division, Constitutional Writ Petitions, Civil & Criminal.',
    detailedServices: [
      'Tax, VAT & Customs statutory appeals and Appellate Tribunal representation',
      'High Court Division revenue references and Constitutional Writ Petitions',
      'Civil & commercial disputes, injunctions, recovery, and criminal defence',
    ],
    documentChecklist: [
      'Impugned notice, order, FIR, or plaint with proof of service',
      'Chronology, supporting evidence, challans, and power of attorney',
    ],
    legalFramework:
      'Constitution of Bangladesh; CPC 1908; CrPC 1898; Penal Code 1860; Limitation Act 1908; Arbitration Act 2001.',
    iconName: 'Gavel',
    accentColor: 'red',
    displayOrder: 6,
    isFeatured: true,
    isActive: true,
  },
];

