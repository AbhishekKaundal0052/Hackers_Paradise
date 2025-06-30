import Layout from '@/components/layout/Layout'
import Hero from '@/components/features/Hero'
import Features from '@/components/features/Features'
import Statistics from '@/components/features/Statistics'
import Testimonials from '@/components/features/Testimonials'
import MatrixBackground from '@/components/features/MatrixBackground'
import MouseLightEffect from '@/components/features/MouseLightEffect'

export default function HomePage() {
  return (
    <Layout showSidebar={false}>
      <MouseLightEffect />
      <MatrixBackground />
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
    </Layout>
  )
}
