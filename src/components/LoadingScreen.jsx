import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const imagesToLoad = [
      '/images/01_dirty.jpg',
      '/images/02_clean.jpg',
      '/images/03_swirls.jpg',
      '/images/04_ceramic.jpg',
      '/images/05_sunset.jpg',
    ]

    let loadedCount = 0
    const total = imagesToLoad.length

    const updateProgress = () => {
      loadedCount++
      const pct = Math.round((loadedCount / total) * 100)
      setProgress(pct)

      if (loadedCount === total) {
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsFinished(true)
              if (onLoaded) onLoaded()
            }
          })

          tl.to('.loader-content', {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: 'power3.inOut'
          })
          .to('.loader-curtain', {
            yPercent: -100,
            duration: 1,
            ease: 'expo.inOut'
          })
        }, 300)
      }
    }

    imagesToLoad.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = updateProgress
      img.onerror = updateProgress
    })
  }, [onLoaded])

  if (isFinished) return null

  return (
    <div className="loader-curtain fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white">
      <div className="loader-content flex flex-col items-center max-w-sm px-6 text-center">
        {/* Brand Mark */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="font-display font-extrabold tracking-widest text-xl uppercase">OBSIDIAN</span>
          <span className="text-xs uppercase tracking-[0.25em] text-white/50 pl-1 border-l border-white/20">Studio</span>
        </div>

        {/* Cinematic Status */}
        <p className="text-xs font-mono tracking-widest uppercase text-white/40 mb-3">
          Calibrating Optical Studio
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Numbers */}
        <div className="flex justify-between w-48 text-[11px] font-mono text-white/50">
          <span>INITIALIZING</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  )
}
