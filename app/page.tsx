'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/marketing/HeroSection'
import TrustStrip from '@/components/marketing/TrustStrip'
import TradingRootsSection from '@/components/marketing/TradingRootsSection'
import CategoriesShowcase from '@/components/marketing/CategoriesShowcase'
import WhyChooseUs from '@/components/marketing/WhyChooseUs'
import QualityProcess from '@/components/marketing/QualityProcess'
import PackagingShipment from '@/components/marketing/PackagingShipment'
import IndustriesServed from '@/components/marketing/IndustriesServed'
import RFQFormSection from '@/components/marketing/RFQFormSection'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0.3 },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <HeroSection />
      <TrustStrip />
      <TradingRootsSection />
      <CategoriesShowcase />
      <WhyChooseUs />
      <QualityProcess />
      <PackagingShipment />
      <IndustriesServed />
      <RFQFormSection />

      <Footer />
    </main>
  )
}
