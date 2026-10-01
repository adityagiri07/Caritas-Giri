import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

function Stat({ prefix = '', suffix = '', target, start, fallback }) {
  const [value, setValue] = useState(fallback)

  useEffect(() => {
    if (!start) return undefined
    const duration = 1600
    const begin = performance.now()
    let frame

    const update = (time) => {
      const progress = Math.min((time - begin) / duration, 1)
      const ease = 1 - (1 - progress) * (1 - progress)
      const current = Math.floor(ease * target)
      const formatted = prefix ? (current < 10 ? prefix + current : current) : current
      setValue(`${formatted}${suffix}`)
      if (progress < 1) frame = requestAnimationFrame(update)
      else {
        const finalFormat = prefix ? (target < 10 ? prefix + target : target) : target
        setValue(`${finalFormat}${suffix}`)
      }
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [prefix, start, suffix, target])

  return (
    <div className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
      {value}
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const [count, setCount] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCount(true)
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 relative bg-[#04060c]" id="about" ref={sectionRef}>
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#67e8f9] pointer-events-none z-20" />
      <div className="absolute -top-32 right-1/4 w-[650px] h-52 bg-gradient-to-tr from-brand-royal/20 via-blue-600/15 to-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px] h-[520px] sm:h-[580px] lg:h-[620px] flex items-end justify-center">
              <img
                alt="Aditya Giri portrait standing"
                className="h-full w-auto max-w-full object-contain object-bottom select-none drop-shadow-[0_20px_45px_rgba(29,109,246,0.35)]"
                src="/aboutPic.png"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-widest">
              <span className="w-8 h-px bg-blue-400" />
              PHILOSOPHY & ETHOS
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-200 tracking-tight leading-tight">
            &ldquo; Life, as it Felt &rdquo;

            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            I'm Aditya Giri, the eye behind <strong>@caritas.heart</strong>. This is an archive of my daily life — not as it looks, but as it feels. Through cinematic stills and quiet, moving frames, I try to hold onto the fleeting moments in between — the light that doesn't stay, the streets after rain, the stories in ordinary faces.

            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
            Caritas means love from the heart, and that's the intent behind everything here. This space is not about perfection, but about presence. Finding beauty in the ordinary, and letting the everyday feel like cinema.

            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="glass-panel-subtle p-4 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <Stat prefix="0" suffix="+" target={7} start={count} fallback="07+" />
                <div className="text-xs text-slate-400 mt-1">Years Behind Lens</div>
              </div>
              <div className="glass-panel-subtle p-4 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">4K Cinematic</div>
                <div className="text-xs text-slate-400 mt-1">Color Grading Suites</div>
              </div>
            </div>
            <div className="pt-4">
              <a className="btn-shimmer inline-flex items-center gap-3 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-slate-200 transition-all duration-300 active:scale-95 shadow-lg shadow-white/10" href="#contact">
                <span>Initiate Collaboration</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
