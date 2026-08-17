import {
  Globe,
  Smartphone,
  BrainCircuit,
  Settings2,
  BarChart3,
  Cloud,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Zap,
  Users,
  Shield,
} from 'lucide-react'
import PageHero from '@/components/sections/PageHero.jsx'
import Section from '@/components/layout/Section.jsx'
import Card from '@/components/ui/Card.jsx'
import Button from '@/components/ui/Button.jsx'
import { COMPANY } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'

/* ─── Bilingual Service Data ─────────────────────────────────────── */
const SERVICES_DATA = {
  en: {
    hero: {
      eyebrow: 'What We Build',
      title: 'Our Services',
      description:
        'We design and build modern digital solutions — from full-stack web and mobile applications to AI-powered systems and custom business software.',
      breadcrumb: 'Services',
    },
    gridHeading: 'What We Can Build for You',
    gridSubhead:
      'From idea to production — we cover the full spectrum of modern software development.',
    whyHeading: 'Why Work with CoreStone?',
    whySubhead:
      'We are a focused team that builds practical, high-quality digital products — on time and without unnecessary complexity.',
    techHeading: 'Technologies We Use',
    techSubhead:
      'We choose the right tool for each project — no one-size-fits-all approach.',
    cta: {
      heading: 'Have a project in mind?',
      subhead:
        "Tell us what you want to build. We'll help turn your idea into a practical digital solution — designed to work the way your business works.",
      buttonStart: 'Start a Project',
      buttonTalk: 'Talk to Us',
    },
    services: [
      {
        id: 'fullstack',
        icon: Globe,
        title: 'Full-Stack Web Development',
        tagline: 'Modern, scalable web solutions from frontend to backend.',
        color: 'blue',
        items: [
          'Business & corporate websites',
          'Custom web applications',
          'E-commerce platforms',
          'Admin dashboards',
          'REST APIs & backend systems',
          'Database-driven applications',
        ],
      },
      {
        id: 'mobile',
        icon: Smartphone,
        title: 'Mobile App Development',
        tagline: 'Reliable and user-friendly mobile applications for modern businesses.',
        color: 'violet',
        items: [
          'Android applications',
          'iOS applications',
          'Cross-platform applications',
          'Business & customer apps',
          'API integration',
          'Mobile backend systems',
        ],
      },
      {
        id: 'ai',
        icon: BrainCircuit,
        title: 'AI & Machine Learning',
        tagline: 'Intelligent applications that automate and improve business processes.',
        color: 'emerald',
        items: [
          'Generative AI applications',
          'AI chatbots & virtual assistants',
          'Machine Learning solutions',
          'Natural Language Processing (NLP)',
          'AI-powered automation',
          'Recommendation & prediction systems',
        ],
      },
      {
        id: 'custom',
        icon: Settings2,
        title: 'Custom Business Software',
        tagline: 'Software built around the exact workflow and requirements of your business.',
        color: 'amber',
        items: [
          'ERP systems',
          'CRM systems',
          'HRMS',
          'Billing & GST software',
          'Inventory management',
          'Business management systems',
        ],
      },
      {
        id: 'analytics',
        icon: BarChart3,
        title: 'Data Analytics & Business Intelligence',
        tagline: 'Turn your business data into actionable insights and decision-making tools.',
        color: 'rose',
        items: [
          'Interactive dashboards',
          'Data analytics',
          'Business intelligence',
          'Automated reporting',
          'KPI dashboards',
          'Predictive analytics',
        ],
      },
      {
        id: 'cloud',
        icon: Cloud,
        title: 'Cloud, APIs & System Integration',
        tagline: 'Connect, deploy, and scale modern applications securely.',
        color: 'cyan',
        items: [
          'Cloud deployment',
          'REST API development',
          'Third-party API integration',
          'Database architecture',
          'Application hosting',
          'System integration',
        ],
      },
    ],
    whyPoints: [
      {
        icon: Zap,
        title: 'Fast Delivery',
        desc: 'We ship working software quickly — no overlong cycles, no scope drift.',
      },
      {
        icon: Users,
        title: 'Business-First Thinking',
        desc: 'Every solution is designed around how your business actually operates.',
      },
      {
        icon: Shield,
        title: 'Reliable & Maintainable',
        desc: 'Clean code, proper architecture, and long-term support after delivery.',
      },
      {
        icon: BrainCircuit,
        title: 'AI-Ready Expertise',
        desc: 'We integrate AI and automation capabilities where they create real value.',
      },
    ],
  },
  ta: {
    hero: {
      eyebrow: 'நாங்கள் உருவாக்குபவை',
      title: 'எங்கள் சேவைகள்',
      description:
        'முழுமையான வலைத்தளங்கள், மொபைல் செயலிகள், செயற்கை நுண்ணறிவு தீர்வுகள் மற்றும் தனிப்பயன் வணிக மென்பொருட்களை நாங்கள் வடிவமைத்து உருவாக்குகிறோம்.',
      breadcrumb: 'சேவைகள்',
    },
    gridHeading: 'உங்களுக்காக நாங்கள் உருவாக்கும் சேவைகள்',
    gridSubhead:
      'யோசனை முதல் உற்பத்தி வரை — நவீன மென்பொருள் உருவாக்கத்தின் அனைத்து சேவைகளையும் நாங்கள் வழங்குகிறோம்.',
    whyHeading: 'ஏன் CoreStone-ஐத் தேர்ந்தெடுக்க வேண்டும்?',
    whySubhead:
      'உயர்தரமான, நடைமுறைக்கு ஏற்ற மென்பொருட்களைத் துல்லியமாகவும் சரியான நேரத்திலும் உருவாக்கும் திறனுள்ள குழு நாங்கள்.',
    techHeading: 'நாங்கள் பயன்படுத்தும் தொழில்நுட்பங்கள்',
    techSubhead:
      'ஒவ்வொரு திட்டத்திற்கும் ஏற்ற சிறந்த தொழில்நுட்பங்களை நாங்கள் கவனமாகத் தேர்ந்தெடுக்கிறோம்.',
    cta: {
      heading: 'புதிய திட்டம் ஏதேனும் உள்ளதா?',
      subhead:
        'நீங்கள் உருவாக்க விரும்பும் மென்பொருளைப் பற்றி எங்களிடம் கூறுங்கள். உங்கள் வணிகத்திற்கு ஏற்ற சிறந்த டிஜிட்டல் தீர்வாக அதை மாற்றித் தருகிறோம்.',
      buttonStart: 'திட்டத்தைத் தொடங்குங்கள்',
      buttonTalk: 'எங்களுடன் பேசுங்கள்',
    },
    services: [
      {
        id: 'fullstack',
        icon: Globe,
        title: 'முழுமையான மென்பொருள் உருவாக்கம் (Full-Stack Web Development)',
        tagline: 'முன்பக்கம் முதல் பின்பக்கம் வரை நவீன மற்றும் விரிவாக்கக்கூடிய வலைத்தள தீர்வுகள்.',
        color: 'blue',
        items: [
          'வணிக & நிறுவன வலைத்தளங்கள்',
          'தனிப்பயன் வலை பயன்பாடுகள் (Web Apps)',
          'ஈ-காமர்ஸ் தளங்கள் (E-commerce Platforms)',
          'நிர்வாகக் கட்டுப்பாட்டு பலகைகள் (Admin Dashboards)',
          'REST API & பின்புல அமைப்புகள் (Backend Systems)',
          'தரவுத்தள பயன்பாடுகள் (Database Applications)',
        ],
      },
      {
        id: 'mobile',
        icon: Smartphone,
        title: 'மொபைல் செயலி உருவாக்கம் (Mobile App Development)',
        tagline: 'நவீன வணிகங்களுக்கான நம்பகமான மற்றும் எளிமையான மொபைல் செயலிகள்.',
        color: 'violet',
        items: [
          'ஆண்ட்ராய்டு செயலிகள் (Android Apps)',
          'iOS செயலிகள் (iOS Apps)',
          'மல்டி-பிளாட்ஃபார்ம் செயலிகள் (Cross-platform Apps)',
          'வணிகம் & வாடிக்கையாளர் செயலிகள்',
          'API இணைப்பு (API Integration)',
          'மொபைல் பின்புல அமைப்புகள்',
        ],
      },
      {
        id: 'ai',
        icon: BrainCircuit,
        title: 'செயற்கை நுண்ணறிவு தீர்வுகள் (AI & Machine Learning)',
        tagline: 'வணிக செயல்பாடுகளைத் தானியக்கமாக்கி மேம்படுத்தும் அறிவார்ந்த செயலிகள்.',
        color: 'emerald',
        items: [
          'ஜெனரேட்டிவ் AI செயலிகள் (Generative AI Apps)',
          'AI சாட்பாட்கள் & மெய்நிகர் உதவியாளர்கள்',
          'மெஷின் லேர்னிங் தீர்வுகள் (Machine Learning)',
          'இயற்கை மொழி செயலாக்கம் (NLP)',
          'AI-அடிப்படையிலான தானியக்கமாக்கல்',
          'பரிந்துரை & கணிப்பு அமைப்புகள்',
        ],
      },
      {
        id: 'custom',
        icon: Settings2,
        title: 'தனிப்பயன் வணிக மென்பொருள் (Custom Business Software)',
        tagline: 'உங்கள் வணிகத்தின் துல்லியமான வேலைப்பாய்வு மற்றும் தேவைகளுக்கு ஏற்ப உருவாக்கப்பட்ட மென்பொருள்.',
        color: 'amber',
        items: [
          'ERP அமைப்புகள் (ERP Systems)',
          'CRM அமைப்புகள் (CRM Systems)',
          'HRMS மனிதவள மேலாண்மை',
          'பில்லிங் & ஜிஎஸ்டி மென்பொருள்',
          'சரக்கு மேலாண்மை (Inventory Management)',
          'வணிக மேலாண்மை அமைப்புகள்',
        ],
      },
      {
        id: 'analytics',
        icon: BarChart3,
        title: 'தரவு பகுப்பாய்வு & வணிக நுண்ணறிவு (Data Analytics & BI)',
        tagline: 'உங்கள் வணிகத் தரவை பயனுள்ள நுண்ணறிவுகளாகவும் முடிவு எடுக்கும் கருவிகளாகவும் மாற்றுங்கள்.',
        color: 'rose',
        items: [
          'ஊடாடும் கட்டுப்பாட்டு பலகைகள் (Interactive Dashboards)',
          'தரவு பகுப்பாய்வு (Data Analytics)',
          'வணிக நுண்ணறிவு (Business Intelligence)',
          'தானியங்கி அறிக்கையிடல் (Automated Reporting)',
          'KPI கட்டுப்பாட்டு பலகைகள்',
          'முன்கணிப்பு பகுப்பாய்வு (Predictive Analytics)',
        ],
      },
      {
        id: 'cloud',
        icon: Cloud,
        title: 'கிளவுட், API & கணினி ஒருங்கிணைப்பு (Cloud & System Integration)',
        tagline: 'நவீன செயலிகளைப் பாதுகாப்பாக இணைத்து, பதிவேற்றி, விரிவாக்குங்கள்.',
        color: 'cyan',
        items: [
          'கிளவுட் பதிவேற்றம் (Cloud Deployment)',
          'REST API உருவாக்கம்',
          'மூன்றாம் தரப்பு API இணைப்பு',
          'தரவுத்தள வடிவமைப்பு (Database Architecture)',
          'செயலி ஹோஸ்டிங் (Application Hosting)',
          'கணினி ஒருங்கிணைப்பு (System Integration)',
        ],
      },
    ],
    whyPoints: [
      {
        icon: Zap,
        title: 'வேகமான விநியோகம்',
        desc: 'தேவையற்ற கால தாமதங்கள் இன்றி மென்பொருளை விரைவாக உருவாக்கித் தருகிறோம்.',
      },
      {
        icon: Users,
        title: 'வணிகத்திற்கு முதன்மை முன்னுரிமை',
        desc: 'உங்கள் வணிகம் எவ்வாறு இயங்குகிறது என்பதைப் புரிந்து கொண்டு தீர்வலை வடிவமைக்கிறோம்.',
      },
      {
        icon: Shield,
        title: 'நம்பகத்தன்மை & பராமரிப்பு',
        desc: 'தரமான குறியீடு, சரியான வடிவமைப்பு மற்றும் விநியோகத்திற்குப் பிந்தைய தொடர் ஆதரவு.',
      },
      {
        icon: BrainCircuit,
        title: 'AI-அடிப்படையிலான நிபுணத்துவம்',
        desc: 'அவசியமான இடங்களில் AI மற்றும் தானியக்க அம்சங்களை இணைத்து மதிப்பை உயர்த்துகிறோம்.',
      },
    ],
  },
}

