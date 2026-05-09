import {
  Building2, Banknote, Zap, Users, Home, Calculator, Lightbulb,
  Scale, Fuel, Radio, Anchor
} from 'lucide-react';

export const practiceAreas = [
  { icon: Building2, title: 'Corporate & Commercial', desc: 'M&A, joint ventures, corporate restructuring, and complex commercial transactions for multinational clients.', sectors: ['Mergers & Acquisitions', 'Joint Ventures', 'Corporate Governance', 'Commercial Contracts'] },
  { icon: Banknote, title: 'Banking & Finance', desc: 'Cross-border financing, capital markets, regulatory compliance, and structured finance advisory.', sectors: ['Project Finance', 'Capital Markets', 'Banking Regulation', 'Syndicated Loans'] },
  { icon: Zap, title: 'Energy & Infrastructure', desc: 'Power, renewables, infrastructure development, and public-private partnership transactions.', sectors: ['Power Projects', 'Renewables', 'PPP Transactions', 'Infrastructure'] },
  { icon: Users, title: 'Immigration & Employment', desc: 'Work permits, residency, employment contracts, and workforce compliance for international operations.', sectors: ['Work Permits', 'Employment Law', 'Labour Relations', 'Expatriate Services'] },
  { icon: Home, title: 'Real Estate', desc: 'Property acquisitions, development, leasing, and complex real estate transactions.', sectors: ['Acquisitions', 'Development', 'Leasing', 'Property Disputes'] },
  { icon: Calculator, title: 'Tax', desc: 'Tax planning, advisory, dispute resolution, and cross-border tax structuring.', sectors: ['Tax Planning', 'Transfer Pricing', 'Tax Disputes', 'Customs & Excise'] },
  { icon: Lightbulb, title: 'Intellectual Property', desc: 'Trademark, patent, copyright protection, and IP enforcement strategies.', sectors: ['Trademarks', 'Patents', 'Copyright', 'IP Litigation'] },
  { icon: Scale, title: 'Litigation & Disputes', desc: 'Commercial litigation, arbitration, and alternative dispute resolution.', sectors: ['Commercial Litigation', 'International Arbitration', 'ADR', 'Regulatory Disputes'] },
  { icon: Fuel, title: 'Oil & Gas', desc: 'Upstream and downstream advisory, licensing, and petroleum sector regulation.', sectors: ['Licensing', 'Upstream', 'Downstream', 'Petroleum Regulation'] },
  { icon: Radio, title: 'Telecommunications', desc: 'Licensing, regulatory advisory, and telecommunications industry transactions.', sectors: ['Licensing', 'Regulatory Compliance', 'Mobile & Data', 'ICT Transactions'] },
  { icon: Anchor, title: 'Maritime & Shipping', desc: 'Admiralty, vessel financing, charterparties, and maritime regulatory matters.', sectors: ['Admiralty', 'Vessel Finance', 'Charterparties', 'Marine Insurance'] },
];

export const team = [
  {
    name: 'Amie Bensouda',
    role: 'Managing Partner & Founder',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335457009_63150ee5.jpg',
    bio: 'Founder of the firm in 1995 and one of West Africa\'s most respected corporate lawyers. Former Attorney General and Minister of Justice of The Gambia, with three decades of experience advising governments, financial institutions, and multinational corporations.',
    expertise: ['Corporate Governance', 'M&A', 'Public Policy', 'International Arbitration'],
    qualifications: ['LL.M, University of London', 'Called to The Gambian Bar, 1985', 'Notary Public'],
    languages: ['English', 'Mandinka', 'Wolof'],
    featured: true,
  },
  {
    name: 'Lamin J. Ceesay',
    role: 'Senior Partner — Banking & Finance',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335477928_c91c883a.png',
    bio: 'Leads the firm\'s banking and finance practice, advising lenders and sponsors on complex cross-border transactions throughout West Africa.',
    expertise: ['Project Finance', 'Capital Markets', 'Banking Regulation'],
    qualifications: ['LL.M, Harvard Law School', 'Called to the Bar, 1998'],
    languages: ['English', 'French'],
  },
  {
    name: 'Fatou Jallow',
    role: 'Partner — Corporate & Commercial',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335494080_d93768cf.jpg',
    bio: 'Advises multinational corporations on market entry, M&A and ongoing corporate matters. Recognised in Chambers Global.',
    expertise: ['M&A', 'Joint Ventures', 'Corporate Governance'],
    qualifications: ['LL.M, Columbia Law School', 'Notary Public'],
    languages: ['English', 'French', 'Wolof'],
  },
  {
    name: 'Ousman Touray',
    role: 'Partner — Energy & Infrastructure',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335475086_640ddc30.jpg',
    bio: 'Heads the energy practice, with deep experience in power projects, renewables and PPP transactions across Africa.',
    expertise: ['Power Projects', 'PPP', 'Renewables'],
    qualifications: ['LL.M, SOAS', 'Solicitor, England & Wales'],
    languages: ['English'],
  },
  {
    name: 'Isatou Njie',
    role: 'Partner — Litigation & Arbitration',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335496644_6fa1e21a.jpg',
    bio: 'A leading commercial litigator and arbitrator with extensive experience before the ECOWAS Court and international tribunals.',
    expertise: ['Commercial Litigation', 'International Arbitration', 'ADR'],
    qualifications: ['LL.M, King\'s College London', 'FCIArb'],
    languages: ['English', 'French'],
  },
  {
    name: 'Modou Sanneh',
    role: 'Partner — Tax & Regulatory',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335476594_9930a990.jpg',
    bio: 'Advises on cross-border tax planning, transfer pricing and regulatory matters for international clients operating in The Gambia.',
    expertise: ['Tax Planning', 'Transfer Pricing', 'Customs'],
    qualifications: ['LL.M Tax, NYU', 'CPA'],
    languages: ['English'],
  },
  {
    name: 'Aminata Drammeh',
    role: 'Senior Associate — Real Estate',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335499675_50de1da7.jpg',
    bio: 'Focuses on real estate development, hotel and tourism transactions, and complex land matters.',
    expertise: ['Real Estate', 'Hospitality', 'Land Law'],
    qualifications: ['LL.B, University of The Gambia', 'Notary Public'],
    languages: ['English', 'Mandinka'],
  },
  {
    name: 'Ebrima Bah',
    role: 'Senior Associate — IP & Telecoms',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ff3e56a57d3eb9a2a6cc15_1778335476370_2c716bf6.jpg',
    bio: 'Leads the firm\'s intellectual property and telecommunications work, advising on licensing, brand protection and ICT transactions.',
    expertise: ['Trademarks', 'Telecoms Licensing', 'ICT'],
    qualifications: ['LL.M IP, Queen Mary'],
    languages: ['English', 'Wolof'],
  },
];

