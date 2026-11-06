import React from 'react'

export default function CinematicOverlays({ scrollProgress }) {
  // scrollProgress ranges from 0.0 to 1.0 across the pinned 550vh section
  
  // Scene 1: Arrive (0.00 to 0.16)
  const s1Opacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.10) / 0.06))
  const s1Y = scrollProgress * -80

  // Scene 2: Wash (0.16 to 0.38)
  let s2Opacity = 0
  if (scrollProgress >= 0.14 && scrollProgress <= 0.40) {
    if (scrollProgress < 0.20) {
      s2Opacity = (scrollProgress - 0.14) / 0.06
    } else if (scrollProgress > 0.34) {
      s2Opacity = 1 - (scrollProgress - 0.34) / 0.06
    } else {
      s2Opacity = 1
    }
  }

  // Scene 3: Inspect (0.38 to 0.58)
  let s3Opacity = 0
  if (scrollProgress >= 0.36 && scrollProgress <= 0.60) {
    if (scrollProgress < 0.43) {
      s3Opacity = (scrollProgress - 0.36) / 0.07
    } else if (scrollProgress > 0.53) {
      s3Opacity = 1 - (scrollProgress - 0.53) / 0.07
    } else {
      s3Opacity = 1
    }
  }

  // Scene 4: Polish (0.58 to 0.76)
  let s4Opacity = 0
  if (scrollProgress >= 0.56 && scrollProgress <= 0.78) {
    if (scrollProgress < 0.62) {
      s4Opacity = (scrollProgress - 0.56) / 0.06
    } else if (scrollProgress > 0.72) {
      s4Opacity = 1 - (scrollProgress - 0.72) / 0.06
    } else {
      s4Opacity = 1
    }
  }

  // Scene 5: Pick-up (0.76 to 0.98)
  let s5Opacity = 0
  if (scrollProgress >= 0.75) {
    if (scrollProgress < 0.82) {
      s5Opacity = (scrollProgress - 0.75) / 0.07
    } else if (scrollProgress > 0.95) {
      s5Opacity = Math.max(0, 1 - (scrollProgress - 0.95) / 0.04)
    } else {
      s5Opacity = 1
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none">
      
      {/* SCENE 01 — BRING IT DIRTY */}
      <div 
        className="absolute bottom-28 sm:bottom-32 left-6 sm:left-14 md:left-20 max-w-2xl transition-transform duration-75"
        style={{
          opacity: s1Opacity,
          transform: `translateY(${s1Y}px)`,
          pointerEvents: s1Opacity > 0.2 ? 'auto' : 'none'
        }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/60">
            01 — Arrive
          </span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-white">
          Bring It <br />
          <span className="text-stroke">Dirty.</span>
        </h1>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base font-light text-white/70 tracking-wide max-w-md">
          We'll take it from here.
        </p>
      </div>

      {/* SCENE 02 — SCROLL TO WASH IT */}
      <div 
        className="absolute bottom-28 sm:bottom-32 right-6 sm:right-14 md:right-20 max-w-xl text-right transition-transform duration-75"
        style={{
          opacity: s2Opacity,
          transform: `translateY(${(scrollProgress - 0.26) * -40}px)`,
          pointerEvents: s2Opacity > 0.2 ? 'auto' : 'none'
        }}
      >
        <div className="flex items-center justify-end gap-2 mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/60">
            02 — Wash
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>
        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-white">
          Scroll To <br />
          <span className="text-stroke">Wash It.</span>
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base font-light text-white/70 tracking-wide ml-auto max-w-sm">
          Hand wash, clay, polish. All by hand.
        </p>
      </div>

      {/* SCENE 03 — LOOK CLOSER */}
      <div 
        className="absolute bottom-28 sm:bottom-32 left-6 sm:left-14 md:left-20 max-w-xl transition-transform duration-75"
        style={{
          opacity: s3Opacity,
          transform: `translateY(${(scrollProgress - 0.48) * -40}px)`,
          pointerEvents: s3Opacity > 0.2 ? 'auto' : 'none'
        }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/60">
            03 — Inspect
          </span>
        </div>
        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-white">
          Look <br />
          <span className="text-stroke">Closer.</span>
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base font-light text-white/70 tracking-wide max-w-sm">
          Under a bright light, every swirl shows.
        </p>
      </div>

      {/* SCENE 04 — SWIRLS OUT. GLASS ON. */}
      <div 
        className="absolute bottom-28 sm:bottom-32 right-6 sm:right-14 md:right-20 max-w-xl text-right transition-transform duration-75"
        style={{
          opacity: s4Opacity,
          transform: `translateY(${(scrollProgress - 0.67) * -40}px)`,
          pointerEvents: s4Opacity > 0.2 ? 'auto' : 'none'
        }}
      >
        <div className="flex items-center justify-end gap-2 mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/60">
            04 — Polish
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-white">
          Swirls Out. <br />
          <span className="text-stroke">Glass On.</span>
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base font-light text-white/70 tracking-wide ml-auto max-w-sm">
          Polish lifts them. Ceramic seals them in.
        </p>
      </div>

      {/* SCENE 05 — KEYS BACK. JAW DROPS. */}
      <div 
        className="absolute bottom-28 sm:bottom-32 left-6 sm:left-14 md:left-20 max-w-xl transition-transform duration-75"
        style={{
          opacity: s5Opacity,
          transform: `translateY(${(scrollProgress - 0.86) * -40}px)`,
          pointerEvents: s5Opacity > 0.2 ? 'auto' : 'none'
        }}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/60">
            05 — Pick-up
          </span>
        </div>
        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-white">
          Keys Back. <br />
          <span className="text-stroke">Jaw Drops.</span>
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base font-light text-white/70 tracking-wide max-w-sm">
          Book your detail. You'll know the price before we start.
        </p>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 7) }}
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-white/40">
          Scroll to explore
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/60 to-transparent animate-bounce" />
      </div>

    </div>
  )
}
