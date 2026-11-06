import React, { useRef, useEffect } from 'react'

export default function CinematicCanvas({ scrollProgress }) {
  const canvasRef = useRef(null)
  const mousePos = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 })
  const imagesRef = useRef({
    dirty: null,
    clean: null,
    swirls: null,
    ceramic: null,
    sunset: null,
    loaded: false
  })
  const particlesRef = useRef([])

  // Load and cache high-resolution images
  useEffect(() => {
    const urls = {
      dirty: '/images/01_dirty.jpg',
      clean: '/images/02_clean.jpg',
      swirls: '/images/03_swirls.jpg',
      ceramic: '/images/04_ceramic.jpg',
      sunset: '/images/05_sunset.jpg'
    }

    let loaded = 0
    const total = 5

    Object.entries(urls).forEach(([key, src]) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        imagesRef.current[key] = img
        loaded++
        if (loaded === total) {
          imagesRef.current.loaded = true
        }
      }
    })

    // Init water jet particles
    const particles = []
    for (let i = 0; i < 110; i++) {
      particles.push({
        yRel: Math.random(),
        speedX: (Math.random() - 0.5) * 80 + 30,
        speedY: (Math.random() - 0.5) * 40,
        size: Math.random() * 2.8 + 1,
        alpha: Math.random() * 0.7 + 0.3,
        offset: Math.random() * Math.PI * 2
      })
    }
    particlesRef.current = particles

    // Mouse parallax tracking
    const handleMouseMove = (e) => {
      mousePos.current.targetX = e.clientX / window.innerWidth
      mousePos.current.targetY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Master render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    let animationFrameId

    const render = (time) => {
      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05

      // Resize canvas to match display size & device pixel ratio
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = window.innerWidth
      const height = window.innerHeight

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }

      ctx.save()
      ctx.scale(dpr, dpr)

      // Base background
      ctx.fillStyle = '#070709'
      ctx.fillRect(0, 0, width, height)

      const imgs = imagesRef.current
      if (imgs.loaded) {
        // Subtle 3D camera pan / parallax
        const parallaxX = (mousePos.current.x - 0.5) * 16
        const parallaxY = (mousePos.current.y - 0.5) * 12

        // Helper: Draw image with cover fit and camera zoom/pan
        const drawCoverImage = (img, alpha = 1, scale = 1, panX = 0, panY = 0) => {
          if (!img || alpha <= 0.001) return
          ctx.save()
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha))

          const imgAspect = img.width / img.height
          const screenAspect = width / height

          let renderW, renderH, renderX, renderY

          if (screenAspect > imgAspect) {
            renderW = width * scale
            renderH = (width / imgAspect) * scale
          } else {
            renderH = height * scale
            renderW = (height * imgAspect) * scale
          }

          renderX = (width - renderW) / 2 + parallaxX + panX
          renderY = (height - renderH) / 2 + parallaxY + panY

          ctx.drawImage(img, renderX, renderY, renderW, renderH)
          ctx.restore()
        }

        const p = scrollProgress

        // ==========================================
        // SCENE 1 & 2: DIRTY -> WATER JET WASH -> CLEAN
        // Progress: 0.00 to 0.42
        // ==========================================
        if (p < 0.45) {
          const s12Alpha = p < 0.38 ? 1 : Math.max(0, 1 - (p - 0.38) / 0.06)

          if (p <= 0.14) {
            // Scene 1: Full dirty vehicle
            drawCoverImage(imgs.dirty, s12Alpha)
          } else if (p < 0.36) {
            // Scene 2: Interactive water spray wash wipe!
            const washT = (p - 0.14) / (0.36 - 0.14) // 0.0 to 1.0
            const washLineX = width * (-0.05 + washT * 1.1)

            // Step A: Draw clean car
            drawCoverImage(imgs.clean, s12Alpha)

            // Step B: Clip and draw dirty car on the right of the wash line
            ctx.save()
            ctx.beginPath()
            ctx.rect(washLineX, 0, width - washLineX + 10, height)
            ctx.clip()
            drawCoverImage(imgs.dirty, s12Alpha)
            ctx.restore()

            // Step C: High-pressure water spray jet curtain at washLineX
            ctx.save()
            ctx.globalAlpha = s12Alpha

            // Water jet core beam
            const jetGrad = ctx.createLinearGradient(washLineX - 20, 0, washLineX + 20, 0)
            jetGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
            jetGrad.addColorStop(0.3, 'rgba(180, 235, 255, 0.45)')
            jetGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)')
            jetGrad.addColorStop(0.7, 'rgba(180, 235, 255, 0.45)')
            jetGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')

            ctx.fillStyle = jetGrad
            ctx.fillRect(washLineX - 20, 0, 40, height)

            // Dynamic water spray & mist particles
            const particles = particlesRef.current
            const now = time * 0.003
            ctx.fillStyle = '#ffffff'

            for (let i = 0; i < particles.length; i++) {
              const pt = particles[i]
              const py = (pt.yRel * height + Math.sin(now + pt.offset) * 35) % height
              const px = washLineX + Math.sin(now * 3 + pt.offset) * 18 + (i % 2 === 0 ? 1 : -1) * (i % 16)

              ctx.globalAlpha = pt.alpha * s12Alpha * (0.6 + 0.4 * Math.sin(now * 5 + i))
              ctx.beginPath()
              ctx.arc(px, py, pt.size, 0, Math.PI * 2)
              ctx.fill()
            }

            // Floor puddle reflection splash
            const floorY = height * 0.85
            const splashGrad = ctx.createRadialGradient(washLineX, floorY, 2, washLineX, floorY, 140)
            splashGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)')
            splashGrad.addColorStop(0.4, 'rgba(160, 225, 255, 0.35)')
            splashGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
            ctx.fillStyle = splashGrad
            ctx.fillRect(washLineX - 140, floorY - 35, 280, 70)

            ctx.restore()
          } else {
            // Full clean car before macro zoom
            drawCoverImage(imgs.clean, s12Alpha)
          }
        }

        // ==========================================
        // SCENE 3: LOOK CLOSER (PAINT INSPECTION SWIRLS)
        // Progress: 0.38 to 0.62
        // ==========================================
        if (p >= 0.37 && p <= 0.63) {
          let s3Alpha = 0
          if (p < 0.44) {
            s3Alpha = (p - 0.37) / 0.07
          } else if (p > 0.56) {
            s3Alpha = 1 - (p - 0.56) / 0.07
          } else {
            s3Alpha = 1
          }

          // Camera dolly in towards macro surface
          const s3Scale = 1.0 + (p - 0.40) * 0.2
          drawCoverImage(imgs.swirls, s3Alpha, s3Scale)

          // Interactive inspection light ring glint
          if (s3Alpha > 0.05) {
            ctx.save()
            ctx.globalAlpha = s3Alpha * 0.45
            const lightX = width * (0.70 + (mousePos.current.x - 0.5) * 0.15)
            const lightY = height * (0.35 + (mousePos.current.y - 0.5) * 0.15)

            const ringGlow = ctx.createRadialGradient(lightX, lightY, 15, lightX, lightY, 220)
            ringGlow.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
            ringGlow.addColorStop(0.35, 'rgba(255, 240, 210, 0.25)')
            ringGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')

            ctx.fillStyle = ringGlow
            ctx.beginPath()
            ctx.arc(lightX, lightY, 220, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        }

        // ==========================================
        // SCENE 4: SWIRLS OUT. GLASS ON. (CERAMIC DROPLET)
        // Progress: 0.56 to 0.80
        // ==========================================
        if (p >= 0.56 && p <= 0.81) {
          let s4Alpha = 0
          if (p < 0.62) {
            s4Alpha = (p - 0.56) / 0.06
          } else if (p > 0.74) {
            s4Alpha = 1 - (p - 0.74) / 0.06
          } else {
            s4Alpha = 1
          }

          // Buffer machine wipe across the surface
          if (p >= 0.56 && p < 0.65) {
            const wipeT = (p - 0.56) / (0.65 - 0.56)
            const wipeX = width * wipeT

            // Draw swirls on right
            drawCoverImage(imgs.swirls, 1)

            // Draw ceramic glass on left
            ctx.save()
            ctx.beginPath()
            ctx.rect(0, 0, wipeX, height)
            ctx.clip()
            drawCoverImage(imgs.ceramic, 1, 1.05)
            ctx.restore()

            // Buffing shimmer line
            ctx.save()
            const buffGrad = ctx.createLinearGradient(wipeX - 30, 0, wipeX + 30, 0)
            buffGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
            buffGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)')
            buffGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
            ctx.fillStyle = buffGrad
            ctx.fillRect(wipeX - 30, 0, 60, height)
            ctx.restore()
          } else {
            // Full pristine ceramic droplet on liquid glass
            const s4Scale = 1.05 + (p - 0.65) * 0.1
            drawCoverImage(imgs.ceramic, s4Alpha, s4Scale)
          }
        }

        // ==========================================
        // SCENE 5: KEYS BACK. JAW DROPS. (WIDE SUNSET)
        // Progress: 0.74 to 1.00
        // ==========================================
        if (p >= 0.74) {
          const s5Alpha = Math.min(1, (p - 0.74) / 0.08)
          // Wide cinematic pull-out
          const s5Scale = 1.06 - (p - 0.74) * 0.06
          drawCoverImage(imgs.sunset, s5Alpha, s5Scale)

          // Warm golden hour light rays enhancement
          if (s5Alpha > 0.05) {
            ctx.save()
            ctx.globalAlpha = s5Alpha * 0.28
            const sunGrad = ctx.createRadialGradient(
              width * 0.85, height * 0.35, 20,
              width * 0.85, height * 0.35, width * 0.7
            )
            sunGrad.addColorStop(0, 'rgba(245, 170, 70, 0.65)')
            sunGrad.addColorStop(0.5, 'rgba(220, 120, 40, 0.18)')
            sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
            ctx.fillStyle = sunGrad
            ctx.fillRect(0, 0, width, height)
            ctx.restore()
          }
        }

      }

      ctx.restore()
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animationFrameId)
  }, [scrollProgress])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
      style={{ filter: 'contrast(1.04) brightness(1.02)' }}
    />
  )
}
