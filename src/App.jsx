import { useEffect, useState } from 'react'
import About from './components/About'
import AmbientEffects from './components/AmbientEffects'
import Cinematics from './components/Cinematics'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gear from './components/Gear'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import { useCloudinaryMedia } from './hooks/useCloudinaryMedia'
import { prettyName } from './lib/cloudinaryMap'

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('work')
  const [activeFilter, setActiveFilter] = useState('all')
  const stills = useCloudinaryMedia('image')
  const disciplineFilters = [
    { id: 'all', label: 'All Works' },
    ...stills.tags.map((tag) => ({ id: tag, label: prettyName(tag) })),
  ]

  useEffect(() => {
    if (activeFilter !== 'all' && !stills.tags.includes(activeFilter)) {
      setActiveFilter('all')
    }
  }, [activeFilter, stills.tags])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const fraction = docHeight > 0 ? y / docHeight : 0
      setScrollY(y)
      setScrollPercent(Math.min(100, Math.max(0, fraction * 100)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <AmbientEffects scrollPercent={scrollPercent} />
      <Navbar scrolled={scrollY > 80} activeSection={activeSection} />
      <Hero
        scrollY={scrollY}
        onFilterChange={setActiveFilter}
        activeFilter={activeFilter}
        filters={disciplineFilters}
      />
      <Portfolio
        activeFilter={activeFilter}
        items={stills.items}
        tags={stills.tags}
        loading={stills.loading}
        error={stills.error}
        onFilterChange={setActiveFilter}
      />
      <Cinematics />
      <About />
      <Gear />
      <Contact />
      <Footer showBackToTop={scrollY > 420} />
    </>
  )
}
