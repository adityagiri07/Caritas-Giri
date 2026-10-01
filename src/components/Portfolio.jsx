import { useState } from 'react'
import { prettyName } from '../lib/cloudinaryMap'
import { onSpotlightMove } from '../lib/spotlight'
import ImageLightbox from './ImageLightbox'
import MediaState from './MediaState'
import Reveal from './Reveal'

function coverForTags(items, tags) {
  return tags
    .map((tag) => {
      const cover = items.find((item) => (item.tags || []).includes(tag))
      if (!cover) return null
      return { ...cover, coverTag: tag }
    })
    .filter(Boolean)
}

export default function Portfolio({
  activeFilter,
  items = [],
  tags = [],
  loading,
  error,
  onFilterChange,
}) {
  const [lightboxItem, setLightboxItem] = useState(null)
  const isAllWorks = activeFilter === 'all'
  const cards = isAllWorks
    ? coverForTags(items, tags)
    : items.filter((item) => (item.tags || []).includes(activeFilter))

  const openCategory = (tag) => {
    if (!tag || !onFilterChange) return
    onFilterChange(tag)
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-24 relative bg-[#04060c] border-t border-white/5 scroll-mt-32 overflow-x-clip" id="work">
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#67e8f9] pointer-events-none z-20" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#05070f] via-blue-950/20 to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(700px,100%)] h-48 bg-gradient-to-r from-cyan-500/10 via-brand-royal/20 to-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 mb-2">// SELECTED CAPTURES</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 tracking-tight">
              Visual Stories & Still Frames
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-md">
            A curatorial collection of light, human emotions, and atmospheric depth through high-contrast storytelling.
          </p>
        </Reveal>

        <MediaState
          loading={loading}
          error={error}
          emptyMessage={
            items.length
              ? `No stills tagged “${prettyName(activeFilter)}” yet. Add that tag to images in Cloudinary.`
              : 'No stills yet. Upload images in Cloudinary and they will appear here automatically.'
          }
        >
          {cards.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              {cards.map((item, index) => {
                const tag = isAllWorks ? item.coverTag : null
                return (
                  <Reveal
                    key={isAllWorks ? tag : item.id}
                    delay={`${(index % 6) * 60}ms`}
                    className="gallery-item mouse-spotlight-card rounded-3xl glass-panel-subtle overflow-hidden relative group cursor-pointer hover:-translate-y-1.5 hover:shadow-neon-blue hover:border-cyan-400/30 transition-all duration-500"
                    onMouseMove={onSpotlightMove}
                    onClick={isAllWorks ? () => openCategory(tag) : () => setLightboxItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        if (isAllWorks) openCategory(tag)
                        else setLightboxItem(item)
                      }
                    }}
                  >
                    {isAllWorks ? (
                      <div className="relative z-10 px-5 pt-5 pb-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300 group-hover:text-cyan-300 transition-colors">
                          Category
                        </span>
                        <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-200 transition-colors duration-300">
                          {prettyName(tag)}
                        </h3>
                      </div>
                    ) : null}
                    <div className="bg-black/40">
                      <img
                        alt={isAllWorks ? prettyName(tag) : item.alt}
                        width={item.width}
                        height={item.height}
                        className="w-full h-auto block"
                        style={
                          item.width && item.height ? { aspectRatio: `${item.width} / ${item.height}` } : undefined
                        }
                        src={item.src}
                      />
                    </div>
                    {!isAllWorks ? (
                      <div className="relative z-10 px-5 py-4 border-t border-white/10">
                        <span className="text-[11px] font-mono uppercase text-blue-300 group-hover:text-cyan-300 transition-colors">
                          {prettyName(activeFilter)}
                        </span>
                        <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-200 transition-colors duration-300">
                          {item.title}
                        </h3>
                        {item.meta ? <p className="text-slate-300 text-xs mt-1">{item.meta}</p> : null}
                      </div>
                    ) : null}
                  </Reveal>
                )
              })}
            </div>
          ) : null}
        </MediaState>
      </div>
      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </section>
  )
}
