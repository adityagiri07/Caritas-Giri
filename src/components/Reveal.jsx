import { useEffect, useRef, useState } from 'react'

export default function Reveal({ className = '', as: Tag = 'div', children, delay, style, ...props }) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal-on-scroll ${revealed ? 'is-revealed' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: delay, ...style } : style}
      {...props}
    >
      {children}
    </Tag>
  )
}