export const insights = [
  { id: 1, category: 'Investment', title: 'Doing Business in The Gambia: A 2026 Investor\'s Guide', date: 'May 2, 2026', readTime: '12 min read', excerpt: 'A comprehensive overview of legal, regulatory, and commercial considerations for foreign investors entering The Gambia.', featured: true },
  { id: 2, category: 'Banking', title: 'New Capital Adequacy Requirements for Gambian Banks', date: 'April 28, 2026', readTime: '7 min read', excerpt: 'Central Bank of The Gambia announces revised Basel III-aligned capital requirements affecting domestic and foreign-owned banks.' },
  { id: 3, category: 'Energy', title: 'Renewable Energy PPAs: Lessons from Recent Solar Projects', date: 'April 19, 2026', readTime: '9 min read', excerpt: 'Key contractual and regulatory lessons from the firm\'s work on the country\'s flagship solar power purchase agreements.' },
  { id: 4, category: 'Tax', title: 'Transfer Pricing Reforms: What Multinationals Must Know', date: 'April 11, 2026', readTime: '6 min read', excerpt: 'GRA\'s new transfer pricing regulations bring The Gambia closer to OECD BEPS standards.' },
  { id: 5, category: 'Corporate', title: 'The 2026 Companies Act Amendment: Key Implications', date: 'March 30, 2026', readTime: '10 min read', excerpt: 'A practical analysis of the most significant amendments to the Companies Act since 2013.' },
  { id: 6, category: 'Maritime', title: 'Vessel Registration in The Gambia: A Strategic Choice', date: 'March 22, 2026', readTime: '5 min read', excerpt: 'Why international ship-owners are increasingly considering The Gambia for flag registration.' },
];

export const recognitions = [
  'Chambers Global — Band 1, Corporate/Commercial',
  'IFLR1000 — Top Tier, Banking & Finance',
  'Legal 500 — Recommended Firm, West Africa',
  'African Legal Awards — Firm of the Year, The Gambia',
  'Who\'s Who Legal — Thought Leader, M&A',
  'ESQ Africa — Leading Light, Corporate',
];

export const timeline = [
  { year: '1995', title: 'Founded in Banjul', desc: 'Amie Bensouda establishes the firm with a mandate to provide world-class corporate legal services in The Gambia.' },
  { year: '2002', title: 'First International Mandate', desc: 'Advises a major international bank on its market entry into The Gambia, beginning a long tradition of cross-border work.' },
  { year: '2008', title: 'Energy Practice Launched', desc: 'Establishes a dedicated energy & infrastructure practice serving regional power and PPP transactions.' },
  { year: '2014', title: 'Chambers Global Recognition', desc: 'First Gambian firm ranked Band 1 in Corporate/Commercial by Chambers Global.' },
  { year: '2019', title: 'Cross-Border Expansion', desc: 'Formalises strategic partnerships with leading firms across West Africa, the UK and the United States.' },
  { year: '2025', title: '30 Years of Excellence', desc: 'Celebrates three decades as the trusted legal counsel for international business in The Gambia.' },
];
