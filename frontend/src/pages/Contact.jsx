import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import PageHero from '@/components/sections/PageHero.jsx'
import Section from '@/components/layout/Section.jsx'
import Card from '@/components/ui/Card.jsx'
import Button from '@/components/ui/Button.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'
import { COMPANY } from '@/data/site.js'

const CONTACT_DATA = {
  en: {
    hero: {
      eyebrow: 'Contact Us',
      title: 'Get in Touch with CoreStone',
      description: 'Have a question or need custom software? We are here to help.',
      breadcrumb: 'Contact',
    },
    introTitle: 'Get in Touch',
    introDesc:
      'We are here to help. Whether you have a question about our software, want a product walkthrough, or simply want to talk to our team — reach out through any channel below and we will get back to you promptly.',
    ctaTitle: 'Ready to connect?',
    ctaDesc:
      'Choose your preferred way to reach us. Our team typically responds within a few hours during business days.',
    btnWhatsApp: 'Chat on WhatsApp',
    btnCall: 'Call Us',
    btnEmail: 'Send Email',
    waMsg: 'Hello CoreStone Technologies, I would like to get in touch with your team.',
    items: {
      phone: 'Phone',
      email: 'Email',
      location: 'Location',
      locValue: 'Puducherry, India',
      hours: 'Business Hours',
      hoursValue: 'Mon – Sat, 9:00 AM – 6:00 PM IST',
    },
  },
  ta: {
    hero: {
      eyebrow: 'தொடர்புகொள்ள',
      title: 'CoreStone-ஐத் தொடர்புகொள்ளுங்கள்',
      description: 'கேள்விகள் உள்ளதா அல்லது மென்பொருள் தேவையா? உங்களுக்கு உதவ நாங்கள் தயார்.',
      breadcrumb: 'தொடர்பு',
    },
    introTitle: 'எங்களைத் தொடர்புகொள்ளுங்கள்',
    introDesc:
      'எங்கள் மென்பொருள் பற்றிய கேள்விகள், நேரடி விளக்கக்காட்சி அல்லது ஆலோசனை எதுவாக இருந்தாலும் — கீழே உள்ள ஏதேனும் ஒரு வழியில் எங்களை அணுகுங்கள். நாங்கள் உங்களுக்கு உடனடியாகப் பதிலளிப்போம்.',
    ctaTitle: 'இப்போதே இணையத் தயாரா?',
    ctaDesc:
      'உங்களுக்கு வசதியான தொடர்பு வழியைத் தேர்ந்தெடுங்கள். வேலை நாட்களில் சில மணிநேரங்களுக்குள் எங்கள் குழு உங்களைத் தொடர்பு கொள்ளும்.',
    btnWhatsApp: 'WhatsApp-இல் பேசுங்கள்',
    btnCall: 'அழையுங்கள்',
    btnEmail: 'மின்னஞ்சல் அனுப்புங்கள்',
    waMsg: 'வணக்கம் CoreStone Technologies, உங்கள் குழுவுடன் நான் தொடர்புகொள்ள விரும்புகிறேன்.',
    items: {
      phone: 'தொலைபேசி',
      email: 'மின்னஞ்சல்',
      location: 'இருப்பிடம்',
      locValue: 'புதுச்சேரி, இந்தியா',
      hours: 'வேலை நேரம்',
      hoursValue: 'திங்கள் – சனி, காலை 9:00 – மாலை 6:00 IST',
    },
  },
}

export default function Contact() {
  const { language } = useLanguage()
  const content = CONTACT_DATA[language] || CONTACT_DATA.en

  const whatsappUrl = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
    content.waMsg
  )}`

  const contactItems = [
    {
      icon: Phone,
      label: content.items.phone,
      value: COMPANY.phoneDisplay,
      href: `tel:${COMPANY.phoneRaw}`,
    },
    {
      icon: Mail,
      label: content.items.email,
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
    },
    {
      icon: MapPin,
      label: content.items.location,
      value: content.items.locValue,
      href: null,
    },
    {
      icon: Clock,
      label: content.items.hours,
      value: content.items.hoursValue,
      href: null,
    },
  ]

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
          {/* Intro block */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl">
              {content.introTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-500 leading-relaxed">
              {content.introDesc}
            </p>
          </div>

          {/* Contact cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <Card
                key={label}
                className="flex flex-col items-center gap-3 p-6 text-center hover:shadow-lifted transition-shadow duration-200"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-50 text-brand-primary-600">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-medium text-ink-800 hover:text-brand-primary-700 transition-colors min-w-0 max-w-full"
                  >
                    <span className="company-email">{value}</span>
                  </a>
                ) : (
                  <p className="text-sm font-medium text-ink-700">{value}</p>
                )}
              </Card>
            ))}
          </div>

          {/* CTA section */}
          <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-brand-primary-50 to-white border border-brand-primary-100">
            <h3 className="font-display text-2xl font-extrabold text-ink-950 sm:text-3xl">
              {content.ctaTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-ink-500">{content.ctaDesc}</p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                href={whatsappUrl}
                external
                size="lg"
                icon={MessageCircle}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5d] text-white border-0"
              >
                {content.btnWhatsApp}
              </Button>

              <Button
                href={`tel:${COMPANY.phoneRaw}`}
                size="lg"
                variant="secondary"
                icon={Phone}
                className="w-full sm:w-auto"
              >
                {content.btnCall}
              </Button>

              <Button
                href={`mailto:${COMPANY.email}`}
                size="lg"
                variant="outline"
                icon={Mail}
                className="w-full sm:w-auto"
              >
                {content.btnEmail}
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}
