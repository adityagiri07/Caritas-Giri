import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function AmbientEffects({ scrollPercent }) {
  const reducedMotion = usePrefersReducedMotion()
  const glowRef = useRef(null)

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return undefined
    const glow = glowRef.current
    if (!glow) return undefined

    let mouseX = -500
    let mouseY = -500
    let auraX = -500
    let auraY = -500
    let frame

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      glow.style.opacity = '1'
    }
    const onLeave = () => {
      glow.style.opacity = '0'
    }
    const render = () => {
      auraX += (mouseX - auraX) * 0.15
      auraY += (mouseY - auraY) * 0.15
      glow.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`
      frame = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-cyan-400 via-blue-500 to-brand-royal transition-[width] duration-150 ease-out shadow-[0_0_12px_#67e8f9]"
        style={{ width: `${scrollPercent}%` }}
      />
      <div id="cursor-glow-follower" ref={glowRef} />
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-2xl text-[11px] font-mono text-cyan-300 pointer-events-none transition-all duration-300 opacity-80">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="tracking-wider">SCROLL</span>
        <span className="text-white font-semibold">{String(Math.round(scrollPercent)).padStart(2, '0')}%</span>
      </div>
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="bg-mote w-2.5 h-2.5 bg-cyan-400/40 blur-[1px] top-[18%] left-[12%]" style={{ animationDuration: '9s' }} />
        <div className="bg-mote w-3.5 h-3.5 bg-blue-500/30 blur-[2px] top-[34%] right-[14%]" style={{ animationDuration: '11s', animationDelay: '1.5s' }} />
        <div className="bg-mote w-2 h-2 bg-sky-300/50 blur-[1px] top-[62%] left-[22%]" style={{ animationDuration: '8.5s', animationDelay: '3s' }} />
        <div className="bg-mote w-4 h-4 bg-brand-royal/25 blur-[3px] top-[80%] right-[28%]" style={{ animationDuration: '13s', animationDelay: '0.5s' }} />
        <div className="bg-mote w-1.5 h-1.5 bg-cyan-300/60 blur-[0.5px] top-[48%] left-[68%]" style={{ animationDuration: '10s', animationDelay: '2.2s' }} />
      </div>
    </>
  )
}
