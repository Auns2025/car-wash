import React, { useState, useEffect } from 'react'
import { ArrowUpRight, ShieldCheck, Sparkles, Droplets, Clock, MapPin, Award, CheckCircle2 } from 'lucide-react'

export default function BookingSection({ onOpenBooking, selectedVehicle, setSelectedVehicle }) {
  const [localBookings, setLocalBookings] = useState([])

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('obsidian_bookings') || '[]')
      setLocalBookings(data)
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <section id="booking-section" className="relative z-30 bg-[#070709] border-t border-white/10 px-6 sm:px-12 md:px-20 py-24 sm:py-32 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Subheader */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="text-xs font-mono tracking-widest uppercase text-white/50">
            OBSIDIAN — Detail Studio
          </span>
        </div>

        {/* Master Heading & Immediate Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-none">
              Book Your <br />
              <span className="text-stroke">Detail.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl font-light leading-relaxed">
              Book your detail. You'll know the price before we start. Requests are saved on this device.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              <span>Book Your Detail</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-6 text-xs font-mono text-white/50 tracking-wider">
              <a href="#packages" className="flex items-center gap-1 hover:text-white transition-colors">
                <span>4K detail</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="#services" className="flex items-center gap-1 hover:text-white transition-colors">
                <span>Local leads</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Saved Bookings on this device (if any) */}
        {localBookings.length > 0 && (
          <div className="mt-12 p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-emerald-950/10">
            <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Active Studio Reservation Saved On Device</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {localBookings.slice(-2).map((b, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="font-mono text-white/40 mb-1">{b.id}</div>
                  <div className="font-bold text-white text-sm">{b.vehicle} — {b.service}</div>
                  <div className="text-white/60 mt-1">{b.date} · ${b.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Studio Packages Grid */}
        <div id="packages" className="mt-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 block mb-1">
                Studio Standards
              </span>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight">
                Curated Treatment Packages
              </h3>
            </div>
            <span className="hidden sm:block text-xs font-mono text-white/40">
              Zero compromises · Optical purity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Package 1 */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Tier 01</span>
                  <Droplets className="w-5 h-5 text-white/40 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h4 className="font-display font-bold text-2xl uppercase tracking-tight mb-2">
                  Obsidian Wash
                </h4>
                <p className="text-xs text-white/60 leading-relaxed mb-6">
                  Ph-neutral snow foam bath, two-bucket decontamination wash, clay bar residue lift, and hydrophobic drying gloss.
                </p>
                <ul className="space-y-2.5 text-xs text-white/70 font-light mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/40" /> Hand wash & clay treatment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/40" /> Deep wheel barrel extraction
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/40" /> 6-month silica spray sealant
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">From</span>
                  <span className="font-display font-black text-2xl text-white">$180</span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Reserve
                </button>
              </div>
            </div>

            {/* Package 2 (Featured) */}
            <div className="p-8 rounded-3xl glass-panel border-2 border-white/30 bg-white/[0.04] flex flex-col justify-between hover:border-white/50 transition-all relative group shadow-2xl">
              <div className="absolute -top-3 right-8 px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                Signature Experience
              </div>
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Tier 02</span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-display font-bold text-2xl uppercase tracking-tight mb-2">
                  Paint Correction
                </h4>
                <p className="text-xs text-white/60 leading-relaxed mb-6">
                  Dual-action rotary and orbital compounding to lift swirl scratches, hazing, and wash marring to restore optical clarity.
                </p>
                <ul className="space-y-2.5 text-xs text-white/80 font-light mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-400" /> Multi-stage clearcoat levelling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-400" /> 90%+ micro-scratch elimination
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-400" /> Deep mirror gloss finishing pass
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">From</span>
                  <span className="font-display font-black text-2xl text-white">$490</span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-white/90 transition-transform active:scale-95"
                >
                  Reserve
                </button>
              </div>
            </div>

            {/* Package 3 */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-semibold">Tier 03</span>
                  <ShieldCheck className="w-5 h-5 text-white/40 group-hover:text-luxury-gold transition-colors" />
                </div>
                <h4 className="font-display font-bold text-2xl uppercase tracking-tight mb-2">
                  Ceramic Glass Armor
                </h4>
                <p className="text-xs text-white/60 leading-relaxed mb-6">
                  Full multi-stage polish locked in with 9H certified nano-ceramic coating. Extreme hydrophobic beading and UV shield.
                </p>
                <ul className="space-y-2.5 text-xs text-white/70 font-light mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/40" /> 5-Year 9H ceramic warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/40" /> High-angle hydrophobic beading
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/40" /> Infrared bake curing in studio
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">From</span>
                  <span className="font-display font-black text-2xl text-white">$890</span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Reserve
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Studio Specs Banner */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10 font-mono text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white block mb-1">0.1 μm</span>
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Paint Gauge Precision</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white block mb-1">9H+</span>
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Ceramic Hardness</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white block mb-1">110°</span>
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Water Contact Angle</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white block mb-1">100%</span>
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Silent Hand Process</span>
          </div>
        </div>

        {/* Footer Editorial Branding */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-mono gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-sm">OBSIDIAN</span>
            <span>© 2026 Obsidian Detail Studio Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Studio Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
          </div>
        </div>

      </div>
    </section>
  )
}
