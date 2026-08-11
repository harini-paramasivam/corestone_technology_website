import { useContext } from 'react'
import { LanguageContext } from './LanguageProvider.jsx'

/**
 * useLanguage().t('nav.home') -> translated string for the active language.
 * useLanguage().language -> 'en' | 'ta'
 * useLanguage().toggleLanguage() -> flips between the two, persisted instantly.
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a <LanguageProvider>')
  return ctx
}
