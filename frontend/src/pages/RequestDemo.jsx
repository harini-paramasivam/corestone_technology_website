import {
  CheckCircle2,
  MessageCircle,
  MonitorPlay,
  BarChart3,
  ClipboardCheck,
  Users,
} from 'lucide-react'
import PageHero from '@/components/sections/PageHero.jsx'
import Section from '@/components/layout/Section.jsx'
import Card from '@/components/ui/Card.jsx'
import Button from '@/components/ui/Button.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'
import { COMPANY } from '@/data/site.js'

const DEMO_DATA = {
  en: {
    hero: {
      eyebrow: 'Request Demo',
      title: 'Request a Demo',
      description:
        'See how CoreStone can simplify your business operations with software designed around the way your business works.',
      breadcrumb: 'Request Demo',
    },
    cardTitle: 'Book a Free Demo',
    cardDesc:
      "Get a personalized, no-obligation demo of CoreStone's business software — built specifically for retail, wholesale, manufacturing, and service businesses across India. Connect with our team on WhatsApp to schedule a convenient time.",
    btnWhatsApp: 'Request Demo on WhatsApp',
    waMsgNotice: `Opens WhatsApp with a pre-filled message · ${COMPANY.phoneDisplay}`,
    waMsg:
      'Hello CoreStone Technologies, I would like to request a demo. Please share the available demo timings.',
    benefitsTitle: 'What You Will See in the Demo',
    expectTitle: 'What to Expect',
    btnConnect: 'Connect on WhatsApp',
    benefits: [
      {
        icon: MonitorPlay,
        title: 'Personalized Product Walkthrough',
        description:
          'See every module — billing, inventory, and reporting — tailored to your specific business type.',
      },
      {
        icon: CheckCircle2,
        title: 'Billing & Inventory Workflow Demonstration',
        description:
          'Watch real invoice generation, stock updates, and purchase flows in action on a live environment.',
      },
      {
        icon: BarChart3,
        title: 'Business Reporting & Analytics Overview',
        description:
          'Explore dashboards, sales summaries, profit reports, and data exports built for business owners.',
      },
      {
        icon: ClipboardCheck,
        title: 'Discussion Based on Your Requirements',
        description:
          'Ask questions and share your challenges. Our team will walk you through how CoreStone addresses them.',
      },
    ],
    trustPoints: [
      'No obligation, no pressure',
      'Conducted by our product experts',
      'Available in English & Tamil',
      'Online or in-person — your choice',
    ],
  },
  ta: {
    hero: {
      eyebrow: 'டெமோ கோரிக்கை',
      title: 'டெமோவைக் கோருங்கள் (Request a Demo)',
      description:
        'உங்கள் வணிகம் இயங்கும் விதத்திற்கு ஏற்ப வடிவமைக்கப்பட்ட மென்பொருள் மூலம் CoreStone எவ்வாறு உங்கள் வணிக நடவடிக்கைகளை எளிதாக்குகிறது என்று பாருங்கள்.',
      breadcrumb: 'டெமோ கோரிக்கை',
    },
    cardTitle: 'இலவச நேரடி விளக்கக்காட்சியை முன்பதிவு செய்யுங்கள்',
    cardDesc:
      'CoreStone வணிக மென்பொருளின் தனிப்பயனாக்கப்பட்ட நேரடி விளக்கக்காட்சியைப் பெறுங்கள். சில்லறை, மொத்த விற்பனை, உற்பத்தி மற்றும் சேவை வணிகங்களுக்காக பிரத்யேகமாக உருவாக்கப்பட்டது. உங்களுக்கு வசதியான நேரத்தைத் திட்டமிட WhatsApp இல் தொடர்பு கொள்ளுங்கள்.',
    btnWhatsApp: 'WhatsApp இல் டெமோவைக் கோருங்கள்',
    waMsgNotice: `முன் நிரப்பப்பட்ட செய்தியுடன் WhatsApp திறக்கும் · ${COMPANY.phoneDisplay}`,
    waMsg:
      'வணக்கம் CoreStone Technologies, நான் ஒரு நேரடி விளக்கக்காட்சியைப் பெற விரும்புகிறேன். கிடைக்கூடிய நேரங்களைப் பகிர்ந்து கொள்ளவும்.',
    benefitsTitle: 'டெமோவில் நீங்கள் காண்பவை',
    expectTitle: 'நீங்கள் எதிர்பார்ப்பது',
    btnConnect: 'WhatsApp இல் இணையுங்கள்',
    benefits: [
      {
        icon: MonitorPlay,
        title: 'தனிப்பயனாக்கப்பட்ட தயாரிப்பு உலா',
        description:
          'உங்கள் வணிக வகைக்கு ஏற்ப வடிவமைக்கப்பட்ட பில்லிங், சரக்கு மேலாண்மை மற்றும் அறிக்கை தொகுதிகள்.',
      },
      {
        icon: CheckCircle2,
        title: 'பில்லிங் & சரக்கு மேலாண்மை செய்முறை விளக்கம்',
        description:
          'நேரடி சூழலில் ரசீது தயாரிப்பு, இருப்பு புதுப்பிப்புகள் மற்றும் கொள்முதல் செயல்பாடுகளைப் பாருங்கள்.',
      },
      {
        icon: BarChart3,
        title: 'வணிக அறிக்கைகள் & பகுப்பாய்வு மேலோட்டம்',
        description:
          'வணிக உரிமையாளர்களுக்காக உருவாக்கப்பட்ட தகவல் பலகைகள், விற்பனை சுருக்கங்கள் மற்றும் லாப அறிக்கைகளை ஆராயுங்கள்.',
      },
      {
        icon: ClipboardCheck,
        title: 'உங்கள் தேவைகள் அடிப்படையிலான கலந்தாய்வு',
        description:
          'கேள்விகளைக் கேட்டு உங்கள் சவால்களைப் பகிர்ந்து கொள்ளுங்கள். CoreStone அவற்றுக்கு எவ்வாறு தீர்வளிக்கிறது என்பதை விளக்குவோம்.',
      },
    ],
    trustPoints: [
      'கட்டாயம் இல்லை, எந்த அழுத்தமும் இல்லை',
      'எங்கள் தயாரிப்பு நிபுணர்களால் நடத்தப்படுகிறது',
      'ஆங்கிலம் & தமிழில் கிடைக்கும்',
      'ஆன்லைன் அல்லது நேரில் — உங்கள் விருப்பம்',
    ],
  },
}

