/**
 * Single source of truth for site-wide content that multiple components
 * and pages consume: primary navigation, the Solutions mega menu, the
 * Industries list, and company contact details. Keeping this in one place
 * means the navbar, footer, sitemap, and individual Solutions/Industries
 * pages (Module 4/5) never drift out of sync with each other.
 *
 * Bilingual fields: every SOLUTIONS/INDUSTRIES entry carries both English
 * (`name`/`description`) and Tamil (`nameTa`/`descriptionTa`) values.
 * Components pick the right one via localizedName()/localizedDescription()
 * below rather than duplicating the ternary everywhere.
 */
import {
  Receipt,
  Boxes,
  LayoutDashboard,
  FileSpreadsheet,
  LineChart,
  ClipboardList,
  Building2,
  Workflow,
  Code2,
  Sprout,
  Wheat,
  Plane,
  Coffee,
  Croissant,
  ShoppingBasket,
  Warehouse,
  Store,
  Pill,
  HeartPulse,
  Stethoscope,
  UtensilsCrossed,
  Hotel,
  Hammer,
  Wrench,
  Building,
  Scissors,
  Camera,
  Palette,
  Sandwich,
  IceCreamCone,
  Shirt,
  Plug,
  Cpu,
  Footprints,
  Factory,
  Tablet,
  SprayCan,
} from 'lucide-react'

export const COMPANY = {
  name: 'CoreStone Technologies',
  tagline: 'Smart Software Solutions for Every Business',
  contactPerson: 'Fernandas',
  phoneDisplay: '+91 77081 96424',
  phoneRaw: '917708196424',
  email: 'corestonetech2026@gmail.com',
  whatsappNumber: '917708196424',
  social: {
    linkedin: 'https://www.linkedin.com/in/corestone-technology-6046a9428',
    instagram: 'https://www.instagram.com/corestonetech2026/',
    twitter: 'https://x.com/corestonetech',
  },
}

export const SOLUTIONS = [
  {
    slug: 'billing-software',
    name: 'Billing Software',
    nameTa: 'பில்லிங் மென்பொருள்',
    icon: Receipt,
    description: 'Fast, accurate invoicing built for high-volume counters.',
    descriptionTa: 'அதிக நெரிசலான கவுண்டர்களுக்கு ஏற்ப வேகமான, துல்லியமான விலைப்பட்டியல் தயாரித்தல்.',
  },
  {
    slug: 'inventory-management',
    name: 'Inventory Management',
    nameTa: 'இன்வென்டரி மேலாண்மை',
    icon: Boxes,
    description: 'Real-time stock visibility across locations and SKUs.',
    descriptionTa: 'இடங்கள் மற்றும் பொருட்கள் முழுவதும் நேரலை இருப்பு காட்சி.',
  },
  {
    slug: 'business-dashboards',
    name: 'Business Dashboards',
    nameTa: 'வணிக வரைபடங்கள் அடங்கிய தகவல் பலகைகள்',
    icon: LayoutDashboard,
    description: 'Live, role-based views into how the business is doing.',
    descriptionTa: 'வணிகம் எப்படி செயல்படுகிறது என்பதற்கான நேரலை, பங்கு அடிப்படையிலான காட்சிகள்.',
  },
  {
    slug: 'gst-billing',
    name: 'GST Billing',
    nameTa: 'ஜிஎஸ்டி பில்லிங்',
    icon: FileSpreadsheet,
    description: 'Compliant tax invoicing with automatic GST calculation.',
    descriptionTa: 'தானியங்கி ஜிஎஸ்டி கணக்கீட்டுடன் இணக்கமான வரி விலைப்பட்டியல்.',
  },
  {
    slug: 'sales-analytics',
    name: 'Sales Analytics',
    nameTa: 'விற்பனை பகுப்பாய்வு',
    icon: LineChart,
    description: 'Understand what is selling, where, and to whom.',
    descriptionTa: 'என்ன விற்பனையாகிறது, எங்கே, யாருக்கு என்பதைப் புரிந்துகொள்ளுங்கள்.',
  },
  {
    slug: 'business-reports',
    name: 'Business Reports',
    nameTa: 'வணிக அறிக்கைகள்',
    icon: ClipboardList,
    description: 'Daily, weekly and monthly reports, generated automatically.',
    descriptionTa: 'தினசரி, வாராந்திர மற்றும் மாதாந்திர அறிக்கைகள், தானாகவே உருவாக்கப்படும்.',
  },
  {
    slug: 'custom-erp',
    name: 'Custom ERP',
    nameTa: 'தனிப்பயன் ERP',
    icon: Building2,
    description: 'One system connecting purchasing, stock, sales and staff.',
    descriptionTa: 'கொள்முதல், இருப்பு, விற்பனை மற்றும் ஊழியர்களை இணைக்கும் ஒரே அமைப்பு.',
  },
  {
    slug: 'business-automation',
    name: 'Business Automation',
    nameTa: 'வணிக ஆட்டோமேஷன்',
    icon: Workflow,
    description: 'Remove the manual, repetitive work from daily operations.',
    descriptionTa: 'தினசரி செயல்பாடுகளில் இருந்து கைமுறை, மீண்டும் மீண்டும் வரும் வேலையை நீக்குங்கள்.',
  },
  {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    nameTa: 'தனிப்பயன் மென்பொருள் மேம்பாடு',
    icon: Code2,
    description: 'Software built around how your business actually runs.',
    descriptionTa: 'உங்கள் வணிகம் உண்மையில் இயங்கும் விதத்திற்கு ஏற்ப கட்டமைக்கப்பட்ட மென்பொருள்.',
  },
]

