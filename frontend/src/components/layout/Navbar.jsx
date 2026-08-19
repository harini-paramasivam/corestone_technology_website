import { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/useLanguage.js'
import { PRIMARY_NAV, COMPANY } from '@/data/site.js'
import Button from '@/components/ui/Button.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import MegaMenu from './MegaMenu.jsx'
import MobileMenu from './MobileMenu.jsx'

/**
 * @param {boolean} transparent - if true, the navbar starts see-through
 *   with light text over a dark hero and solidifies once the page scrolls
 *   past the hero. Pages without a dark hero should leave this false.
 */
export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef(null)
  const location = useLocation()
  const { t } = useLanguage()

  const { scrollYProgress } = useScroll()
  const progressWidth = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [location.pathname])

  const solid = !transparent || scrolled

  function handleEnter(key) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(key)
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  return (
    <>
    <header
      onMouseLeave={handleLeave}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        solid ? 'bg-surface/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
      )}
    >
      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: progressWidth }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-brand-primary-600"
      />

      <div className="container-page flex h-[4.5rem] items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg font-display text-base font-bold',
              solid ? 'bg-brand-primary-600 text-white' : 'bg-white text-brand-primary-600'
            )}
          >
            C
          </span>
          <span
            className={cn(
              'font-display text-lg font-semibold tracking-tight',
              solid ? 'text-ink-950' : 'text-white'
            )}
          >
            CoreStone
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {PRIMARY_NAV.map((item) => (
            <div
              key={item.href}
              onMouseEnter={() => item.megaMenu && handleEnter(item.megaMenu)}
              className="relative"
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    solid
                      ? isActive
                        ? 'text-brand-primary-600 bg-brand-primary-50'
                        : 'text-ink-700 hover:text-brand-primary-600 hover:bg-brand-primary-50'
                      : isActive
                        ? 'text-white'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                  )
                }
              >
                {t(item.key)}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageToggle solid={solid} />
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium transition-colors',
              solid ? 'text-ink-600 hover:text-brand-primary-600' : 'text-white/85 hover:text-white'
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {COMPANY.phoneDisplay}
          </a>
          <Button href="/request-demo" variant="primary" size="sm">
            {t('nav.requestDemo')}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          className={cn(
            'lg:hidden rounded-full p-2 transition-colors',
            solid ? 'text-ink-700 hover:bg-ink-100' : 'text-white hover:bg-white/10'
          )}
        >
          {mobileOpen ? <X className="h-6 w-6 text-brand-primary-600" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {openMenu && (
          <div onMouseEnter={() => handleEnter(openMenu)}>
            <MegaMenu menuKey={openMenu} />
          </div>
        )}
      </AnimatePresence>
    </header>
    <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
