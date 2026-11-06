import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import BottomDock from './components/BottomDock'
import CinematicCanvas from './components/CinematicCanvas'
import CinematicOverlays from './components/CinematicOverlays'
import BookingSection from './components/BookingSection'
import BookingModal from './components/BookingModal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedVehicle, setSelectedVehicle] = useState('SUV')
  const [selectedService, setSelectedService] = useState('Ceramic')
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const pinnedContainerRef = useRef(null)
  const lenisRef = useLenis()

  useEffect(() => {
    if (!isLoaded) return

    const container = pinnedContainerRef.current
    if (!container) return

    // Master ScrollTrigger scrubbing through the cinematic experience
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      }
    })

    return () => {
      trigger.kill()
    }
  }, [isLoaded])

  // Navigation jumping
  const handleNavigate = (target) => {
    const lenis = lenisRef.current
    if (!lenis || !pinnedContainerRef.current) return

    const containerHeight = pinnedContainerRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    const maxScroll = containerHeight - viewportHeight

    if (target === 'top') {
      lenis.scrollTo(0, { duration: 1.5 })
    } else if (target === 'wash') {
      lenis.scrollTo(maxScroll * 0.28, { duration: 1.5 })
    } else if (target === 'polish') {
      lenis.scrollTo(maxScroll * 0.70, { duration: 1.5 })
    } else if (target === 'pickup') {
      lenis.scrollTo(maxScroll * 0.92, { duration: 1.5 })
    } else if (target === 'booking') {
      const el = document.getElementById('booking-section')
      if (el) lenis.scrollTo(el, { duration: 1.5 })
    }
  }

  return (
    <div className="relative bg-[#070709] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {/* Cinematic Asset Preloader */}
      <LoadingScreen onLoaded={() => setIsLoaded(true)} />

      {/* Persistent Global Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Pinned Viewport Container for 500vh Cinematic Scroll-Scrub Experience */}
      <section ref={pinnedContainerRef} className="relative h-[550vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* WebGL / High-Resolution Double-Buffered Canvas */}
          <CinematicCanvas scrollProgress={scrollProgress} />

          {/* Synchronized Stage Typography & Outline Masks */}
          <CinematicOverlays scrollProgress={scrollProgress} />
        </div>
      </section>

      {/* Floating Bottom Studio Dock (hides when scrolled to bottom booking section) */}
      <div 
        className="transition-opacity duration-300"
        style={{
          opacity: scrollProgress < 0.96 ? 1 : 0,
          pointerEvents: scrollProgress < 0.96 ? 'auto' : 'none'
        }}
      >
        <BottomDock
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      </div>

      {/* Editorial Conversion Section */}
      <BookingSection
        onOpenBooking={() => setIsBookingOpen(true)}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />

      {/* Interactive Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialVehicle={selectedVehicle}
        initialService={selectedService}
      />
    </div>
  )
}
