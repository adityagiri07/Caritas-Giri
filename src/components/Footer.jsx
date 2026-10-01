function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer({ showBackToTop }) {
  return (
    <>
      <footer className="py-12 bg-[#020306] border-t border-white/10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-base tracking-wide">ADITYA GIRI</span>
            <span className="text-slate-600">•</span>
            <span>© 2026 Aditya Giri. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-white transition-colors" href="https://instagram.com">
              Instagram (@caritas.heart)
            </a>
            <button
              aria-label="Back to top"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-royal text-white hover:shadow-neon-blue active:scale-95 transition-all duration-300"
              title="Back to top"
              type="button"
              onClick={scrollTop}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
      <button
        aria-label="Scroll to top"
        type="button"
        onClick={scrollTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-950/80 border border-white/15 text-white shadow-2xl backdrop-blur-xl hover:bg-brand-royal hover:border-cyan-400/50 hover:shadow-neon-blue hover:scale-110 active:scale-95 transition-all duration-500 ${
          showBackToTop ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}
