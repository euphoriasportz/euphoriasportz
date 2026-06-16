"use client";

import { useState, useEffect } from "react";
import { sportConfigs, SportConfig } from "@/utils/sportConfigs";
import { db, allAvailableSlots, isPeakHour, Booking } from "@/lib/supabase";
import { Calendar as CalendarIcon, Clock, Check, AlertCircle, Trophy, Swords, Target } from "lucide-react";

interface BookingCalendarProps {
  initialSportId: string;
}

const sportIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  football: Trophy,
  cricket: Swords,
  basketball: Target,
};

export default function BookingCalendar({ initialSportId }: BookingCalendarProps) {
  const [selectedSport, setSelectedSport] = useState<SportConfig>(sportConfigs[initialSportId] || sportConfigs.football);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  
  // Checkout Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  // Date list generation (Next 7 days)
  const [dates, setDates] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const datesList = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      
      const label = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
      datesList.push({ label, value: formatted });
    }
    setDates(datesList);
    setSelectedDate(datesList[0].value);
  }, []);

  // Update selected sport when initialSportId prop changes
  useEffect(() => {
    if (sportConfigs[initialSportId]) {
      setSelectedSport(sportConfigs[initialSportId]);
    }
  }, [initialSportId]);

  // Load booked slots for selected date
  useEffect(() => {
    if (selectedDate) {
      const bookingsForDate = db.getBookingsByDate(selectedDate);
      const booked = bookingsForDate.map(b => b.slot);
      setBookedSlots(booked);
      setSelectedSlot(""); // Reset slot when date changes
      setErrorMsg("");
    }
  }, [selectedDate, formSubmitted]);

  // Calculate pricing based on slot
  const calculatePrice = (slot: string) => {
    if (!slot) return 0;
    const base = selectedSport.basePrice;
    const peak = isPeakHour(slot);
    return Math.round(peak ? base * selectedSport.peakMultiplier : base);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedSlot) {
      setErrorMsg("Please select a time slot first.");
      return;
    }
    if (!name || !phone || !email) {
      setErrorMsg("All fields are required.");
      return;
    }

    const price = calculatePrice(selectedSlot);

    const result = db.createBooking({
      date: selectedDate,
      slot: selectedSlot,
      sport: selectedSport.id,
      name,
      phone,
      email,
      pricePaid: price
    });

    if (result.success && result.booking) {
      setLatestBooking(result.booking);
      setFormSubmitted(true);
      // Reset form fields
      setName("");
      setPhone("");
      setEmail("");
    } else {
      setErrorMsg(result.error || "Booking failed. Please try again.");
    }
  };

  const activeColor = selectedSport.primaryColor;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 py-8">
      
      {/* Date & Slot Picker Column */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Arena Setup Selector (Overrides Sport Mode inside checkout flow) */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="font-['Orbitron'] text-sm font-semibold text-white tracking-widest uppercase mb-4">
            1. Select Your Arena Setup
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(sportConfigs).map((sport) => {
              const isActive = sport.id === selectedSport.id;
              const Icon = sportIcons[sport.id] || Trophy;
              return (
                <button
                  key={sport.id}
                  onClick={() => {
                    setSelectedSport(sport);
                    setSelectedSlot("");
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 ${
                    isActive 
                      ? "bg-white/5" 
                      : "bg-transparent border-white/5 hover:border-white/20"
                  }`}
                  style={{
                    borderColor: isActive ? sport.primaryColor : undefined,
                  }}
                >
                  <Icon className="w-5 h-5 text-white mb-1.5" />
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">{sport.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Selection */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="font-['Orbitron'] text-sm font-semibold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            2. Choose Date
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
            {dates.map((d) => {
              const isActive = d.value === selectedDate;
              return (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`px-4 py-3 rounded-xl border text-center font-medium text-xs whitespace-nowrap transition-all duration-300 min-w-[90px] ${
                    isActive
                      ? "bg-white/5 text-white"
                      : "bg-transparent border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                  style={{
                    borderColor: isActive ? activeColor : undefined,
                  }}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slot Selection Grid */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-['Orbitron'] text-sm font-semibold text-white tracking-widest uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              3. Select Available Slot
            </h3>
            <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-white/5 border border-white/10" /> Regular
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-amber-500/10 border border-amber-500/30" /> Peak
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {allAvailableSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const isPeak = isPeakHour(slot);
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 border ${
                    isBooked
                      ? "bg-zinc-900 border-zinc-900 text-zinc-600 cursor-not-allowed opacity-50"
                      : isSelected
                      ? "bg-white/10 text-white"
                      : isPeak
                      ? "bg-amber-500/5 border-amber-500/20 text-amber-400 hover:border-amber-500/50"
                      : "bg-transparent border-white/5 text-gray-300 hover:border-white/20"
                  }`}
                  style={{
                    borderColor: isSelected ? activeColor : undefined,
                    boxShadow: isSelected ? `0 0 10px ${activeColor}33` : undefined,
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
            * Peak hours (5:00 PM - 11:00 PM) incur config-specific pricing multipliers. Booking slots are checked and locked in real-time.
          </p>
        </div>

      </div>

      {/* Booking Form and Review Column */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 space-y-6">
          
          {/* Reservation Breakdown Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="font-['Orbitron'] text-sm font-semibold text-white tracking-widest uppercase mb-4 border-b border-white/5 pb-2">
              Reservation Summary
            </h3>

            {/* If slot is selected, show details. Otherwise guide them */}
            {selectedSlot ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Arena Setup</span>
                  <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                    {(() => {
                      const Icon = sportIcons[selectedSport.id] || Trophy;
                      return <Icon className="w-4 h-4" style={{ color: selectedSport.primaryColor }} />;
                    })()}
                    <span>{selectedSport.name}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Date</span>
                  <span className="text-white text-sm font-semibold">{selectedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Timing Slot</span>
                  <span className="text-white text-sm font-semibold">{selectedSlot} - {parseInt(selectedSlot.split(':')[0]) + 1}:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Slot Type</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isPeakHour(selectedSlot) 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                      : "bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20"
                  }`}>
                    {isPeakHour(selectedSlot) ? "Peak Rate" : "Standard Rate"}
                  </span>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-gray-400 text-sm block">Subtotal</span>
                      <span className="text-xs text-gray-500">Includes all gear & utilities</span>
                    </div>
                    <span className="text-2xl font-black text-white font-['Orbitron']">
                      ₹{calculatePrice(selectedSlot)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                Select your setup, date, and available slot to view summary.
              </div>
            )}
          </div>

          {/* Checkout Checkout Form */}
          {!formSubmitted ? (
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="font-['Orbitron'] text-sm font-semibold text-white tracking-widest uppercase mb-4">
                Confirm Reservation
              </h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    disabled={!selectedSlot}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-[#0d0e11] border border-white/5 focus:border-[#39FF14] text-white text-sm rounded-lg px-4 py-2.5 outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    disabled={!selectedSlot}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-[#0d0e11] border border-white/5 focus:border-[#39FF14] text-white text-sm rounded-lg px-4 py-2.5 outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    disabled={!selectedSlot}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-[#0d0e11] border border-white/5 focus:border-[#39FF14] text-white text-sm rounded-lg px-4 py-2.5 outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!selectedSlot}
                  className="w-full font-bold uppercase tracking-widest text-xs py-3 rounded-lg text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                  style={{
                    backgroundColor: selectedSlot ? activeColor : "#2a2d34",
                    boxShadow: selectedSlot ? `0 0 20px ${activeColor}55` : "none",
                  }}
                >
                  Verify and Book Slot
                </button>
              </form>
            </div>
          ) : (
            /* Success confirmation card */
            <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-['Orbitron'] text-lg font-bold text-white tracking-wide">
                Slot Confirmed!
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your reservation at EuphoriaSportz is secured. A receipt confirmation has been dispatched to <strong className="text-white">{latestBooking?.email}</strong>.
              </p>
              
              <div className="bg-[#0c0d10] border border-white/5 rounded-xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking ID:</span>
                  <span className="text-gray-300 font-mono">{latestBooking?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Arena:</span>
                  <span className="text-gray-300 uppercase font-bold">{latestBooking?.sport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date/Time:</span>
                  <span className="text-gray-300 font-semibold">{latestBooking?.date} @ {latestBooking?.slot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount Paid:</span>
                  <span className="text-[#39FF14] font-bold">₹{latestBooking?.pricePaid}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setLatestBooking(null);
                  setSelectedSlot("");
                }}
                className="w-full border border-white/10 hover:border-white/20 text-xs font-semibold py-2.5 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
              >
                Book Another Session
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
