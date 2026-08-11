/**
 * lucide-react no longer ships brand/logo icons (Linkedin, Twitter,
 * Facebook, etc. were removed from the package). These are small,
 * original glyphs — not reproductions of any brand's official logo mark —
 * used only as generic social-link indicators in the footer.
 */
export function LinkedinGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" strokeLinecap="round" />
      <circle cx="7.5" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-4a2 2 0 0 1 4 0v4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" strokeLinecap="round" />
    </svg>
  )
}

export function TwitterGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path
        d="M20 6.4c-.7.3-1.4.5-2.2.6a3.7 3.7 0 0 0 1.6-2.1 7.6 7.6 0 0 1-2.4.9 3.7 3.7 0 0 0-6.4 3.4A10.6 10.6 0 0 1 3.2 5a3.7 3.7 0 0 0 1.2 5 3.7 3.7 0 0 1-1.7-.5v.1a3.7 3.7 0 0 0 3 3.6c-.5.1-1 .2-1.6.1a3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 2 17.4a10.6 10.6 0 0 0 5.7 1.7c6.9 0 10.6-5.7 10.6-10.6v-.5c.7-.5 1.3-1.2 1.8-1.9Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FacebookGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path
        d="M13.8 8.5h-1.3c-.9 0-1.3.5-1.3 1.4v1.6H9.8v2h1.4v5.5h2.1v-5.5h1.7l.3-2h-2v-1.3c0-.5.2-.8.9-.8h1.1z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
