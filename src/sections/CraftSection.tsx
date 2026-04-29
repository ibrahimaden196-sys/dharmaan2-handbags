import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CraftRowProps {
  label: string
  heading: string
  body: string
  link: string
  image: string
  imageLeft: boolean
}

function CraftRow({ label, heading, body, link, image, imageLeft }: CraftRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, rowRef)

    return () => ctx.revert()
  }, [])

  const imageBlock = (
    <div
      ref={imageRef}
      className="w-full lg:w-[55%]"
      style={{ opacity: 0, transform: 'scale(0.97)' }}
    >
      <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={image}
          alt={heading}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  )

  const textBlock = (
    <div
      ref={textRef}
      className="w-full lg:w-[45%] flex flex-col justify-center"
      style={{
        padding: imageLeft ? '0 0 0 clamp(1.5rem, 4vw, 5rem)' : '0 clamp(1.5rem, 4vw, 5rem) 0 0',
        opacity: 0,
        transform: 'translateY(30px)',
      }}
    >
      <span className="label-text block" style={{ marginBottom: '1rem' }}>
        {label}
      </span>
      <h3
        className="font-display"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          fontWeight: 300,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          color: '#262626',
          marginBottom: '1rem',
        }}
      >
        {heading}
      </h3>
      <p
        className="font-body text-brand-text-secondary"
        style={{
          fontSize: '1rem',
          lineHeight: 1.65,
          letterSpacing: '0.005em',
          marginBottom: '1.5rem',
        }}
      >
        {body}
      </p>
      <a
        href="#"
        className="font-body inline-flex items-center gap-2 text-brand-text hover:text-brand-accent transition-colors duration-300 group"
        style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}
        onClick={(e) => e.preventDefault()}
      >
        {link}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </a>
    </div>
  )

  return (
    <div
      ref={rowRef}
      className={`flex flex-col ${imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-0`}
    >
      {imageBlock}
      {textBlock}
    </div>
  )
}

export default function CraftSection() {
  return (
    <section
      id="craft"
      style={{
        background: '#faf8f5',
        padding: '120px clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <CraftRow
          label="THE ATELIER"
          heading="Where patience is the primary material"
          body="In a small workshop on the outskirts of Florence, six artisans spend an average of 42 hours on each bag. Every stitch is placed by hand. Every edge is burnished, dyed, and polished three times. There are no shortcuts in vegetable-tanned leather — it rewards only those who wait."
          link="Meet our artisans"
          image="/images/craft-1.jpg"
          imageLeft={true}
        />
        <div style={{ marginTop: '120px' }}>
          <CraftRow
            label="THE MATERIAL"
            heading="Leather that remembers"
            body="We use exclusively full-grain vegetable-tanned leather from the Consorzio Vera Pelle Italiana conciata al vegetale. Unlike chrome-tanned alternatives, it develops a unique patina over time — darkening at the edges, softening at the folds, becoming unmistakably yours."
            link="Our leather sourcing"
            image="/images/craft-2.jpg"
            imageLeft={false}
          />
        </div>
      </div>
    </section>
  )
}
