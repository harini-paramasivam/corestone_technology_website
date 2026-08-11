import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position to the top of the page on every route change.
 * Mounted once near the root of the router.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window.HTMLElement.prototype ? 'instant' : 'auto' })
  }, [pathname])

  return null
}
