import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  Shop: ['Collection', 'New Arrivals', 'Bestsellers', 'Gift Cards'],
  Company: ['Our Story', 'Atelier', 'Sustainability', 'Careers'],
  Support: ['Shipping', 'Returns', 'Care Guide', 'Contact'],
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        background: '#262626',
        color: '#faf8f5',
        padding: '80px clamp(1.5rem, 5vw, 4rem) 40px',
      }}
    >
      <div
        ref={contentRef}
        className="mx-auto"
        style={{ maxWidth: '1280px', opacity: 0, transform: 'translateY(20px)' }}
      >
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p
              className="font-display"
              style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
                marginBottom: '0.5rem',
              }}
            >
              DHARMAN
            </p>
            <p
              className="font-body"
              style={{ fontSize: '0.8rem', color: '#a3a3a3' }}
            >
              Handbags, Florence
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                className="font-body"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#a3a3a3',
                  marginBottom: '1rem',
                }}
              >
                {category}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body transition-colors duration-200 hover:text-[#faf8f5]"
                      style={{ fontSize: '0.875rem', color: '#a3a3a3' }}
                      onClick={(e) => e.preventDefault()}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ marginTop: '60px', paddingTop: '24px', borderTop: '1px solid rgba(163, 163, 163, 0.2)' }}
        >
          <p className="font-mono" style={{ fontSize: '0.7rem', color: '#a3a3a3' }}>
            2026 DHARMAN. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="transition-colors duration-200 hover:text-[#faf8f5]"
              style={{ color: '#a3a3a3' }}
              onClick={(e) => e.preventDefault()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="#"
              aria-label="Pinterest"
              className="transition-colors duration-200 hover:text-[#faf8f5]"
              style={{ color: '#a3a3a3' }}
              onClick={(e) => e.preventDefault()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.8 4-4 4" />
                <path d="M12 16l-1 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
