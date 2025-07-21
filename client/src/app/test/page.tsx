'use client'

import Layout from '@/components/layout/Layout'
import CyberButton from '@/components/common/CyberButton'
import CyberCard from '@/components/common/CyberCard'

export default function TestPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="cyber-title mb-8 text-center">CSS Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CyberCard>
            <h2 className="text-xl font-cyber font-semibold text-white mb-4">Test Card</h2>
            <p className="text-muted-foreground mb-4">
              This is a test card to verify that the CSS is working correctly.
            </p>
            <CyberButton>Test Button</CyberButton>
          </CyberCard>
          
          <div className="glass-card-dark p-6">
            <h2 className="text-xl font-cyber font-semibold text-white mb-4">Glass Card</h2>
            <p className="text-muted-foreground mb-4">
              This is a glass card to test the glassmorphism effects.
            </p>
            <CyberButton variant="outline">Outline Button</CyberButton>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <CyberButton size="lg" glow>
            Glow Button
          </CyberButton>
        </div>
      </div>
    </Layout>
  )
} 