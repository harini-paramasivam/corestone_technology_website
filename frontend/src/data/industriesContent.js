/**
 * Detail content for each Industries page, keyed by slug (matches
 * INDUSTRIES in site.js). Same { en, ta } shape as solutionsContent.js.
 */
export const INDUSTRIES_CONTENT = {
  nurseries: {
    en: {
      overview: 'Track plant stock by species, batch and growth stage, manage seasonal demand, and handle both retail counter sales and bulk landscaping orders from one system.',
      features: ['Plant/species-level stock tracking', 'Seasonal demand planning', 'Bulk order & landscaping invoicing', 'Wastage and spoilage tracking'],
      benefits: ['Reduce plant wastage from poor stock visibility', 'Plan seasonal stock ahead of demand spikes', 'Handle retail and bulk orders without separate systems'],
      modules: ['Plant Inventory', 'Billing', 'Bulk Orders', 'Seasonal Planning'],
    },
    ta: {
      overview: 'இனம், தொகுதி மற்றும் வளர்ச்சி நிலை வாரியாக தாவர இருப்பைக் கண்காணிக்கவும், பருவகால தேவையை நிர்வகிக்கவும், சில்லறை கவுண்டர் விற்பனை மற்றும் மொத்த லேண்ட்ஸ்கேப்பிங் ஆர்டர்கள் இரண்டையும் ஒரே அமைப்பில் கையாளவும்.',
      features: ['தாவரம்/இனம் வாரியான இருப்பு கண்காணிப்பு', 'பருவகால தேவை திட்டமிடல்', 'மொத்த ஆர்டர் & லேண்ட்ஸ்கேப்பிங் விலைப்பட்டியல்', 'வீண்படுதல் கண்காணிப்பு'],
      benefits: ['மோசமான இருப்பு காட்சியால் ஏற்படும் தாவர வீணாதலைக் குறைக்கும்', 'தேவை உச்சத்திற்கு முன் பருவகால இருப்பைத் திட்டமிடும்', 'தனி அமைப்புகள் இல்லாமல் சில்லறை மற்றும் மொத்த ஆர்டர்களைக் கையாளும்'],
      modules: ['தாவர இருப்பு', 'பில்லிங்', 'மொத்த ஆர்டர்கள்', 'பருவகால திட்டமிடல்'],
    },
  },

  agriculture: {
    en: {
      overview: 'Manage input purchases (seed, fertilizer, equipment), track harvest yields, and handle sales to distributors or direct buyers with full traceability from field to sale.',
      features: ['Input purchase tracking', 'Harvest & yield logging', 'Distributor and buyer invoicing', 'Batch traceability'],
      benefits: ['Understand true input-to-yield cost per season', 'Simplify buyer invoicing and payment tracking', 'Keep traceable records for compliance and quality claims'],
      modules: ['Input Management', 'Yield Tracking', 'Sales & Invoicing', 'Traceability'],
    },
    ta: {
      overview: 'உள்ளீட்டு கொள்முதல்களை (விதை, உரம், உபகரணங்கள்) நிர்வகிக்கவும், அறுவடை விளைச்சலைக் கண்காணிக்கவும், வயலிலிருந்து விற்பனை வரை முழு கண்காணிப்புத்திறனுடன் விநியோகஸ்தர்கள் அல்லது நேரடி வாங்குபவர்களுக்கான விற்பனையைக் கையாளவும்.',
      features: ['உள்ளீட்டு கொள்முதல் கண்காணிப்பு', 'அறுவடை & விளைச்சல் பதிவு', 'விநியோகஸ்தர் மற்றும் வாங்குபவர் விலைப்பட்டியல்', 'தொகுதி கண்காணிப்புத்திறன்'],
      benefits: ['ஒரு பருவத்திற்கான உண்மையான உள்ளீடு-முதல்-விளைச்சல் செலவைப் புரிந்துகொள்ளும்', 'வாங்குபவர் விலைப்பட்டியல் மற்றும் கட்டண கண்காணிப்பை எளிதாக்கும்', 'இணக்கம் மற்றும் தர உரிமைகோரல்களுக்கான கண்காணிக்கக்கூடிய பதிவுகளை வைத்திருக்கும்'],
      modules: ['உள்ளீட்டு மேலாண்மை', 'விளைச்சல் கண்காணிப்பு', 'விற்பனை & விலைப்பட்டியல்', 'கண்காணிப்புத்திறன்'],
    },
  },

  'travel-logistics': {
    en: {
      overview: 'Manage bookings, fleet or vehicle assignments, route scheduling and customer invoicing in one place, with real-time visibility into what is booked, in transit, or available.',
      features: ['Booking & itinerary management', 'Fleet/vehicle assignment tracking', 'Route and schedule planning', 'Automated customer invoicing'],
      benefits: ['Reduce double-bookings and scheduling conflicts', 'Track fleet utilization at a glance', 'Speed up invoicing for repeat corporate clients'],
      modules: ['Bookings', 'Fleet Management', 'Route Scheduling', 'Invoicing'],
    },
    ta: {
      overview: 'என்ன முன்பதிவு செய்யப்பட்டுள்ளது, போக்குவரத்தில் உள்ளது அல்லது கிடைக்கிறது என்பதற்கான நேரலை காட்சியுடன், முன்பதிவுகள், வாகன ஒதுக்கீடுகள், பாதை திட்டமிடல் மற்றும் வாடிக்கையாளர் விலைப்பட்டியலை ஒரே இடத்தில் நிர்வகிக்கவும்.',
      features: ['முன்பதிவு & பயணத் திட்ட மேலாண்மை', 'வாகன ஒதுக்கீடு கண்காணிப்பு', 'பாதை மற்றும் அட்டவணை திட்டமிடல்', 'தானியங்கி வாடிக்கையாளர் விலைப்பட்டியல்'],
      benefits: ['இரட்டை முன்பதிவுகள் மற்றும் அட்டவணை முரண்பாடுகளைக் குறைக்கும்', 'ஒரே பார்வையில் வாகன பயன்பாட்டைக் கண்காணிக்கும்', 'மீண்டும் வரும் கார்ப்பரேட் வாடிக்கையாளர்களுக்கான விலைப்பட்டியலை வேகப்படுத்தும்'],
      modules: ['முன்பதிவுகள்', 'வாகன மேலாண்மை', 'பாதை அட்டவணையிடல்', 'விலைப்பட்டியல்'],
    },
  },

  'tea-shops': {
    en: {
      overview: 'A fast, simple billing counter built for high-volume, low-ticket sales — quick checkout, daily cash reconciliation, and stock tracking for perishable ingredients.',
      features: ['Quick-checkout billing', 'Daily cash reconciliation', 'Perishable ingredient stock tracking', 'Simple daily sales reports'],
      benefits: ['Keep queues moving during rush hours', 'Reconcile daily cash without manual tallying', 'Reduce ingredient wastage with better stock visibility'],
      modules: ['Quick Billing', 'Cash Reconciliation', 'Ingredient Stock', 'Daily Reports'],
    },
    ta: {
      overview: 'அதிக அளவு, குறைந்த விலை விற்பனைக்காக வடிவமைக்கப்பட்ட வேகமான, எளிய பில்லிங் கவுண்டர் — விரைவான செக்அவுட், தினசரி பண சரிசெய்தல் மற்றும் அழியக்கூடிய பொருட்களுக்கான இருப்பு கண்காணிப்பு.',
      features: ['விரைவு-செக்அவுட் பில்லிங்', 'தினசரி பண சரிசெய்தல்', 'அழியக்கூடிய பொருள் இருப்பு கண்காணிப்பு', 'எளிய தினசரி விற்பனை அறிக்கைகள்'],
      benefits: ['பரபரப்பான நேரங்களில் வரிசையை நகர்த்தும்', 'கைமுறை கணக்கிடல் இல்லாமல் தினசரி பணத்தை சரிசெய்யும்', 'சிறந்த இருப்பு காட்சியுடன் பொருள் வீணாதலைக் குறைக்கும்'],
      modules: ['விரைவு பில்லிங்', 'பண சரிசெய்தல்', 'பொருள் இருப்பு', 'தினசரி அறிக்கைகள்'],
    },
  },

  bakeries: {
    en: {
      overview: 'Track ingredient stock, manage recipe-based costing, handle both walk-in and pre-order/bulk sales, and know exactly what to bake based on real demand patterns.',
      features: ['Recipe-based ingredient costing', 'Pre-order and bulk order management', 'Daily production planning', 'Expiry and freshness tracking'],
      benefits: ['Price products accurately based on real ingredient cost', 'Reduce unsold stock at end of day', 'Manage bulk/event orders without separate spreadsheets'],
      modules: ['Recipe Costing', 'Production Planning', 'Pre-Orders', 'Billing'],
    },
    ta: {
      overview: 'பொருள் இருப்பைக் கண்காணிக்கவும், செய்முறை அடிப்படையிலான செலவினத்தை நிர்வகிக்கவும், நடமாடி வரும் மற்றும் முன்-ஆர்டர்/மொத்த விற்பனை இரண்டையும் கையாளவும், உண்மையான தேவை போக்குகளின் அடிப்படையில் என்ன சுட வேண்டும் என்பதைத் துல்லியமாக அறியவும்.',
      features: ['செய்முறை அடிப்படையிலான பொருள் செலவினம்', 'முன்-ஆர்டர் மற்றும் மொத்த ஆர்டர் மேலாண்மை', 'தினசரி உற்பத்தி திட்டமிடல்', 'காலாவதி மற்றும் புத்தம்புதிய தன்மை கண்காணிப்பு'],
      benefits: ['உண்மையான பொருள் செலவின அடிப்படையில் துல்லியமாக விலை நிர்ணயிக்கும்', 'நாள் முடிவில் விற்பனையாகாத இருப்பைக் குறைக்கும்', 'தனி ஸ்பிரெட்ஷீட்கள் இல்லாமல் மொத்த/நிகழ்வு ஆர்டர்களை நிர்வகிக்கும்'],
      modules: ['செய்முறை செலவினம்', 'உற்பத்தி திட்டமிடல்', 'முன்-ஆர்டர்கள்', 'பில்லிங்'],
    },
  },

  'grocery-stores': {
    en: {
      overview: 'High-SKU inventory management with barcode billing, supplier-linked purchasing, and expiry tracking — built for stores managing hundreds to thousands of products.',
      features: ['Barcode-based billing', 'High-volume SKU management', 'Supplier purchase tracking', 'Expiry date alerts'],
      benefits: ['Handle thousands of SKUs without losing accuracy', 'Reduce expired-stock losses', 'Speed up billing during peak shopping hours'],
      modules: ['Barcode Billing', 'Inventory', 'Supplier Management', 'Expiry Tracking'],
    },
    ta: {
      overview: 'பார்கோடு பில்லிங், சப்ளையருடன் இணைக்கப்பட்ட கொள்முதல் மற்றும் காலாவதி கண்காணிப்புடன் அதிக பொருள் எண்ணிக்கை இருப்பு மேலாண்மை — நூற்றுக்கணக்கான முதல் ஆயிரக்கணக்கான தயாரிப்புகளை நிர்வகிக்கும் கடைகளுக்காக உருவாக்கப்பட்டது.',
      features: ['பார்கோடு அடிப்படையிலான பில்லிங்', 'அதிக அளவு பொருள் மேலாண்மை', 'சப்ளையர் கொள்முதல் கண்காணிப்பு', 'காலாவதி தேதி எச்சரிக்கைகள்'],
      benefits: ['துல்லியத்தை இழக்காமல் ஆயிரக்கணக்கான பொருட்களைக் கையாளும்', 'காலாவதியான இருப்பு இழப்புகளைக் குறைக்கும்', 'உச்ச கடை நேரங்களில் பில்லிங்கை வேகப்படுத்தும்'],
      modules: ['பார்கோடு பில்லிங்', 'இருப்பு', 'சப்ளையர் மேலாண்மை', 'காலாவதி கண்காணிப்பு'],
    },
  },

  wholesale: {
    en: {
      overview: 'Manage bulk purchase orders, tiered pricing for different buyer types, credit and payment terms, and warehouse-level stock across one or more locations.',
      features: ['Tiered/bulk pricing by buyer type', 'Credit terms and payment tracking', 'Multi-warehouse stock visibility', 'Purchase order management'],
      benefits: ['Offer different pricing tiers without manual overrides', 'Track outstanding credit across all buyers', 'See stock across every warehouse from one screen'],
      modules: ['Bulk Pricing', 'Credit Management', 'Warehouse Stock', 'Purchase Orders'],
    },
    ta: {
      overview: 'மொத்த கொள்முதல் ஆர்டர்கள், வெவ்வேறு வாங்குபவர் வகைகளுக்கான அடுக்கு விலை நிர்ணயம், கடன் மற்றும் கட்டண விதிமுறைகள், மற்றும் ஒன்று அல்லது அதற்கு மேற்பட்ட இடங்களில் கிடங்கு நிலை இருப்பை நிர்வகிக்கவும்.',
      features: ['வாங்குபவர் வகை வாரியான அடுக்கு/மொத்த விலை நிர்ணயம்', 'கடன் விதிமுறைகள் மற்றும் கட்டண கண்காணிப்பு', 'பல கிடங்கு இருப்பு காட்சி', 'கொள்முதல் ஆர்டர் மேலாண்மை'],
      benefits: ['கைமுறை மேலெழுதுதல் இல்லாமல் வெவ்வேறு விலை அடுக்குகளை வழங்கும்', 'அனைத்து வாங்குபவர்கள் முழுவதும் நிலுவையிலுள்ள கடனைக் கண்காணிக்கும்', 'ஒரே திரையில் இருந்து ஒவ்வொரு கிடங்கிலும் இருப்பைக் காணும்'],
      modules: ['மொத்த விலை நிர்ணயம்', 'கடன் மேலாண்மை', 'கிடங்கு இருப்பு', 'கொள்முதல் ஆர்டர்கள்'],
    },
  },

  retail: {
    en: {
      overview: 'A complete retail operation in one system — POS billing, inventory across branches, customer loyalty tracking, and sales analytics to guide pricing and stocking.',
      features: ['Multi-branch POS billing', 'Cross-branch inventory sync', 'Customer loyalty tracking', 'Sales analytics by product and branch'],
      benefits: ['Run every branch on one consistent system', 'Understand which products perform where', 'Build customer loyalty with tracked purchase history'],
      modules: ['POS Billing', 'Multi-Branch Inventory', 'Loyalty Program', 'Sales Analytics'],
    },
    ta: {
      overview: 'ஒரே அமைப்பில் முழுமையான சில்லறை விற்பனை செயல்பாடு — POS பில்லிங், கிளைகள் முழுவதும் இருப்பு, வாடிக்கையாளர் விசுவாசம் கண்காணிப்பு, மற்றும் விலை நிர்ணயம் மற்றும் இருப்பை வழிநடத்த விற்பனை பகுப்பாய்வு.',
      features: ['பல கிளை POS பில்லிங்', 'கிளைகளுக்கு இடையேயான இருப்பு ஒத்திசைவு', 'வாடிக்கையாளர் விசுவாசம் கண்காணிப்பு', 'தயாரிப்பு மற்றும் கிளை வாரியான விற்பனை பகுப்பாய்வு'],
      benefits: ['ஒரே சீரான அமைப்பில் ஒவ்வொரு கிளையையும் இயக்கும்', 'எந்த தயாரிப்புகள் எங்கே சிறப்பாக செயல்படுகின்றன என்பதைப் புரிந்துகொள்ளும்', 'கண்காணிக்கப்பட்ட வாங்குதல் வரலாற்றுடன் வாடிக்கையாளர் விசுவாசத்தை உருவாக்கும்'],
      modules: ['POS பில்லிங்', 'பல கிளை இருப்பு', 'விசுவாச திட்டம்', 'விற்பனை பகுப்பாய்வு'],
    },
  },

  pharmacies: {
    en: {
      overview: 'Batch and expiry-tracked medicine inventory, prescription record-keeping, and GST-compliant billing — built to meet the accuracy and compliance pharmacies require.',
      features: ['Batch and expiry-tracked stock', 'Prescription record-keeping', 'GST-compliant billing', 'Drug interaction and stock alerts'],
      benefits: ['Reduce risk of dispensing expired stock', 'Maintain compliant, auditable records', 'Speed up billing while staying accurate'],
      modules: ['Medicine Inventory', 'Prescription Records', 'GST Billing', 'Compliance Reports'],
    },
    ta: {
      overview: 'தொகுதி மற்றும் காலாவதி கண்காணிக்கப்பட்ட மருந்து இருப்பு, மருந்துச் சீட்டு பதிவு வைத்தல், மற்றும் ஜிஎஸ்டி-இணக்கமான பில்லிங் — மருந்தகங்களுக்குத் தேவையான துல்லியம் மற்றும் இணக்கத்தை பூர்த்தி செய்ய உருவாக்கப்பட்டது.',
      features: ['தொகுதி மற்றும் காலாவதி கண்காணிக்கப்பட்ட இருப்பு', 'மருந்துச் சீட்டு பதிவு வைத்தல்', 'ஜிஎஸ்டி-இணக்கமான பில்லிங்', 'மருந்து இடையீடு மற்றும் இருப்பு எச்சரிக்கைகள்'],
      benefits: ['காலாவதியான இருப்பை வழங்கும் அபாயத்தைக் குறைக்கும்', 'இணக்கமான, தணிக்கை செய்யக்கூடிய பதிவுகளை பராமரிக்கும்', 'துல்லியத்துடன் இருக்கும்போதே பில்லிங்கை வேகப்படுத்தும்'],
      modules: ['மருந்து இருப்பு', 'மருந்துச் சீட்டு பதிவுகள்', 'ஜிஎஸ்டி பில்லிங்', 'இணக்க அறிக்கைகள்'],
    },
  },

  hospitals: {
    en: {
      overview: 'Patient billing, department-wise inventory (pharmacy, lab, general stock), and multi-user role-based access across reception, billing, pharmacy and administration.',
      features: ['Patient billing & invoicing', 'Department-wise inventory', 'Role-based staff access', 'Insurance/TPA billing support'],
      benefits: ['Reduce billing errors across departments', 'Give each department the access it needs, nothing more', 'Simplify insurance and TPA claim documentation'],
      modules: ['Patient Billing', 'Department Inventory', 'Staff Access Control', 'Insurance Billing'],
    },
    ta: {
      overview: 'நோயாளி பில்லிங், துறை வாரியான இருப்பு (மருந்தகம், ஆய்வகம், பொது இருப்பு), மற்றும் வரவேற்பு, பில்லிங், மருந்தகம் மற்றும் நிர்வாகம் முழுவதும் பல பயனர் பங்கு அடிப்படையிலான அணுகல்.',
      features: ['நோயாளி பில்லிங் & விலைப்பட்டியல்', 'துறை வாரியான இருப்பு', 'பங்கு அடிப்படையிலான ஊழியர் அணுகல்', 'காப்பீடு/TPA பில்லிங் ஆதரவு'],
      benefits: ['துறைகள் முழுவதும் பில்லிங் பிழைகளைக் குறைக்கும்', 'ஒவ்வொரு துறைக்கும் தேவையான அணுகலை மட்டும் வழங்கும்', 'காப்பீடு மற்றும் TPA உரிமைகோரல் ஆவணப்படுத்தலை எளிதாக்கும்'],
      modules: ['நோயாளி பில்லிங்', 'துறை இருப்பு', 'ஊழியர் அணுகல் கட்டுப்பாடு', 'காப்பீடு பில்லிங்'],
    },
  },

  clinics: {
    en: {
      overview: 'A lighter-weight system for independent clinics — appointment-linked billing, basic inventory for consumables, and simple daily/monthly reporting.',
      features: ['Appointment-linked billing', 'Consumables inventory', 'Simple daily/monthly reports', 'Patient visit history'],
      benefits: ['Bill patients accurately tied to each visit', 'Keep consumables stocked without over-ordering', 'See monthly performance without a full hospital system'],
      modules: ['Appointment Billing', 'Consumables Stock', 'Visit History', 'Reports'],
    },
    ta: {
      overview: 'சுயாதீன கிளினிக்குகளுக்கான இலகுவான அமைப்பு — அப்பாயிண்ட்மென்ட் இணைந்த பில்லிங், நுகர்பொருட்களுக்கான அடிப்படை இருப்பு, மற்றும் எளிய தினசரி/மாதாந்திர அறிக்கையிடல்.',
      features: ['அப்பாயிண்ட்மென்ட் இணைந்த பில்லிங்', 'நுகர்பொருள் இருப்பு', 'எளிய தினசரி/மாதாந்திர அறிக்கைகள்', 'நோயாளி வருகை வரலாறு'],
      benefits: ['ஒவ்வொரு வருகைக்கும் ஏற்ப துல்லியமாக நோயாளிகளுக்கு பில் செய்யும்', 'அதிக ஆர்டர் இல்லாமல் நுகர்பொருட்களை இருப்பு வைத்திருக்கும்', 'முழு மருத்துவமனை அமைப்பு இல்லாமல் மாதாந்திர செயல்திறனைக் காணும்'],
      modules: ['அப்பாயிண்ட்மென்ட் பில்லிங்', 'நுகர்பொருள் இருப்பு', 'வருகை வரலாறு', 'அறிக்கைகள்'],
    },
  },

  restaurants: {
    en: {
      overview: 'Table and order management linked directly to billing and kitchen inventory, with menu-level costing so you know the real margin on every dish.',
      features: ['Table & order management', 'Kitchen inventory linked to menu items', 'Menu-level costing and margins', 'Split billing and multiple payment modes'],
      benefits: ['Know true profit margin per dish, not just per meal', 'Reduce kitchen wastage with ingredient-linked stock', 'Speed up table turnover with faster billing'],
      modules: ['Table Management', 'Kitchen Inventory', 'Menu Costing', 'Billing'],
    },
    ta: {
      overview: 'பில்லிங் மற்றும் சமையலறை இருப்புடன் நேரடியாக இணைக்கப்பட்ட மேசை மற்றும் ஆர்டர் மேலாண்மை, மெனு-நிலை செலவினத்துடன் ஒவ்வொரு உணவு வகைக்கும் உண்மையான லாபத்தை அறிந்துகொள்ளுங்கள்.',
      features: ['மேசை & ஆர்டர் மேலாண்மை', 'மெனு பொருட்களுடன் இணைக்கப்பட்ட சமையலறை இருப்பு', 'மெனு-நிலை செலவினம் மற்றும் லாபம்', 'பிரிக்கப்பட்ட பில்லிங் மற்றும் பல கட்டண முறைகள்'],
      benefits: ['உணவு வகை ஒன்றுக்கு உண்மையான லாப வீதத்தை அறியும், ஒரு உணவுக்கு மட்டுமல்ல', 'பொருள்-இணைந்த இருப்புடன் சமையலறை வீணாதலைக் குறைக்கும்', 'வேகமான பில்லிங்குடன் மேசை சுழற்சியை வேகப்படுத்தும்'],
      modules: ['மேசை மேலாண்மை', 'சமையலறை இருப்பு', 'மெனு செலவினம்', 'பில்லிங்'],
    },
  },

  hotels: {
    en: {
      overview: 'Room booking and occupancy management, guest billing including food and services, and housekeeping/inventory tracking across departments.',
      features: ['Room booking & occupancy tracking', 'Consolidated guest billing (room + services)', 'Housekeeping and inventory tracking', 'Multi-department reporting'],
      benefits: ['See real-time occupancy and availability', 'Bill guests accurately across every service used', 'Coordinate housekeeping with live room status'],
      modules: ['Room Booking', 'Guest Billing', 'Housekeeping', 'Reports'],
    },
    ta: {
      overview: 'அறை முன்பதிவு மற்றும் வதிவிட மேலாண்மை, உணவு மற்றும் சேவைகள் உட்பட விருந்தினர் பில்லிங், மற்றும் துறைகள் முழுவதும் ஹவுஸ்கீப்பிங்/இருப்பு கண்காணிப்பு.',
      features: ['அறை முன்பதிவு & வதிவிட கண்காணிப்பு', 'ஒருங்கிணைந்த விருந்தினர் பில்லிங் (அறை + சேவைகள்)', 'ஹவுஸ்கீப்பிங் மற்றும் இருப்பு கண்காணிப்பு', 'பல துறை அறிக்கையிடல்'],
      benefits: ['நேரலை வதிவிடம் மற்றும் கிடைக்கும் தன்மையைக் காணும்', 'பயன்படுத்தப்பட்ட ஒவ்வொரு சேவைக்கும் ஏற்ப துல்லியமாக விருந்தினர்களுக்கு பில் செய்யும்', 'நேரலை அறை நிலையுடன் ஹவுஸ்கீப்பிங்கை ஒருங்கிணைக்கும்'],
      modules: ['அறை முன்பதிவு', 'விருந்தினர் பில்லிங்', 'ஹவுஸ்கீப்பிங்', 'அறிக்கைகள்'],
    },
  },

  'hardware-stores': {
    en: {
      overview: 'Manage thousands of SKUs across sizes, brands and units of measure, with barcode billing and supplier-linked purchasing built for hardware retail specifically.',
      features: ['Multi-unit-of-measure stock (pieces, kg, meters)', 'Barcode billing', 'Brand and size variant tracking', 'Supplier purchase management'],
      benefits: ['Handle complex unit conversions without manual math', 'Track variants (size, brand) without SKU explosion confusion', 'Reduce billing time on high-item-count transactions'],
      modules: ['Variant Inventory', 'Barcode Billing', 'Supplier Management', 'Reports'],
    },
    ta: {
      overview: 'ஹார்டுவேர் சில்லறை விற்பனைக்காக குறிப்பாக உருவாக்கப்பட்ட பார்கோடு பில்லிங் மற்றும் சப்ளையருடன் இணைக்கப்பட்ட கொள்முதலுடன், அளவுகள், பிராண்டுகள் மற்றும் அளவீட்டு அலகுகள் முழுவதும் ஆயிரக்கணக்கான பொருட்களை நிர்வகிக்கவும்.',
      features: ['பல அளவீட்டு-அலகு இருப்பு (எண்ணிக்கை, கிலோ, மீட்டர்)', 'பார்கோடு பில்லிங்', 'பிராண்ட் மற்றும் அளவு மாறுபாடு கண்காணிப்பு', 'சப்ளையர் கொள்முதல் மேலாண்மை'],
      benefits: ['கைமுறை கணக்கீடு இல்லாமல் சிக்கலான அலகு மாற்றங்களைக் கையாளும்', 'பொருள் எண்ணிக்கை குழப்பம் இல்லாமல் மாறுபாடுகளை (அளவு, பிராண்ட்) கண்காணிக்கும்', 'அதிக பொருள் எண்ணிக்கை பரிவர்த்தனைகளில் பில்லிங் நேரத்தைக் குறைக்கும்'],
      modules: ['மாறுபாடு இருப்பு', 'பார்கோடு பில்லிங்', 'சப்ளையர் மேலாண்மை', 'அறிக்கைகள்'],
    },
  },

  'service-businesses': {
    en: {
      overview: 'Job/ticket-based billing for service work, technician scheduling, parts inventory tracking, and customer service history — built for repair, maintenance and service providers.',
      features: ['Job/ticket-based billing', 'Technician scheduling', 'Parts and consumables inventory', 'Customer service history'],
      benefits: ['Bill accurately for labor and parts together', 'Schedule technicians without double-booking', 'Reference full service history for repeat customers'],
      modules: ['Job Billing', 'Technician Scheduling', 'Parts Inventory', 'Service History'],
    },
    ta: {
      overview: 'பழுதுபார்ப்பு, பராமரிப்பு மற்றும் சேவை வழங்குநர்களுக்காக உருவாக்கப்பட்ட, சேவை வேலைக்கான வேலை/டிக்கெட் அடிப்படையிலான பில்லிங், தொழில்நுட்பர் அட்டவணையிடல், பாகங்கள் இருப்பு கண்காணிப்பு மற்றும் வாடிக்கையாளர் சேவை வரலாறு.',
      features: ['வேலை/டிக்கெட் அடிப்படையிலான பில்லிங்', 'தொழில்நுட்பர் அட்டவணையிடல்', 'பாகங்கள் மற்றும் நுகர்பொருட்கள் இருப்பு', 'வாடிக்கையாளர் சேவை வரலாறு'],
      benefits: ['தொழிலாளர் மற்றும் பாகங்கள் இரண்டிற்கும் ஏற்ப துல்லியமாக பில் செய்யும்', 'இரட்டை முன்பதிவு இல்லாமல் தொழில்நுட்பர்களை அட்டவணையிடும்', 'மீண்டும் வரும் வாடிக்கையாளர்களுக்கு முழு சேவை வரலாற்றைக் குறிப்பிடும்'],
      modules: ['வேலை பில்லிங்', 'தொழில்நுட்பர் அட்டவணையிடல்', 'பாகங்கள் இருப்பு', 'சேவை வரலாறு'],
    },
  },

  'custom-enterprises': {
    en: {
      overview: "For businesses that don't fit a standard category — we start from your actual workflow and build the modules you need, combining billing, inventory, dashboards and automation in whatever configuration fits.",
      features: ['Custom workflow discovery', 'Modular feature selection', 'Bespoke dashboard and reporting design', 'Ongoing configuration support'],
      benefits: ['Get software shaped around your business, not a template', 'Only pay for the modules your business actually needs', 'Have a direct line to the team that configured your system'],
      modules: ['Discovery & Scoping', 'Modular Configuration', 'Custom Dashboards', 'Ongoing Support'],
    },
    ta: {
      overview: 'நிலையான வகைக்கு பொருந்தாத வணிகங்களுக்காக — உங்கள் உண்மையான பணிப்பாய்வில் இருந்து தொடங்கி, பொருந்தும் எந்த கட்டமைப்பிலும் பில்லிங், இருப்பு, வரைபடங்கள் அடங்கிய தகவல் பலகைகள் மற்றும் ஆட்டோமேஷனை இணைத்து உங்களுக்குத் தேவையான தொகுதிகளை உருவாக்குகிறோம்.',
      features: ['தனிப்பயன் பணிப்பாய்வு கண்டறிதல்', 'தொகுதி வாரியான அம்ச தேர்வு', 'தனிப்பயன் வரைபடங்கள் அடங்கிய தகவல் பலகை மற்றும் அறிக்கையிடல் வடிவமைப்பு', 'தொடர்ச்சியான கட்டமைப்பு ஆதரவு'],
      benefits: ['ஒரு டெம்ப்ளேட் அல்ல, உங்கள் வணிகத்திற்கு ஏற்ப வடிவமைக்கப்பட்ட மென்பொருளைப் பெறும்', 'உங்கள் வணிகத்திற்கு உண்மையில் தேவையான தொகுதிகளுக்கு மட்டும் பணம் செலுத்தும்', 'உங்கள் அமைப்பை கட்டமைத்த குழுவுடன் நேரடி தொடர்பு கொள்ளும்'],
      modules: ['கண்டறிதல் & நோக்கம்', 'தொகுதி கட்டமைப்பு', 'தனிப்பயன் வரைபடங்கள் அடங்கிய தகவல் பலகைகள்', 'தொடர்ச்சியான ஆதரவு'],
    },
  },

  'hair-salons': {
    en: {
      overview: 'Appointment scheduling, service-wise billing, and stock tracking for the shampoos, colors and styling products every salon depends on — built for chains and single-chair salons alike.',
      features: ['Appointment scheduling & reminders', 'Service and package-wise billing', 'Product & consumables inventory', 'Stylist-wise performance tracking'],
      benefits: ['Reduce no-shows with automated reminders', 'Bill accurately for combined service + product sales', 'Know which products need reordering before you run out'],
      modules: ['Appointments', 'Service Billing', 'Product Inventory', 'Stylist Performance'],
    },
    ta: {
      overview: 'ஒவ்வொரு சலூனும் சார்ந்திருக்கும் ஷாம்பூ, கலர் மற்றும் ஸ்டைலிங் பொருட்களுக்கான அப்பாயிண்ட்மென்ட் அட்டவணையிடல், சேவை வாரியான பில்லிங் மற்றும் இருப்பு கண்காணிப்பு — செயின் சலூன்களுக்கும் ஒற்றை நாற்காலி சலூன்களுக்கும் ஏற்றது.',
      features: ['அப்பாயிண்ட்மென்ட் அட்டவணையிடல் & நினைவூட்டல்கள்', 'சேவை மற்றும் பேக்கேஜ் வாரியான பில்லிங்', 'பொருள் & நுகர்பொருள் இருப்பு', 'ஸ்டைலிஸ்ட் வாரியான செயல்திறன் கண்காணிப்பு'],
      benefits: ['தானியங்கி நினைவூட்டல்களுடன் வராதவர்களைக் குறைக்கும்', 'சேவை + பொருள் விற்பனை இணைந்ததற்கு துல்லியமாக பில் செய்யும்', 'தீர்வதற்கு முன் எந்த பொருட்கள் மறு-ஆர்டர் செய்யப்பட வேண்டும் என்பதை அறியும்'],
      modules: ['அப்பாயிண்ட்மென்ட்கள்', 'சேவை பில்லிங்', 'பொருள் இருப்பு', 'ஸ்டைலிஸ்ட் செயல்திறன்'],
    },
  },

  'photo-studios': {
    en: {
      overview: 'Package-based billing for shoots and events, booking calendar management, and order tracking from shoot to delivered album — built for studios juggling multiple bookings a day.',
      features: ['Booking calendar management', 'Package & add-on billing', 'Order and delivery tracking', 'Advance payment and balance tracking'],
      benefits: ['Avoid double-booking shoots and events', 'Bill packages and add-ons without manual recalculation', 'Track every order from shoot day to delivery'],
      modules: ['Booking Calendar', 'Package Billing', 'Order Tracking', 'Payments'],
    },
    ta: {
      overview: 'படப்பிடிப்புகள் மற்றும் நிகழ்வுகளுக்கான பேக்கேஜ் அடிப்படையிலான பில்லிங், முன்பதிவு காலண்டர் மேலாண்மை, மற்றும் படப்பிடிப்பிலிருந்து வழங்கப்பட்ட ஆல்பம் வரை ஆர்டர் கண்காணிப்பு — ஒரு நாளைக்கு பல முன்பதிவுகளை கையாளும் ஸ்டுடியோக்களுக்கு ஏற்றது.',
      features: ['முன்பதிவு காலண்டர் மேலாண்மை', 'பேக்கேஜ் & கூடுதல் பில்லிங்', 'ஆர்டர் மற்றும் விநியோக கண்காணிப்பு', 'முன்பணம் மற்றும் மீதி கண்காணிப்பு'],
      benefits: ['படப்பிடிப்புகள் மற்றும் நிகழ்வுகளின் இரட்டை முன்பதிவைத் தவிர்க்கும்', 'கைமுறை மறு-கணக்கீடு இல்லாமல் பேக்கேஜ்கள் மற்றும் கூடுதல்களுக்கு பில் செய்யும்', 'படப்பிடிப்பு நாளிலிருந்து விநியோகம் வரை ஒவ்வொரு ஆர்டரையும் கண்காணிக்கும்'],
      modules: ['முன்பதிவு காலண்டர்', 'பேக்கேஜ் பில்லிங்', 'ஆர்டர் கண்காணிப்பு', 'கட்டணங்கள்'],
    },
  },

  'handicrafts-arts-shops': {
    en: {
      overview: 'Track one-of-a-kind and made-to-order inventory, manage custom order timelines, and bill artisan-made goods accurately — built for shops where every piece can be different.',
      features: ['Custom & made-to-order tracking', 'One-of-a-kind item inventory', 'Artisan/maker-wise stock attribution', 'Order timeline management'],
      benefits: ['Keep track of inventory that never has two identical items', 'Manage custom order deadlines without spreadsheets', 'Know which artisan made which piece for reordering'],
      modules: ['Custom Orders', 'Unique Item Inventory', 'Artisan Tracking', 'Billing'],
    },
    ta: {
      overview: 'தனித்துவமான மற்றும் ஆர்டர் செய்யப்பட்ட இருப்பைக் கண்காணிக்கவும், தனிப்பயன் ஆர்டர் காலவரிசைகளை நிர்வகிக்கவும், கைவினைஞர் தயாரித்த பொருட்களுக்கு துல்லியமாக பில் செய்யவும் — ஒவ்வொரு பொருளும் வேறுபடக்கூடிய கடைகளுக்கு ஏற்றது.',
      features: ['தனிப்பயன் & ஆர்டர் அடிப்படையிலான கண்காணிப்பு', 'தனித்துவமான பொருள் இருப்பு', 'கைவினைஞர் வாரியான இருப்பு பொறுப்பு', 'ஆர்டர் காலவரிசை மேலாண்மை'],
      benefits: ['ஒரே மாதிரியான இரண்டு பொருட்கள் இல்லாத இருப்பைக் கண்காணிக்கும்', 'ஸ்பிரெட்ஷீட்கள் இல்லாமல் தனிப்பயன் ஆர்டர் காலக்கெடுவை நிர்வகிக்கும்', 'மறு-ஆர்டருக்காக எந்த கைவினைஞர் எந்த பொருளை தயாரித்தார் என்பதை அறியும்'],
      modules: ['தனிப்பயன் ஆர்டர்கள்', 'தனித்துவமான பொருள் இருப்பு', 'கைவினைஞர் கண்காணிப்பு', 'பில்லிங்'],
    },
  },

  cafeterias: {
    en: {
      overview: 'Fast counter billing for high-turnover food service, daily ingredient stock tracking, and simple menu management — built for cafeterias serving large numbers of people quickly.',
      features: ['Quick-counter billing', 'Daily ingredient stock tracking', 'Simple menu & pricing management', 'Shift-wise sales reports'],
      benefits: ['Serve high-volume crowds without checkout delays', 'Reduce ingredient wastage with daily tracking', 'See which shift or meal period performs best'],
      modules: ['Quick Billing', 'Ingredient Stock', 'Menu Management', 'Shift Reports'],
    },
    ta: {
      overview: 'அதிக நடமாட்டமுள்ள உணவு சேவைக்கான வேகமான கவுண்டர் பில்லிங், தினசரி பொருள் இருப்பு கண்காணிப்பு, மற்றும் எளிய மெனு மேலாண்மை — அதிக எண்ணிக்கையிலான மக்களுக்கு விரைவாக சேவை செய்யும் கஃபெடீரியாக்களுக்கு ஏற்றது.',
      features: ['விரைவு-கவுண்டர் பில்லிங்', 'தினசரி பொருள் இருப்பு கண்காணிப்பு', 'எளிய மெனு & விலை மேலாண்மை', 'ஷிப்ட் வாரியான விற்பனை அறிக்கைகள்'],
      benefits: ['செக்அவுட் தாமதங்கள் இல்லாமல் அதிக கூட்டத்திற்கு சேவை செய்யும்', 'தினசரி கண்காணிப்புடன் பொருள் வீணாதலைக் குறைக்கும்', 'எந்த ஷிப்ட் அல்லது உணவு நேரம் சிறப்பாக செயல்படுகிறது என்பதைக் காணும்'],
      modules: ['விரைவு பில்லிங்', 'பொருள் இருப்பு', 'மெனு மேலாண்மை', 'ஷிப்ட் அறிக்கைகள்'],
    },
  },

  'ice-cream-shops': {
    en: {
      overview: 'Flavor-wise stock and wastage tracking, fast counter billing for walk-in customers, and seasonal demand insights — built for shops where inventory can melt away if not tracked closely.',
      features: ['Flavor-wise stock tracking', 'Quick-counter billing', 'Wastage and spoilage logging', 'Seasonal demand insights'],
      benefits: ['Know exactly which flavors are running low before they sell out', 'Reduce wastage losses from unsold stock', 'Plan seasonal stock ahead of summer demand spikes'],
      modules: ['Flavor Inventory', 'Quick Billing', 'Wastage Tracking', 'Seasonal Planning'],
    },
    ta: {
      overview: 'சுவை வாரியான இருப்பு மற்றும் வீணாதல் கண்காணிப்பு, நடமாடி வரும் வாடிக்கையாளர்களுக்கான வேகமான கவுண்டர் பில்லிங், மற்றும் பருவகால தேவை நுண்ணறிவு — நெருக்கமாக கண்காணிக்கப்படாவிட்டால் இருப்பு உருகிவிடக்கூடிய கடைகளுக்கு ஏற்றது.',
      features: ['சுவை வாரியான இருப்பு கண்காணிப்பு', 'விரைவு-கவுண்டர் பில்லிங்', 'வீணாதல் பதிவு', 'பருவகால தேவை நுண்ணறிவு'],
      benefits: ['தீர்வதற்கு முன் எந்த சுவைகள் குறைவாக உள்ளன என்பதைத் துல்லியமாக அறியும்', 'விற்பனையாகாத இருப்பால் ஏற்படும் வீண் இழப்புகளைக் குறைக்கும்', 'கோடைகால தேவை உச்சத்திற்கு முன் பருவகால இருப்பைத் திட்டமிடும்'],
      modules: ['சுவை இருப்பு', 'விரைவு பில்லிங்', 'வீணாதல் கண்காணிப்பு', 'பருவகால திட்டமிடல்'],
    },
  },

  'dress-shops': {
    en: {
      overview: 'Size, color and style variant tracking, seasonal collection management, and billing that handles complex apparel SKUs without confusion — built for garment and dress retailers.',
      features: ['Size/color/style variant tracking', 'Seasonal collection management', 'Barcode billing', 'Trial-room and exchange handling'],
      benefits: ['Manage hundreds of size/color combinations without SKU chaos', 'Plan seasonal collections around what actually sold', 'Handle exchanges and returns without losing stock accuracy'],
      modules: ['Variant Inventory', 'Collection Management', 'Billing', 'Exchanges'],
    },
    ta: {
      overview: 'அளவு, வண்ணம் மற்றும் பாணி மாறுபாடு கண்காணிப்பு, பருவகால சேகரிப்பு மேலாண்மை, மற்றும் சிக்கலான ஆடை பொருட்களை குழப்பமின்றி கையாளும் பில்லிங் — ஆடை மற்றும் உடை சில்லறை விற்பனையாளர்களுக்கு ஏற்றது.',
      features: ['அளவு/வண்ணம்/பாணி மாறுபாடு கண்காணிப்பு', 'பருவகால சேகரிப்பு மேலாண்மை', 'பார்கோடு பில்லிங்', 'டிரையல்-ரூம் மற்றும் மாற்று கையாளுதல்'],
      benefits: ['பொருள் குழப்பம் இல்லாமல் நூற்றுக்கணக்கான அளவு/வண்ண சேர்க்கைகளை நிர்வகிக்கும்', 'உண்மையில் விற்பனையான பொருட்களின் அடிப்படையில் பருவகால சேகரிப்புகளைத் திட்டமிடும்', 'இருப்பு துல்லியத்தை இழக்காமல் மாற்றுகள் மற்றும் திரும்பப்பெறுதல்களைக் கையாளும்'],
      modules: ['மாறுபாடு இருப்பு', 'சேகரிப்பு மேலாண்மை', 'பில்லிங்', 'மாற்றுகள்'],
    },
  },

  'electrical-shops': {
    en: {
      overview: 'Barcode billing with warranty tracking for switches, wiring, and electrical fittings, plus supplier-linked purchasing — built for shops stocking hundreds of small, similar-looking parts.',
      features: ['Barcode billing', 'Product warranty tracking', 'Supplier purchase management', 'Low-stock alerts for fast-moving parts'],
      benefits: ['Bill quickly even with hundreds of small similar parts', 'Track warranty claims without paper records', 'Never run out of the fittings customers ask for most'],
      modules: ['Barcode Billing', 'Warranty Tracking', 'Supplier Management', 'Stock Alerts'],
    },
    ta: {
      overview: 'சுவிட்சுகள், வயரிங் மற்றும் மின்சார பொருத்துதல்களுக்கான வாரண்டி கண்காணிப்புடன் பார்கோடு பில்லிங், மேலும் சப்ளையருடன் இணைக்கப்பட்ட கொள்முதல் — ஒரே மாதிரியாகத் தோன்றும் நூற்றுக்கணக்கான சிறிய பாகங்களை இருப்பு வைக்கும் கடைகளுக்கு ஏற்றது.',
      features: ['பார்கோடு பில்லிங்', 'பொருள் வாரண்டி கண்காணிப்பு', 'சப்ளையர் கொள்முதல் மேலாண்மை', 'வேகமாக விற்பனையாகும் பாகங்களுக்கான குறைந்த இருப்பு எச்சரிக்கைகள்'],
      benefits: ['ஒரே மாதிரியான நூற்றுக்கணக்கான சிறிய பாகங்களுடன் கூட வேகமாக பில் செய்யும்', 'காகித பதிவுகள் இல்லாமல் வாரண்டி உரிமைகோரல்களைக் கண்காணிக்கும்', 'வாடிக்கையாளர்கள் அதிகம் கேட்கும் பொருத்துதல்கள் ஒருபோதும் தீராது'],
      modules: ['பார்கோடு பில்லிங்', 'வாரண்டி கண்காணிப்பு', 'சப்ளையர் மேலாண்மை', 'இருப்பு எச்சரிக்கைகள்'],
    },
  },

  'electronics-shops': {
    en: {
      overview: 'Serial-number and warranty tracking for TVs, appliances and gadgets, EMI/installment billing support, and service-request logging — built for electronics retailers and repair counters.',
      features: ['Serial number & warranty tracking', 'EMI/installment billing support', 'Service request logging', 'Brand-wise inventory management'],
      benefits: ['Trace any unit back to its exact warranty status instantly', 'Offer EMI billing without a separate finance tool', 'Track repair/service requests alongside sales'],
      modules: ['Serial & Warranty Tracking', 'EMI Billing', 'Service Requests', 'Inventory'],
    },
    ta: {
      overview: 'டிவிக்கள், சாதனங்கள் மற்றும் கேட்ஜெட்டுகளுக்கான சீரியல் எண் மற்றும் வாரண்டி கண்காணிப்பு, EMI/தவணை பில்லிங் ஆதரவு, மற்றும் சேவை கோரிக்கை பதிவு — எலக்ட்ரானிக்ஸ் சில்லறை விற்பனையாளர்கள் மற்றும் பழுதுபார்ப்பு கவுண்டர்களுக்கு ஏற்றது.',
      features: ['சீரியல் எண் & வாரண்டி கண்காணிப்பு', 'EMI/தவணை பில்லிங் ஆதரவு', 'சேவை கோரிக்கை பதிவு', 'பிராண்ட் வாரியான இருப்பு மேலாண்மை'],
      benefits: ['எந்த யூனிட்டையும் அதன் சரியான வாரண்டி நிலைக்கு உடனடியாக கண்டறியும்', 'தனி நிதி கருவி இல்லாமல் EMI பில்லிங்கை வழங்கும்', 'விற்பனையுடன் பழுதுபார்ப்பு/சேவை கோரிக்கைகளைக் கண்காணிக்கும்'],
      modules: ['சீரியல் & வாரண்டி கண்காணிப்பு', 'EMI பில்லிங்', 'சேவை கோரிக்கைகள்', 'இருப்பு'],
    },
  },

  'footwear-shops': {
    en: {
      overview: "Size and brand variant tracking across men's, women's and kids' footwear, barcode billing, and seasonal stock planning — built for shoe retailers managing dozens of sizes per style.",
      features: ['Size/brand variant tracking', 'Barcode billing', 'Seasonal stock planning', 'Exchange and return handling'],
      benefits: ['Manage every size from kids to adults without SKU confusion', 'Bill quickly during festival and sale rush hours', 'Plan seasonal stock around what sizes actually sell'],
      modules: ['Variant Inventory', 'Barcode Billing', 'Seasonal Planning', 'Exchanges'],
    },
    ta: {
      overview: 'ஆண்கள், பெண்கள் மற்றும் குழந்தைகள் காலணிகள் முழுவதும் அளவு மற்றும் பிராண்ட் மாறுபாடு கண்காணிப்பு, பார்கோடு பில்லிங், மற்றும் பருவகால இருப்பு திட்டமிடல் — ஒரு பாணிக்கு டஜன் கணக்கான அளவுகளை நிர்வகிக்கும் காலணி சில்லறை விற்பனையாளர்களுக்கு ஏற்றது.',
      features: ['அளவு/பிராண்ட் மாறுபாடு கண்காணிப்பு', 'பார்கோடு பில்லிங்', 'பருவகால இருப்பு திட்டமிடல்', 'மாற்று மற்றும் திரும்பப்பெறுதல் கையாளுதல்'],
      benefits: ['பொருள் குழப்பம் இல்லாமல் குழந்தைகள் முதல் பெரியவர்கள் வரை ஒவ்வொரு அளவையும் நிர்வகிக்கும்', 'திருவிழா மற்றும் விற்பனை நெரிசல் நேரங்களில் வேகமாக பில் செய்யும்', 'உண்மையில் விற்பனையாகும் அளவுகளின் அடிப்படையில் பருவகால இருப்பைத் திட்டமிடும்'],
      modules: ['மாறுபாடு இருப்பு', 'பார்கோடு பில்லிங்', 'பருவகால திட்டமிடல்', 'மாற்றுகள்'],
    },
  },

  'manufacturing-industries': {
    en: {
      overview: 'Raw material to finished goods stock tracking, production batch costing, and multi-stage inventory visibility — built for manufacturers who need to know exactly what a batch actually costs.',
      features: ['Raw material & finished goods tracking', 'Production batch costing', 'Multi-stage inventory visibility', 'Supplier and purchase order management'],
      benefits: ['Know the true cost of every production batch', 'Track material through every stage of production', 'Reduce raw material wastage with better visibility'],
      modules: ['Raw Material Inventory', 'Production Costing', 'Batch Tracking', 'Purchase Orders'],
    },
    ta: {
      overview: 'மூலப்பொருள் முதல் முடிக்கப்பட்ட பொருள் வரை இருப்பு கண்காணிப்பு, உற்பத்தி தொகுதி செலவினம், மற்றும் பல-நிலை இருப்பு காட்சி — ஒரு தொகுதியின் உண்மையான செலவை துல்லியமாக அறிய வேண்டிய உற்பத்தியாளர்களுக்கு ஏற்றது.',
      features: ['மூலப்பொருள் & முடிக்கப்பட்ட பொருள் கண்காணிப்பு', 'உற்பத்தி தொகுதி செலவினம்', 'பல-நிலை இருப்பு காட்சி', 'சப்ளையர் மற்றும் கொள்முதல் ஆர்டர் மேலாண்மை'],
      benefits: ['ஒவ்வொரு உற்பத்தி தொகுதியின் உண்மையான செலவை அறியும்', 'உற்பத்தியின் ஒவ்வொரு நிலையிலும் பொருளைக் கண்காணிக்கும்', 'சிறந்த காட்சியுடன் மூலப்பொருள் வீணாதலைக் குறைக்கும்'],
      modules: ['மூலப்பொருள் இருப்பு', 'உற்பத்தி செலவினம்', 'தொகுதி கண்காணிப்பு', 'கொள்முதல் ஆர்டர்கள்'],
    },
  },

  'mobile-gadgets-shops': {
    en: {
      overview: 'IMEI and warranty tracking for phones and gadgets, EMI billing support, and accessory inventory management — built for mobile retailers handling both high-value devices and small accessories.',
      features: ['IMEI & warranty tracking', 'EMI/installment billing support', 'Accessory inventory management', 'Buyback and exchange handling'],
      benefits: ['Trace any device back to its IMEI and warranty status instantly', 'Offer EMI options without a separate finance system', 'Manage high-value devices and small accessories in one system'],
      modules: ['IMEI Tracking', 'EMI Billing', 'Accessory Inventory', 'Exchanges'],
    },
    ta: {
      overview: 'மொபைல் மற்றும் கேட்ஜெட்டுகளுக்கான IMEI மற்றும் வாரண்டி கண்காணிப்பு, EMI பில்லிங் ஆதரவு, மற்றும் அணுகுசாதன இருப்பு மேலாண்மை — அதிக மதிப்புள்ள சாதனங்கள் மற்றும் சிறிய அணுகுசாதனங்கள் இரண்டையும் கையாளும் மொபைல் சில்லறை விற்பனையாளர்களுக்கு ஏற்றது.',
      features: ['IMEI & வாரண்டி கண்காணிப்பு', 'EMI/தவணை பில்லிங் ஆதரவு', 'அணுகுசாதன இருப்பு மேலாண்மை', 'பைபேக் மற்றும் மாற்று கையாளுதல்'],
      benefits: ['எந்த சாதனத்தையும் அதன் IMEI மற்றும் வாரண்டி நிலைக்கு உடனடியாக கண்டறியும்', 'தனி நிதி அமைப்பு இல்லாமல் EMI விருப்பங்களை வழங்கும்', 'அதிக மதிப்புள்ள சாதனங்கள் மற்றும் சிறிய அணுகுசாதனங்களை ஒரே அமைப்பில் நிர்வகிக்கும்'],
      modules: ['IMEI கண்காணிப்பு', 'EMI பில்லிங்', 'அணுகுசாதன இருப்பு', 'மாற்றுகள்'],
    },
  },

  'perfume-shops': {
    en: {
      overview: 'Brand, fragrance and volume variant tracking, batch/expiry management for delicate stock, and billing built for a category where small bottles carry large price differences.',
      features: ['Brand/fragrance/volume variant tracking', 'Batch and expiry tracking', 'Barcode billing', 'Tester and sample stock management'],
      benefits: ['Track hundreds of similar-looking bottles without mix-ups', 'Manage expiry on delicate stock proactively', 'Separate tester/sample stock from sellable inventory accurately'],
      modules: ['Variant Inventory', 'Expiry Tracking', 'Billing', 'Tester Management'],
    },
    ta: {
      overview: 'பிராண்ட், வாசனை மற்றும் அளவு மாறுபாடு கண்காணிப்பு, மென்மையான இருப்புக்கான தொகுதி/காலாவதி மேலாண்மை, மற்றும் சிறிய பாட்டில்கள் பெரிய விலை வேறுபாடுகளைக் கொண்டிருக்கும் வகைக்கு ஏற்ப கட்டமைக்கப்பட்ட பில்லிங்.',
      features: ['பிராண்ட்/வாசனை/அளவு மாறுபாடு கண்காணிப்பு', 'தொகுதி மற்றும் காலாவதி கண்காணிப்பு', 'பார்கோடு பில்லிங்', 'டெஸ்டர் மற்றும் மாதிரி இருப்பு மேலாண்மை'],
      benefits: ['குழப்பமின்றி ஒரே மாதிரியான நூற்றுக்கணக்கான பாட்டில்களைக் கண்காணிக்கும்', 'மென்மையான இருப்பில் காலாவதியை முன்கூட்டியே நிர்வகிக்கும்', 'டெஸ்டர்/மாதிரி இருப்பை விற்பனை செய்யக்கூடிய இருப்பிலிருந்து துல்லியமாக பிரிக்கும்'],
      modules: ['மாறுபாடு இருப்பு', 'காலாவதி கண்காணிப்பு', 'பில்லிங்', 'டெஸ்டர் மேலாண்மை'],
    },
  },
}
