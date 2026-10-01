import { useEffect } from 'react'
import { prettyName } from '../lib/cloudinaryMap'

export default function ImageLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || 'Image preview'}
    >
      <button
        type="button"
        aria-label="Close image"
        className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-brand-royal hover:border-cyan-400/50 hover:shadow-neon-blue transition-all"
        onClick={onClose}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-white/20 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-black/50 flex items-center justify-center p-3 sm:p-5">
          <img
            alt={item.alt || item.title}
            src={item.fullSrc || item.src}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>
        <div className="px-6 sm:px-8 py-5 border-t border-white/10">
          {item.tags?.[0] ? (
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300">
              {prettyName(item.tags[0])}
            </span>
          ) : null}
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">{item.title}</h3>
          {item.description ? (
            <p className="text-slate-300 text-sm leading-relaxed mt-2 max-w-3xl">{item.description}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
