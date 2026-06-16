"use client";

import { useState } from "react";
import BookingCalendar from "@/components/BookingCalendar";

export default function BookPage() {
  return (
    <div className="relative min-h-screen pt-12 pb-24">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50%] h-[600px] stadium-light-beam opacity-30 animate-pulse-glow" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-['Orbitron'] text-xs font-bold text-[#39FF14] tracking-widest uppercase">
            Real-Time Slot Allocator
          </span>
          <h1 className="font-['Orbitron'] font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Schedule Your Session
          </h1>
          <p className="text-gray-400 text-sm">
            Reserve the entire convertible arena. Securing a slot instantly blocks it for other sport modes. Fully automated scheduling.
          </p>
        </div>

        {/* Calendar Booking Interface */}
        <BookingCalendar initialSportId="football" />

      </div>
    </div>
  );
}
