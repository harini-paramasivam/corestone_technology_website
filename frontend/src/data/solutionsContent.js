/**
 * Detail content for each Solutions page, keyed by slug (matches
 * SOLUTIONS in site.js). Each entry has `en` and `ta` sub-objects with
 * identical shape ({ overview, features[], benefits[], modules[] }) —
 * SolutionDetail.jsx picks the active language's object via
 * useLanguage(), with English as the structural fallback if a Tamil
 * field were ever missing (it isn't — every key below has both).
 */
export const SOLUTIONS_CONTENT = {
  'billing-software': {
    en: {
      overview:
        'A billing counter built for speed. Barcode scanning, quick-search checkout, and split payments keep queues moving even during your busiest hours, while every sale flows straight into inventory and reporting automatically.',
      features: [
        'Barcode & quick-search checkout',
        'Split and multi-mode payments (cash, UPI, card)',
        'Automatic tax and discount calculation',
        'Hold, resume and merge bills',
        'Printed and digital receipt options',
        'Returns and exchange handling',
      ],
      benefits: [
        'Cut average checkout time significantly during peak hours',
        'Eliminate manual price and tax calculation errors',
        'Give every staff member a consistent, easy-to-learn interface',
      ],
      modules: ['Point of Sale', 'Payments', 'Receipts', 'Returns & Exchanges'],
    },
    ta: {
      overview:
        'வேகத்திற்காக வடிவமைக்கப்பட்ட பில்லிங் கவுண்டர். பார்கோடு ஸ்கேனிங், விரைவு தேடல் செக்அவுட் மற்றும் பிரிக்கப்பட்ட கட்டணங்கள் மிகவும் நெரிசலான நேரங்களிலும் வரிசையை நகர்த்தும், ஒவ்வொரு விற்பனையும் தானாகவே இருப்பு மற்றும் அறிக்கையிடலில் இணைந்துவிடும்.',
      features: [
        'பார்கோடு & விரைவு தேடல் செக்அவுட்',
        'பிரிக்கப்பட்ட மற்றும் பல முறை கட்டணங்கள் (பணம், UPI, கார்டு)',
        'தானியங்கி வரி மற்றும் தள்ளுபடி கணக்கீடு',
        'பில்களை நிறுத்திவைத்தல், தொடர்தல் மற்றும் இணைத்தல்',
        'அச்சிடப்பட்ட மற்றும் டிஜிட்டல் ரசீது விருப்பங்கள்',
        'திரும்பப்பெறுதல் மற்றும் மாற்று கையாளுதல்',
      ],
      benefits: [
        'நெரிசலான நேரங்களில் சராசரி செக்அவுட் நேரத்தை கணிசமாகக் குறைக்கும்',
        'கைமுறை விலை மற்றும் வரி கணக்கீட்டு பிழைகளை நீக்கும்',
        'ஒவ்வொரு ஊழியருக்கும் எளிதாகக் கற்கக்கூடிய ஒரே மாதிரியான இடைமுகத்தை வழங்கும்',
      ],
      modules: ['விற்பனை புள்ளி (POS)', 'கட்டணங்கள்', 'ரசீதுகள்', 'திரும்பப்பெறுதல் & மாற்றுகள்'],
    },
  },

  'inventory-management': {
    en: {
      overview:
        'Know exactly what you have, where it is, and when it will run out — across one location or fifty. Stock updates the moment a sale, purchase, or transfer happens, so your numbers are never a day behind.',
      features: [
        'Real-time stock levels across locations',
        'Low-stock and reorder-point alerts',
        'Batch and expiry tracking',
        'Stock transfer between branches',
        'Barcode-based stock counting',
        'Supplier-linked purchase history',
      ],
      benefits: [
        'Reduce stockouts and overstocking at the same time',
        'Cut manual stock-take time from days to hours',
        'Spot slow-moving stock before it becomes dead stock',
      ],
      modules: ['Stock Ledger', 'Purchase Management', 'Transfers', 'Stock Audit'],
    },
    ta: {
      overview:
        'நீங்கள் என்ன வைத்திருக்கிறீர்கள், அது எங்கே உள்ளது, எப்போது தீர்ந்துவிடும் என்பதை துல்லியமாக அறியுங்கள் — ஒரு இடமாக இருந்தாலும், ஐம்பது இடமாக இருந்தாலும். விற்பனை, கொள்முதல் அல்லது இடமாற்றம் நடக்கும் தருணத்திலேயே இருப்பு புதுப்பிக்கப்படும், எனவே உங்கள் எண்கள் ஒருபோதும் ஒரு நாள் பின்தங்காது.',
      features: [
        'இடங்கள் முழுவதும் நேரலை இருப்பு அளவுகள்',
        'குறைந்த இருப்பு மற்றும் மறு-ஆர்டர் புள்ளி எச்சரிக்கைகள்',
        'தொகுதி மற்றும் காலாவதி கண்காணிப்பு',
        'கிளைகளுக்கு இடையே இருப்பு இடமாற்றம்',
        'பார்கோடு அடிப்படையிலான இருப்பு எண்ணிக்கை',
        'சப்ளையருடன் இணைக்கப்பட்ட கொள்முதல் வரலாறு',
      ],
      benefits: [
        'இருப்பு தீர்தல் மற்றும் அதிக இருப்பு இரண்டையும் ஒரே நேரத்தில் குறைக்கும்',
        'கைமுறை இருப்பு எண்ணிக்கை நேரத்தை நாட்களில் இருந்து மணிநேரங்களாகக் குறைக்கும்',
        'மந்தமான இருப்பு செத்த இருப்பாக மாறுவதற்கு முன் கண்டறியும்',
      ],
      modules: ['இருப்பு லெட்ஜர்', 'கொள்முதல் மேலாண்மை', 'இடமாற்றங்கள்', 'இருப்பு தணிக்கை'],
    },
  },

  'business-dashboards': {
    en: {
      overview:
        'One live view of how the business is actually doing — sales, stock, staff performance and cash flow, updating in real time instead of waiting for someone to compile a spreadsheet at the end of the week.',
      features: [
        'Role-based dashboards for owners, managers and staff',
        'Live sales and stock KPIs',
        'Customizable widgets and date ranges',
        'Mobile-friendly dashboard views',
        'Drill-down from summary to transaction level',
      ],
      benefits: [
        'Make same-day decisions instead of waiting on weekly reports',
        'Give managers visibility without giving them full system access',
        'Spot trends across branches from a single screen',
      ],
      modules: ['Sales Dashboard', 'Stock Dashboard', 'Staff Performance', 'Cash Flow'],
    },
    ta: {
      overview:
        'வணிகம் உண்மையில் எப்படி செயல்படுகிறது என்பதற்கான ஒரே நேரலை காட்சி — விற்பனை, இருப்பு, ஊழியர் செயல்திறன் மற்றும் பண ஓட்டம், வார இறுதியில் யாரோ ஒரு ஸ்பிரெட்ஷீட்டைத் தொகுக்க காத்திருப்பதற்குப் பதிலாக நேரலையில் புதுப்பிக்கப்படும்.',
      features: [
        'உரிமையாளர்கள், மேலாளர்கள் மற்றும் ஊழியர்களுக்கான பங்கு அடிப்படையிலான வரைபடங்கள் அடங்கிய தகவல் பலகைகள்',
        'நேரலை விற்பனை மற்றும் இருப்பு KPI-கள்',
        'தனிப்பயனாக்கக்கூடிய விட்ஜெட்டுகள் மற்றும் தேதி வரம்புகள்',
        'மொபைலுக்கு ஏற்ற வரைபடங்கள் அடங்கிய தகவல் பலகை காட்சிகள்',
        'சுருக்கத்திலிருந்து பரிவர்த்தனை நிலை வரை ஆழமாகச் செல்லுதல்',
      ],
      benefits: [
        'வாராந்திர அறிக்கைகளுக்காக காத்திருப்பதற்குப் பதிலாக அன்றன்று முடிவெடுக்க உதவும்',
        'முழு அமைப்பு அணுகலைக் கொடுக்காமலேயே மேலாளர்களுக்குக் காட்சி வழங்கும்',
        'ஒரே திரையில் இருந்து கிளைகள் முழுவதும் போக்குகளைக் கண்டறியும்',
      ],
      modules: ['விற்பனை வரைபடங்கள் அடங்கிய தகவல் பலகை', 'இருப்பு வரைபடங்கள் அடங்கிய தகவல் பலகை', 'ஊழியர் செயல்திறன்', 'பண ஓட்டம்'],
    },
  },

  'gst-billing': {
    en: {
      overview:
        'Fully compliant GST invoicing that calculates the right tax automatically for every item, every time — with GSTR-ready reports so filing season is never a scramble.',
      features: [
        'Automatic CGST/SGST/IGST calculation',
        'HSN/SAC code mapping per item',
        'GSTR-1 and GSTR-3B ready reports',
        'E-invoice and e-way bill support',
        'Tax rate changes applied instantly across the system',
      ],
      benefits: [
        'Eliminate manual GST calculation errors',
        'Cut filing preparation time from days to hours',
        'Stay compliant automatically as tax rules change',
      ],
      modules: ['GST Invoicing', 'Tax Reports', 'E-Invoicing', 'HSN/SAC Management'],
    },
    ta: {
      overview:
        'ஒவ்வொரு பொருளுக்கும், ஒவ்வொரு முறையும் சரியான வரியை தானாகவே கணக்கிடும் முழுமையாக இணக்கமான ஜிஎஸ்டி விலைப்பட்டியல் — GSTR-தயார் அறிக்கைகளுடன், தாக்கல் காலம் ஒருபோதும் அவசரமாக இருக்காது.',
      features: [
        'தானியங்கி CGST/SGST/IGST கணக்கீடு',
        'ஒவ்வொரு பொருளுக்கும் HSN/SAC குறியீடு இணைப்பு',
        'GSTR-1 மற்றும் GSTR-3B தயார் அறிக்கைகள்',
        'இ-இன்வாய்ஸ் மற்றும் இ-வே பில் ஆதரவு',
        'வரி விகித மாற்றங்கள் அமைப்பு முழுவதும் உடனடியாகப் பொருந்தும்',
      ],
      benefits: [
        'கைமுறை ஜிஎஸ்டி கணக்கீட்டு பிழைகளை நீக்கும்',
        'தாக்கல் தயாரிப்பு நேரத்தை நாட்களில் இருந்து மணிநேரங்களாகக் குறைக்கும்',
        'வரி விதிகள் மாறும்போது தானாகவே இணக்கமாக இருக்கும்',
      ],
      modules: ['ஜிஎஸ்டி விலைப்பட்டியல்', 'வரி அறிக்கைகள்', 'இ-விலைப்பட்டியல் தயாரித்தல்', 'HSN/SAC மேலாண்மை'],
    },
  },

  'sales-analytics': {
    en: {
      overview:
        'Understand what is actually selling, to whom, and when — down to the individual product, customer segment, or branch — so pricing and stocking decisions are based on data, not guesswork.',
      features: [
        'Product and category performance breakdowns',
        'Customer purchase pattern analysis',
        'Peak hour and seasonal trend detection',
        'Branch-to-branch performance comparison',
        'Exportable analytics reports',
      ],
      benefits: [
        'Identify your highest-margin products with confidence',
        'Plan staffing and stock around real demand patterns',
        'Compare branch performance on equal footing',
      ],
      modules: ['Sales Trends', 'Customer Analytics', 'Product Performance', 'Branch Comparison'],
    },
    ta: {
      overview:
        'என்ன உண்மையில் விற்பனையாகிறது, யாருக்கு, எப்போது என்பதை — ஒவ்வொரு தயாரிப்பு, வாடிக்கையாளர் பிரிவு அல்லது கிளை நிலை வரை — புரிந்துகொள்ளுங்கள், இதனால் விலை நிர்ணயம் மற்றும் இருப்பு முடிவுகள் யூகத்தை அல்ல, தரவை அடிப்படையாகக் கொண்டிருக்கும்.',
      features: [
        'தயாரிப்பு மற்றும் வகை செயல்திறன் பகுப்பாய்வு',
        'வாடிக்கையாளர் வாங்கும் முறை பகுப்பாய்வு',
        'உச்ச நேரம் மற்றும் பருவகால போக்கு கண்டறிதல்',
        'கிளைக்கு கிளை செயல்திறன் ஒப்பீடு',
        'ஏற்றுமதி செய்யக்கூடிய பகுப்பாய்வு அறிக்கைகள்',
      ],
      benefits: [
        'அதிக லாபம் தரும் தயாரிப்புகளை நம்பிக்கையுடன் கண்டறியும்',
        'உண்மையான தேவை போக்குகளுக்கு ஏற்ப ஊழியர் மற்றும் இருப்பைத் திட்டமிடும்',
        'சம அடிப்படையில் கிளை செயல்திறனை ஒப்பிடும்',
      ],
      modules: ['விற்பனை போக்குகள்', 'வாடிக்கையாளர் பகுப்பாய்வு', 'தயாரிப்பு செயல்திறன்', 'கிளை ஒப்பீடு'],
    },
  },

  'business-reports': {
    en: {
      overview:
        'Daily, weekly and monthly reports generated automatically and delivered the way you want them — no more manually compiling numbers from three different systems every Friday afternoon.',
      features: [
        'Automated daily closing reports',
        'Weekly and monthly summary reports',
        'Scheduled report delivery via email',
        'Custom report builder',
        'Exportable to PDF and Excel',
      ],
      benefits: [
        'Remove hours of manual reporting work every week',
        'Get consistent, comparable reports every single time',
        'Share reports with stakeholders without giving system access',
      ],
      modules: ['Daily Reports', 'Weekly Reports', 'Monthly Reports', 'Custom Report Builder'],
    },
    ta: {
      overview:
        'தினசரி, வாராந்திர மற்றும் மாதாந்திர அறிக்கைகள் தானாகவே உருவாக்கப்பட்டு நீங்கள் விரும்பும் வழியில் வழங்கப்படும் — ஒவ்வொரு வெள்ளிக்கிழமை மதியமும் மூன்று வெவ்வேறு அமைப்புகளிலிருந்து கைமுறையாக எண்களைத் தொகுக்க வேண்டியதில்லை.',
      features: [
        'தானியங்கி தினசரி முடிவு அறிக்கைகள்',
        'வாராந்திர மற்றும் மாதாந்திர சுருக்க அறிக்கைகள்',
        'மின்னஞ்சல் வழியாக திட்டமிடப்பட்ட அறிக்கை வழங்கல்',
        'தனிப்பயன் அறிக்கை உருவாக்கி',
        'PDF மற்றும் Excel-க்கு ஏற்றுமதி செய்யக்கூடியது',
      ],
      benefits: [
        'ஒவ்வொரு வாரமும் மணிக்கணக்கான கைமுறை அறிக்கையிடல் வேலையை நீக்கும்',
        'ஒவ்வொரு முறையும் சீரான, ஒப்பிடக்கூடிய அறிக்கைகளைப் பெறும்',
        'அமைப்பு அணுகலைக் கொடுக்காமலேயே பங்குதாரர்களுடன் அறிக்கைகளைப் பகிரும்',
      ],
      modules: ['தினசரி அறிக்கைகள்', 'வாராந்திர அறிக்கைகள்', 'மாதாந்திர அறிக்கைகள்', 'தனிப்பயன் அறிக்கை உருவாக்கி'],
    },
  },

  'custom-erp': {
    en: {
      overview:
        'One system connecting purchasing, inventory, sales and staff — instead of the three or four disconnected tools most growing businesses end up stitching together.',
      features: [
        'Unified purchase-to-sale workflow',
        'Cross-department data visibility',
        'Configurable approval chains',
        'Multi-branch and multi-warehouse support',
        'Role-based access across every module',
      ],
      benefits: [
        'Remove duplicate data entry across departments',
        'Give leadership one source of truth for the whole business',
        'Scale from one branch to many without switching systems',
      ],
      modules: ['Purchasing', 'Inventory', 'Sales', 'HR & Staff Management'],
    },
    ta: {
      overview:
        'பெரும்பாலான வளர்ந்துவரும் வணிகங்கள் ஒன்றாக இணைக்க முயலும் மூன்று அல்லது நான்கு தனித்தனி கருவிகளுக்குப் பதிலாக, கொள்முதல், இருப்பு, விற்பனை மற்றும் ஊழியர்களை இணைக்கும் ஒரே அமைப்பு.',
      features: [
        'ஒருங்கிணைந்த கொள்முதல்-முதல்-விற்பனை பணிப்பாய்வு',
        'துறைகளுக்கு இடையேயான தரவு காட்சி',
        'கட்டமைக்கக்கூடிய ஒப்புதல் சங்கிலிகள்',
        'பல கிளை மற்றும் பல கிடங்கு ஆதரவு',
        'ஒவ்வொரு தொகுதியிலும் பங்கு அடிப்படையிலான அணுகல்',
      ],
      benefits: [
        'துறைகள் முழுவதும் நகல் தரவு உள்ளீட்டை நீக்கும்',
        'முழு வணிகத்திற்கும் தலைமைக்கு ஒரே உண்மையான தரவு மூலத்தை வழங்கும்',
        'அமைப்புகளை மாற்றாமல் ஒரு கிளையிலிருந்து பலவற்றிற்கு விரிவாக்கும்',
      ],
      modules: ['கொள்முதல்', 'இருப்பு', 'விற்பனை', 'HR & ஊழியர் மேலாண்மை'],
    },
  },

  'business-automation': {
    en: {
      overview:
        'Remove the manual, repetitive work from daily operations — automatic reordering, automatic invoice generation, automatic report delivery — so your team spends time on customers, not paperwork.',
      features: [
        'Automatic reorder triggers at stock thresholds',
        'Scheduled invoice and report generation',
        'Automated WhatsApp/email notifications',
        'Workflow rules for approvals and escalations',
        'Automated follow-up reminders',
      ],
      benefits: [
        'Free up staff hours previously lost to manual tasks',
        'Reduce human error in repetitive processes',
        'Ensure nothing falls through the cracks during busy periods',
      ],
      modules: ['Automated Reordering', 'Scheduled Reports', 'Notification Rules', 'Approval Workflows'],
    },
    ta: {
      overview:
        'தினசரி செயல்பாடுகளில் இருந்து கைமுறை, மீண்டும் மீண்டும் வரும் வேலையை நீக்குங்கள் — தானியங்கி மறு-ஆர்டர், தானியங்கி இன்வாய்ஸ் உருவாக்கம், தானியங்கி அறிக்கை வழங்கல் — இதனால் உங்கள் குழு காகிதவேலையில் அல்ல, வாடிக்கையாளர்களில் நேரத்தைச் செலவிடும்.',
      features: [
        'இருப்பு வரம்புகளில் தானியங்கி மறு-ஆர்டர் தூண்டுதல்கள்',
        'திட்டமிடப்பட்ட இன்வாய்ஸ் மற்றும் அறிக்கை உருவாக்கம்',
        'தானியங்கி WhatsApp/மின்னஞ்சல் அறிவிப்புகள்',
        'ஒப்புதல்கள் மற்றும் அதிகரிப்புகளுக்கான பணிப்பாய்வு விதிகள்',
        'தானியங்கி பின்தொடர்தல் நினைவூட்டல்கள்',
      ],
      benefits: [
        'கைமுறை பணிகளால் முன்பு இழந்த ஊழியர் நேரத்தை மீட்டெடுக்கும்',
        'மீண்டும் மீண்டும் வரும் செயல்முறைகளில் மனித பிழையைக் குறைக்கும்',
        'பரபரப்பான காலங்களில் எதுவும் தவறாமல் இருப்பதை உறுதிசெய்யும்',
      ],
      modules: ['தானியங்கி மறு-ஆர்டர்', 'திட்டமிடப்பட்ட அறிக்கைகள்', 'அறிவிப்பு விதிகள்', 'ஒப்புதல் பணிப்பாய்வுகள்'],
    },
  },

  'custom-software-development': {
    en: {
      overview:
        "When off-the-shelf software doesn't fit, we build what does. Custom modules, integrations, and entire platforms designed around your specific workflow — not the other way around.",
      features: [
        'Requirements discovery with your actual team',
        'Custom module and workflow development',
        'Integration with existing tools and hardware',
        'Iterative delivery with regular check-ins',
        'Long-term maintenance and support',
      ],
      benefits: [
        'Get software that matches how you work, not a compromise',
        'Avoid paying for features you will never use',
        'Have a direct line to the team that built your system',
      ],
      modules: ['Discovery & Scoping', 'Custom Development', 'Integrations', 'Ongoing Support'],
    },
    ta: {
      overview:
        'ரெடிமேட் மென்பொருள் பொருந்தாதபோது, பொருந்துவதை நாங்கள் உருவாக்குகிறோம். உங்கள் குறிப்பிட்ட பணிப்பாய்வுக்கு ஏற்ப வடிவமைக்கப்பட்ட தனிப்பயன் தொகுதிகள், ஒருங்கிணைப்புகள் மற்றும் முழுமையான தளங்கள் — மறுபக்கமாக அல்ல.',
      features: [
        'உங்கள் உண்மையான குழுவுடன் தேவை கண்டறிதல்',
        'தனிப்பயன் தொகுதி மற்றும் பணிப்பாய்வு மேம்பாடு',
        'தற்போதைய கருவிகள் மற்றும் வன்பொருளுடன் ஒருங்கிணைப்பு',
        'வழக்கமான சரிபார்ப்புகளுடன் படிப்படியான வழங்கல்',
        'நீண்டகால பராமரிப்பு மற்றும் ஆதரவு',
      ],
      benefits: [
        'சமரசம் அல்ல, நீங்கள் வேலை செய்யும் விதத்திற்கு பொருந்தும் மென்பொருளைப் பெறுங்கள்',
        'நீங்கள் ஒருபோதும் பயன்படுத்தாத அம்சங்களுக்குப் பணம் செலுத்துவதைத் தவிர்க்கும்',
        'உங்கள் அமைப்பை உருவாக்கிய குழுவுடன் நேரடி தொடர்பு கொள்ளும்',
      ],
      modules: ['கண்டறிதல் & நோக்கம்', 'தனிப்பயன் மேம்பாடு', 'ஒருங்கிணைப்புகள்', 'தொடர்ச்சியான ஆதரவு'],
    },
  },
}