export default function RequestDemo() {
  const { language } = useLanguage()
  const content = DEMO_DATA[language] || DEMO_DATA.en

  const whatsappDemoUrl = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
    content.waMsg
  )}`

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[{ label: content.hero.breadcrumb }]}
      />

      <Section>
        <div className="mx-auto max-w-5xl">
          {/* Primary CTA hero card */}
          <Card className="mb-12 p-8 sm:p-12 text-center bg-gradient-to-br from-brand-primary-50 to-white border border-brand-primary-100">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary-100 text-brand-primary-600 mb-4">
              <Users className="h-8 w-8" />
            </span>
            <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
              {content.cardTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-500 leading-relaxed">
              {content.cardDesc}
            </p>

            <div className="mt-8">
              <Button
                href={whatsappDemoUrl}
                external
                size="lg"
                icon={MessageCircle}
                className="inline-flex bg-[#25D366] hover:bg-[#1ebe5d] text-white border-0 px-10"
              >
                {content.btnWhatsApp}
              </Button>
              <p className="mt-3 text-xs text-ink-400">{content.waMsgNotice}</p>
            </div>
          </Card>

          {/* What you'll see section */}
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold text-ink-950 text-center mb-8">
              {content.benefitsTitle}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {content.benefits.map(({ icon: Icon, title, description }) => (
                <Card
                  key={title}
                  className="flex gap-4 p-6 hover:shadow-lifted transition-shadow duration-200"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-50 text-brand-primary-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900 text-sm leading-snug">{title}</p>
                    <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust signals */}
          <Card className="p-6 sm:p-8 border border-ink-100">
            <h4 className="font-display text-lg font-bold text-ink-950 mb-4 text-center">
              {content.expectTitle}
            </h4>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-sm text-ink-700">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <Button
                href={whatsappDemoUrl}
                external
                variant="secondary"
                size="md"
                icon={MessageCircle}
              >
                {content.btnConnect}
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}
