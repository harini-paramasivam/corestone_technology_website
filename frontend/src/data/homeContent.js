/**
 * Structural (non-text) content for Home page sections — icons and
 * numeric values only. All display text (titles, descriptions, labels,
 * quotes) lives in i18n/translations/{en,ta}.js as indexed arrays
 * (home.whyCards, home.statsLabels, home.featureCards, home.testimonials)
 * so every card on the Home page actually switches language — text and
 * icons are zipped together by array index in the consuming components.
 *
 * PROCESS_STEPS and FAQS previously lived here but are fully replaced by
 * the translated home.process / home.faqs arrays (see HowWeWorkSection.jsx,
 * FAQSection.jsx) — removed from here to avoid dead, unused exports.
 */
import {
  ShieldCheck,
  Zap,
  Headset,
  Wallet,
  Users,
  BarChart3,
  Boxes,
  FileSpreadsheet,
  ClipboardList,
  Lock,
  Smartphone,
  RefreshCcw,
} from 'lucide-react'

export const STATS = [
  { value: 12, suffix: '+' },
  { value: 150, suffix: '+' },
  { value: 99.9, suffix: '%', decimals: 1 },
  { value: 24, suffix: '/7' },
]

export const WHY_CORESTONE_ICONS = [ShieldCheck, Zap, Wallet, Headset]

export const FEATURE_ICONS = [
  FileSpreadsheet,
  Boxes,
  BarChart3,
  ClipboardList,
  Users,
  Lock,
  Smartphone,
  RefreshCcw,
]