const COLOR_MAP = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'ring-blue-100' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'ring-violet-100' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', ring: 'ring-emerald-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', ring: 'ring-amber-100' },
  rose: { bg: 'bg-rose-50', icon: 'text-rose-600', ring: 'ring-rose-100' },
  cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', ring: 'ring-cyan-100' },
}

/* ─── Tech stack badges ─────────────────────────────────── */
const TECH_STACK = [
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'FastAPI',
  'Django',
  'PostgreSQL',
  'MongoDB',
  'React Native',
  'Flutter',
  'OpenAI',
  'LangChain',
  'TensorFlow',
  'AWS',
  'Docker',
  'REST APIs',
]

const WHATSAPP_URL = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
  'Hello CoreStone Technologies, I have a project in mind and would like to discuss it with your team.'
)}`

/* ─── Page ──────────────────────────────────────────────── */
export default function Services() {
  const { language } = useLanguage()
  const content = SERVICES_DATA[language] || SERVICES_DATA.en

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[{ label: content.hero.breadcrumb }]}
      />

      {/* ── Services Grid ── */}
      <Section id="services-grid">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            {content.gridHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-ink-500">
            {content.gridSubhead}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map(({ id, icon: Icon, title, tagline, color, items }) => {
            const c = COLOR_MAP[color]
            return (
              <Card
                key={id}
                className="flex flex-col p-6 hover:shadow-lifted transition-shadow duration-200"
              >
                {/* Icon + title */}
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${c.bg} ${c.icon} ${c.ring}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-950 leading-snug">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-500 leading-relaxed">{tagline}</p>
                  </div>
                </div>

                {/* Feature list */}
                <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* ── Why Choose CoreStone ── */}
      <Section tone="muted" id="why-corestone">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
              {content.whyHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-ink-500">
              {content.whySubhead}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {content.whyPoints.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="flex gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-50 text-brand-primary-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">{title}</p>
                  <p className="mt-1 text-sm text-ink-500 leading-relaxed">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Technology & Expertise ── */}
      <Section id="tech-stack">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
            {content.techHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-ink-500">
            {content.techSubhead}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-ink-200 bg-surface px-4 py-1.5 text-sm font-medium text-ink-700 hover:border-brand-primary-300 hover:bg-brand-primary-50 hover:text-brand-primary-700 transition-colors duration-150"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section tone="dark" id="services-cta" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(16,185,129,0.16), transparent)',
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            {content.cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-300 leading-relaxed">
            {content.cta.subhead}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              href={WHATSAPP_URL}
              external
              size="lg"
              icon={MessageCircle}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5d] text-white border-0"
            >
              {content.cta.buttonStart}
            </Button>
            <Button
              href="/contact"
              size="lg"
              variant="outline-inverse"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              {content.cta.buttonTalk}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
