import React from 'react'

export default function Navbar({ onNavigate, onOpenBooking }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 md:px-12 md:py-5 flex items-center justify-between pointer-events-auto bg-[#070709]/30 backdrop-blur-md border-b border-white/[0.06] transition-all">
      {/* Brand & Status */}
      <div className="flex items-center gap-4">
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onNavigate('top'); }}
          className="flex items-baseline gap-1.5 group cursor-pointer"
        >
          <span className="font-display font-black tracking-wider text-sm md:text-base uppercase text-white group-hover:text-white/80 transition-colors">
            OBSIDIAN
          </span>
          <span className="text-[11px] font-sans font-light text-white/50 tracking-wide">
            Detail Studio
          </span>
        </a>

        {/* Live Studio Availability Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium text-white/70 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Studio open - bookings this week</span>
        </div>
      </div>

      {/* Center Navigation Links matching reference */}
      <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-white/60 tracking-wider uppercase">
        <button
          onClick={() => onNavigate('wash')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Wash
        </button>
        <button
          onClick={() => onNavigate('polish')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Polish
        </button>
        <button
          onClick={() => onNavigate('pickup')}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Pick-up
        </button>
      </nav>

      {/* Right Action Button */}
      <div className="flex items-center">
        <button
          onClick={onOpenBooking}
          className="px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90 bg-white/10 hover:bg-white hover:text-black border border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer active:scale-95"
        >
          Book Your Detail
        </button>
      </div>
    </header>
  )
}
