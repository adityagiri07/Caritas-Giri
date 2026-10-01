export default function MediaState({ loading, error, emptyMessage, children }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-3xl glass-panel-subtle animate-pulse bg-white/5 overflow-hidden">
            <div className={index % 3 === 1 ? 'h-72 bg-white/5' : 'h-96 bg-white/5'} />
            <div className="h-16" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl glass-panel-subtle border border-red-400/20 p-8 text-center text-sm text-slate-300">
        {error}
      </div>
    )
  }

  if (!children) {
    return (
      <div className="rounded-3xl glass-panel-subtle border border-white/10 p-10 text-center">
        <p className="text-slate-300 text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return children
}
