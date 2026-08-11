/**
 * High-resolution, ultra-vibrant, crystal-clear professional photography images
 * curated for all 9 Solution types.
 * Each URL is selected for vivid colors, sharp detail, and direct relevance.
 */
export const SOLUTION_IMAGES = {
  'billing-software': {
    url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=90',
    alt: 'Vibrant retail checkout counter with modern digital POS touchscreen and card reader',
    altTa: 'நவீன டிஜிட்டல் POS பில்லிங் கவுண்டர் மற்றும் பார்கோடு ஸ்கேனர்',
    category: 'Billing & POS',
    categoryTa: 'பில்லிங் & POS',
  },
  'inventory-management': {
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=90',
    alt: 'Bright, modern organized warehouse stock with barcode logistics tracking',
    altTa: 'கிடங்கு இருப்பு மேலாண்மை மற்றும் பார்கோடு கண்காணிப்பு',
    category: 'Stock Control',
    categoryTa: 'இருப்பு மேலாண்மை',
  },
  'business-dashboards': {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=90',
    alt: 'Colorful executive data analytics dashboard with live colorful charts and graphs',
    altTa: 'நேரலை வணிக வரைபடங்கள் மற்றும் பகுப்பாய்வு பலகை',
    category: 'Business Intelligence',
    categoryTa: 'வணிகத் தகவல்கள்',
  },
  'gst-billing': {
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=90',
    alt: 'Clear financial calculator, tax invoice paperwork, and digital compliance documents',
    altTa: 'ஜிஎஸ்டி வரி கணக்கீடு மற்றும் மின்னணு விலைப்பட்டியல்',
    category: 'Tax & Compliance',
    categoryTa: 'வரி & ஜிஎஸ்டி இணக்கம்',
  },
  'sales-analytics': {
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=90',
    alt: 'Vibrant sales presentation with growth graphs and performance metrics',
    altTa: 'விற்பனை வளர்ச்சி வரைபடங்கள் மற்றும் பகுப்பாய்வு',
    category: 'Growth & Insights',
    categoryTa: 'விற்பனை வளர்ச்சி',
  },
  'business-reports': {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90',
    alt: 'Clean financial audit charts, revenue graphs, and automated business reports',
    altTa: 'தானியங்கி நிதி அறிக்கைகள் மற்றும் வணிக தணிக்கை',
    category: 'Reporting & Audits',
    categoryTa: 'அறிக்கைகள் & தணிக்கை',
  },
  'custom-erp': {
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=90',
    alt: 'Modern tech workspace with enterprise ERP systems monitoring operational workflow',
    altTa: 'கார்ப்பரேட் ERP மென்பொருள் மற்றும் செயல்பாட்டு மேலாண்மை',
    category: 'Enterprise Systems',
    categoryTa: 'நிறுவன ERP அமைப்புகள்',
  },
  'business-automation': {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=90',
    alt: 'Dynamic team collaborating around digital automation software and smart workflows',
    altTa: 'வணிக செயல்பாட்டு ஆட்டோமேஷன் மற்றும் வேலைப்பாய்வு',
    category: 'Process Automation',
    categoryTa: 'செயல்பாட்டு ஆட்டோமேஷன்',
  },
  'custom-software-development': {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=90',
    alt: 'Bright, modern laptop display showing vibrant clean software code development',
    altTa: 'தனிப்பயன் மென்பொருள் வடிவமைப்பு மற்றும் உருவாக்கம்',
    category: 'Custom Engineering',
    categoryTa: 'தனிப்பயன் மென்பொருள்',
  },
}

export function getSolutionImage(slug) {
  return SOLUTION_IMAGES[slug] || {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=90',
    alt: 'CoreStone enterprise software solutions',
    altTa: 'CoreStone நிறுவன மென்பொருள் தீர்வுகள்',
    category: 'Software Solution',
    categoryTa: 'மென்பொருள் தீர்வு',
  }
}
