import { useEffect, useRef, useState } from 'react'
import { useCloudinaryMedia } from '../hooks/useCloudinaryMedia'
import Reveal from './Reveal'

const inactiveTab =
  'chapter-tab px-3.5 py-1 rounded-full text-xs font-mono text-slate-400 glass-panel-subtle hover:text-white transition-all duration-200'
const activeTab =
  'chapter-tab px-3.5 py-1 rounded-full text-xs font-mono text-cyan-300 bg-brand-royal/30 border border-cyan-400/40 transition-all duration-200'

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function Cinematics() {
  const { items, loading, error } = useCloudinaryMedia('video')
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef(null)

  const video = items[index] || null
  const duration = videoRef.current?.duration || video?.duration || 0
  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0

  useEffect(() => {
    setIndex(0)
    setPlaying(false)
    setCurrentTime(0)
  }, [items])

  useEffect(() => {
    const node = videoRef.current
    if (!node) return undefined
    if (playing) {
      node.play().catch(() => setPlaying(false))
    } else {
      node.pause()
    }
    return undefined
  }, [playing, index])

  const togglePlay = () => {
    if (!video) return
    setPlaying((prev) => !prev)
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#04060c] via-[#081533] to-[#04060c]" id="cinematics">
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#60a5fa] pointer-events-none z-20" />
      <div className="absolute -top-20 left-1/4 w-[min(600px,70%)] h-40 bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,100%)] h-[450px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
          playing ? 'scale-125 bg-cyan-500/25' : 'bg-blue-600/15'
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-300 tracking-tight">
            Motion & Cinematic Rhythms
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Directing, shooting, and color grading short films, music videos, and commercial brand stories.
          </p>
        </Reveal>

        {items.length > 1 ? (
          <Reveal className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {items.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                className={index === itemIndex ? activeTab : inactiveTab}
                onClick={(event) => {
                  event.stopPropagation()
                  setIndex(itemIndex)
                  setPlaying(false)
                  setCurrentTime(0)
                }}
              >
                {String(itemIndex + 1).padStart(2, '0')} // {item.title}
              </button>
            ))}
          </Reveal>
        ) : null}

        {loading ? (
          <div className="max-w-5xl mx-auto rounded-3xl glass-panel aspect-video animate-pulse bg-white/5" />
        ) : error ? (
          <div className="max-w-5xl mx-auto rounded-3xl glass-panel-subtle border border-red-400/20 p-8 text-center text-sm text-slate-300">
            {error}
          </div>
        ) : !video ? (
          <div className="max-w-5xl mx-auto rounded-3xl glass-panel-subtle border border-white/10 p-10 text-center text-sm text-slate-300">
            No films yet. Upload videos in Cloudinary and they will appear here automatically.
          </div>
        ) : (
          <Reveal className="relative rounded-3xl overflow-hidden glass-panel border border-white/20 max-w-5xl mx-auto shadow-2xl aspect-video group transition-all duration-700">
            <video
              ref={videoRef}
              key={video.id}
              className="absolute inset-0 h-full w-full object-cover"
              poster={video.poster}
              src={video.src}
              preload="metadata"
              playsInline
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
            />
            {!playing ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors duration-300">
                <div className="relative flex items-center justify-center">
                  <div className="sonar-ring" />
                  <div className="sonar-ring" />
                  <div className="sonar-ring" />
                  <button
                    aria-label="Play film"
                    className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-royal hover:bg-blue-600 text-white flex items-center justify-center shadow-glow group-hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-neon-blue"
                    type="button"
                    onClick={togglePlay}
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <button
                aria-label="Pause film"
                type="button"
                className="absolute inset-0 z-10"
                onClick={togglePlay}
              />
            )}
            <div className="absolute bottom-12 inset-x-6 h-1 bg-white/20 rounded-full overflow-hidden pointer-events-none">
              <div className="h-full bg-cyan-400 rounded-full transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/95 to-transparent flex items-center justify-between text-xs text-slate-300 font-mono pointer-events-none">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full animate-pulse ${playing ? 'bg-emerald-400' : 'bg-red-500'}`} />
                <span className="text-white font-semibold tracking-wide">{video.title}</span>
                <span className="text-slate-400 hidden sm:inline">| {video.format}</span>
                <div className="hidden md:flex items-center gap-1 h-4 ml-2">
                  <span className="sound-bar h-2" />
                  <span className="sound-bar h-3.5" />
                  <span className="sound-bar h-1.5" />
                  <span className="sound-bar h-4" />
                  <span className="sound-bar h-2.5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