export const INDUSTRIES = [
  {
    slug: 'nurseries',
    name: 'Nurseries',
    nameTa: 'நர்சரிகள்',
    icon: Sprout,
    descriptionTa: 'தாவர இருப்பு கண்காணிப்பு, பருவகால தேவை திட்டமிடல் மற்றும் மொத்த ஆர்டர் பில்லிங்.',
  },
  {
    slug: 'agriculture',
    name: 'Agriculture',
    nameTa: 'விவசாயம்',
    icon: Wheat,
    descriptionTa: 'உள்ளீட்டு கொள்முதல் கண்காணிப்பு, அறுவடை பதிவு மற்றும் விநியோகஸ்தர் விலைப்பட்டியல்.',
  },
  {
    slug: 'travel-logistics',
    name: 'Travel & Logistics',
    nameTa: 'பயணம் & லாஜிஸ்டிக்ஸ்',
    icon: Plane,
    descriptionTa: 'முன்பதிவு மேலாண்மை, வாகன ஒதுக்கீடு மற்றும் பாதை திட்டமிடல்.',
  },
  {
    slug: 'tea-shops',
    name: 'Tea Shops',
    nameTa: 'தேநீர் கடைகள்',
    icon: Coffee,
    descriptionTa: 'அதிக அளவு, குறைந்த விலை விற்பனைக்கு ஏற்ப வேகமான செக்அவுட் பில்லிங்.',
  },
  {
    slug: 'bakeries',
    name: 'Bakeries',
    nameTa: 'பேக்கரிகள்',
    icon: Croissant,
    descriptionTa: 'செய்முறை அடிப்படையிலான பொருள் செலவு மற்றும் உற்பத்தி திட்டமிடல்.',
  },
  {
    slug: 'grocery-stores',
    name: 'Grocery Stores',
    nameTa: 'மளிகைக் கடைகள்',
    icon: ShoppingBasket,
    descriptionTa: 'காலாவதி கண்காணிப்புடன் அதிக பொருள் எண்ணிக்கை பார்கோடு பில்லிங்.',
  },
  {
    slug: 'wholesale',
    name: 'Wholesale',
    nameTa: 'மொத்த விற்பனை',
    icon: Warehouse,
    descriptionTa: 'மொத்த விலை அடுக்குகள், கடன் விதிமுறைகள் மற்றும் பல கிடங்கு இருப்பு.',
  },
  {
    slug: 'retail',
    name: 'Retail',
    nameTa: 'சில்லறை விற்பனை',
    icon: Store,
    descriptionTa: 'விசுவாசத் திட்டம் மற்றும் பகுப்பாய்வுடன் பல கிளை பில்லிங்.',
  },
  {
    slug: 'pharmacies',
    name: 'Pharmacies',
    nameTa: 'மருந்தகங்கள்',
    icon: Pill,
    descriptionTa: 'மருந்துச் சீட்டு பதிவுடன் தொகுதி/காலாவதி கண்காணிக்கப்பட்ட இருப்பு.',
  },
  {
    slug: 'hospitals',
    name: 'Hospitals',
    nameTa: 'மருத்துவமனைகள்',
    icon: HeartPulse,
    descriptionTa: 'நோயாளி பில்லிங் மற்றும் துறை வாரியான இருப்பு.',
  },
  {
    slug: 'clinics',
    name: 'Clinics',
    nameTa: 'கிளினிக்குகள்',
    icon: Stethoscope,
    descriptionTa: 'அப்பாயிண்ட்மென்ட் இணைந்த பில்லிங் மற்றும் நுகர்பொருள் இருப்பு.',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    nameTa: 'உணவகங்கள்',
    icon: UtensilsCrossed,
    descriptionTa: 'சமையலறை இருப்பு மற்றும் மெனு செலவினத்துடன் இணைந்த மேசை/ஆர்டர் மேலாண்மை.',
  },
  {
    slug: 'hotels',
    name: 'Hotels',
    nameTa: 'ஹோட்டல்கள்',
    icon: Hotel,
    descriptionTa: 'அறை முன்பதிவு, வதிவிடம் மற்றும் ஒருங்கிணைந்த விருந்தினர் பில்லிங்.',
  },
  {
    slug: 'hardware-stores',
    name: 'Hardware Stores',
    nameTa: 'ஹார்டுவேர் கடைகள்',
    icon: Hammer,
    descriptionTa: 'மாறுபாடு கண்காணிப்புடன் பல அளவு-அலகு இருப்பு.',
  },
  {
    slug: 'service-businesses',
    name: 'Service Businesses',
    nameTa: 'சேவை வணிகங்கள்',
    icon: Wrench,
    descriptionTa: 'தொழில்நுட்பர் அட்டவணையிடலுடன் வேலை/டிக்கெட் பில்லிங்.',
  },
  {
    slug: 'custom-enterprises',
    name: 'Custom Enterprises',
    nameTa: 'தனிப்பயன் நிறுவனங்கள்',
    icon: Building,
    descriptionTa: 'தனிப்பயன் பணிப்பாய்வு கண்டறிதல் மற்றும் தொகுதி கட்டமைப்பு.',
  },
  {
    slug: 'hair-salons',
    name: 'Hair Salons',
    nameTa: 'முடி திருத்தும் நிலையங்கள்',
    icon: Scissors,
    descriptionTa: 'அப்பாயிண்ட்மென்ட் அட்டவணையிடல், சேவை பில்லிங் மற்றும் தயாரிப்பு இருப்பு கண்காணிப்பு.',
  },
  {
    slug: 'photo-studios',
    name: 'Photo Studios',
    nameTa: 'புகைப்படக் கூடங்கள்',
    icon: Camera,
    descriptionTa: 'பேக்கேஜ் அடிப்படையிலான பில்லிங், முன்பதிவு மேலாண்மை மற்றும் ஆர்டர் கண்காணிப்பு.',
  },
  {
    slug: 'handicrafts-arts-shops',
    name: 'Handicrafts & Arts Shops',
    nameTa: 'கைவினை & கலைப் பொருட்கள் கடைகள்',
    icon: Palette,
    descriptionTa: 'தனிப்பயன் ஆர்டர் கண்காணிப்பு மற்றும் கைவினைப் பொருள் இருப்பு மேலாண்மை.',
  },
  {
    slug: 'cafeterias',
    name: 'Cafeterias',
    nameTa: 'கஃபெடீரியாக்கள்',
    icon: Sandwich,
    descriptionTa: 'விரைவு மெனு பில்லிங் மற்றும் தினசரி பொருள் இருப்பு கண்காணிப்பு.',
  },
  {
    slug: 'ice-cream-shops',
    name: 'Ice Cream Shops',
    nameTa: 'ஐஸ்க்ரீம் கடைகள்',
    icon: IceCreamCone,
    descriptionTa: 'சுவை வாரியான இருப்பு மற்றும் விரைவு கவுண்டர் பில்லிங்.',
  },
  {
    slug: 'dress-shops',
    name: 'Dress Shops',
    nameTa: 'உடை கடைகள்',
    icon: Shirt,
    descriptionTa: 'அளவு, வண்ணம் மற்றும் பாணி மாறுபாடுகளுக்கான இருப்பு கண்காணிப்பு.',
  },
  {
    slug: 'electrical-shops',
    name: 'Electrical Shops',
    nameTa: 'எலக்ட்ரிக்கல் கடைகள்',
    icon: Plug,
    descriptionTa: 'பொருள் வாரண்டி கண்காணிப்புடன் பார்கோடு பில்லிங்.',
  },
  {
    slug: 'electronics-shops',
    name: 'Electronics Shops',
    nameTa: 'எலக்ட்ரானிக்ஸ் கடைகள்',
    icon: Cpu,
    descriptionTa: 'சீரியல் எண் கண்காணிப்பு மற்றும் வாரண்டி மேலாண்மையுடன் இருப்பு.',
  },
  {
    slug: 'footwear-shops',
    name: 'Footwear Shops',
    nameTa: 'காலணி கடைகள்',
    icon: Footprints,
    descriptionTa: 'அளவு மற்றும் பிராண்ட் மாறுபாடு கண்காணிப்புடன் பில்லிங்.',
  },
  {
    slug: 'manufacturing-industries',
    name: 'Manufacturing Industries',
    nameTa: 'உற்பத்தி தொழிற்சாலைகள்',
    icon: Factory,
    descriptionTa: 'மூலப்பொருள் முதல் முடிக்கப்பட்ட பொருள் வரை உற்பத்தி-நிலை இருப்பு கண்காணிப்பு.',
  },
  {
    slug: 'mobile-gadgets-shops',
    name: 'Mobile Gadgets Shops',
    nameTa: 'மொபைல் கேட்ஜெட் கடைகள்',
    icon: Tablet,
    descriptionTa: 'IMEI கண்காணிப்பு மற்றும் வாரண்டி மேலாண்மையுடன் பில்லிங்.',
  },
  {
    slug: 'perfume-shops',
    name: 'Perfume Shops',
    nameTa: 'வாசனை திரவிய கடைகள்',
    icon: SprayCan,
    descriptionTa: 'பிராண்ட் மற்றும் வால்யூம் மாறுபாடுகளுக்கான இருப்பு கண்காணிப்பு.',
  },
]

export const PRIMARY_NAV = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.solutions', href: '/solutions', megaMenu: 'solutions' },
  { key: 'nav.industries', href: '/industries', megaMenu: 'industries' },
  { key: 'nav.services', href: '/services' },
  { key: 'nav.whyCoreStone', href: '/why-corestone' },
  { key: 'nav.contact', href: '/contact' },
]

export function buildWhatsAppLink({ message } = {}) {
  const base = `https://wa.me/${COMPANY.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/** Picks the language-appropriate name/description off a SOLUTIONS/INDUSTRIES item. */
export function localizedName(item, language) {
  return language === 'ta' && item.nameTa ? item.nameTa : item.name
}

export function localizedDescription(item, language) {
  return language === 'ta' && item.descriptionTa ? item.descriptionTa : item.description
}
