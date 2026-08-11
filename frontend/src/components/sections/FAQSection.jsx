import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Reveal from '@/components/motion/Reveal.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-ink-100 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-ink-900">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-ink-400"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-ink-500 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const { t, language } = useLanguage()
  const faqs = t('home.faqs')
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section tone="muted">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t('home.faqEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('home.faqHeading')}
          </Heading>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 max-w-2xl rounded-card bg-surface px-6 shadow-soft sm:px-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={`${language}-${i}`}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
