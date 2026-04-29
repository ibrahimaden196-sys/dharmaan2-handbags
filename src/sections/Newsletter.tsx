import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(leftRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.to(rightRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: '#faf8f5',
        padding: '120px clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row gap-12 lg:gap-0"
        style={{ maxWidth: '1280px' }}
      >
        <div
          ref={leftRef}
          className="w-full lg:w-1/2"
          style={{ opacity: 0, transform: 'translateX(-20px)' }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#262626',
              marginBottom: '1rem',
            }}
          >
            Stay close
          </h2>
          <p
            className="font-body text-brand-text-secondary"
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              letterSpacing: '0.005em',
              maxWidth: '420px',
            }}
          >
            New releases arrive unannounced. Join the list and be the first to know — no frequency, no noise, only when something matters.
          </p>
        </div>

        <div
          ref={rightRef}
          className="w-full lg:w-1/2 flex items-end"
          style={{ opacity: 0, transform: 'translateX(20px)' }}
        >
          {submitted ? (
            <p className="font-body text-brand-text-secondary" style={{ fontSize: '1rem' }}>
              Thank you. We will be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex items-end gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent font-body text-brand-text placeholder-[#a3a3a3] focus:outline-none pb-2"
                  style={{
                    fontSize: '1rem',
                    borderBottom: '1px solid #262626',
                    borderRadius: 0,
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="font-body bg-transparent border-none cursor-pointer pb-2 text-brand-text hover:text-brand-accent transition-colors duration-300 relative group"
                style={{ fontSize: '0.9375rem' }}
              >
                Join
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
