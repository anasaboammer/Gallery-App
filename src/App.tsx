import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Features } from './sections/Features'
import { Edit } from './sections/Edit'
import { HowItWorks } from './sections/HowItWorks'
import { Pricing } from './sections/Pricing'
import { FAQ } from './sections/FAQ'
import { Download } from './sections/Download'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <Features />
        <Edit />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Download />
      </main>
      <Footer />
    </>
  )
}
