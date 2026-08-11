import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import en from './translations/en.js'
import ta from './translations/ta.js'

const TRANSLATIONS = { en, ta }
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
]

const STORAGE_KEY = 'corestone_lang'
const DEFAULT_LANGUAGE = 'en'

export const LanguageContext = createContext(null)

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

function interpolate(str, params) {
  if (!params) return str
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => (params[key] !== undefined ? params[key] : match))
}

function readStoredLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored && TRANSLATIONS[stored] ? stored : DEFAULT_LANGUAGE
  } catch {
    // localStorage unavailable (private browsing, disabled storage) — fall
    // back to default rather than throwing during render.
    return DEFAULT_LANGUAGE
  }
}

/**
 * Wraps the app once (in main.jsx, above <App />). Every component reads
 * the current language and the t() translator via useLanguage() — no
 * component should ever import a translations file directly.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Ignore write failures (storage disabled/full) — language still
      // works for the current session via React state.
    }
  }, [language])

  const setLanguage = useCallback((code) => {
    if (!TRANSLATIONS[code]) return
    setLanguageState(code)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'ta' : 'en'))
  }, [])

  const t = useCallback(
    (key, params) => {
      const active = getByPath(TRANSLATIONS[language], key)
      if (active !== undefined) return interpolate(active, params)

      // Graceful fallback: missing Tamil key -> English, rather than a
      // blank string or a raw key showing up on a live page.
      const fallback = getByPath(TRANSLATIONS[DEFAULT_LANGUAGE], key)
      if (fallback !== undefined) return interpolate(fallback, params)

      if (import.meta.env.DEV) {
        console.warn(`[i18n] Missing translation key: "${key}"`)
      }
      return key
    },
    [language]
  )

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
