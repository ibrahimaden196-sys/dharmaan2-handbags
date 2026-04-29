import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CollectionIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0)
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0)
      tl.to(bodyRef.current, { opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.2)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="text-center"
      style={{
        background: '#faf8f5',
        paddingTop: '160px',
        paddingBottom: '120px',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '720px' }}>
        <span
          ref={labelRef}
          className="label-text block"
          style={{ marginBottom: '1.5rem', opacity: 0, transform: 'translateY(30px)' }}
        >
          THE COLLECTION
        </span>
        <h2
          ref={headingRef}
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#262626',
            opacity: 0,
            transform: 'translateY(30px)',
          }}
        >
          Seven silhouettes. One philosophy.
        </h2>
        <p
          ref={bodyRef}
          className="font-body text-brand-text-secondary"
          style={{
            fontSize: '1rem',
            lineHeight: 1.65,
            letterSpacing: '0.005em',
            maxWidth: '560px',
            margin: '1.5rem auto 0',
            opacity: 0,
          }}
        >
          We do not chase seasons. Each design emerges when the form feels inevitable — when material, function, and proportion reach a quiet agreement.
        </p>
      </div>
    </section>
  )
}
