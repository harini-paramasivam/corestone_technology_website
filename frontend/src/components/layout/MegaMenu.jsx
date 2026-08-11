import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SOLUTIONS, INDUSTRIES, localizedName, localizedDescription } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'

const CONTENT = {
  solutions: {
    items: SOLUTIONS,
    basePath: '/solutions',
    columns: 3,
    footerLabel: 'View all solutions',
    footerHref: '/solutions',
  },
  industries: {
    items: INDUSTRIES,
    basePath: '/industries',
    columns: 4,
    footerLabel: 'View all industries',
    footerHref: '/industries',
  },
}

/**
 * Panel content for Navbar's mega menu. Navbar owns the open/close state
 * and positions this absolutely beneath the nav bar; this component is
 * purely the grid of items for a given menu key.
 */
export default function MegaMenu({ menuKey }) {
  const { t, language } = useLanguage()
  const config = CONTENT[menuKey]
  if (!config) return null

  const gridCols = config.columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute left-0 right-0 top-full border-t border-ink-100 bg-surface shadow-lifted"
    >
      <div className="container-page py-8">
        <div className={`grid grid-cols-1 ${gridCols} gap-x-6 gap-y-1`}>
          {config.items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.slug}
                to={`${config.basePath}/${item.slug}`}
                className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-brand-primary-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-50 text-brand-primary-700 group-hover:bg-white">
                  <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-900">{localizedName(item, language)}</span>
                  {localizedDescription(item, language) && (
                    <span className="mt-0.5 block text-xs text-ink-400 leading-snug">
                      {localizedDescription(item, language)}
                    </span>
                  )}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
          <Link
            to={config.footerHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800"
          >
            {t(menuKey === 'solutions' ? 'common.viewAllSolutions' : 'common.viewAllIndustries')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/request-demo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent-600 hover:text-brand-accent-700"
          >
            {t('common.requestDemo')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
