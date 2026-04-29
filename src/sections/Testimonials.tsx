import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "I have carried my Numero Uno every day for three years. The leather has gone from caramel to a deep honey. It feels like it has a history now.",
    name: "Elena R., Milan",
    role: "Architect",
    image: "/images/testimonial-1.jpg",
  },
  {
    quote: "The strap adjustment is genius — one bag becomes three. I wear it crossbody for the commute, shorten it for dinner, and remove it entirely for events.",
    name: "Sarah K., New York",
    role: "Creative Director",
    image: "/images/testimonial-2.jpg",
  },
  {
    quote: "I own bags that cost three times as much. None of them feel this considered. The weight distribution, the interior pockets, the way the zipper glides — every detail is deliberate.",
    name: "Mei L., Tokyo",
    role: "Editor-in-Chief",
    image: "/images/testimonial-3.jpg",
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0)
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.1)

      tl.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, 0.2)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#f0ebe3',
        padding: '120px clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <span
          ref={labelRef}
          className="label-text block"
          style={{ marginBottom: '1rem', opacity: 0, transform: 'translateY(20px)' }}
        >
          FROM OUR CLIENTS
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
            marginBottom: '3rem',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Words we did not write
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '48px' }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              style={{ opacity: 0, transform: 'translateY(40px)' }}
            >
              {/* Burgundy accent line */}
              <div style={{ width: '32px', height: '1px', backgroundColor: '#7f1d1d', marginBottom: '1.5rem' }} />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-body" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#262626' }}>
                    {t.name}
                  </p>
                  <p className="font-mono" style={{ fontSize: '0.7rem', color: '#a3a3a3' }}>
                    {t.role}
                  </p>
                </div>
              </div>
              <p
                className="font-display italic"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: '#262626',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
