import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxFeature() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    if (!section || !image) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      gsap.to(section, {
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="parallax-feature"
      style={{ opacity: 0 }}
    >
      <div className="parallax-image-wrapper">
        <img
          ref={imageRef}
          className="parallax-image"
          src="/images/feature-wide.jpg"
          alt="Woman carrying a DHARMAN leather tote through the streets of Florence"
          loading="lazy"
        />
      </div>
    </section>
  )
}
