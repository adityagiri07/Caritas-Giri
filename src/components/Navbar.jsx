import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../data'

export default function Navbar({ scrolled, activeSection }) {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    setCompact(scrolled)
  }, [scrolled])

  return (
    <header
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] max-w-5xl transition-all duration-500"
      id="main-nav"
    >
      <div
        id="nav-inner-container"
        className={`w-full rounded-full backdrop-blur-xl bg-gradient-to-r from-slate-950/80 via-[#060a14]/80 to-slate-950/80 border shadow-2xl shadow-black/60 px-4 sm:px-6 flex items-center justify-between transition-all duration-300 hover:border-cyan-400/50 hover:shadow-neon-blue ${
          compact
            ? 'bg-slate-950/85 py-2 sm:py-2.5 border-cyan-400/30 shadow-[0_12px_40px_rgba(13,101,253,0.2)]'
            : 'py-2.5 sm:py-3 border-blue-400/40 shadow-[0_8px_32px_rgba(0,102,255,0.12)]'
        }`}
      >
        <a className="flex items-center gap-2.5 sm:gap-3 group transition-transform duration-300 hover:scale-[1.02] shrink-0" href="#hero">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-royal/20 border border-brand-royal/60 flex items-center justify-center text-white shadow-glow group-hover:rotate-12 transition-all duration-300">
            <svg className="w-4 h-4 text-blue-400 group-hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base tracking-wide text-white group-hover:text-blue-300 transition-colors leading-tight">
              ADITYA GIRI
            </span>
            <span className="text-[9px] sm:text-[10px] text-blue-300/80 font-medium tracking-widest uppercase leading-tight">
              @caritas.heart
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium text-slate-300 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-pill-link px-3 py-1.5 rounded-full hover:text-white ${activeSection === link.id ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 border-r border-white/15 pr-2.5 sm:pr-3">
            <a
              aria-label="Instagram"
              className="p-1.5 sm:p-2 rounded-full hover:text-cyan-300 hover:bg-white/10 hover:scale-110 hover:shadow-neon-blue transition-all duration-300"
              href="https://instagram.com/caritas.heart"
              rel="noreferrer"
              target="_blank"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
          <a
            className="btn-shimmer group inline-flex items-center gap-1.5 sm:gap-2 bg-brand-royal hover:bg-blue-600 hover:shadow-neon-blue active:scale-95 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 shadow-glow"
            href="#contact"
          >
            <span>Contact Me</span>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="5" x2="19" y1="12" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
