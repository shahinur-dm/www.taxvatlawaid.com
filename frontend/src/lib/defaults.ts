import {
  PublicSettings,
  ServiceCategory,
  ServiceItem,
  WebsiteContentData,
} from '@/types';

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
  associatedPractice: 'TaxAid',
  heroBadge: 'Bangladesh • 2026 Edition Legal & Compliance Practice',
  heroHeading:
    'Strategic Legal Counsel. Trusted Business Protection.',
  heroDescription:
    'Integrated legal, taxation, regulatory and corporate compliance solutions in Bangladesh. Clear advice, careful preparation and dependable representation for individuals and businesses.',
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
    'To be Bangladesh’s most dependable integrated legal and taxation chamber, known for uncompromising integrity, strategic counsel, and disciplined client service.',
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
      description: 'Understand your commercial objectives, immediate legal, tax, or compliance issues.',
      accent: 'red',
    },
    {
      step: 'STEP 02',
      title: 'Document Review',
      description: 'Examine legal, financial, tax, and regulatory records thoroughly against statutory requirements.',
      accent: 'green',
    },
    {
      step: 'STEP 03',
      title: 'Legal Assessment',
      description: 'Identify applicable laws, deadlines, statutory risks, and realistic available remedies.',
      accent: 'navy',
    },
    {
      step: 'STEP 04',
      title: 'Engagement & Action Plan',
      description: 'Agree on clear scope, professional fees, responsibilities, and key deliverables.',
      accent: 'red',
    },
    {
      step: 'STEP 05',
      title: 'Preparation & Filing',
      description: 'Prepare filings, petitions, or returns, obtain client approval, and submit to authorities.',
      accent: 'green',
    },
    {
      step: 'STEP 06',
      title: 'Follow-up & Closure',
      description: 'Preserve official proof, report outcomes, and diarise future statutory compliance dates.',
      accent: 'navy',
    },
  ],
  whyChooseUs: [
    {
      title: 'Direct Access to Senior Counsel',
      description:
        'Every matter is directly supervised by Advocate Hossain Ahmed (Khan) with personalised attention.',
    },
    {
      title: 'Integrated Revenue & Corporate Practice',
      description:
        'Seamless coordination between Income Tax, VAT, Customs, RJSC compliance, and Court litigation.',
    },
    {
      title: 'Rigorous Statutory Preparation',
      description:
        'Meticulous document compilation minimising assessment add-backs and procedural delays.',
    },
    {
      title: 'Strategic Dispute Resolution',
      description:
        'Balanced, principled representation before Commissionerate appeals, Tribunals, and High Court.',
    },
  ],
  industries: [
    'Manufacturing & Industrial',
    'Ready-Made Garments & Textiles',
    'Import & Export Trading',
    'Information Technology & Software',
    'Healthcare & Pharmaceuticals',
    'Real Estate & Infrastructure',
    'Agro-Processing & Cold Chains',
    'Retail, E-Commerce & Services',
  ],
  faqs: [
    {
      question: 'What services does TaxVat LawAid provide?',
      answer:
        'We provide integrated legal, taxation, and regulatory services across 20 specialized divisions including eTIN/eBIN Registration, TAX/VAT Return & Services, TDA/VDS Return & Services, Company Taxation, RJSC Company Registration, Partnership & OPC Registration, Society/Foundation/Club/Trade Association Registration, RJSC Compliance, IRC/ERC/BIDA, IP/Trademark, Revenue Appeals & Tribunals, High Court Writ Petitions, Corporate Legal & Business Compliance, and Licences.',
    },
    {
      question: 'Do you serve clients outside Dhaka?',
      answer:
        'Yes. While our chamber is in Ramna, Dhaka, we serve clients across Bangladesh and non-resident Bangladeshi (NRB) business owners through scheduled Video Calls and Phone Consultations.',
    },
    {
      question: 'Can you handle tax, VAT or customs notices and tribunal appeals?',
      answer:
        'Yes. We regularly draft written representations for DCT, VAT Commissioner, and Customs show-cause notices, and represent clients before Taxes Appellate Tribunal and Customs, Excise & VAT Appellate Tribunal.',
    },
    {
      question: 'Can you register a new company and manage annual compliance?',
      answer:
        'Yes. We provide complete company formation (Private Ltd, Public Ltd, OPC, Partnership, Society, Foundation, Club Ltd, Trade Association) and post-incorporation compliance including annual Schedule X, Form XII, and share transfers.',
    },
    {
      question: 'How do I begin an engagement?',
      answer:
        'Book an appointment online using our instant booking desk (Sunday to Thursday, 3:00 PM – 8:00 PM) or reach our chamber directly via phone or WhatsApp with a brief summary of your matter. Our chamber desk will confirm your slot and advise on documents to bring or share.',
    },
  ],
  contactPhone: '01614446444 / 01343226633',
  contactWhatsapp: '01614446444',
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
    whatsapp: 'https://wa.me/8801614446444',
  },
};

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    _id: 'svc-1',
    title: 'eTIN/eBIN Registration',
    slug: 'etin-ebin-registration',
    categoryTag: 'Tax & VAT Registration',
    divisionBadge: 'NBR e-Services',
    shortDescription:
      'New 12-digit e-TIN issuance, 13-digit BIN registration, circle jurisdictional transfers, and profile amendments.',
    detailedServices: [
      'New 12-digit individual & company e-TIN registration',
      '13-digit Business Identification Number (BIN) registration',
      'Taxes zone and circle jurisdiction transfer applications',
      'Taxpayer profile amendments and corrections on NBR portals',
    ],
    documentChecklist: [
      'National ID (NID) / Passport of applicant or directors',
      'Trade Licence and bank account certificate',
      'Incorporation certificate, MOA/AOA (for companies)',
      'Rental deed / premises proof of business location',
    ],
    legalFramework:
      'Income Tax Act, 2023; VAT and Supplementary Duty Act, 2012; NBR Digital e-Registration Guidelines.',
    iconName: 'FileText',
    accentColor: 'red',
    displayOrder: 1,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-2',
    title: 'TAX/VAT Return & Services',
    slug: 'tax-vat-return-services',
    categoryTag: 'Tax & VAT Filings',
    divisionBadge: 'Income Tax & VAT Acts',
    shortDescription:
      'Comprehensive preparation, computation, and statutory filing of annual income tax returns and monthly Mushak 9.1 VAT returns.',
    detailedServices: [
      'Individual, firm, and corporate income tax return preparation',
      'Monthly Mushak 9.1 VAT return submission on or before the 15th',
      'Tax computation, wealth statement (IT-10B), and investment rebate calculations',
      'Proof of Submission of Return (PSR) certificate procurement',
    ],
    documentChecklist: [
      'Audited or management financial accounts',
      'Bank statements and interest certificates',
      'Salary, business, and rental income summaries',
      'Monthly sales & purchase registers (Mushak 6.1 & 6.2)',
    ],
    legalFramework:
      'Income Tax Act, 2023; VAT & SD Act, 2012; Finance Act 2026; NBR Statutory Filing Schedules.',
    iconName: 'Receipt',
    accentColor: 'green',
    displayOrder: 2,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-3',
    title: 'TDA/VDS Return & Services',
    slug: 'tda-vds-return-services',
    categoryTag: 'Withholding & Source Deductions',
    divisionBadge: 'TDS & VDS Rules',
    shortDescription:
      'Tax Deduction at Source (TDS/TDA) and VAT Deduction at Source (VDS) reconciliation, Mushak 6.6 certificates, and challan compliance.',
    detailedServices: [
      'Withholding tax computation, deduction schedule, and monthly reporting',
      'VDS deduction reconciliation and issuance of Mushak 6.6 certificates',
      'Government treasury challan verification and payment tracking',
      'Audit defense for tax and VAT deduction at source',
    ],
    documentChecklist: [
      'Vendor invoices, billing registers, and payment vouchers',
      'Mushak 6.3 tax invoices and Mushak 6.6 certificates',
      'Bank payment advise and A-Challan / treasury deposits',
    ],
    legalFramework:
      'Income Tax Act, 2023 (TDS provisions); VAT & SD Rules, 2016 (VDS SROs & schedules).',
    iconName: 'Receipt',
    accentColor: 'navy',
    displayOrder: 3,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-4',
    title: 'TAX/VAT Compliance',
    slug: 'tax-vat-compliance',
    categoryTag: 'Regulatory Compliance',
    divisionBadge: 'NBR Statutory Compliance',
    shortDescription:
      'Continuous corporate tax and VAT compliance, Mushak registers (6.1, 6.2, 6.3), withholding audit support, and advisory.',
    detailedServices: [
      'Regular maintenance and audit review of Mushak 6.1, 6.2, and 6.3 books',
      'Input-output coefficient declaration (Mushak 4.3) preparation and filing',
      'Routine correspondence with DCT, Inspecting Range, and VAT Divisional Offices',
      'Statutory compliance health checks to prevent penalty notices',
    ],
    documentChecklist: [
      'Purchase register (Mushak 6.1) and Sales register (Mushak 6.2)',
      'Sub-contract and commercial agreements',
      'Treasury deposit challans and previous assessment orders',
    ],
    legalFramework:
      'Income Tax Act, 2023; VAT and Supplementary Duty Act, 2012; NBR General Orders & Circulars.',
    iconName: 'CheckCircle2',
    accentColor: 'red',
    displayOrder: 4,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-5',
    title: 'Audit-Accounting Services',
    slug: 'audit-accounting-services',
    categoryTag: 'Audit & Accounts',
    divisionBadge: 'Financial Compliance',
    shortDescription:
      'Statutory audit coordination, book of accounts review, accounting reconciliations, and financial statement tax alignment.',
    detailedServices: [
      'Statutory audit preparation and documentation support',
      'Financial accounts review in accordance with BFRS and statutory laws',
      'Trial balance, fixed asset ledger, and depreciation schedule reconciliations',
      'Alignment of financial statements with NBR and RJSC filing standards',
    ],
    documentChecklist: [
      'General ledger, cash book, and bank reconciliation statements',
      'Fixed asset register and inventory valuation reports',
      'Previous year signed audited financial statements',
    ],
    legalFramework:
      'Companies Act, 1994; Income Tax Act, 2023; Financial Reporting Act (FRA), 2015.',
    iconName: 'FileText',
    accentColor: 'navy',
    displayOrder: 5,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-6',
    title: 'Company Taxation',
    slug: 'company-taxation',
    categoryTag: 'Corporate Taxation',
    divisionBadge: 'Income Tax Act, 2023',
    shortDescription:
      'Corporate tax assessment, advance tax (AIT), corporate tax rate optimization, minimum tax review, and DCT hearing support.',
    detailedServices: [
      'Corporate tax planning, minimum tax (u/s 163), and AIT reconciliation',
      'Preparation of written replies to Deputy Commissioner of Taxes (DCT) notices',
      'Representation at assessment hearings under Section 173/182/212',
      'Tax exemption and reduced rate entitlement documentation',
    ],
    documentChecklist: [
      'Audited balance sheet, profit and loss account, and notes',
      'Advance Income Tax (AIT) challans and LC import tax certificates',
      'Salary and director remuneration withholding statements',
    ],
    legalFramework:
      'Income Tax Act, 2023; relevant annual Finance Acts; NBR Tax Audit Guidelines.',
    iconName: 'Building2',
    accentColor: 'red',
    displayOrder: 6,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-7',
    title: 'RJSC Company Registration',
    slug: 'rjsc-company-registration',
    categoryTag: 'Corporate Incorporation',
    divisionBadge: 'Companies Act, 1994',
    shortDescription:
      'Name clearance, MOA & AOA drafting, incorporation of Private and Public Limited Companies with RJSC.',
    detailedServices: [
      'RJSC name clearance procurement and objective clause structuring',
      'Custom drafting of Memorandum & Articles of Association (MOA & AOA)',
      'Digital certificate issuance, filing, and payment of government stamp fees',
      'Procurement of Certificate of Incorporation and certified true copies',
    ],
    documentChecklist: [
      'Proposed company name options',
      'NID, TIN, photograph, and mobile number of directors/subscribers',
      'Registered office address in Bangladesh',
      'Authorized and paid-up capital allocation schedule',
    ],
    legalFramework:
      'Companies Act, 1994; RJSC Online Portal Guidelines; Stamp Act, 1899.',
    iconName: 'Building2',
    accentColor: 'navy',
    displayOrder: 7,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-8',
    title: 'Partnership, OPCRegistration',
    slug: 'partnership-opcregistration',
    categoryTag: 'Entity Formations',
    divisionBadge: 'Partnership & OPC Law',
    shortDescription:
      'Partnership deed drafting, firm registration under Partnership Act 1932, and One Person Company (OPC) incorporation.',
    detailedServices: [
      'Comprehensive Partnership Deed drafting on judicial stamp paper',
      'Registration of Partnership Firm with RJSC under Partnership Act 1932',
      'One Person Company (OPC) incorporation under amended Companies Act',
      'Nominee director appointment and statutory capital compliance for OPC',
    ],
    documentChecklist: [
      'Partners / single shareholder NID, TIN, and passport photos',
      'Registered commercial address and ownership/lease proof',
      'Nominee director consent letter and NID (for OPC)',
    ],
    legalFramework:
      'Partnership Act, 1932; Companies (Second Amendment) Act, 2020 (OPC Provisions).',
    iconName: 'Building2',
    accentColor: 'green',
    displayOrder: 8,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-9',
    title: 'Society-Foundation Registration',
    slug: 'society-foundation-registration',
    categoryTag: 'Non-Profit & Trust',
    divisionBadge: 'Societies Act, 1860',
    shortDescription:
      'Registration of charitable trusts, non-profit foundations, and societies under Societies Registration Act 1860 and Trust Act.',
    detailedServices: [
      'Drafting Memorandum of Association and Rules & Regulations for societies',
      'Charitable trust deed drafting, execution, and sub-registry registration',
      'RJSC approval for welfare foundations and non-profit development bodies',
      'NBR tax exemption guidance for registered charitable entities',
    ],
    documentChecklist: [
      'Governing body list, NID, TIN, and profiles of executive members',
      'Resolution of foundation meeting and adopted constitution',
      'Office lease agreement and utility bill of head office',
    ],
    legalFramework:
      'Societies Registration Act, 1860; Trust Act, 1882; Registration Act, 1908.',
    iconName: 'Award',
    accentColor: 'navy',
    displayOrder: 9,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-10',
    title: 'Club Ltd. Registration',
    slug: 'club-ltd-registration',
    categoryTag: 'Non-Profit & Clubs',
    divisionBadge: 'Companies Act Section 28',
    shortDescription:
      'Incorporation of recreation clubs, community organizations, and Section 28 guarantee companies without share capital.',
    detailedServices: [
      'Incorporation of guarantee companies without the addition of "Limited" (Section 28)',
      'Recreation, sports, and social club incorporation under RJSC',
      'Drafting bylaws, membership criteria, and club committee structures',
      'Government approval coordination and statutory charter execution',
    ],
    documentChecklist: [
      'Founder member roster, photographs, and bio-data',
      'Draft constitution, bylaws, and committee resolutions',
      'Proposed club premises address proof',
    ],
    legalFramework:
      'Companies Act, 1994 (Section 28 Non-Profit Licences); RJSC Regulations.',
    iconName: 'Award',
    accentColor: 'red',
    displayOrder: 10,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-11',
    title: 'Trade Association Registration',
    slug: 'trade-association-registration',
    categoryTag: 'Trade Bodies',
    divisionBadge: 'Trade Organizations Act',
    shortDescription:
      'Formation and licence procurement for sector-wise trade associations, chambers of commerce, and bilateral business councils.',
    detailedServices: [
      'Licence procurement from Ministry of Commerce (WTO Wing) under Trade Organizations Act',
      'Drafting Articles of Association for trade bodies and bilateral chambers',
      'RJSC company registration as a trade organization',
      'Federation (FBCCI) affiliation and sector-level documentation',
    ],
    documentChecklist: [
      'Founding corporate members list with TIN and Trade Licences',
      'General meeting minutes adopting the association charter',
      'Ministry of Commerce application dossier and fee receipts',
    ],
    legalFramework:
      'Trade Organizations Act, 2022; Trade Organizations Rules; Companies Act, 1994.',
    iconName: 'Building2',
    accentColor: 'navy',
    displayOrder: 11,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-12',
    title: 'RJSC Legal Compliance',
    slug: 'rjsc-legal-compliance',
    categoryTag: 'Secretarial & Statutory',
    divisionBadge: 'RJSC Annual Filings',
    shortDescription:
      'Annual Schedule X returns, Form XII director updates, Form 117 share transfers, capital increases, and statutory register upkeep.',
    detailedServices: [
      'Annual Return filing (Schedule X) and audited balance sheet submission',
      'Director induction, resignation, and changes filing (Form XII)',
      'Share transfer execution (Form 117), board approval, and stamp payment',
      'Authorized & paid-up share capital increase and registered address changes (Form VI)',
    ],
    documentChecklist: [
      'Annual General Meeting (AGM) minutes and notices',
      'Audited accounts signed by certified chartered accountants',
      'Share transfer deed on judicial stamp and board resolution',
    ],
    legalFramework:
      'Companies Act, 1994; RJSC Compliance Manual; Stamp Act, 1899.',
    iconName: 'FileText',
    accentColor: 'green',
    displayOrder: 12,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-13',
    title: 'IRC, ERC, BIDA Registration',
    slug: 'irc-erc-bida-registration',
    categoryTag: 'Trade & Foreign Investment',
    divisionBadge: 'CCI&E & BIDA',
    shortDescription:
      'Import Registration Certificate (IRC), Export Registration Certificate (ERC), and BIDA industrial/commercial project permissions.',
    detailedServices: [
      'New Import Registration Certificate (IRC) & Export Registration Certificate (ERC) procurement',
      'Annual IRC/ERC passbook renewal and financial tier updates with CCI&E',
      'BIDA industrial and commercial project registration',
      'BIDA branch and liaison office permissions, E-visa and work permits',
    ],
    documentChecklist: [
      'Updated Trade Licence, e-TIN, and 13-digit BIN certificate',
      'Chamber of Commerce or Trade Association membership certificate',
      'Bank solvency certificate and premises rent deed',
    ],
    legalFramework:
      'Imports and Exports (Control) Act, 1950; Import Policy Order; Bangladesh Investment Development Authority Act, 2016.',
    iconName: 'Ship',
    accentColor: 'navy',
    displayOrder: 13,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-14',
    title: 'IP>Trademark, Patent, Design',
    slug: 'ip-trademark-patent-design',
    categoryTag: 'Intellectual Property',
    divisionBadge: 'DPDT Framework',
    shortDescription:
      'Nice Classification trademark searches, TM-1 filings, patent applications, industrial design registrations, and DPDT hearings.',
    detailedServices: [
      'Comprehensive trademark availability search across Nice classes',
      'Application filing (TM-1), journal publication tracking, and registration certificate',
      'Trademark opposition drafting and appearance before Registrar of DPDT',
      'Patent and industrial design registrations, copyright licensing, and renewals',
    ],
    documentChecklist: [
      'Brand logo/artwork in high resolution with color claims',
      'Applicant NID, TIN, Trade Licence, or Company incorporation certificate',
      'Signed Form TM-48 (Power of Attorney)',
    ],
    legalFramework:
      'Trademarks Act, 2009; Patent Act, 2023; Industrial Design Act, 2023; Copyright Act, 2023.',
    iconName: 'Award',
    accentColor: 'red',
    displayOrder: 14,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-15',
    title: 'TAX/VAT Appeal, Tribunal',
    slug: 'tax-vat-appeal-tribunal',
    categoryTag: 'Revenue Appeals',
    divisionBadge: 'Taxes & VAT Appellate Tribunals',
    shortDescription:
      'Appeals before Commissioner of Taxes (Appeals), VAT Appellate Commissioner, and Customs, Excise & VAT Appellate Tribunal.',
    detailedServices: [
      'Drafting Memorandum of Appeal and Statement of Facts for tax assessments',
      'First-tier appeals before Commissioner of Taxes (Appeals) and VAT Commissioner (Appeals)',
      'Filing and appearance before Taxes Appellate Tribunal and CEVAT Tribunal',
      'Preparation of paper books, legal authorities, and stay applications',
    ],
    documentChecklist: [
      'Impugned assessment order, demand notice, and challans',
      'Proof of statutory pre-deposit and grounds of dispute',
      'Power of Attorney and certified copies of proceedings',
    ],
    legalFramework:
      'Income Tax Act, 2023 (Chapter 24 Appeals); VAT & SD Act, 2012 (Chapter 19 Appeals); Customs Act, 2023.',
    iconName: 'Scale',
    accentColor: 'red',
    displayOrder: 15,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-16',
    title: 'High Court & Writ Petition',
    slug: 'high-court-writ-petition',
    categoryTag: 'Constitutional & High Court',
    divisionBadge: 'Article 102 & Company Bench',
    shortDescription:
      'Constitutional writ petitions under Article 102, company matter applications, stay petitions against arbitrary tax demands.',
    detailedServices: [
      'Drafting and filing Constitutional Writ Petitions under Article 102',
      'Stay petitions against arbitrary bank account freezes and unlawful revenue demands',
      'Income Tax & VAT statutory references before the High Court Division',
      'Company Bench applications: merger, winding up, oppression & mismanagement',
    ],
    documentChecklist: [
      'Certified copies of impugned orders and lower tribunal records',
      'Vakalatnama, affidavit, and supporting constitutional grounds',
      'Proof of violation of fundamental rights or statutory jurisdiction',
    ],
    legalFramework:
      'Constitution of Bangladesh (Article 102); Companies Act, 1994; High Court Rules; CPC, 1908.',
    iconName: 'Gavel',
    accentColor: 'navy',
    displayOrder: 16,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-17',
    title: 'Corporate Legal Consultant',
    slug: 'corporate-legal-consultant',
    categoryTag: 'Legal Advisory',
    divisionBadge: 'Legal Consultancy',
    shortDescription:
      'Strategic commercial contracts, employment policies, joint venture structuring, legal notices, and retainer counsel.',
    detailedServices: [
      'Drafting commercial agreements: vendor, distribution, franchise, and NDA',
      'Labor law compliance, employment contracts, and workplace policy handbooks',
      'Legal notice issuance, reply drafting, and dispute negotiation',
      'Ongoing corporate legal retainer advisory for growing companies',
    ],
    documentChecklist: [
      'Draft agreements, proposed commercial terms, and correspondence',
      'Corporate profile and existing internal policies',
    ],
    legalFramework:
      'Contract Act, 1872; Bangladesh Labour Act, 2006; Specific Relief Act, 1877.',
    iconName: 'Scale',
    accentColor: 'navy',
    displayOrder: 17,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-18',
    title: 'Corporate Business Compliance',
    slug: 'corporate-business-compliance',
    categoryTag: 'Regulatory & Governance',
    divisionBadge: 'Corporate Governance',
    shortDescription:
      'End-to-end statutory health checks, municipal and environmental approvals, fire clearances, and regulatory board compliance.',
    detailedServices: [
      'Comprehensive statutory compliance audit and compliance calendar setup',
      'Regulatory filings across municipal, revenue, and commercial departments',
      'Board governance advisory, meeting minutes, and corporate secretarial oversight',
      'Due diligence reports for acquisitions, equity investments, and bank loans',
    ],
    documentChecklist: [
      'Corporate statutory files (incorporation, MOA/AOA, Schedule X, licences)',
      'Statutory registers and latest board resolutions',
    ],
    legalFramework:
      'Companies Act, 1994; Corporate Governance Code; relevant municipal and regulatory statutes.',
    iconName: 'CheckCircle2',
    accentColor: 'green',
    displayOrder: 18,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-19',
    title: 'Licences',
    slug: 'licences',
    categoryTag: 'Licensing & Permits',
    divisionBadge: 'Statutory Licences',
    shortDescription:
      'City Corporation Trade Licences, factory licences, fire safety certificates, environmental clearances, and renewal management.',
    detailedServices: [
      'City Corporation & Union Parishad Trade Licence issuance and annual renewal',
      'Fire Safety Certificate from Department of Fire Service & Civil Defence',
      'Department of Environment (DoE) clearance and renewals',
      'Factory Licence (DIFE) and explosive/specialized department permits',
    ],
    documentChecklist: [
      'Premises rent agreement, utility bills, and layout plan',
      'Fire safety equipment details and premises NOC',
      'TIN, NID of owners/directors, and existing licences',
    ],
    legalFramework:
      'City Corporation Act; Fire Prevention and Extinction Act, 2003; Bangladesh Environment Conservation Act, 1995.',
    iconName: 'FileText',
    accentColor: 'navy',
    displayOrder: 19,
    isFeatured: true,
    isActive: true,
  },
  {
    _id: 'svc-20',
    title: 'Others',
    slug: 'others',
    categoryTag: 'General Legal Counsel',
    divisionBadge: 'Chamber Practice',
    shortDescription:
      'Bespoke legal consultations, documentation review, affidavit preparation, notary facilitation, and general chamber legal matters.',
    detailedServices: [
      'Tailored chamber legal consultation on complex multi-jurisdictional matters',
      'Affidavit drafting, legal declarations, and power of attorney execution',
      'Document vetting, title verification, and notary public coordination',
      'Specialized commercial advisory not covered in standard categories',
    ],
    documentChecklist: [
      'Relevant letters, orders, deeds, or disputed documents',
      'Government identification and summary statement of the issue',
    ],
    legalFramework:
      'Relevant Laws of Bangladesh; Notaries Ordinance, 1961; Civil & Criminal Procedure Codes.',
    iconName: 'Scale',
    accentColor: 'navy',
    displayOrder: 20,
    isFeatured: true,
    isActive: true,
  },
];
