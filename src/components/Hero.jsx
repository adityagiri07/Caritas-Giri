import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import Reveal from './Reveal'

export default function Hero({ scrollY, onFilterChange, activeFilter, filters = [] }) {
  const reducedMotion = usePrefersReducedMotion()
  const zoneRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return undefined

    const zone = zoneRef.current
    if (!zone) return undefined
    let frame

    const onMove = (e) => {
      const rect = zone.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetRef.current = { x: -y * 14, y: x * 16 }
    }

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 }
    }

    const render = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.1
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.1
      setTilt({ x: currentRef.current.x, y: currentRef.current.y })
      frame = requestAnimationFrame(render)
    }

    zone.addEventListener('mousemove', onMove)
    zone.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      zone.removeEventListener('mousemove', onMove)
      zone.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  const parallaxActive = !reducedMotion && scrollY < (typeof window !== 'undefined' ? window.innerHeight * 1.5 : 0)

  return (
    <section
      className="hero-perspective-stage relative min-h-screen pt-36 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex items-center bg-[#05070f]"
      id="hero"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-[80%] bg-gradient-to-b from-[#2565c8] via-[#114ca8] to-[#04060d] opacity-90" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#3a7bf0]/35 rounded-full blur-[120px] aurora-pulse" />
        <div className="absolute top-[20%] left-[-10%] w-[550px] h-[550px] bg-[#1d57ba]/40 rounded-full blur-[100px]" />
        <svg
          className="absolute top-10 right-[-60px] md:right-4 w-72 md:w-96 h-80 opacity-70 fluid-ribbon pointer-events-none transform transition-transform duration-700 hover:scale-105"
          fill="none"
          viewBox="0 0 400 400"
          style={{ transform: parallaxActive ? `translate3d(0, ${scrollY * 0.22}px, 0)` : undefined }}
        >
          <path d="M80,50 C180,20 320,80 340,190 C360,290 270,350 200,320 C140,290 190,180 280,170" stroke="url(#ribbonGradRight)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="52" />
          <defs>
            <linearGradient id="ribbonGradRight" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#73a9ff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#3b76e8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1948af" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute bottom-16 -left-20 w-80 md:w-[420px] h-96 opacity-60 fluid-ribbon pointer-events-none transform transition-transform duration-700"
          fill="none"
          viewBox="0 0 400 400"
          style={{ transform: parallaxActive ? `translate3d(0, ${scrollY * -0.15}px, 0)` : undefined }}
        >
          <path d="M50,300 C70,180 160,120 250,140 C340,160 360,250 290,300 C210,350 140,280 120,200" stroke="url(#ribbonGradLeft)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" />
          <defs>
            <linearGradient id="ribbonGradLeft" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#1d4ebd" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#4686fc" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#8bb8ff" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#04060c] via-[#04060c]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full" ref={zoneRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div
            className="lg:col-span-6 flex justify-center lg:justify-start"
            style={{ transform: parallaxActive ? `translate3d(0, ${scrollY * 0.08}px, 0)` : undefined }}
          >
            <div
              className="tilt-card-target hero-glass-card glass-panel p-8 md:p-12 w-full max-w-[490px] relative overflow-hidden transition-all duration-300 hover:shadow-neon-blue"
              style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)` }}
            >
              <div className="flex items-center gap-3 mb-8 text-white/80">
                <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="text-xs tracking-[0.25em] font-semibold uppercase text-white/80">CARITAS. HEART</span>
              </div>
              <div className="space-y-1 mb-10">
                <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] drop-shadow-sm">
                  Aditya
                  <br />
                  Giri
                </h1>
              </div>
              <div className="space-y-1.5 mb-10 text-white font-bold tracking-wider text-sm md:text-base">
                <p className="leading-none tracking-widest text-slate-200">MY EXPLORATION—</p>
                <div className="flex items-center gap-2">
                  <span className="tracking-widest">MY CAPTURES</span>
                  <svg className="w-5 h-5 inline text-blue-300 stroke-[2] transition-transform duration-300 hover:rotate-12 hover:scale-110" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
              </div>
              <div className="relative flex items-end justify-between pt-2">
                <a
                  className="btn-shimmer inline-flex items-center justify-center bg-brand-royal hover:bg-blue-600 active:scale-95 text-white text-xs md:text-sm font-semibold tracking-wider px-6 py-3 rounded-lg shadow-lg shadow-blue-600/30 transition-all uppercase hover:shadow-neon-blue"
                  href="#work"
                >
                  LEARN MORE
                </a>
                <div aria-hidden="true" className="line-art-anim relative w-36 h-40 -mb-2 -mr-3 flex items-end justify-end cursor-pointer">
                  <svg className="w-full h-full text-white/90" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" viewBox="0 0 160 180">
                    <path d="M60 42 C60 22 75 14 90 14 C100 14 110 20 112 32 C114 42 108 52 100 58 C96 61 90 64 82 64 C73 64 66 58 63 50 Z" />
                    <path d="M72 17 C78 24 88 22 98 18 M66 28 C74 34 85 30 92 24 M64 36 C70 40 80 37 86 33 M102 24 C108 30 110 38 108 45" />
                    <path d="M74 48 C78 52 82 54 86 52 M76 64 L74 76 M92 63 L94 76" />
                    <path d="M72 74 C62 90 54 110 52 126 M96 74 C104 90 110 110 112 126" />
                    <path d="M42 98 L56 78 C65 74 98 74 114 78 L128 98 C136 112 136 140 134 175 L38 175 C36 142 36 114 42 98 Z" />
                    <path d="M72 76 L82 92 L94 76 M74 88 L62 96 M92 88 L104 96" />
                    <path d="M42 118 C46 130 52 144 58 152 M126 118 C120 132 112 146 106 154" />
                    <rect height="30" rx="3" width="46" x="58" y="120" />
                    <circle cx="81" cy="135" r="9" />
                    <circle cx="81" cy="135" r="5" />
                    <rect height="5" rx="1" width="10" x="63" y="115" />
                    <rect height="4" rx="1" width="12" x="88" y="116" />
                    <path d="M54 126 C54 120 60 122 62 132 C62 138 58 144 54 140 Z" />
                    <path d="M108 126 C108 120 102 122 100 132 C100 138 104 144 108 140 Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
            style={{ transform: parallaxActive ? `translate3d(0, ${scrollY * 0.14}px, 0)` : undefined }}
          >
            <div
              className="relative w-full max-w-[500px] h-[560px] sm:h-[630px] lg:h-[680px] flex items-end justify-center tilt-card-target"
              style={{
                transform: `perspective(1000px) rotateX(${-tilt.x * 0.7}deg) rotateY(${-tilt.y * 0.7}deg) translateX(${tilt.y * 1.5}px)`,
              }}
            >
              <img
                alt="Aditya Giri - Visual Artist & Filmmaker"
                className="h-full w-auto max-w-full object-contain object-bottom select-none drop-shadow-[0_20px_45px_rgba(29,109,246,0.45)]"
                src="/pic1.png"
              />
            </div>
          </div>
        </div>

        <Reveal className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3 text-xs md:text-sm font-medium">
            <span className="text-slate-400 uppercase tracking-widest text-xs mr-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              Featured Disciplines:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {(filters.length ? filters : [{ id: 'all', label: 'All Works' }]).map((filter) => {
                const active = activeFilter === filter.id
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => onFilterChange(filter.id)}
                    className={
                      active
                        ? 'filter-pill px-4 py-1.5 rounded-full bg-brand-royal text-white shadow-glow border border-blue-400/50 transition-all duration-300 transform scale-105 active:scale-95'
                        : 'filter-pill px-4 py-1.5 rounded-full glass-panel-subtle text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300 transform active:scale-95'
                    }
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
            <div className="hidden xl:flex items-center gap-2 text-slate-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-brand-royal animate-pulse" />
              <span>Based in New Delhi & Worldwide</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
