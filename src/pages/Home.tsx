import Navigation from '../sections/Navigation'
import Hero from '../sections/Hero'
import CollectionIntro from '../sections/CollectionIntro'
import ProductShowcase from '../sections/ProductShowcase'
import BrandPromise from '../sections/BrandPromise'
import CraftSection from '../sections/CraftSection'
import ParallaxFeature from '../sections/ParallaxFeature'
import Testimonials from '../sections/Testimonials'
import Newsletter from '../sections/Newsletter'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <Navigation />
      <Hero />
      <CollectionIntro />
      <ProductShowcase />
      <BrandPromise />
      <CraftSection />
      <ParallaxFeature />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}
