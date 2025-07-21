'use client'

import { useEffect, useState } from 'react'

export default function MouseLightEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-0 transition-all duration-100 ease-out"
      style={{
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255, 0, 0, 0.05) 0%, rgba(178, 95, 251, 0.03) 50%, transparent 100%)',
        borderRadius: '50%',
        mixBlendMode: 'screen'
      }}
    />
  )
} 