import { Quote } from 'lucide-react'
import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Card from '@/components/ui/Card.jsx'
import Reveal, { RevealGroup } from '@/components/motion/Reveal.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function TestimonialsSection() {
  const { t, language } = useLanguage()
  const testimonials = t('home.testimonials')

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t('home.testimonialsEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('home.testimonialsHeading')}
          </Heading>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Reveal key={`${language}-${i}`} delay={i * 0.07}>
            <Card className="h-full p-7">
              <Quote className="h-6 w-6 text-brand-accent-400" aria-hidden="true" />
              <p className="mt-4 text-ink-700 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6 border-t border-ink-100 pt-4">
                <p className="text-sm font-semibold text-ink-900">{testimonial.name}</p>
                <p className="text-xs text-ink-400">{testimonial.business}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  )
}
