import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { name: 'Numero Uno', price: '$1,280', image: '/images/product-1.jpg' },
  { name: 'Numero Due', price: '$1,450', image: '/images/product-2.jpg' },
  { name: 'Numero Tre', price: '$1,680', image: '/images/product-3.jpg' },
]

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardsRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#f0ebe3',
        padding: '80px 0',
      }}
    >
      <div
        className="flex gap-6 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center"
        style={{
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
        }}
      >
        {products.map((product, i) => (
          <div
            key={product.name}
            ref={(el) => { if (el) cardsRef.current[i] = el }}
            className="flex-shrink-0 cursor-pointer group"
            style={{
              width: '380px',
              maxWidth: '85vw',
              scrollSnapAlign: 'center',
              opacity: 0,
              transform: 'translateX(60px)',
            }}
          >
            <div className="overflow-hidden" style={{ width: '380px', maxWidth: '85vw', aspectRatio: '1/1' }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div
              className="flex items-baseline justify-between"
              style={{
                borderBottom: '1px solid #e5e0d8',
                paddingBottom: '1rem',
                marginTop: '1.25rem',
              }}
            >
              <h3
                className="font-display"
                style={{ fontSize: '1.25rem', fontWeight: 300, color: '#262626' }}
              >
                {product.name}
              </h3>
              <span
                className="font-mono"
                style={{ fontSize: '0.8rem', color: '#a3a3a3' }}
              >
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
