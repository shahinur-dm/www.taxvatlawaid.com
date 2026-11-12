export const DEFAULT_SERVICES = [
  {
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
      'Advance tax and tax payment review',
      'Tax audit, assessment, investigation, and notice response assistance',
      'Tax refund, adjustment, credit matters, and statutory tax appeals',
    ],
    documentChecklist: [
      'TIN and taxpayer profile information',
      'Previous tax returns and assessment orders',
      'Bank statements and interest certificates',
      'Salary, business, professional, and rental income records',
      'Financial statements and books of account, where applicable',
      'Investment, asset, liability, and loan information',
      'TDS certificates and tax payment challans',
      'Notices, correspondence, and supporting evidence',
    ],
    legalFramework:
      'Income Tax Act, 2023; Finance Act 2026; Income Tax Rules, 2023; current tax-year circulars, SROs, general orders, and NBR instructions.',
    iconName: 'FileText',
    accentColor: 'red' as const,
    displayOrder: 1,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'VAT & Supplementary Duty',
    slug: 'vat-supplementary-duty',
    categoryTag: 'VAT & Mushak',
    divisionBadge: 'VAT & SD Act, 2012',
    shortDescription:
      '13-digit BIN registration, monthly VAT returns, Mushak documentation, Input Tax Credit, VDS, and VAT audits.',
    detailedServices: [
      'VAT registration, 13-digit BIN profile review, amendment, and related assistance',
      'Monthly VAT return preparation and filing assistance',
      'Mushak invoice, credit note, debit note, and statutory record review',
      'Input tax credit eligibility and reconciliation',
      'VAT Deduction at Source (VDS) review, deduction, and certificate reconciliation',
      'Supplementary Duty applicability and documentation',
      'VAT audit, inspection, investigation, demand, penalty, and tribunal appeals',
    ],
    documentChecklist: [
      'BIN certificate and registration history',
      'Sales and purchase registers',
      'Mushak invoices, credit notes, and debit notes',
      'Stock, production, wastage, and delivery records',
      'Import documents and Bills of Entry, where relevant',
      'VDS certificates and treasury deposit challans',
      'VAT returns, payment challans, and audit correspondence',
    ],
    legalFramework:
      'Value Added Tax and Supplementary Duty Act, 2012 (as amended); VAT and Supplementary Duty Rules, 2016; Finance Act 2026; relevant SROs, general orders, and NBR instructions.',
    iconName: 'Receipt',
    accentColor: 'green' as const,
    displayOrder: 2,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Customs & International Trade',
    slug: 'customs-international-trade',
    categoryTag: 'Import & Export',
    divisionBadge: 'Customs Act, 2023',
    shortDescription:
      'Import/export compliance, HS code classification, customs valuation, IRC/ERC registration, and show-cause notices.',
    detailedServices: [
      'Customs law advisory and import/export compliance review',
      'HS code and tariff classification assistance based on product facts',
      'Customs valuation review and transaction-document analysis',
      'Import duty, VAT, supplementary duty, and advance tax assessment support',
      'Customs audit, examination, investigation, and show-cause notice replies',
      'Customs demand, penalty, confiscation disputes, and tribunal/High Court appeals',
      'Post-clearance compliance and record-retention review',
    ],
    documentChecklist: [
      'IRC / ERC and importer-exporter profile',
      'Proforma invoice, sales contract, or purchase order',
      'Letter of Credit or permitted payment records',
      'Commercial invoice, packing list, and certificate of origin',
      'HS code and technical product specifications',
      'Insurance, freight, and customs valuation evidence',
      'Bill of Entry, assessment, release documents, and NOCs',
    ],
    legalFramework:
      'Customs Act, 2023 (as amended); current tariff schedules, customs rules, Import Policy Order, Export Policy Order, SROs, and customs general orders.',
    iconName: 'Ship',
    accentColor: 'navy' as const,
    displayOrder: 3,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'RJSC Company Law & Business Entities',
    slug: 'rjsc-company-law-business-entities',
    categoryTag: 'Corporate & Entities',
    divisionBadge: 'Companies Act, 1994',
    shortDescription:
      'Private/Public Ltd & OPC incorporation, annual returns, share transfers, Partnership, Society, Foundation & Trust.',
    detailedServices: [
      'Name clearance, Private/Public Limited Company & OPC incorporation support',
      'Memorandum of Association (MOA) and Articles of Association (AOA) drafting',
      'Change of company name, registered office, business objects, and directors',
      'Share transfer, allotment, capital restructuring, and statutory RJSC filings',
      'AGM, EGM, Board meeting notices, resolutions, minutes, and statutory registers',
      'Partnership deed drafting, RJSC partnership registration, and dissolution',
      'Society, Foundation, Trust, Club, and Trade Association formation & governance',
    ],
    documentChecklist: [
      'Proposed entity name and business objectives',
      'Shareholder, director, partner, or trustee NID/passport & contact details',
      'Capital, shareholding, or profit/loss distribution structure',
      'Registered office address evidence',
      'MOA/AOA, Partnership Deed, or Constitution/Trust Deed',
      'Board/shareholder approvals, authorisations, and existing RJSC filings',
    ],
    legalFramework:
      'Companies Act, 1994 (as amended); Partnership Act, 1932; Societies Registration Act, 1860; Trusts Act, 1882; Trade Organisations Act, 2022; RJSC forms and directions.',
    iconName: 'Building2',
    accentColor: 'green' as const,
    displayOrder: 4,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Investment, Licensing & Intellectual Property',
    slug: 'investment-licensing-intellectual-property',
    categoryTag: 'BIDA, Permits & IP',
    divisionBadge: 'BIDA & DPDT',
    shortDescription:
      'BIDA investment registration, work permits, Trade Licences, Trademarks, Patents, Industrial Designs & Copyright.',
    detailedServices: [
      'BIDA investment project registration, joint ventures, branch/liaison office approvals',
      'Expatriate work permit applications, renewals, and regulatory due diligence',
      'IRC and ERC registration, renewal, and profile amendment assistance',
      'City corporation / municipal Trade Licence applications, renewals & NOCs',
      'Trademark search, class selection, DPDT filing, objection/opposition response & renewals',
      'Industrial Design, Patent, Copyright, and Geographical Indication registration support',
    ],
    documentChecklist: [
      'Entity incorporation/formation documents, TIN, BIN & bank solvency details',
      'Trade licence and premises lease/ownership records',
      'Investment project profile, foreign remittance, or joint venture documents',
      'Brand mark, logo, design drawings, or invention disclosure specifications',
      'Goods/services class details, first-use evidence, and power of attorney',
    ],
    legalFramework:
      'Bangladesh Investment Development Authority Act, 2016; Foreign Exchange Regulation Act, 1947; Trademarks Act, 2009; Patent Act, 2023; Industrial Design Act, 2023; Copyright Act, 2023; GI Act, 2013.',
    iconName: 'Award',
    accentColor: 'navy' as const,
    displayOrder: 5,
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Litigation, Appeals & Writ Petitions',
    slug: 'litigation-appeals-writ-petitions',
    categoryTag: 'Tribunals & Courts',
    divisionBadge: 'Courts & Tribunals',
    shortDescription:
      'Tax, VAT & Customs Appeals, Appellate Tribunals, High Court Division, Constitutional Writ Petitions, Civil & Criminal.',
    detailedServices: [
      'Income Tax, VAT & Customs show-cause replies, statutory appeals & tribunal proceedings',
      'High Court Division revenue references and judicial review / constitutional writ petitions',
      'Civil & commercial contract disputes, money recovery, injunctions, and property litigation',
      'Criminal defence, bail-related applications, NI Act cheque dishonour, and trials',
      'Negotiation, mediation, arbitration assistance, and decree execution proceedings',
      'Maintainability screening, limitation calculation, and structured evidence indexing',
    ],
    documentChecklist: [
      'Impugned notice, assessment order, demand notice, FIR, or plaint with service proof',
      'Contracts, title deeds, tax returns, challans, invoices, and prior submissions',
      'Chronology of events, limitation calculation, and witness/evidence list',
      'Authority letter, board resolution, or Vakalatnama / power of attorney',
    ],
    legalFramework:
      'Constitution of Bangladesh; Code of Civil Procedure, 1908; Code of Criminal Procedure, 1898; Penal Code, 1860; Evidence Act, 1872; Limitation Act, 1908; Negotiable Instruments Act, 1881; Arbitration Act, 2001.',
    iconName: 'Gavel',
    accentColor: 'red' as const,
    displayOrder: 6,
    isFeatured: true,
    isActive: true,
  },
];

export const DEFAULT_CONTENT = {
  key: 'default',
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
      accent: 'red' as const,
    },
    {
      step: 'STEP 02',
      title: 'Document Review',
      description: 'Examine legal, financial, tax, and regulatory records carefully.',
      accent: 'green' as const,
    },
    {
      step: 'STEP 03',
      title: 'Legal Assessment',
      description: 'Identify applicable laws, deadlines, risks, and available remedies.',
      accent: 'navy' as const,
    },
    {
      step: 'STEP 04',
      title: 'Engagement & Action Plan',
      description: 'Agree clear scope, fees, responsibilities, and deliverables.',
      accent: 'red' as const,
    },
    {
      step: 'STEP 05',
      title: 'Preparation & Filing',
      description: 'Prepare filings/pleadings, obtain approval, and submit properly.',
      accent: 'green' as const,
    },
    {
      step: 'STEP 06',
      title: 'Follow-up & Closure',
      description: 'Preserve official proof, report outcomes, and diarise future dates.',
      accent: 'navy' as const,
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

