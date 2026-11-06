import React, { useState, useEffect } from 'react'
import { X, Check, Calendar, Clock, Car, Shield, Sparkles, ArrowRight } from 'lucide-react'

export default function BookingModal({
  isOpen,
  onClose,
  initialVehicle = 'SUV',
  initialService = 'Ceramic'
}) {
  const [vehicle, setVehicle] = useState(initialVehicle)
  const [service, setService] = useState(initialService)
  const [date, setDate] = useState('Tomorrow, 9:00 AM')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [carDetails, setCarDetails] = useState('2024 Land Rover Range Rover (Obsidian Black)')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setVehicle(initialVehicle)
  }, [initialVehicle])

  useEffect(() => {
    setService(initialService)
  }, [initialService])

  if (!isOpen) return null

  const servicePrices = {
    'Obsidian Wash': { price: 180, time: '2.5 Hours', desc: 'Hand wash, decontamination clay bar, wheels deep clean, hydrophobic seal.' },
    'Paint Correction': { price: 490, time: '1 Day', desc: 'Single to two-stage machine polish removing 85%+ of clear coat swirl marks.' },
    'Ceramic': { price: 890, time: '2 Days', desc: 'Full multi-stage polish + 5-year 9H ceramic coating layer for mirror liquid glass.' },
    'Full Studio Detail': { price: 1350, time: '3 Days', desc: 'Complete concours interior & exterior restoration with self-healing coating.' }
  }

  const currentPrice = servicePrices[service]?.price || 890

  const handleSubmit = (e) => {
    e.preventDefault()
    const booking = {
      id: 'OBS-' + Math.floor(100000 + Math.random() * 900000),
      vehicle,
      service,
      date,
      name,
      phone,
      email,
      carDetails,
      price: currentPrice,
      timestamp: new Date().toISOString()
    }
    // Save locally
    const existing = JSON.parse(localStorage.getItem('obsidian_bookings') || '[]')
    existing.push(booking)
    localStorage.setItem('obsidian_bookings', JSON.stringify(existing))
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div 
        className="relative w-full max-w-xl glass-panel bg-[#0d0d11]/95 border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl uppercase tracking-wider mb-2">
              Studio Slot Reserved
            </h3>
            <p className="text-white/60 text-sm max-w-sm mb-6">
              Your appointment for <span className="text-white font-semibold">{vehicle} ({service})</span> has been confirmed. Our master detailer will reach out shortly.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/50 mb-8 w-full max-w-sm">
              Saved locally to your device session. Reference: OBS-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-transform active:scale-95"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/50">OBSIDIAN RESERVATION</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                Book Your Detail
              </h2>
              <p className="text-xs text-white/50 mt-1">
                You'll know the exact price before we start. No hidden surprises.
              </p>
            </div>

            {/* Vehicle Type Pills */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-white/60 mb-2">
                Vehicle Category
              </label>
              <div className="grid grid-cols-5 gap-2">
                {['SUV', 'Sedan', 'Coupe', 'Exotic', 'Truck'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVehicle(v)}
                    className={`py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${
                      vehicle === v
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-white/60 mb-2">
                Service Package
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(servicePrices).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setService(key)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      service === key
                        ? 'bg-white/10 border-white shadow-lg'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-xs text-white">{key}</span>
                      <span className="font-mono text-xs text-emerald-400 font-bold">${item.price}</span>
                    </div>
                    <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-white/40">
                      Duration: {item.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">Vehicle Make & Model</label>
                <input
                  type="text"
                  required
                  value={carDetails}
                  onChange={(e) => setCarDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="e.g. Porsche 911 GT3"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">Preferred Arrival</label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141418] border border-white/10 text-xs text-white focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option>Tomorrow, 9:00 AM</option>
                  <option>Tomorrow, 1:00 PM</option>
                  <option>Wednesday, 9:00 AM</option>
                  <option>Thursday, 10:00 AM</option>
                  <option>Friday, 9:00 AM</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="Alexander Wright"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="+1 (555) 019-2834"
                />
              </div>
            </div>

            {/* Price Summary & Submit */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">Estimated Total</span>
                <span className="font-display font-extrabold text-2xl text-white">${currentPrice}</span>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <span>Confirm Studio Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
