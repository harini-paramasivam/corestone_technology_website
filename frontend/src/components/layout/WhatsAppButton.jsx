import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'

const DEFAULT_MESSAGE =
  "Hi CoreStone Technologies, I'd like to know more about your business software."

/**
 * Persistent floating action button, present on every page (mounted once
 * in Layout). Opens WhatsApp click-to-chat with a pre-filled message.
 * Positioned bottom-left so it never collides with the toast stack
 * (bottom-right).
 */
export default function WhatsAppButton() {
  const { t } = useLanguage()

  return (
    <motion.a
      href={buildWhatsAppLink({ message: DEFAULT_MESSAGE })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('common.whatsappAriaLabel')}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lifted"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" aria-hidden="true" />
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 relative" fill="white" strokeWidth={0} aria-hidden="true" />
    </motion.a>
  )
}
