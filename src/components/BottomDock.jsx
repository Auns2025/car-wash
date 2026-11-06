import React, { useState } from 'react'
import { ChevronDown, ArrowUpRight } from 'lucide-react'

export default function BottomDock({
  selectedVehicle,
  setSelectedVehicle,
  selectedService,
  setSelectedService,
  onOpenBooking
}) {
  const [vehicleMenuOpen, setVehicleMenuOpen] = useState(false)
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false)

  const vehicles = ['SUV', 'Sedan', 'Coupe', 'Exotic', 'Truck']
  const services = ['Ceramic', 'Paint Correction', 'Obsidian Wash', 'Full Studio Detail']

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
      <div className="relative glass-pill px-3 py-2 rounded-full flex items-center gap-1 sm:gap-2 text-xs text-white/90 shadow-2xl">
        
        {/* Vehicle Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setVehicleMenuOpen(!vehicleMenuOpen)
              setServiceMenuOpen(false)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="text-white/40 text-[10px] uppercase tracking-wider font-mono">Vehicle</span>
            <span className="font-semibold">{selectedVehicle}</span>
            <ChevronDown className="w-3 h-3 text-white/60" />
          </button>

          {vehicleMenuOpen && (
            <div className="absolute bottom-full mb-2 left-0 w-36 glass-panel rounded-xl py-1 text-xs shadow-2xl overflow-hidden border border-white/10 animate-fadeIn">
              {vehicles.map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setSelectedVehicle(v)
                    setVehicleMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-white/15 transition-colors ${
                    selectedVehicle === v ? 'text-white font-bold bg-white/10' : 'text-white/70'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-[1px] h-4 bg-white/15" />

        {/* Service Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setServiceMenuOpen(!serviceMenuOpen)
              setVehicleMenuOpen(false)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="text-white/40 text-[10px] uppercase tracking-wider font-mono">Service</span>
            <span className="font-semibold">{selectedService}</span>
            <ChevronDown className="w-3 h-3 text-white/60" />
          </button>

          {serviceMenuOpen && (
            <div className="absolute bottom-full mb-2 left-0 w-44 glass-panel rounded-xl py-1 text-xs shadow-2xl overflow-hidden border border-white/10 animate-fadeIn">
              {services.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedService(s)
                    setServiceMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-white/15 transition-colors ${
                    selectedService === s ? 'text-white font-bold bg-white/10' : 'text-white/70'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Book Button */}
        <button
          onClick={onOpenBooking}
          className="ml-1 flex items-center gap-1 px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 hover:scale-105 transition-all shadow-md cursor-pointer"
        >
          <span>Book</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  )
}
