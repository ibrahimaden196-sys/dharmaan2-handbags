import { useEffect, useRef, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.opacity = '0'
      setTimeout(() => {
        if (navRef.current) {
          navRef.current.style.transition = 'opacity 0.8s ease, background-color 0.3s ease, backdrop-filter 0.3s ease'
          navRef.current.style.opacity = '1'
        }
      }, 300)
    }
  }, [])

  const links = ['Collection', 'Craft', 'About', 'Contact']

  const handleLinkClick = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          height: '64px',
          backgroundColor: scrolled ? 'rgba(250, 248, 245, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between h-full mx-auto"
          style={{ maxWidth: '1280px', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
        >
          <a
            href="#"
            className="font-display text-[1.25rem] tracking-[0.08em] uppercase text-brand-text"
            style={{ fontWeight: 400 }}
          >
            DHARMAN
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className="relative font-body text-[0.9375rem] tracking-[0.01em] text-brand-text-secondary hover:text-brand-text transition-colors duration-300 bg-transparent border-none cursor-pointer group"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-text transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[6px] bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1px] bg-brand-text transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-[1px] bg-brand-text transition-all duration-300"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
        style={{
          backgroundColor: '#faf8f5',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        {links.map((link) => (
          <button
            key={link}
            onClick={() => handleLinkClick(link)}
            className="font-display text-2xl tracking-[0.02em] text-brand-text bg-transparent border-none cursor-pointer"
            style={{ fontWeight: 300 }}
          >
            {link}
          </button>
        ))}
      </div>
    </>
  )
}
