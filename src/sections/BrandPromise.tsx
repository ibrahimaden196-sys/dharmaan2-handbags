import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BrandPromise() {
  const sectionRef = useRef<HTMLElement>(null)
  const strokeTextRef = useRef<SVGTextElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const strokeText = strokeTextRef.current
    if (!strokeText) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: strokeText,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          strokeText.classList.add('drawn')
          if (subtitleRef.current) {
            gsap.to(subtitleRef.current, {
              opacity: 1,
              duration: 0.8,
              delay: 0.5,
              ease: 'power3.out',
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center"
      style={{
        background: '#faf8f5',
        padding: '160px clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <svg
        className="brand-stroke-svg"
        viewBox="0 0 600 80"
      >
        <text
          ref={strokeTextRef}
          className="brand-stroke-text"
          x="50%"
          y="55"
          textAnchor="middle"
        >
          DHARMAN
        </text>
      </svg>

      <p
        ref={subtitleRef}
        className="font-body italic text-brand-text-secondary text-center"
        style={{
          fontSize: '1rem',
          lineHeight: 1.65,
          maxWidth: '480px',
          marginTop: '2.5rem',
          opacity: 0,
        }}
      >
        Named for the Sanskrit word meaning 'that which holds' — because a bag is never just a bag.
      </p>
    </section>
  )
}
