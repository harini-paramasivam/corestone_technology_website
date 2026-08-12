/**
 * Canonical translation keys (English). ta.js must mirror this exact
 * key structure — missing Tamil keys fall back to this file at runtime
 * rather than rendering blank, so partial translation coverage never
 * breaks the UI.
 */
export default {
  common: {
    requestDemo: 'Request Demo',
    contactUs: 'Contact Us',
    learnMore: 'Learn more',
    viewAllSolutions: 'View all solutions',
    viewAllIndustries: 'View all industries',
    exploreSolutions: 'Explore Solutions',
    backToHome: 'Back to home',
    callUs: 'Call {{phone}}',
    submit: 'Submit',
    submitting: 'Submitting...',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    loading: 'Loading...',
    dismissNotification: 'Dismiss notification',
    closeDialog: 'Close dialog',
    breadcrumb: 'Breadcrumb',
    whatsappAriaLabel: 'Chat with CoreStone Technologies on WhatsApp',
    invoicingLabel: 'Invoicing - விலைப்பட்டியல் தயாரித்தல்',
    dashboardLabel: 'Dashboard - வரைபடங்கள் அடங்கிய தகவல் பலகை',
  },

  nav: {
    home: 'Home',
    solutions: 'Solutions',
    industries: 'Industries',
    whyCoreStone: 'Why CoreStone',
    contact: 'Contact',
    requestDemo: 'Request Demo',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    languageToggleLabel: 'Language',
  },

  footer: {
    tagline: 'Smart Software Solutions for Every Business',
    description: 'Custom billing, inventory and business software built around how your business actually runs.',
    solutionsHeading: 'Solutions',
    industriesHeading: 'Industries',
    contactHeading: 'Contact',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    rightsReserved: 'All rights reserved.',
    address: 'Puducherry, India',
  },

  hero: {
    eyebrow: 'Custom software development',
    headline: 'Smart Software solutions for every business, Shops & Industries.',
    subhead:
      'Billing, Invoice, Purchase, Sales, Inventory, Logistics Business Dashboards and Reports how your business actually runs - not a generic Template. From Tea shops To Schools, Hospital, Manufacturing Industries, Corestone builds the your Team Actually use and needs.',
    trustIndustries: 'Trusted across 28+ industries',
    trustBusinesses: '150+ businesses onboarded',
  },

  home: {
    trustedByLabel: 'Built For Businesses Across',
    trustLabels: [
      'Stores', 'Retail Chains', 'Wholesale Traders', 'Pharmacies', 'Hospital',
      'Nurseries', 'Hotels', 'Restaurant', 'School', 'Colleges',
      'Educational Institutions', 'Transport and Parcel Services',
    ],
    whyEyebrow: 'Why CoreStone',
    whyHeading: 'Smart Software Built For Your Business Needs around, Not the other way around.',
    whySubhead:
      'Most of the software forces your business teams to adapt it. Corestone starts with how your Business Teams already work and builds from there. Helps Your Business to Grow by Analyzing Business Data using Customized Dashboards and Reports.',
    solutionsEyebrow: 'Solutions',
    solutionsHeading: 'One platform, every part of your business',
    industriesEyebrow: 'Industries',
    industriesHeading: 'Built for the way your industry actually operates',
    industriesSubhead:
      'From nurseries to hospitals, every industry gets modules and dashboards configured for how that business runs day to day.',
    howWeWorkEyebrow: 'How We Work',
    howWeWorkHeading: 'From first call to going live',
    dashboardEyebrow: 'Business Dashboards',
    dashboardHeading: 'Every number your business needs, in one live view',
    dashboardSubhead:
      'Sales, stock, customers and staff performance update in real time — no more waiting for someone to compile a report at the end of the week.',
    dashboardBullet1: 'Role-based views for owners, managers and staff',
    dashboardBullet2: 'Daily, weekly and monthly report generation',
    dashboardBullet3: 'Works identically on desktop, tablet and mobile',
    featuresEyebrow: 'Features',
    featuresHeading: 'Everything your business needs, built in',
    testimonialsEyebrow: 'Testimonials',
    testimonialsHeading: 'What businesses say after going live',
    faqEyebrow: 'FAQs',
    faqHeading: 'Questions businesses ask before switching',
    ctaHeading: 'See CoreStone running on your business',
    ctaSubhead:
      "Request a demo and we'll show you exactly how it fits your billing, inventory and reporting — no obligation, no pressure.",

    whyCards: [
      { title: 'Built for reliability', description: 'Enterprise-grade infrastructure with encrypted data and role-based access, so your business runs without interruption.' },
      { title: 'Fast to deploy', description: 'Most businesses go live within days, not months — onboarding, data migration and staff training included.' },
      { title: 'Priced for growing businesses', description: 'Transparent, predictable pricing with no hidden fees — built for the businesses that need it most.' },
      { title: 'Real support, real people', description: 'A dedicated team that answers the phone, understands your industry, and stays with you after go-live.' },
    ],

    statsLabels: ['Industries served', 'Businesses onboarded', 'Platform uptime', 'Support availability'],

    featureCards: [
      { title: 'GST Billing', description: 'Compliant invoicing with automatic tax calculation.' },
      { title: 'Inventory & Stock', description: 'Real-time stock levels across every location.' },
      { title: 'Business Dashboards', description: 'Live visibility into sales, stock and performance.' },
      { title: 'Daily / Weekly / Monthly Reports', description: 'Reports generated automatically, no manual work.' },
      { title: 'Multi-User Access', description: 'Role-based permissions for every team member.' },
      { title: 'Secure Login', description: 'Encrypted authentication and audit-ready access logs.' },
      { title: 'Works Everywhere', description: 'Desktop, tablet and mobile, all fully responsive.' },
      { title: 'Ongoing Maintenance', description: 'Continuous updates and dedicated support included.' },
    ],

    testimonials: [
      { quote: 'Our billing counter used to be the bottleneck during peak hours. Now it is the fastest part of the store.', name: 'Store Manager', business: 'Retail chain, Puducherry' },
      { quote: 'We finally have one dashboard that shows stock, sales and daily reports together instead of three different spreadsheets.', name: 'Owner', business: 'Wholesale distributor, Bengaluru' },
      { quote: 'The team configured our GST billing exactly around how our pharmacy actually operates, not a generic template.', name: 'Proprietor', business: 'Pharmacy, Coimbatore' },
    ],

    process: [
      { title: 'Understand your business', description: 'We start with how your business actually runs — billing counters, stock flow, staff structure — not a generic template.' },
      { title: 'Configure your software', description: 'Your dashboards, reports and workflows are set up around your industry, not bolted on afterward.' },
      { title: 'Migrate & train your team', description: 'We move your existing data across and train your staff on-site or over a call, at no extra cost.' },
      { title: 'Go live with support', description: 'Launch with a dedicated support line — we stay involved well past day one.' },
    ],

    faqs: [
      { question: 'How long does implementation take?', answer: 'Most businesses are fully live within 1–3 weeks, depending on the number of locations and how much historical data needs to be migrated.' },
      { question: 'Do you support businesses outside Puducherry?', answer: 'Yes. While our team is based in Puducherry, we onboard and support businesses anywhere in India remotely, with on-site visits available for larger deployments.' },
      { question: 'Can the software be customized for my specific industry?', answer: 'Yes — every deployment is configured around your workflows, whether that is a pharmacy, a wholesale warehouse, or a multi-branch retail chain.' },
      { question: 'What does ongoing support include?', answer: 'Every plan includes maintenance, security updates, and a direct support line. We stay involved after go-live, not just during setup.' },
      { question: 'Is my business data secure?', answer: 'Yes. Data is encrypted in transit and at rest, access is role-based, and every account action is logged for audit purposes.' },
    ],
  },

  notFound: {
    title: "This page took a wrong turn.",
    description:
      "The page you're looking for doesn't exist or may have moved. Let's get you back on track.",
  },

  forms: {
    fullName: 'Full name',
    companyName: 'Company name',
    gstNumber: 'GST Number (Optional)',
    businessType: 'Business type',
    industry: 'Industry',
    email: 'Email',
    phone: 'Phone',
    city: 'City',
    state: 'State',
    businessRequirement: 'Business requirement',
    preferredDemoDate: 'Preferred demo date',
    preferredDemoTime: 'Preferred time',
    demoMode: 'Demo mode',
    message: 'Message',
    selectBusinessType: 'Select business type',
    selectIndustry: 'Select your industry',
    selectState: 'Select your state',
    selectTime: 'Select time',
    selectMode: 'Select mode',
    errorTitle: 'Submission Failed',

    validation: {
      nameRequired: 'Enter your full name.',
      nameTooLong: 'Name is too long.',
      companyRequired: 'Enter your company name.',
      companyTooLong: 'Company name is too long.',
      businessTypeRequired: 'Select a business type.',
      industryRequired: 'Select your industry.',
      emailInvalid: 'Enter a valid email address.',
      phoneInvalid: 'Please enter a valid 10-digit Indian phone number',
      gstInvalid: 'Please enter a valid 15-character Indian GSTIN (e.g. 33AAAAA0000A1Z5)',
      cityRequired: 'Enter your city.',
      stateRequired: 'Select your state.',
      requirementTooShort: 'Please describe your requirement in at least 20 characters.',
      requirementTooLong: 'Please keep this under 2000 characters.',
      dateRequired: 'Select a preferred date.',
      datePast: 'Preferred date cannot be in the past.',
      timeRequired: 'Select a preferred time.',
      modeRequired: 'Select a demo mode.',
      messageTooShort: 'Please enter at least 10 characters.',
      messageTooLong: 'Please keep this under 1500 characters.',
    },
  },

  toast: {
    demoErrorTitle: 'Could not submit your request',
    demoErrorFallback: 'Please try again in a moment.',
    contactSuccessTitle: 'Message sent',
    contactSuccessDescription: "We'll get back to you within 24 hours.",
    contactErrorTitle: 'Could not send your message',
    contactErrorFallback: 'Please try again in a moment.',
  },

  demoSuccess: {
    title: 'Demo request received',
    description: "Your Lead ID is {{leadId}}. Our team will confirm your slot within 24 hours.",
    continueOnWhatsApp: 'Continue on WhatsApp',
    saveLeadId: 'Save your Lead ID — quote it if you contact support before your demo.',
  },

  contactPage: {
    eyebrow: 'Contact',
    title: "Let's talk about your business",
    description: "Questions about a solution, an industry fit, or pricing — reach out and we'll respond within 24 hours.",
    getInTouch: 'Get in touch',
    hours: 'Mon–Sat, 9:30 AM – 7:00 PM IST',
    mapPlaceholder: 'Map preview — embed VITE_GOOGLE_MAPS_EMBED_SRC in .env to enable',
  },

  requestDemoPage: {
    eyebrow: 'Request Demo',
    title: 'See CoreStone running on your business',
    description: "Tell us a bit about your business and preferred time — we'll confirm your demo slot by WhatsApp within 24 hours.",
  },

  whatsapp: {
    newContactEnquiry: 'New Contact Enquiry',
    newDemoRequest: 'New Demo Request',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    message: 'Message',
    language: 'Language',
    submittedTime: 'Submitted Time',
    company: 'Company',
    businessType: 'Business Type',
    industry: 'Industry',
    city: 'City',
    state: 'State',
    businessRequirement: 'Business Requirement',
    preferredDate: 'Preferred Date',
    preferredTime: 'Preferred Time',
    demoMode: 'Demo Mode',
  },

  solutionsPage: {
    eyebrow: 'Solutions',
    title: 'One platform, every part of your business',
    description: 'Billing, inventory, dashboards, GST compliance and automation — modular enough to start with one, complete enough to run all of it together.',
    exploreOthers: 'Explore other solutions',
  },

  industriesPage: {
    eyebrow: 'Industries',
    title: 'Built for the way your industry actually operates',
    description: 'From nurseries to hospitals, every industry gets modules, dashboards and workflows configured around how that business actually runs — not a generic template.',
    exploreOthers: 'Explore other industries',
    sampleDashboardEyebrow: 'Sample Dashboard',
    sampleDashboardHeading: "What your {{industryName}} dashboard could look like",
    sampleDashboardSubhead: "Every dashboard is configured to your business during onboarding — this is an illustrative preview of the kind of live view you'd get.",
    dashboardLabels: ["Today's Sales", 'Stock Value', 'Active Orders', 'Reports Due'],
    overviewHeading: 'Overview',
    whatsIncludedHeading: "What's included",
    whyItWorksHeading: 'Why it works',
  },
}
