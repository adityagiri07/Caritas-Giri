import { GEAR } from '../data'
import { onSpotlightMove } from '../lib/spotlight'
import Reveal from './Reveal'

function GearIcon({ type }) {
  if (type === 'lens') {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  }
  if (type === 'star') {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export default function Gear() {
  return (
    <section className="py-20 relative bg-[#060a14] border-t border-white/5 overflow-hidden" id="gear">
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#60a5fa] pointer-events-none z-20" />
      <div className="absolute -top-24 left-1/3 w-[550px] h-44 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-brand-royal/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 pointer-events-none opacity-20">
        <svg className="w-full h-full iris-rotating-ring" fill="none" stroke="#38bdf8" strokeWidth="1.2" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="72" />
          <polygon points="100,28 172,100 100,172 28,100" />
          <polygon points="150,50 150,150 50,150 50,50" />
          <circle cx="100" cy="100" r="40" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 mb-2">BEHIND THE FRAMES</p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-300 tracking-tight">
            Gear, Glass & Color Science
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GEAR.map((box, index) => {
            const isCyan = box.accent === 'cyan'
            return (
              <Reveal
                key={box.title}
                delay={`${index * 150}ms`}
                className="mouse-spotlight-card glass-panel-subtle p-8 rounded-3xl border border-white/10 hover:border-blue-400/40 hover:-translate-y-2 hover:shadow-neon-blue transition-all duration-500"
                onMouseMove={onSpotlightMove}
              >
                <div
                  className={`w-12 h-12 rounded-xl mb-6 shadow-glow flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                    isCyan ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                  }`}
                >
                  <GearIcon type={box.icon} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{box.title}</h3>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  {box.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 hover:text-white transition-colors">
                      <span className={`w-1.5 h-1.5 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-brand-royal'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
